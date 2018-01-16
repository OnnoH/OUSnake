const SCRIPT_PATH  = "js/"; //todo: add doc
const SCRIPT_EXT   = ".js"; //todo: add doc

var scripts = [
    'const' + SCRIPT_EXT,
    'element' + SCRIPT_EXT,
    'canvas' + SCRIPT_EXT,
    'food' + SCRIPT_EXT,
    'util' + SCRIPT_EXT,
    'sound' + SCRIPT_EXT,
    'snake' + SCRIPT_EXT,
]; //todo: add doc

//todo: add doc
$.getMultiScripts = function(arr, path) {
    var _arr = $.map(arr, function(scr) {
        return $.getScript( (path||"") + scr );
    });

    _arr.push($.Deferred(function( deferred ){
        $( deferred.resolve );
    }));

    return $.when.apply($, _arr);
}

//todo: add doc
$.getMultiScripts(scripts, SCRIPT_PATH).done(function() {
    // all scripts loaded
    console.log("All scripts loaded.")
});
