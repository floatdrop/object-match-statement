# object-match-statement

Generates if one-liner, that returns true, if left object is subset of right object.

## Usage

```js
var Matcher = require('object-match-statement');

console.log(Matcher.build('obj', { a: 1, b: 1})); // -> 'obj.a === 1 && obj.b === 1'
```

## API

### Matcher.compile(object)

Returns compiled function, that acceps object and returns `Boolean`, indicates, that passed object is matching compiled pattern.

### Matcher.build(prefix, object)

Returns one-line if for comparsion other objects agains `object` param. Prefix used to identify compared object inside generated if.

### Mathcer.escape(id)

Returns escaped property accessor. For example for `valid` will be returned `.valid`, but for `-invalid` will be returned `["-invalid"]`.

## Benchmarks

`object-match-statement` is using `if` for patterns, since inlining is not an option (we need to construct comparing statement by object fields __and__ values).

```
                     simple object
     164,427,234 op/s » inline#simple_match
     101,336,062 op/s » inline#simple_mismatch
     100,053,487 op/s » if#simple_match
      75,304,293 op/s » if#simple_mismatch
      87,757,658 op/s » swtch#simple_match
      68,066,432 op/s » swtch#simple_mismatch
      89,974,169 op/s » recursive#simple_match
      22,123,933 op/s » recursive#simple_mismatch

                      complex object
     123,443,614 op/s » inline#complex_match
     123,150,712 op/s » inline#complex_mismatch
      87,888,269 op/s » oms#complex_match
      82,031,672 op/s » oms#complex_mismatch
      71,166,844 op/s » swtch#complex_match
      69,140,028 op/s » swtch#complex_mismatch
      79,993,904 op/s » recursive#complex_match
      21,916,098 op/s » recursive#complex_mismatch
```

## License

MIT (c) [Vsevolod Strukchinsky](floatdrop@gmail.com)
