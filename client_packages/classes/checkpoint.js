const Utils = require("utils.js");

exports = class Checkpoint {
    pos;
    type;
    radius;
    color;

    constructor(pos, type = 0, radius = 10, color = [255, 0, 0, 150]) {
        this.pos = pos;
        this.type = type;
        this.radius = radius;
        this.color = color;
    }

    isVectorInRadius(pos) {
        return Utils.calcDist(this.pos, pos) < this.radius;
    }

    render() {
        mp.game1.graphics.drawMarker(
            1,
            this.pos.x, this.pos.y, this.pos.z - 2.5,
            0, 0, 0,
            0, 0, 0,
            this.radius, this.radius, this.radius,
            this.color[0], this.color[1], this.color[2], this.color[3],
            false, false, 2,
            false, "", "", false
        );

        if (this.type === 1) {
            mp.game1.graphics.drawMarker(
                4,
                this.pos.x, this.pos.y, this.pos.z + 5,
                0, 0, 0,
                0, 0, 0,
                this.radius, this.radius, this.radius,
                this.color[0], this.color[1], this.color[2], this.color[3],
                false, false, 2,
                false, "", "", false
            );
        }
    }
}