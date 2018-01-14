var SOUND_PATH  = "snd/";
var SOUND_EXT   = ".wav";

/***************************************************************************
 **                 Sound Constructor                                     **
 ***************************************************************************/
function Sound() {
    this.sounds = {};
    this.playSounds = false;
}
/**
    @function playSound(sound) -> void
    @desc speelt het opgegeven geluid af (mits de gebruiker
          dit op prijs stelt)
    @param {string} sound het geluid
*/
Sound.prototype.play = function(sound) {
    if (this.playSounds) {
        this[sound].play();
    }
}

/**
    @function addSound(sound) -> void
    @desc voegt het geluid toe aan de verzameling
    @param {string} sound het geluid
*/
Sound.prototype.add = function(sound) {
    this[sound] = new Audio();
    this[sound].src = SOUND_PATH + sound + SOUND_EXT;
}

/**
    @function toggleSound() -> void
    @desc zet het afspelen van het geluid aan of uit
*/
Sound.prototype.toggle = function() {
    this.playSounds = !this.playSounds;
}
