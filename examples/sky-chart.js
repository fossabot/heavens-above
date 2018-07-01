const { HeavensAbove } = require("..");
const fs = require("fs");

const HA = new HeavensAbove({
    latitude: 40,
    longtitude: 116,
    elevation: 50
});

(async () => {
    const skyChartURL = await HA.getSkyChartURL();
    const skyChart = await HA.getImageStream(skyChartURL);
    skyChart.pipe(fs.createWriteStream("sky-chart.png"));
})();
