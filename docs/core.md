### Core API

_`<SomeType>`<sub>(partial)</sub> means all properties of `SomeType` is optional (can be [`undefined`][undefined]), like `Partial<SomeType>` in TypeScript._

#### Class: HeavensAbove

The HeavensAbove class.

#### new HeavensAbove([config])

Create a HeavensAbove instance with an optional default config.

- `config`: [`<Config>`<sub>(partial)</sub>](./interface#config) Default config for each API. **Default:** `{}`

```typescript
new HeavensAbove();

new HeavensAbove({
    lat: 40,
    lng: 116,
    alt: 50
});
```

#### .config

Set default config.

- [`<Config>`](./interface#config) Default config.

```typescript
ha.config = {
    latitude: 40,
    longtitude: 116,
    elevation: 50
};
```

#### .lat

- [`<number>`][number] Latitude of the default observation location (degree). **Default:** `0`

```typescript
ha.lat = 40;
```

#### .lng

- [`<number>`][number] Longtitude of the default observation location (degree). **Default:** `0`

```typescript
ha.lng = 116;
```

#### .alt

- [`<number>`][number] Elevation of the default observation location (meter). **Default:** `0`

```typescript
ha.alt = 50;
```

#### .getImageStream(url)

Get PNG image stream from url.

- `url`: [`<string>`][string] URL of the image.

- Returns: [`<Promise>`][promise]

    - Resolves: [`<Readable>`][readable] PNG image stream from url.

```typescript
const fs = require("fs");
const image = await ha.getImageStream("/image-url-returned-by-other-api");
image.pipe(fs.createWriteStream("image.png"));
```

---

[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined

[readable]: https://nodejs.org/api/stream.html#stream_readable_streams
