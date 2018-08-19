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

[More example](https://github.com/littlepiggy03/heavens-above/tree/master/example)

## API

> `<SomeType>`<sub>(partial)</sub> means all properties of `SomeType` is optional (can be [`undefined`][undefined]),
> like `Partial<SomeType>` in TypeScript. This descriptor is usually used for config types.

### Core API

#### Class: HeavensAbove

The HeavensAbove class.

#### new HeavensAbove([config])

Create a HeavensAbove instance with an optional default config.

- `config`: [`<HAConfig>`<sub>(partial)</sub>](#config) Default config for each API. **Default:** `{}`

```typescript
new HeavensAbove();

new HeavensAbove({
    latitude: 40,
    longtitude: 116,
    elevation: 50
});
```

#### .setConfig(config)

Set default config.

- `config`: [`<HAConfig>`<sub>(partial)</sub>](#config) New default config.

```typescript
HA.setConfig({
    latitude: 40,
    longtitude: 116,
    elevation: 50
});
```

#### .latitude

- [`<number>`][number] Latitude of the default observation location (degree). **Default:** `0`

```typescript
HA.latitude = 40;
```

#### .longtitude

- [`<number>`][number] Longtitude of the default observation location (degree). **Default:** `0`

```typescript
HA.longtitude = 116;
```

#### .elevation

- [`<number>`][number] Elevation of the default observation location (meter). **Default:** `0`

```typescript
HA.elevation = 50;
```

#### .getImageStream(url)

Get PNG image stream from url.

- `url`: [`<string>`][string] URL of the image.

- Returns: [`<Promise>`][promise]

    - Resolves: [`<Readable>`][readable] PNG image stream from url.

```typescript
const fs = require("fs");
const image = await HA.getImageStream("/image-url-returned-by-other-api");
image.pipe(fs.createWriteStream("image.png"));
```

#### <a id="ra"></a> Interface: HARightAscension

Describes right ascension.

- `hour`: [`<number>`][number] Hour part of the right ascension.

- `minute`: [`<number>`][number] Minute part of the right ascension.

- `second`: [`<number>`][number] Second part of the right ascension.

#### <a id="declination"></a> Interface: HADeclination

Describes declination.

- `degree`: [`<number>`][number] Degree part of the declination.

- `minute`: [`<number>`][number] Minute part of the declination.

- `second`: [`<number>`][number] Second part of the declination.

#### <a id="config"></a> Interface: HAConfig

Base config including observation location params.

- `latitude`: [`<number>`][number] Latitude of the observation location (degree). **Default:** `0`

- `longtitude`: [`<number>`][number] Longitude of the observation location (degree). **Default:** `0`

- `elevation`: [`<number>`][number] Elevation of the observation location (meter). **Default:** `0`

```typescript
{
    latitude: 40,
    longtitude: 116,
    elevation: 50
}
```

#### <a id="time-config"></a> Interface: HATimeConfig

Config including observation time.

- Every properties in [`<HAConfig>`](#config)

- `time`: [`<Date>`][date] Observation time. **Default:** `new Date()`

```typescript
{
    ...HAConfig,
    time: new Date()
}
```

#### <a id="event"></a> Interface: HAEvent

Basic event including name and time.

- `name`: [`<string>`][string] Name of the event.

- `time`: [`<Date>`][date] Time of the event.

#### <a id="distance-event"></a> Interface: HADistanceEvent

Event including distance.

- Every properties in [`<HAEvent>`](#event)

- `distance`: [`<number>`][number] Distance of the event (km).

#### <a id="position"></a> Interface: HAPosition

Basic position including altitude and azimuth.

- `altitude`: [`<number>`][number] Altitude of the position (degree).

- `azimuth`: [`<number>`][number] Azimuth of the position (degree).

#### <a id="ex-position"></a> Interface: HAExPosition

Position including more data.

- Every properties in [`<HAEvent>`](#event)

- `rightAscension`: [`<HARightAscension>`](#ra) Right ascension of the position.

- `declination`: [`<HADeclination>`](#declination) Declination of the position.

- `range`: [`<number>`][number] Range (distance) of the position (in AU if not specified).

- `constellation`: [`<string>`][string] The constellation which the position belongs to.

#### <a id="position-event"></a> Interface: HAPositionEvent

Event including position.

- Every properties in [`<HAEvent>`](#event)

- Every properties in [`<HAPosition>`](#position)

#### <a id="fuzzy-azimuth"></a> Type: FuzzyAzimuth

Fuzzy azimuth. One of `"N"`, `"NNE"`, `"NE"`, `"ENE"`, `"E"`, `"ESE"`, `"SE"`, `"SSE"`, `"S"`, `"SSW"`, `"SW"`, `"WSW"`, `"W"`, `"WNW"`, `"NW"`, `"NNW"`

#### <a id="fuzzy-position"></a> Interface: HAFuzzyPosition

Basic position including altitude and azimuth.

- `altitude`: [`<number>`][number] Altitude of the position (degree).

- `azimuth`: [`<FuzzyAzimuth>`](#fuzzy-azimuth) Azimuth of the position (degree).

#### <a id="fuzzy-event"></a> Interface: HAFuzzyEvent

Event including fuzzy position.

- Every properties in [`<HAEvent>`](#event)

- Every properties in [`<HAFuzzyPosition>`](#fuzzy-position)

### Sky Chart API

#### .getSkyChartURL([config])

Get sky chart URL by config.

- `config`: [`<HASkyChartConfig>`<sub>(partial)</sub>](#sky-chart-config) Config to get the sky chart. **Default:** `{}`

- Returns: [`<Promise>`][promise]

    - Resolves: [`<string>`][string] Sky chart image URL.

#### <a id="sky-chart-config"></a> Interface: HASkyChartConfig

Configs including sky chart params.

- Every properties in [`<HATimeConfig>`](#time-config)

- `constellationLines`: [`<boolean>`][boolean] Display constellation lines. **Default:** `true`

- `constellationNames`: [`<boolean>`][boolean] Display constellation names. **Default:** `true`

- `constellationBoundaries`: [`<boolean>`][boolean] Display constellation boundaries. **Default:** `false`

- `eclipticPlane`: [`<boolean>`][boolean] Display ecliptic plane. **Default:** `false`

- `colored`: [`<boolean>`][boolean] Display colored sky chart instead of black and white. **Default:** `true`

- `size`: [`<number>`][number] The size of the sky chart (px, from 500 to 1600). **Default:** `800`

### Sun API

#### .getSunInfo([config])

Get sun information by config.

- `config`: [`<HATimeConfig>`<sub>(partial)</sub>](#time-config) Config of observing location and time. **Default:** `{}`

- Returns: [`<Promise>`][promise]

    - Resolves: [`<HASunInfo>`](#sun-info) Sun information.

#### <a id="sun-info"></a> Interface: HASunInfo

Describes sun.

- `position`: [`<HAExPosition>`](#ex-position) Position of the sun.

- `dailyEvent`: [`<HAPositionEvent[]>`](#position-event) Daily events of the sun.

- `yearlyEvent`: [`<HAEvent[]>`](#event) Yearly events of the sun.

- `positionImageURL`: [`<string>`][string] URL of the sun position image.

- `sunImageURL`: [`<string>`][string] URL of the latest sun image.

### Moon API

#### .getMoonInfo([config])

Get moon information by config.

- `config`: [`<HATimeConfig>`<sub>(partial)</sub>](#time-config) Config of observing location and time. **Default:** `{}`

- Returns: [`<Promise>`][promise]

    - Resolves: [`<HAMoonInfo>`](#moon-info) Moon information.

#### <a id="moon-appearence"></a> Interface: HAMoonAppearence

Describes moon appearance.

- `diameter`: [`<number>`][number] Diameter of the moon (minute).

- `illumination`: [`<number>`][number] Illumination of disk of the moon (%).

- `longitudeLibration`: [`<number>`][number] Libration in longitude of the moon (degree).

- `latitudeLibration`: [`<number>`][number] Libration in latitude of the moon (degree).

#### <a id="moon-info"></a> Interface: HAMoonInfo

Moon information.

- `position`: [`<HAExPosition>`](#ex-position) Position of the moon. `range` is in km.

- `appearence`: [`<HAMoonAppearance>`](#moon-appearence) Appearence of the moon.

- `event`: [`<HAPositionEvent[]>`](#position-event) Events of the moon.

- `monthlyPhase`: [`<HAEvent[]>`](#event) Monthly phases of the moon.

- `perigeeApogee`: [`<HADistanceEvent[]>`](#distance-event) Perigee and apogee of the moon.

- `positionImageURL`: [`<string>`][string] URL of the moon position image.

- `appearenceImageURL`: [`<string>`][string] URL of the moon appearence image. (celestial north is upwards)

### Daily Passing Prediction API

#### .getDailyPrediction([config])

Get daily passing prediction by config.

- `config`: [`<HAPassingConfig>`<sub>(partial)</sub>](#passing-config) Config to get daily passing prediction. **Default:** `{}`

- Returns: [`<Promise>`][promise]

    - Resolves: [`<HAPassing[]>`](#passing) Daily passing prediction list.

#### <a id="passing-period"></a> Type: HAPassingPeriod

`"morning"` or `"evening"`.

#### <a id="min-brightness"></a> Type: HAMinBrightness

One of `3`, `3.5`, `4`, `4.5`, `5`.

#### <a id="passing-config"></a> Interface: HAPassingConfig

Config to get satellite passing events.

- Every properties in [`<HATimeConfig>`](#time-config)

- `period`: [`<HAPassingPeriod>`](#passing-period) Passing period.

- `minBrightness`: [`<HAMinBrightness>`](#min-brightness) Minimum brightness.

#### <a id="passing"> Interface: HAPassing

Describes a satellite passing event.

- `satellite`: [`<string>`][string] Satellite name.

- `brightness`: [`<number>`][number] Brightness (mag).

- `start`: [`<HAFuzzyEvent>`](#fuzzy-event) Passing start event.

- `hightest`: [`<HAFuzzyEvent>`](#fuzzy-event) Hightest point event.

- `end`: [`<HAFuzzyEvent>`](#fuzzy-event) Passing end event.

- `detailURL`: [`<string>`][string] URL of the passing detail.

---

[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined

[readable]: https://nodejs.org/api/stream.html#stream_readable_streams
