function escapeIdentifier (id) {
    if (/^[$A-Z\_a-z][$_0-9A-Za-z]*$/.test(id)) {
        return '.' + id;
    }
    return '[' + JSON.stringify(id) + ']';
}

function buildCompareStatement (prefix, object) {
    var statement = [];
    for (var key in object) {
        var nextPrefix = prefix + escapeIdentifier(key);
        if (typeof object[key] === 'object') {
            statement.push(nextPrefix);
            statement.push(buildCompareStatement(nextPrefix, object[key]));
        } else if (typeof object[key] === 'string') {
            statement.push(nextPrefix + ' === ' + JSON.stringify(object[key]));
        } else {
            // This is strange situation, maybe it's Number. Who knows
            statement.push(nextPrefix + ' === ' + object[key]);
        }
    }

    return statement.join(' && ');
}

function compileCompareStatement (pattern) {
    var statement = buildCompareStatement('object', pattern);
    var composedFunction = 'return ' + statement + ';';
    /*jshint -W054*/ /* Yes, this is eval */
    return new Function('object', composedFunction);
}

var Matcher = {
    escape: escapeIdentifier,
    build: buildCompareStatement,
    compile: compileCompareStatement
};

module.exports = Matcher;
