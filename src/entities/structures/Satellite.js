const Structure = require("./Structure");
const config = require("../../config/config");
const Vehicle = require("./Vehicle");
const utils = require("../../utils");

class Satellite extends Vehicle {
    constructor(game) {
        super(game);
        this.isVehicle = true
        this.radius = 10;
        this.health = 2.5;
        this.speed = 750;
        this.orbitDist = 100;

        this.direction = 0; //left
        
        this.aimDir = 0;
        this.constructionTimer = 0;
        this.planetDist = -1;
        this.stayBack = false;
        this.stayBackDist = 0;
    }

    seekTarget() {
        if (!config.isServer) return;
        
        // Find the closest player within range
        let closestDistance = null;
        let closestPlayer = null;
        
        this.game.queryCircle(this.x, this.y, config.viewDistanceX / 3, entity => {
            // Validate player
            if ((entity.isPlayer && !entity.isFriendlyClientId(this.clientOwnerId))
                || (entity.isStructure && 
                        ((entity.clientOwner && !entity.clientOwner.isFriendly(this.clientOwnerId))
                        || !entity.clientOwner))
                ){//|| entity.isAsteroid){
                let dist = utils.dist(entity.x, entity.y, this.x, this.y);
                if (closestDistance == null || dist < closestDistance) {
                    closestDistance = dist;
                    closestPlayer = entity;
                    //console.log("FOUND")
                }
            }
            /*
            // Validate it's a client (comment this out to allow bots to fight each other)
            if (!entity.clientHandle) return;
            // Check if closer
            let dist = utils.dist(entity.x, entity.y, this.player.x, this.player.y);
            if (closestDistance == null || dist < closestDistance) {
                closestDistance = dist;
                closestPlayer = entity;
            }*/
        });

        //closestPlayer = null;

        // Set the target
        this.target = closestPlayer;
        this.retargetTimer = 8;
    }

    update(dt) {
        if (config.isServer){
        if (/*this.retargetTimer <= 0*/ this.game.updateIndex % 8 || !this.target || this.target.destroyed) {
            this.seekTarget();
        }
        
        if (!this.planet){
            this.game.queryCircle(this.x, this.y, 100, entity => {
                if (entity.isPlanet) this.planet = entity;
            });
            if (!this.planet)
                return;
        }
        var planet = this.planet;
        

        var rot2 = Math.atan2(this.y - planet.y, this.x - planet.x);
        
        let dir = rot2+1.5708 ;
        this.rot = (rot2+1.5708*3)*-1//rot2*-1;
        this.aimDir = this.rot;
        if (!this.direction){
            dir += 1.5708*2;
        }
        var move_x = this.speed * Math.cos(dir) ;
        var move_y = this.speed * Math.sin(dir) ;
        var move_x2 = this.speed * Math.cos(dir+1.5708*2) ;
        var move_y2 = this.speed * Math.sin(dir+1.5708*2) ;
        var sign = 1;
        if (this.stayBack && this.target && !this.target.destroyed){
            var nextX = this.x + move_x;
            var nextY = this.y + move_y;
            var tx = nextX - this.target.x;
            var ty = nextY - this.target.y;
            var nextDistToTarget = Math.sqrt(tx*tx + ty*ty)
            nextX = this.x + move_x2;
            nextY = this.y + move_y2;
            tx = nextX - this.target.x;
            ty = nextY - this.target.y;
            var backDistToTarget = Math.sqrt(tx*tx + ty*ty)
            if ((nextDistToTarget > this.stayBackDist && nextDistToTarget > backDistToTarget) ||
                (nextDistToTarget < this.stayBackDist && nextDistToTarget < backDistToTarget)){
                sign = -1;
            }
            
        }
        if(sign == -1){
            move_x = move_x2;
            move_y = move_y2;
        }

        this.setVelocity(move_x, move_y)

        if (this.game.updateIndex % 10 == 0) {
            var vx = (this.x-planet.x);
            var vy = (this.y-planet.y);
           // if (config.isServer)
            var dist = Math.sqrt(vx*vx + vy*vy)
            if (dist > this.orbitDist + planet.radius){
                var move_down = 100//dist - (this.orbitDist + planet.radius);
                move_x = move_down  * Math.cos(dir-1.5708);
                move_y = move_down  * Math.sin(dir-1.5708);
                //this.x += move_x;
                //this.y += move_y;
                this.addVelocity(move_x, move_y)
            }

        }}
        super.update(dt);
    }

    render(ctx) {
        super.render(ctx);

        this.drawImage(ctx);

        super.postRender(ctx);
    }
}

module.exports = Satellite;
