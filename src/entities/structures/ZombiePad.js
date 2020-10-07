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
        if (!this.game.zombies)
            this.game.zombies = 0
        if (this.game.updateIndex % 30 == 0 && Math.random()>0.8 && this.game.zombies < 100){
            //console.log("CREATING BOT")
            this.game.zombies++;
            var bot = new BotHandle(this.game);
            bot.x = this.x;
            bot.y = this.y;
            this.game.bots.push(bot);
        }
    }

    render(ctx) {
        super.render(ctx);

        this.drawImage(ctx);

        super.postRender(ctx);
    }
}

module.exports = LaunchPad;
