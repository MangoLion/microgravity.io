const Structure = require("./Structure");
const config = require("../../config/config");
const BotHandle = require("../../server/BotHandle");
class LaunchPad extends Structure {
    constructor(game) {
        super(game);

        this.radius = 96;
        this.health = 8.0;
    }
    update(dt) {
        super.update(dt);
        if (config.isServer){
            if (!this.game.zombies)
                this.game.zombies = 0
            if (this.game.updateIndex % 30 == 0 && Math.random()>0.9 && this.game.zombies < 100){
                //console.log("CREATING BOT")
                this.game.zombies++;
                var bot = new BotHandle(this.game);
                bot.spawn_x = this.x;
                bot.spawn_y = this.y;
                this.game.bots.push(bot);
            }
        }
    }

    render(ctx) {
        super.render(ctx);

        this.drawImage(ctx);

        super.postRender(ctx);
    }
}

module.exports = LaunchPad;
