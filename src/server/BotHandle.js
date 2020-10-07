const Player = require("../entities/Player");
const utils = require("../utils");
const weapons = require("../config/weapons");
const config = require("../config/config");

class BotHandle {
    constructor(game) {
        // Save game
        /** @type {Game} */ this.game = game;

        /** @type {?Player} */ this.player = null;

        // Generate username
        this.username = "";

        // Spawn timer
        this.spawnTimer = 0;

        // Targeting
        /** @type {?Player} */ this.target = null;
        this.retargetTimer = 0;
        if (config.isServer) 
            this.spawn();
    }

    spawn() {
        // Find all valid weapons
        let validWeapons = weapons.weapons.filter(w => w.botWeapon);
        let chosenWeapon = validWeapons[Math.floor(Math.random() * validWeapons.length)];
        let weaponIndex = weapons.weapons.indexOf(chosenWeapon);

        // Create new player
        this.player = new Player(this.game);
        this.player.botHandle = this;
        this.player.username = this.username;
        this.player.shipIndex = config.shipIndexForId("alien");
        this.player.shipFill = "#FF0000";
        this.doShoot = Math.random();
        if (this.doShoot > 0.7){
            this.player.shipFill = "#32CD32";
        }
        this.player.weaponIndex = weaponIndex;  // Add random weapon
        //[this.player.x, this.player.y] = this.game.chooseSpawnPoint(this.player.radius);
        this.player.x = this.spawn_x;
        this.player.y = this.spawn_y;
        this.game.insertEntity(this.player);

        // Reset spawn timer
        this.spawnTimer = 2 + Math.random() * 4;
        this.retargetTimer = 0;
        this.target = null;
        this.targetPos = {x:0,y:0}
        var targetPos = this.game.chooseSpawnPoint(this.player.radius);
        this.targetPos = this.targetPos

        this.lastLived = true;
    }

    seekTarget() {
        if (!this.player) return;

        // Find the closest player within range
        let closestDistance = null;
        let closestPlayer = null;
        this.game.queryCircle(this.player.x, this.player.y, config.viewDistanceX / 4, entity => {
            // Validate player
            if (!entity.isPlayer || entity.id === this.player.id) return;

            // Validate it's a client (comment this out to allow bots to fight each other)
            if (!entity.clientHandle) return;
            // Check if closer
            let dist = utils.dist(entity.x, entity.y, this.player.x, this.player.y);
            if (closestDistance == null || dist < closestDistance) {
                closestDistance = dist;
                closestPlayer = entity;
            }
        });

        //closestPlayer = null;

        // Set the target
        this.target = closestPlayer;
        this.retargetTimer = 8;
        this.targetPos = {x:0,y:0}
        if (!this.target){
            [this.targetPos.x, this.targetPos.y] = this.game.chooseSpawnPoint(this.player.radius);
        }
    }

    chaseNShoot(){
        // Turn towards target
        let targetDir = -Math.atan2(this.target.y - this.player.y, this.target.x - this.player.x);
        this.player.targetRot += utils.turnDir(this.player.targetRot, targetDir) * Math.PI * 0.1;

        // Move towards target
        let dist = utils.dist(this.player.x, this.player.y, this.target.x, this.target.y);
        let dirDiff = utils.dirDiff(this.player.rot, targetDir);
        let moveDir = -this.player.targetRot;  // Move in a straight line
        if (dist > 300) {
            this.player.moveDir = moveDir;
            this.player.moveSpeed = 0.7;
        } else if (dist < 250) {
            this.player.moveDir = moveDir + Math.PI;
            this.player.moveSpeed = 0.7;
        } else {
            this.player.moveSpeed = 0
        }

        // Determine if to fire if visible and aiming correctly
        this.player.firing = dist < config.viewportHeight * 0.75 && Math.abs(dirDiff) < Math.PI * 0.1;

        // Move away from planet if needed
        if (this.player.overlappingPlanet) {
            let planet = this.player.overlappingPlanet;
            this.player.targetRot = -Math.atan2(this.player.y - planet.y, this.player.x - planet.x);
            this.player.moveDir = Math.atan2(this.player.y - this.player.overlappingPlanet.y, this.player.x - this.player.overlappingPlanet.x);
            this.player.moveSpeed = 0.4;
        }
    }

    chaseNBite(){
        // Turn towards target
        let targetDir = -Math.atan2(this.target.y - this.player.y, this.target.x - this.player.x);
        this.player.targetRot += utils.turnDir(this.player.targetRot, targetDir) * Math.PI * 0.4;

        // Move towards target
        let dist = utils.dist(this.player.x, this.player.y, this.target.x, this.target.y);
        let dirDiff = utils.dirDiff(this.player.rot*3, targetDir);
        let moveDir = -this.player.targetRot;  // Move in a straight line
        this.player.moveDir = moveDir;
        this.player.moveSpeed = 1;

        // Determine if to fire if visible and aiming correctly
        
        // Move away from planet if needed
        /*if (this.player.overlappingPlanet) {
            let planet = this.player.overlappingPlanet;
            this.player.targetRot = -Math.atan2(this.player.y - planet.y, this.player.x - planet.x);
            this.player.moveDir = Math.atan2(this.player.y - this.player.overlappingPlanet.y, this.player.x - this.player.overlappingPlanet.x);
            this.player.moveSpeed = 1;
        }*/
    }

    update(dt) {
        if (this.player && !this.player.destroyed) {
            // Retarget if needed
            this.retargetTimer = Math.max(this.retargetTimer - dt, 0);
            if (this.retargetTimer <= 0 || !this.target || this.target.destroyed) {
                this.seekTarget();
            }

            // Make sure the target exists
            if (!this.target) {
                if (this.player.overlappingPlanet) {
                    let planet = this.player.overlappingPlanet;
                    this.player.targetRot = -Math.atan2(this.player.y - planet.y, this.player.x - planet.x);
                    this.player.moveDir = Math.atan2(this.player.y - this.player.overlappingPlanet.y, this.player.x - this.player.overlappingPlanet.x);
                    this.player.moveSpeed = 1;
                    return;
                }
                let targetDir = -Math.atan2(this.targetPos.y - this.player.y, this.targetPos.x - this.player.x);
                this.player.targetRot += utils.turnDir(this.player.targetRot, targetDir) * Math.PI * 0.1;
                let dist = utils.dist(this.player.x, this.player.y, this.targetPos.x, this.targetPos.y);
                let dirDiff = utils.dirDiff(this.player.rot, targetDir);
                let moveDir = -this.player.targetRot;  // Move in a straight line
                if (dist > 300) {
                    this.player.moveDir = moveDir;
                    this.player.moveSpeed = 1;
                } else if (dist < 250) {
                    this.player.moveDir = moveDir + Math.PI;
                    this.player.moveSpeed = 1;
                } else {
                    this.player.moveSpeed = 0
                }
                /*this.player.moveDir = 0;
                this.player.moveSpeed = 0;
                this.player.firing = false;
                this.player.sprinting = false;*/
                return;
            }
            if (this.doShoot > 0.7)
                this.chaseNShoot();
            else
                this.chaseNBite()
            
        } else {
            if (this.lastLived){
                
                this.game.zombies --;
                this.lastLived = false;
            }
            
            // Spawn if needed
            this.spawnTimer = 2//Math.max(this.spawnTimer - dt, 0);
            if (this.spawnTimer <= 0) {
                this.spawn();
            }
            
        }
    }
}

module.exports = BotHandle;
