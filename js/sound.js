/***************************************************************************
 **                 Sound                                                 **
 ***************************************************************************/

 /**
     @constructor Sound()
     @desc Deze klasse beschrijft de geluidenverzameling.
 */
function Sound() {
    // prive constanten
    const SOUND_PATH  = "snd/";
    const SOUND_EXT   = ".wav";

    // prive attributen
    var sounds = {};
    var playSounds = false;

    /***********************************************************************
     **             Publieke attibuten/methodes                           **
     ***********************************************************************/
    var sound = {
        play: function(sound) {
            play(sound);
        },
        add: function(sound) {
            add(sound);
        },
        toggle: function() {
            toggle();
        },
        playSounds : function() {
            return playSounds;
        }
    };

    /***********************************************************************
     **             Methodes                                              **
     ***********************************************************************/

    /**
        @function play(sound) -> void
        @desc speelt het opgegeven geluid af (mits de gebruiker
              dit op prijs stelt)
        @param {string} sound het geluid
    */
    var play = function(sound) {
        if (playSounds) {
            sounds[sound].play();
        }
    }

    /**
        @function add(sound) -> void
        @desc voegt het geluid toe aan de verzameling
        @param {string} sound het geluid
    */
    var add = function(sound) {
        sounds[sound] = new Audio();
        sounds[sound].src = SOUND_PATH + sound + SOUND_EXT;
    }

    /**
        @function toggle() -> void
        @desc zet het afspelen van het geluid aan of uit
    */
    var toggle = function() {
        playSounds = !playSounds;
    }

    /***********************************************************************
     **             Prive Methodes                                        **
     ***********************************************************************/

    /***********************************************************************
     **             Return                                                **
     ***********************************************************************/

    return sound;
}
