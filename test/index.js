/* global describe, it */

var Matcher = require('..');
require('should');

describe('escape', function () {
    it('should not touch valid identifiers', function() {
        Matcher.escape('valid').should.eql('.valid');
    });

    it('should escape invalid identifiers', function() {
        Matcher.escape('-invalid').should.eql('["-invalid"]');
    });
});

describe('matcher', function () {
    it('should return true on patter-match', function() {
        var matcher = Matcher.build('object', {a: 1});
        var func = new Function('object', 'return ' + matcher);
        func({a: 1, c: 1}).should.be.ok;
    });

    it('should return false on pattern-mismatch', function() {
        var matcher = Matcher.build('object', {a: 2});
        var func = new Function('object', 'return ' + matcher);
        func({a: 1, c: 1}).should.not.be.ok;
    });

    it('should return true on pattern-match with complex object', function() {
        var matcher = Matcher.build('object', {a: {b: 1}});
        var func = new Function('object', 'return ' + matcher);
        func({a: {b: 1}, c: 1}).should.be.ok;
    });

    it('should return false on pattern-mismatch with complex object', function() {
        var matcher = Matcher.build('object', {a: {b: 2}});
        var func = new Function('object', 'return ' + matcher);
        func({a: {b: 1}, c: 1}).should.not.be.ok;
    });
});
