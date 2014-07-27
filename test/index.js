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

    it('should escape invalid identifiers with double quotes', function() {
        Matcher.escape('"invalid').should.eql('["\\"invalid"]');
    });

    it('should escape invalid identifiers with escaped double quotes', function() {
        Matcher.escape('button\\"1').should.eql('["button\\\\\\"1"]');
    });
});

describe('matcher', function () {
    it('should escape matching value', function() {
        var obj = {a: '\\"wow'};
        var matcher = Matcher.compile(obj);
        matcher(obj).should.be.ok;
    });

    it('should return true on patter-match', function() {
        var matcher = Matcher.compile({a: 1});
        matcher({a: 1, c: 1}).should.be.ok;
    });

    it('should return false on pattern-mismatch', function() {
        var matcher = Matcher.compile({a: 2});
        matcher({a: 1, c: 1}).should.not.be.ok;
    });

    it('should return true on pattern-match with complex object', function() {
        var matcher = Matcher.compile({a: {b: 1}});
        matcher({a: {b: 1}, c: 1}).should.be.ok;
    });

    it('should return false on pattern-mismatch with complex object', function() {
        var matcher = Matcher.compile({a: {b: 2}});
        matcher({a: {b: 1}, c: 1}).should.not.be.ok;
    });

    it('should escape compared value of object', function() {
        var matcher = Matcher.compile({ a: '"wow'} );
        matcher({a: '"wow'}).should.be.ok;
    });
});

describe('compile', function () {
    it('should compile function', function () {
        var matcher = Matcher.compile({a: {b: 2}});
        matcher.should.be.an.instanceOf(Function);
    });

    describe('returned function', function () {
        it ('should return true on matching object', function () {
            var matcher = Matcher.compile({a: {b: 2}});
            matcher({a: {b: 2}, c: 1}).should.be.ok;
        });

        it ('should return false on mismatching object', function () {
            var matcher = Matcher.compile({a: {b: 2}});
            matcher({a: {b: 1}, c: 1}).should.not.be.ok;
            matcher({a: 2}).should.not.be.ok;
        });
    });
});
