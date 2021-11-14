const player = mp.players.local;

class Utils {
    async setVehicle(model, pos, dim, color = [[0, 0, 0], [0, 0, 0]]) {
        const vehicle = mp.vehicles.new(mp.game.joaat(model), pos, {
            color: color,
            dimension: dim
        });

        while (!vehicle) {
            await mp.game.waitAsync(0);
        }

        while (!player.vehicle || player.vehicle.handle !== vehicle.handle) {
            player.setIntoVehicle(vehicle.handle, -1);
            await mp.game.waitAsync(0);
        }

        return Promise.resolve(vehicle);
    }

    setPos(pos) {
        player.setCoords(pos.x, pos.y, pos.z, false, false, false, false);
    }

    calcDist(v1, v2) {
        const x = Math.pow((v2.x - v1.x), 2);
        const y = Math.pow((v2.y - v1.y), 2);
        const z = Math.pow((v2.z - v1.z), 2);
        const sqrt = Math.sqrt(x + y + z);

        return Math.abs(sqrt);
    }

    formatTime(diffTime) {
        const diffDate = new Date(diffTime);

        const hour = diffDate.getUTCHours();
        const minutes = diffDate.getUTCMinutes();
        const seconds = diffDate.getUTCSeconds();

        return `${hour < 10 ? "0" + hour : hour}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
}

exports = new Utils();