var SCRIPT_PATH  = "js/";
var SCRIPT_EXT   = ".js";
var scripts = [
    'const' + SCRIPT_EXT,
    'element' + SCRIPT_EXT,
    'canvas' + SCRIPT_EXT,
    'food' + SCRIPT_EXT,
    'util' + SCRIPT_EXT,
    'sound' + SCRIPT_EXT,
    'snake' + SCRIPT_EXT,
];

$.getMultiScripts = function(arr, path) {
    var _arr = $.map(arr, function(scr) {
        return $.getScript( (path||"") + scr );
    });

    _arr.push($.Deferred(function( deferred ){
        $( deferred.resolve );
    }));

    return $.when.apply($, _arr);
}

$.getMultiScripts(scripts, SCRIPT_PATH).done(function() {
    // all scripts loaded
    console.log("All scripts loaded.")
});
