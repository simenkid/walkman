var walkman = {
    audioContexts: null;
};

var Soundfont = require('soundfont-player');

// instrument(ac, name, options) Promise, ac = new AudioContext()
// nameToUrl(name, format) String
// noteToMidi(noteName) Integer

walkman.createInstrument = function (name, opts) {
    var ac;
    if (walkman.length > 5) {
        // throw error
    }

    ac = ac || new AudioContext();
    walkman.push(ac);
    return Soundfont.instrument(ac, name, opts);
};


walkman.mapInstrumentToBeat = function (names) {

};



Walkman.prototype.loadSymbols = function (symbols) {
    this.symbols = symbols;
    this.createMusicFromSymbols(symbols);
};

Walkman.prototype.clearSymbols = function () {
    this.symbols = null;
};



// AudioContext
// AudioContext.close()
// AudioContext.createBuffer()
// AudioContext.createBufferSource()
// AudioContext.resume()
// AudioContext.suspend()

// Instrument
// instrument(ac, name, options) => Promise


// // SoundFont Player
// player.play === player.start(name, when, options)
// player.start(name, when, options) => AudioNode

// player.stop(when, nodes) => Array
// player.on(event, callback) => player
// player.connect(destination) => AudioPlayer
// player.schedule(when, events) => Array
// player.listenToMidi(input, options) => player