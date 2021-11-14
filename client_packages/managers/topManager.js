class TopManager {
    hotHistory = [];
    coldHistory = [];

    addLap(data) {
        this[data[2] === 0 ? "coldHistory" : "hotHistory"].push(data.slice(0, -1));
    }

    getTop(type, limit) {
        const top = this[type === 0 ? "coldHistory" : "hotHistory"].slice(0, -1);

        top.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));

        return top.slice(-limit);
    }

    clearTop(type) {
        this[type === 0 ? "coldHistory" : "hotHistory"] = [];
    }
}

exports = new TopManager();