var walkman = {};

var Soundfont = require('soundfont-player');

// instrument(ac, name, options) Promise, ac = new AudioContext()
// nameToUrl(name, format) String
// noteToMidi(noteName) Integer

walkman.createInstruments = function (names) {

};

walkman.mapInstrumentToBeat = function (names) {

};

function Walkman(settings) {
    this.speed = settings.speed;    // beats/second
    this.instruments = {};
    this.audioContext = new AudioContext();
    this.symbols = [];
    this.cursor = 0;

    if (settings.instruments) {
        // create instruments into instruments
    }
}

Walkman.prototype.loadSymbols = function (digits) {
};

Walkman.prototype.appendSymbols = function (digits) {
};

Walkman.prototype.clearSymbols = function (digits) {
};

Walkman.prototype.play = function () {
    // this.cursor
};

Walkman.prototype.stop = function () {
    if (this.audioContext)
        this.audioContext.close().done();
};

Walkman.prototype.pause = function () {

};