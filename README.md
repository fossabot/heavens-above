# heavens-above

[![Build Status](https://travis-ci.org/littlepiggy03/heavens-above.svg?branch=master)](https://travis-ci.org/littlepiggy03/heavens-above)
[![Codecov](https://codecov.io/gh/littlepiggy03/heavens-above/branch/master/graph/badge.svg)](https://codecov.io/gh/littlepiggy03/heavens-above)

An unofficial package to get data on [www.heavens-above.com](http://www.heavens-above.com) with TypeScript.

## Installing

```shell
npm i heavens-above
```

## Example

```typescript
const { HeavensAbove } = require("heavens-above");
// import HeavensAbove from "heavens-above";
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
```

## API

> `#T` means all properties of `T` is optional (can be [`undefined`][undefined]).

### HeavensAbove

The HeavensAbove class.

#### new HeavensAbove([config])

Create a HeavensAbove with an optional default config.

- `config`: #[`<HAConfig>`](#haconfig) The default config to use in each API. **Default:** `{}`

#### .setConfig(config)

Set default configs in batch.

- `config`: #[`<HAConfig>`](#haconfig) A pack of config.

#### .latitude

- [`<number>`][number] Latitude of the default observation location (in degrees). **Default:** `0`

#### .longtitude

- [`<number>`][number] Longtitude of the default observation location (in degrees). **Default:** `0`

#### .elevation

- [`<number>`][number] Elevation of the default observation location (in degrees). **Default:** `0`

#### .language

- [`<string>`][string] ID of the default language. Only useful in specific APIs. **Default:** `"en"`

#### .getLanguageList()

Get avaliable language list.

- Returns: [`<Promise>`][promise]

    - Resolves: [`<HALanguage[]>`](#halanguage) List of Avaliable languages.

#### .getImageStream(url)

Get png image stream from url.

- `url`: [`<string>`][string] URL of the image.

- Returns: [`<Promise>`][promise]

    - Resolves: [`<Readable>`][readable] PNG image stream from url.

#### .getSkyChartURL([config])

Get sky chart image URL from config.

- `config`: [`<HASkyChartConfig>`](#haskychartconfig) Config of the sky chart. **Default:** `{}`

- Returns: [`<Promise>`][promise]

    - Resolves: [`<string>`][string] Sky chart image URL.

### Interfaces

#### HAConfig

Base config

- `latitude`: [`<number>`][number] Latitude of the observation location (in degrees). **Default:** `0`

- `longtitude`: [`<number>`][number] Longitude of the observation location (in degrees). **Default:** `0`

- `elevation`: [`<number>`][number] Elevation of the observation location (in meters). **Default:** `0`

- `language`: [`<string>`][string] ID of the selected language. Only useful in specific APIs. **Default:** `"en"`

#### HASkyChartConfig

Configs related to sky chart.

- Every properties in [`<HAConfig>`](#haconfig)

- `time`: [`<Date>`][date] Observation time (accurate to minute). **Default:** `new Date()`

- `constellationLines`: [`<boolean>`][boolean] Display constellation lines. **Default:** `true`

- `constellationNames`: [`<boolean>`][boolean] Display constellation names. **Default:** `true`

- `constellationBoundaries`: [`<boolean>`][boolean] Display constellation boundaries. **Default:** `false`

- `eclipticPlane`: [`<boolean>`][boolean] Display ecliptic plane. **Default:** `false`

- `colored`: [`<boolean>`][boolean] Display colored sky chart instead of black and white. **Default:** `true`

- `size`: [`<number>`][number] The size of the sky chart (in pixels, from 500 to 1600). **Default:** `800`

#### HALanguage

An available language.

- `id`: [`<string>`][string] ID of the language

- `name`: [`<string>`][string] Name of the Language

[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type

[readable]: https://nodejs.org/api/stream.html#stream_readable_streams
