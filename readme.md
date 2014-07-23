# object-match-statement

Generates if one-liner, that returns true, if left object is subset of right object.

## Usage

```js
var Matcher = require('object-match-statement');

console.log(Matcher.build('obj', { a: 1, b: 1})); // -> 'obj.a === 1 && obj.b === 1'
```

## API

### Matcher.build(prefix, object);

Returns one-line if for comparsion other objects agains `object` param. Prefix used to identify compared object inside generated if.

### Mathcer.escape(id)

Returns escaped property accessor. For example for `valid` will be returned `.valid`, but for `-invalid` will be returned `["-invalid"]`.

## License

MIT (c) [Vsevolod Strukchinsky](floatdrop@gmail.com)
