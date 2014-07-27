/* global suite, bench */

var Matcher = require('..');

function recursive(a, b) {
    if (a === b) { return true; }
    if (typeof a === 'object' && typeof b === 'object') {
        for (var key in a) {
            if ((b[key] === undefined) || (!recursive(a[key], b[key]))) { return false; }
        }
        return true;
    }
    return false;
};

suite('simple object', function () {
    var pattern = { block: 'block' };
    var oms = Matcher.compile(pattern);

    function inline(object) { return object.block === 'block'; }
    var swtch = new Function('json', 'switch (json.block) { case "block": return true; }');
    bench('inline#simple_match', function () { inline(pattern); });
    bench('inline#simple_mismatch', function () { inline({block: 'elem'}); });
    bench('if#simple_match', function () { oms(pattern); });
    bench('if#simple_mismatch', function () { oms({block: 'elem'}); });
    bench('swtch#simple_match', function () { swtch(pattern); });
    bench('swtch#simple_mismatch', function () { swtch({block: 'elem'}); });
    bench('recursive#simple_match', function () { recursive(pattern, pattern); });
    bench('recursive#simple_mismatch', function () { recursive(pattern, {block: 'elem'}); });
});

suite('complex object', function () {
    var pattern  = { block: 'block', elem: 'elem' };
    var mismatch = { block: 'block', elem: 'wat' };
    var oms = Matcher.compile(pattern);

    function inline(object) { return object.block === 'block' && object.elem === 'elem'; }
    var swtch = new Function('json', 'switch (json.block) { case "block": switch (json.elem) { case "elem": return true; } }');
    bench('inline#complex_match', function () { inline(pattern); });
    bench('inline#complex_mismatch', function () { inline(mismatch); });
    bench('oms#complex_match', function () { oms(pattern); });
    bench('oms#complex_mismatch', function () { oms(mismatch); });
    bench('swtch#complex_match', function () { swtch(pattern); });
    bench('swtch#complex_mismatch', function () { swtch(mismatch); });
    bench('recursive#complex_match', function () { recursive(pattern, pattern); });
    bench('recursive#complex_mismatch', function () { recursive(pattern, {block: 'elem'}); });
});
