const { HeavensAbove } = require("..");
const fs = require("fs");

const ha = new HeavensAbove({
    latitude: 40,
    longtitude: 116,
    elevation: 50
});

(async () => {
    const data = await ha.getSunInfo();
    fs.writeFileSync("sun.json", JSON.stringify(data, undefined, 2));
})();
