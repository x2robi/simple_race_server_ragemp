const Utils = require("utils.js");

const player = mp.players.local;

exports = class Race {
    vehicle;

    checkpoint = 0;
    lap = 0;
    lapHistory = [];

    async start(pos, vehicleName) {
        const vehicle = await Utils.setVehicle(vehicleName, pos, player.dimension);

        this.startLap();
    }

    setCheckpoint(id) {
        this.checkpoint = id;
    }

    startLap() {
        this.lap += 1;
        this.lapHistory.push([Date.now()]);
    }

    finishLap() {
        const currentLap = this.getLastLap();

        currentLap.push(Date.now());
        currentLap.push(Date.now());
    }

    getLastLap() {
        return this.lapHistory[this.lapHistory.length - 1]; // .at(-1) dont work
    }
}