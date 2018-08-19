const { HeavensAbove } = require("..");
const fs = require("fs");

const ha = new HeavensAbove({
    latitude: 40,
    longtitude: 116,
    elevation: 50
});

(async () => {
    const skyChartURL = await ha.getSkyChartURL();
    const skyChart = await ha.getImageStream(skyChartURL);
    skyChart.pipe(fs.createWriteStream("sky-chart.png"));
})();
