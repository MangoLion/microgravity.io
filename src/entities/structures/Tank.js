const Structure = require("./Structure");
const config = require("../../config/config");
const BotHandle = require("../../server/BotHandle");
const Satellite = require("./Satellite");
const Bullet = require("../Bullet");
const utils = require("../../utils");
const weapons = require("../../config/weapons");
const bullets = require("../../config/bullets");

class Heli extends Satellite {
    constructor(game) {
        super(game);

        this.radius = 70;
        this.health = 6;
        this.speed = 100;
        this.orbitDist = -240;
        this.stayBack = true;
        this.stayBackDist = 200;

        this.shootCounter = 0;
        this.shot = 0;

        this.srcObj = { x: 0, y: 0 };  // Used for `utils.intercept`
        this.dstObj = { x: 0, y: 0, vx: 0, vy: 0 };  // Same as above
    }

    

    get weapon() {
        return weapons.weaponForId("tank-shot")
    }

    get weapon2() {
        return weapons.weaponForId("machine-gun")
    }

    update(dt){
        this.shootCounter ++;
        
        this.retargetTimer = Math.max(this.retargetTimer - dt, 0);
        
        if (this.target && this.game.updateIndex % 7 == 0 && config.isServer){
            // Configure source
            this.srcObj.x = 0;
            this.srcObj.y = 0;

            // Configure destination
            this.dstObj.x = this.target.x - this.x + Math.random()*50 - Math.random()*50;
            this.dstObj.y = this.target.y - this.y + Math.random()*50 - Math.random()*50;
            this.dstObj.vx = this.target.velX;
            this.dstObj.vy = this.target.velY;
            
            // Get the bullet speed
            let bullet = bullets.bullets[bullets.bullets.findIndex(b => b.id === this.weapon2.bulletId)];
            let bulletSpeed = bullet.bulletSpeed;
            bulletSpeed *= 0.9;  // Over-shoot the bullet to be more accurate

            // Override for missile, since it uses an acceleration; this value is manually chosen
            if (bullet.id === "missile"||bullet.id === "rocket") {
                bulletSpeed = 850;
            }

            // let aimDir = -Math.atan2(this.target.y - this.y, this.target.x - this.x);
            let aimDir = utils.intercept(this.srcObj, this.dstObj, bulletSpeed);
            if (aimDir != null) aimDir = -aimDir;  // Negate it because... yeah


            this.aimDir = aimDir;// Math.atan2(this.target.y-this.y, this.target.x -this.x);
            bullet = this.game.fireWeapon(this.weapon2, this, 0);
            if (bullet){
                bullet.jumpsWalls = true;
                bullet.ignoreGravity = true;
            }
        }
        
        if (this.target && this.game.updateIndex % 20 == 0 && config.isServer){
            this.shot ++;

            // Configure source
            this.srcObj.x = 0;
            this.srcObj.y = 0;

            // Configure destination
            this.dstObj.x = this.target.x - this.x;
            this.dstObj.y = this.target.y - this.y;
            this.dstObj.vx = this.target.velX;
            this.dstObj.vy = this.target.velY;
            
            // Get the bullet speed
            let bullet = bullets.bullets[bullets.bullets.findIndex(b => b.id === this.weapon.bulletId)];
            let bulletSpeed = bullet.bulletSpeed;
            bulletSpeed *= 0.9;  // Over-shoot the bullet to be more accurate

            // Override for missile, since it uses an acceleration; this value is manually chosen
            if (bullet.id === "missile"||bullet.id === "rocket") {
                bulletSpeed = 850;
            }

            // let aimDir = -Math.atan2(this.target.y - this.y, this.target.x - this.x);
            let aimDir = utils.intercept(this.srcObj, this.dstObj, bulletSpeed);
            if (aimDir != null) aimDir = -aimDir;  // Negate it because... yeah


            this.aimDir = aimDir;// Math.atan2(this.target.y-this.y, this.target.x -this.x);
            bullet = this.game.fireWeapon(this.weapon, this, 0);
            if (bullet){
                bullet.jumpsWalls = true;
                bullet.ignoreGravity = true;
            }
        }
        super.update(dt);
    }

}

module.exports = Heli;
