require('soundfont-player');    // Soundfont will be attached to window.Soundfont

function Walkman(settings) {
    this.period = settings.period || 1000;  // defaul: 1000 ms
    this.speed = settings.speed || 4;       // default: 4 beats/second
    this.instruments = {};                  // key: { audio, schedule }
    this.scheduler = {};

    this.audioContext = new AudioContext();
    this.cursor = 0;

    this.beatMap = null;
}

Walkman.prototype.loadBeatMap = function (beatMap) {
    // check map
    // beatMap = [ [ {}, {}, {}, {} ], [], [], [], [], [], [], [] ]
    //         = [ beat1, beat2, ... ]
    //         = [ [ sym1, sym2, sym3, sym4 ], beat2, ... ]
    // sym: { main, aux }
    // sym.main = { name, note, times, duration }

    var err = checkMap(beatMap);
};

Walkman.prototype.play = function (symbols) {
    if (!this.beatMap)
        throw new Error('Cannot play without a beat map.');

    var atx = this.audioContext,
        startTime = atx.currentTime + 2,
        interval = this.period / this.speed;
    // create instruments
    symbols.forEach(function (sym) {

    });

    // create schedule
    symbols.forEach(function (sym, index) {
        var pos = index % this.speed,
            whichBeat = this.beatMap[pos],
            whichSymbol = whichBeat[sym],
            mainInstrument = this.instruments[whichSymbol.main.name].audio,
            mainInstrumentSchedule = this.instruments[whichSymbol.main.name].schedule,
            auxInstrument = this.instruments[whichSymbol.aux.name].audio,
            auxInstrumentSchedule = this.instruments[whichSymbol.aux.name].schedule,
            mainNote = whichSymbol.main.note,
            auxNote = whichSymbol.aux.note;

        if (mainInstrument)
            mainInstrumentSchedule.push({ time: interval * index, note: mainNote });

        if (auxInstrument)
            auxInstrumentSchedule.push({ time: interval * index, note: auxNote });
        //     mainInstrument.schedule(startTime, [ { time: 0, note: 60}, { time: 0.5, note: 61}, ...])

        if (mainInstrumentSchedule.length)
            mainInstrument.schedule(startTime, mainInstrumentSchedule);

        if (auxInstrumentSchedule.length)
            auxInstrument.schedule(startTime, auxInstrumentSchedule);
    });
};

Walkman.prototype.stop = function () {
    if (this.audioContext)
        this.audioContext.close().done();
};

Walkman.prototype.pause = function () {

};

function checkMap(beatMap) {

}