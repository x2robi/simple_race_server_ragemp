const RaceLap = require("configs/raceLap.js");
const Race = require("classes/race.js");
const Checkpoint = require("classes/checkpoint.js");
const TopManager = require("managers/topManager.js");
const Utils = require("utils.js");

const player = mp.players.local;

class RaceManager {
    VEHICLE = "turismor";

    active = false;
    race = undefined;
    checkpoint = undefined;

    start() {
        const startPos = RaceLap[0];
        const nextPos = RaceLap[1];

        Utils.setPos(startPos);

        this.race = new Race();
        this.race.start(startPos, this.VEHICLE);
        this.setCheckpoint(nextPos, 0);
        this.active = true;

        mp.events.add("render", this.render.bind(this));
    }

    stop() {
        this.active = false;
        mp.events.remove("render", this.render.bind(this));
    }

    setCheckpoint(pos, type) {
        this.checkpoint = new Checkpoint(pos, type);
    }

    reachCheckpoint() {
        let nextCheckpoint = RaceLap[this.race.checkpoint + 1];

        if (nextCheckpoint) {
            this.race.checkpoint += 1;

            this.setCheckpoint(nextCheckpoint, this.race.checkpoint === RaceLap.length - 1 ? 1 : 0);
        } else {
            this.race.checkpoint = 0;

            this.race.finishLap();

            const lastLap = this.race.getLastLap();

            TopManager.addLap(lastLap);

            mp.gui.chat.push(`Круг занял ${Utils.formatTime(lastLap[1] - lastLap[0])} времени!`)

            this.race.startLap();
        }
    }

    render() {
        this.checkpoint.render();

        if (this.checkpoint.isVectorInRadius(player.position)) {
            this.reachCheckpoint();
        }
    }
}

exports = new RaceManager();