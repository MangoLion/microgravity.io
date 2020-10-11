const config = require("../../config/config");
const Structure = require("./Structure");

class Vehicle extends Structure {
    constructor(game) {
        super(game);
        this.parentFactory = null;
        this.clientOwnerId = null;
        this.isStructure = false;
        this.anchor = false;
    }

    onDestroy() {
        super.onDestroy();
        // Spawn explosion
        if (config.isServer) {
            if (this.parentFactory){
                this.parentFactory.fielded --;
            }
        }
    }
}

module.exports = Vehicle;
