/**
 * @class Sound
 * @desc Create a sound library object.
 * @returns Sound
 * @see Audio
 */
function Sound() {
    // private constants
    const _SOUND_PATH  = "snd/";
    const _SOUND_EXT   = ".wav";
    // private properties
    var _sounds = {};
    var _playSounds = false;
    // private methods
    /**
     * @private
     * @desc Plays the sound (if the player appreciates that)
     * @param {string} sound The sound to be played.
     */
    var _play = function(sound) {
        if (_playSounds) {
            _sounds[sound].play();
        }
    }

    /**
     * @private
     * @desc Adds the sound to the library.
     * @param {string} sound The sound to be added.
     */
    var _add = function(sound) {
        _sounds[sound] = new Audio();
        _sounds[sound].src = _SOUND_PATH + sound + _SOUND_EXT;
    }

    /**
     * @private
     * @desc Turns the sound on or off.
     */
    var _toggle = function() {
        _playSounds = !_playSounds;
    }

    /**
     * @public
     * @desc Sound object which is returned.
     * @member {Object}
     */
    var sound = {
        play: function(sound) {
            _play(sound);
        },
        add: function(sound) {
            _add(sound);
        },
        toggle: function() {
            _toggle();
        },
        playSounds : function() {
            return _playSounds;
        },
        getSounds : function() {
            return _sounds;
        }
    };

    return sound;
}
