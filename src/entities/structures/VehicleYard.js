const Structure = require("./Structure");
const config = require("../../config/config");
const vehicles = require("../../config/vehicles");
const WorkingStructure = require("./WorkingStructure");
const utils = require("../../utils");
class VehicleYard extends WorkingStructure {
    get vehicle() { return vehicles.vehicles[this.structure.vehicleIndex]; }

    get costs() { return this.vehicle.cost || [0, 0, 0]; }

    get maxCount() { return this.vehicle.maxStock; }

    constructor(game) {
        
        super(game);
        //his.generationRate = 10;
        //this.laborDemand = 75;
        this.radius = 96;
        this.health = 8.0;
        this.depositedResources = [0, 0, 0];
        this.isVehicleYard = true;
        this.fielded = 0;
        /*this.customActions = [
            {
                name:"Build A",
                costs:[0,0,0],
                type:"BUILD",
                data:"A"
            },
            {
                name:"Build B",
                message: "Build B",
                costs:[0,0,0],
                type:"BUILD",
                data:"B"
            }
        ]*/
    }
    onGenerate(count) {
        // Remove resources
        for (let i = 0; i < this.depositedResources.length; i++) {
            this.depositedResources[i] -= count * this.costs[i];
        }

        if (this.fielded < this.vehicle.maxFielded && this.count > 1){
            this.count --;
            this.fielded ++;
            if (config.isServer){
                var vehicle = this.vehicle.create(this);
                
                vehicle.parentFactory = this;
                vehicle.clientOwnerId = this.clientOwnerId
                vehicle.clientOwner = this.clientOwner
                this.game.insertEntity(vehicle);
            }
        }
    }

    get generationSupply() {
        let minSupply = -1;
        for (let i = 0; i < this.costs.length; i++) {
            let supply = -1;

            // Get the supply requirement
            let resourceRequirement = this.costs[i];
            if (resourceRequirement !== 0) {
                supply = this.depositedResources[i] / resourceRequirement;
            }

            // Determine if it's a limiting factory
            if (supply !== -1 && (minSupply === -1 || supply < minSupply)) {
                minSupply = supply;
            }
        }

        return minSupply;
    }

    get generationRate() { return this.vehicle.generationRate || 1; }

    get laborDemand() { return 75}//return this.laborDemand || 1; }

    get maxCount() { return 2; }

    executeAction(type, data){
        console.log(type)
        console.log(data)
    }

    onCollision(entity, dt) {
        // Handle player colliding
        if (entity.isPlayer) {
            entity.visitingStructure = this;
        }

        super.onCollision(entity, dt);
    
    }

    onKilled(killer) {
        let client = utils.clientOwner(killer);
        if (client) {
            // Give client resources
            for (let i = 0; i < this.depositedResources.length; i++) {
                client.giveResources(i, this.depositedResources[i] * config.mineAndFactoryTransferOnDeath);
            }

            // Give client weapons
            client.giveAmmo(this.structure.weaponIndex, this.count * config.mineAndFactoryTransferOnDeath);
        }

        super.onKilled(killer);
    }

    
    render(ctx) {
        super.render(ctx);

        this.drawImage(ctx);

        super.postRender(ctx);
    }
}
VehicleYard.addSyncKeys(
    { key: "depositedResources", type: "int[]", update: true, sendMap: v => v.map(r => Math.floor(r)) },
    { key: "fielded", type: "int", update: true}
);
module.exports = VehicleYard;
