const RaceManager = require("managers/raceManager.js");
const TopManager = require("managers/topManager.js");

class CommandManager {
    constructor() {
        mp.events.add("playerCommand", this.playerCommand.bind(this));
    }

    playerCommand(command) {
        const args = command.split(/[ ]+/);
        const cmd = args.splice(0, 1)[0];

        if (cmd === "race") {
            switch (args[0]) {
                case "start":
                    mp.gui.chat.push(`Гонка началась`)
                    RaceManager.start()
                    break;
                case "stop":
                    if (!RaceManager.active) {
                        mp.gui.chat.push(`Гонка не начата`);
                        break;
                    }

                    mp.gui.chat.push(`Гонка закончилась`)
                    RaceManager.stop()
                    break;
                case "top":
                    const topType = args[1];

                    if (!RaceManager.active) {
                        mp.gui.chat.push(`Гонка не начата`);
                        break;
                    }

                    TopManager.getTop(topType === "hot" ? 1 : 0, 10).forEach((e, i) => {
                        mp.gui.chat.push(`Топ ${i}`)
                    })
                    break;
                case "clear":
                    const clearType = args[1];

                    TopManager.clearTop(clearType === "hot" ? 1 : 0);


                    break;
                case "restart":
                    mp.gui.chat.push(`Гонка перезапустилась`)

                    RaceManager.stop();
                    RaceManager.start();
                    break;
            }
        }
    }
}

new CommandManager();