const { HeavensAbove } = require("..");
const fs = require("fs");

const ha = new HeavensAbove({
    latitude: 40,
    longtitude: 116,
    elevation: 50
});

(async () => {
    const data = await ha.getMoonInfo();
    fs.writeFileSync("moon.json", JSON.stringify(data, undefined, 2));
})();
