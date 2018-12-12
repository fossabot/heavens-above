### Moon API

_`<SomeType>`<sub>(partial)</sub> means all properties of `SomeType` is optional (can be [`undefined`][undefined]), like `Partial<SomeType>` in TypeScript._

#### .getMoonInfo([config])

Get moon information by config.

- `config`: [`<TimeConfig>`<sub>(partial)</sub>](./interface#time-config) Config of observing location and time. **Default:** `{}`

- Returns: [`<Promise>`][promise]

    - Resolves: [`<MoonInfo>`](#moon-info) Moon information.

#### <a id="moon-appearence"></a> Interface: MoonAppearence

Describes moon appearance.

- `diameter`: [`<number>`][number] Diameter of the moon (minute).

- `illumination`: [`<number>`][number] Illumination of disk of the moon (%).

- `longitudeLibration`: [`<number>`][number] Libration in longitude of the moon (degree).

- `latitudeLibration`: [`<number>`][number] Libration in latitude of the moon (degree).

#### <a id="moon-info"></a> Interface: MoonInfo

Moon information.

- `position`: [`<ExPosition>`](./interface#ex-position) Position of the moon. `range` is in km.

- `appearence`: [`<MoonAppearance>`](#moon-appearence) Appearence of the moon.

- `event`: [`<PositionEvent[]>`](./interface#position-event) Events of the moon.

- `monthlyPhase`: [`<Event[]>`](./interface#event) Monthly phases of the moon.

- `perigeeApogee`: [`<DistanceEvent[]>`](./interface#distance-event) Perigee and apogee of the moon.

- `positionImageURL`: [`<string>`][string] URL of the moon position image.

- `appearenceImageURL`: [`<string>`][string] URL of the moon appearence image. (celestial north is upwards)

---

[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
