# heavens-above

[![Build Status](https://travis-ci.org/littlepiggy03/heavens-above.svg?branch=master)](https://travis-ci.org/littlepiggy03/heavens-above) [![Codecov](https://codecov.io/gh/littlepiggy03/heavens-above/branch/master/graph/badge.svg)](https://codecov.io/gh/littlepiggy03/heavens-above) [![Greenkeeper badge](https://badges.greenkeeper.io/littlepiggy03/heavens-above.svg)](https://greenkeeper.io/) [![npm](https://img.shields.io/npm/v/heavens-above.svg)](https://www.npmjs.com/package/heavens-above) [![license](https://img.shields.io/github/license/littlepiggy03/heavens-above.svg)](https://github.com/littlepiggy03/heavens-above/blob/master/LICENSE)

An unofficial package to get data on [www.heavens-above.com](https://www.heavens-above.com) with TypeScript.

## Installing

```shell
npm i heavens-above
```

## Example

```typescript
const { HeavensAbove } = require("heavens-above");
// import HeavensAbove from "heavens-above";
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
```

[More example](https://github.com/littlepiggy03/heavens-above/tree/master/example)

## API

- [Core API](./core)

- [Interfaces](./interface)

- [Daily Passing Prediction API](./daily-prediction)

- [Sun API](./sun)

- [Moon API](./moon)
