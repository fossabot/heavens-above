const { HeavensAbove } = require("..");
const fs = require("fs");

const HA = new HeavensAbove({
    latitude: 40,
    longtitude: 116,
    elevation: 50
});

(async () => {
    const data = await HA.getSunInfo();
    fs.writeFileSync("sun.json", JSON.stringify(data, undefined, 2));
})();
