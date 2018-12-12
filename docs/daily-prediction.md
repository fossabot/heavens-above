### Daily Passing Prediction API

_`<SomeType>`<sub>(partial)</sub> means all properties of `SomeType` is optional (can be [`undefined`][undefined]), like `Partial<SomeType>` in TypeScript._

#### .getDailyPrediction([config])

Get daily passing prediction by config.

- `config`: [`<PassingConfig>`<sub>(partial)</sub>](#passing-config) Config to get daily passing prediction. **Default:** `{}`

- Returns: [`<Promise>`][promise]

    - Resolves: [`<Passing[]>`](#passing) Daily passing prediction list.

#### <a id="passing-period"></a> Type: PassingPeriod

`"morning"` or `"evening"`.

#### <a id="min-brightness"></a> Type: MinBrightness

One of `3`, `3.5`, `4`, `4.5`, `5`.

#### <a id="passing-config"></a> Interface: PassingConfig

Config to get satellite passing events.

- Every properties in [`<TimeConfig>`](./interface#time-config)

- `period`: [`<PassingPeriod>`](#passing-period) Passing period.

- `minBrightness`: [`<MinBrightness>`](#min-brightness) Minimum brightness.

#### <a id="passing"> Interface: Passing

Describes a satellite passing event.

- `satellite`: [`<string>`][string] Satellite name.

- `brightness`: [`<number>`][number] Brightness (mag).

- `start`: [`<FuzzyEvent>`](./interface#fuzzy-event) Passing start event.

- `hightest`: [`<FuzzyEvent>`](./interface#fuzzy-event) Hightest point event.

- `end`: [`<FuzzyEvent>`](./interface#fuzzy-event) Passing end event.

- `detailURL`: [`<string>`][string] URL of the passing detail.

---

[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
