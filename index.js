function escapeIdentifier (id) {
    if (/^[$A-Z\_a-z][$_0-9A-Za-z]*$/.test(id)) {
        return '.' + id;
    }
    return '["' + id.replace(/"/g, '\\"') + '"]';
}

function buildCompareStatement (prefix, object) {
    var statement = [];

    for (var key in object) {
        var nextPrefix = prefix + escapeIdentifier(key);
        if (typeof object[key] === 'object') {
            statement.push(nextPrefix);
            statement.push(buildCompareStatement(nextPrefix, object[key]));
        } else if (typeof object[key] === 'string') {
            statement.push(nextPrefix + ' === "' + object[key].replace(/"/g, '\\"') + '"');
        } else {
            // This is strange situation, maybe it's Number. Who knows
            statement.push(nextPrefix + ' === ' + object[key]);
        }
    }

    return statement.join(' && ');
}

var Matcher = {
    escape: escapeIdentifier,
    build: buildCompareStatement
};

module.exports = Matcher;
