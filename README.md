# heavens-above

[![Build Status](https://travis-ci.org/littlepiggy03/heavens-above.svg?branch=master)](https://travis-ci.org/littlepiggy03/heavens-above) [![Codecov](https://codecov.io/gh/littlepiggy03/heavens-above/branch/master/graph/badge.svg)](https://codecov.io/gh/littlepiggy03/heavens-above) [![Greenkeeper badge](https://badges.greenkeeper.io/littlepiggy03/heavens-above.svg)](https://greenkeeper.io/)

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

    - Resolves: [`<HALanguage[]>`](#halanguage) List of avaliable languages.

#### .getImageStream(url)

Get png image stream from url.

- `url`: [`<string>`][string] URL of the image.

- Returns: [`<Promise>`][promise]

    - Resolves: [`<Readable>`][readable] PNG image stream from url.

#### .getSkyChartURL([config])

Get sky chart image URL from config.

- `config`: #[`<HASkyChartConfig>`](#haskychartconfig) Config of the sky chart. **Default:** `{}`

- Returns: [`<Promise>`][promise]

    - Resolves: [`<string>`][string] Sky chart image URL.

#### .getSunInfo([config])

Get sun info from config.

- `config`: #[`<HATimeConfig>`](#hatimeconfig) Config of observing location and time. **Default:** `{}`

- Returns: [`<Promise>`][promise]

    - Resolves: [`<HASunInfo>`](#hasuninfo) Sun info.

#### .getMoonInfo([config])

Get moon info from config.

- `config`: #[`<HATimeConfig>`](#hatimeconfig) Config of observing location and time. **Default:** `{}`

- Returns: [`<Promise>`][promise]

    - Resolves: [`<HAMoonInfo>`](#hamooninfo) Moon info.

### Interfaces

#### HADistanceEvent

Event with distance info.

- Every properties in [`<HAEvent>`](#haevent)

- `distance`: [`<number>`][number] Distance of the event (in km).

#### HAConfig

Base config.

- `latitude`: [`<number>`][number] Latitude of the observation location (in degrees). **Default:** `0`

- `longtitude`: [`<number>`][number] Longitude of the observation location (in degrees). **Default:** `0`

- `elevation`: [`<number>`][number] Elevation of the observation location (in meters). **Default:** `0`

- `language`: [`<string>`][string] ID of the selected language. Only useful in specific APIs. **Default:** `"en"`

#### HADeclination

Declination.

- `degree`: [`<number>`][number] Degree part of the declination.

- `minute`: [`<number>`][number] Minute part of the declination.

- `second`: [`<number>`][number] Second part of the declination.

#### HAEvent

Event with name and time.

- `name`: [`<string>`][string] Name of the event.

- `time`: [`<Date>`][date] Time of the event.

#### HAExPosition

Position with more data.

- Every properties in [`<HAEvent>`](#haevent)

- `rightAscension`: [`<HARightAscension>`](#harightascension) Right ascension of the position.

- `declination`: [`<HADeclination>`](#hadeclination) Declination of the position.

- `range`: [`<number>`][number] Range (distance) of the position (in AU if not specified).

- `constellation`: [`<string>`][string] The constellation which the position belongs to.

#### HALanguage

An available language.

- `id`: [`<string>`][string] ID of the language.

- `name`: [`<string>`][string] Name of the Language.

#### HAMoonAppearence

Moon appearance.

- `diameter`: [`<number>`][number] Diameter of moon (in minutes).

- `illumination`: [`<number>`][number] Illumination of disk of moon (in %).

- `longitudeLibration`: [`<number>`][number] Libration in longitude of moon (in degrees).

- `latitudeLibration`: [`<number>`][number] Libration in latitude of moon (in degrees).

#### HAMoonInfo

Moon info.

- `position`: [`<HAExPosition>`](#haexposition) Position of sun. `range` is in km.

- `appearence`: [`<HAMoonAppearance`](#hamoonappearence) Appearence of moon.

- `event`: [`<HAPositionEvent[]>`](#hapositionevent) Events of moon.

- `monthlyPhase`: [`<HAEvent[]>`](#haevent) Monthly phases of moon.

- `perigeeApogee`: [`<HADistanceEvent[]>`](#hadisranceevent) Perigee and apogee of moon.

- `positionImageURL`: [`<string>`][string] URL of moon position image.

- `appearenceImageURL`: [`<string>`][string] URL of moon appearence image. (celestial north is upwards)

#### HAPosition

Position with altitude and azimuth.

- `altitude`: [`<number>`][number] Altitude of the position (in degrees).

- `azimuth`: [`<number>`][number] Azimuth of the position (in degrees).

#### HAPositionEvent

Event with position info.

- Every properties in [`<HAEvent>`](#haevent)

- Every properties in [`<HAPosition>`](#haposition)

#### HARightAscension

Right ascension.

- `hour`: [`<number>`][number] Hour part of the right ascension.

- `minute`: [`<number>`][number] Minute part of the right ascension.

- `second`: [`<number>`][number] Second part of the right ascension.

#### HASkyChartConfig

Configs related to sky chart.

- Every properties in [`<HATimeConfig>`](#hatimeconfig)

- `constellationLines`: [`<boolean>`][boolean] Display constellation lines. **Default:** `true`

- `constellationNames`: [`<boolean>`][boolean] Display constellation names. **Default:** `true`

- `constellationBoundaries`: [`<boolean>`][boolean] Display constellation boundaries. **Default:** `false`

- `eclipticPlane`: [`<boolean>`][boolean] Display ecliptic plane. **Default:** `false`

- `colored`: [`<boolean>`][boolean] Display colored sky chart instead of black and white. **Default:** `true`

- `size`: [`<number>`][number] The size of the sky chart (in pixels, from 500 to 1600). **Default:** `800`

#### HASunInfo

Sun info.

- `position`: [`<HAExPosition>`](#haexposition) Position of sun.

- `dailyEvent`: [`<HAPositionEvent[]>`](#hapositionevent) Daily events of sun.

- `yearlyEvent`: [`<HAEvent[]>`](#haevent) Yearly events of sun.

- `positionImageURL`: [`<string>`][string] URL of sun position image.

- `sunImageURL`: [`<string>`][string] URL of latest sun image.

#### HATimeConfig

HeavensAbove config with time property.

- Every properties in [`<HAConfig>`](#haconfig)

- `time`: [`<Date>`][date] Observation time. **Default:** `new Date()`

[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type

[readable]: https://nodejs.org/api/stream.html#stream_readable_streams
