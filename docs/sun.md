### Sun API

_`<SomeType>`<sub>(partial)</sub> means all properties of `SomeType` is optional (can be [`undefined`][undefined]), like `Partial<SomeType>` in TypeScript._

#### .getSunInfo([config])

Get sun information by config.

- `config`: [`<TimeConfig>`<sub>(partial)</sub>](./interface#time-config) Config of observing location and time. **Default:** `{}`

- Returns: [`<Promise>`][promise]

    - Resolves: [`<SunInfo>`](#sun-info) Sun information.

#### <a id="sun-info"></a> Interface: SunInfo

Describes sun.

- `position`: [`<ExPosition>`](./interface#ex-position) Position of the sun.

- `dailyEvent`: [`<PositionEvent[]>`](./interface#position-event) Daily events of the sun.

- `yearlyEvent`: [`<Event[]>`](./interface#event) Yearly events of the sun.

- `positionImageURL`: [`<string>`][string] URL of the sun position image.

- `sunImageURL`: [`<string>`][string] URL of the latest sun image.

---

[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
