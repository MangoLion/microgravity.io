const Structure = require("./Structure");
const config = require("../../config/config");

class FortifiedCity extends Structure {
    get customText() { return `${Math.floor(this.citizens)} citizens`; }

    constructor(game) {
        super(game);
        this.isCity = true;

        this.radius = 60;
        this.health = 11.0;

        this.citizens = 75;
        this.growthRate = 0;  // Citizens per second

        this.pointInterval = 0.75;
        this.pointTimer = this.pointInterval;
    }

    update(dt) {
        if (config.isServer && this.isConstructed) {
            // Increase citizens
            this.citizens += this.growthRate * dt;

            // Reward points
            this.pointTimer -= dt;
            if (this.pointTimer <= 0) {
                // Reset timer
                this.pointTimer = this.pointInterval;

                // Give points
                this.clientOwner.awardPoints(config.pointRewardTypes.CITY, config.pointRewards.CITY_PER_SECOND);
            }
        }

        super.update(dt);
    }

    render(ctx) {
        super.render(ctx);

        this.drawImage(ctx);

        super.postRender(ctx);
    }
}
FortifiedCity.addSyncKeys(
    { key: "citizens", type: "int", update: true, sendMap: v => Math.floor(v) }
);

module.exports = FortifiedCity;
