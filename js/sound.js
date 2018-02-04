/**
 * @class Sound
 * @module snake/view
 * @desc provide sound for the game.
 * @returns Sound the object used to make sound.
 * @see Audio
 */
function Sound() {
    // private constants
    const _SOUND_PATH  = "snd/";    // path where sounds are located
    const _SOUND_EXT   = ".wav";    // file extension of sounds. 
    
    const _MOVE        = "move";    // the sound of moving. 
    const _FOOD        = "food";    // the sound of munching
    const _WIN         = "winner";  // the sound of winning
    const _LOSE        = "looser";  // the sound of losing
    
    const _SOUNDS = [_MOVE, _FOOD, _WIN, _LOSE];    // the gathering of sounds
    
    // private properties
    var _audio = {};                // collection of playable sounds
    var _playing = true;            // sound is on or off. 
    
    // initiate object on creation
    _init();
    
    /**
     * @private
     * @desc initiate object by adding all the sounds to the library.
     */
    function _init() {
        _SOUNDS.forEach(function(sound) {
            _audio[sound] = new Audio();
            _audio[sound].src = _SOUND_PATH + sound + _SOUND_EXT;
        });
    }

    /**
     * @private
     * @desc Plays the sound (if the player appreciates that)
     * @param {string} sound The sound to be played.
     */
    function _play(sound) {
        if (_playing) {
            _audio[sound].play();
        }
    }

    /**
     * @private
     * @desc Turns the sound on or off.
     */
    function _toggle() {
        _playing = !_playing;
        $(document).trigger(new jQuery.Event("toggleSound", [_playing]));
    }

    /**
     * @public
     * @desc Sound object which is returned.
     * @member {Object}
     */
    return {
        // public constants
        MOVE: _MOVE,
        FOOD: _FOOD,
        WIN:  _WIN,
        LOSE: _LOSE,
        // public functions
        play: _play,
        toggle: _toggle,
    };
}
