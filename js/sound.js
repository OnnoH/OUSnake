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
    
    const _MOVE        = "move";
    const _FOOD        = "food";
    const _WIN         = "winner";
    const _LOSE        = "looser";

    // private properties
    var _sounds = {};
    var _playing = true;
    
    // initiate object on creation
    _init();
    
    /**
     * @private
     * @desc initiate object.
     */
    function _init() {
        _add(_MOVE);
        _add(_FOOD);
        _add(_WIN);
        _add(_LOSE);
    }

    /**
     * @private
     * @desc Adds the sound to the library.
     * @param {string} sound The sound to be added.
     */
    function _add(sound) {
        _sounds[sound] = new Audio();
        _sounds[sound].src = _SOUND_PATH + sound + _SOUND_EXT;
    }

    /**
     * @private
     * @desc Plays the sound (if the player appreciates that)
     * @param {string} sound The sound to be played.
     */
    function _play(sound) {
        if (_playing) {
            _sounds[sound].play();
        }
    }

    /**
     * @private
     * @desc Turns the sound on or off.
     */
    function _toggle() {
        _playing = !_playing;
    }

    /**
     * @public
     * @desc Sound object which is returned.
     * @member {Object}
     */
    return {
        MOVE: _MOVE,
        FOOD: _FOOD,
        WIN:  _WIN,
        LOSE: _LOSE,
        play: _play,
        toggle: _toggle,
        getPlaying: function() {
            return _playing;
        },
        
    };
}
