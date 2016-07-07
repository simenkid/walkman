require('soundfont-player');                // Soundfont will be attached to window.Soundfont

function Walkman(settings) {
    this.row = settings.row || 5;
    this.col = settings.col || 8,

    this.period = settings.period || 1;     // defaul: 1 s
    this.speed = settings.speed || 4;       // default: 4 beats/period

    this.instruments = {};                  // { key: instr }
    this.playEffect = {};

    this.audioContext = new AudioContext();
    this.effectMap = null;
    this._isSuspend = false;
}

Walkman.prototype.useInstrument = function (instrName) {
    var self = this,
        ac = this.audioContext;

    return Soundfont.instrument(ac, instrName).then(function (instr) {
        self.instruments[instrName] = self.instruments[instrName] || instr;
        return self.instruments[instrName];
    });
};

Walkman.prototype.defineEffect = function (effectName, instrObjs) {
    // instrObjs = [ { instrName: 'xxx', note: 'C1', double: false }, ... ];
    var self = this,
        interval = this.period / this.speed,
        effectScheduleAt;

    if (this.playEffect[effectName])
        throw new Error('Effect already exists.');

    effectScheduleAt = function (time) {
        instrObjs.forEach(function (instObj) {
            var instrName = instObj.instrName,
                instr = self.instruments[instrName],
                note,
                double;

            if (!instr)
                throw new Error('Instrument should be used first.');

            note = instObj.note;
            double = instObj.double;

            if (double) {
                // instr.schedule(time, [ { time: 0, note: note, duration: 1 }, { time: interval/2, note: note } ]);
                // instr.schedule(time, [ [ 0, note ], [ interval/2, note ] ]);
                instr.play(note, time);
                instr.play(note, time + interval/2);


            } else {
                // instr.schedule(time, [ { time: 0, note: note, release: 1 } ]);
                // instr.schedule(time, [ [ 0, note ] ]);
                instr.play(note, time);
            }
        });
    };

    this.playEffect[effectName] = effectScheduleAt;

    return effectScheduleAt;
};

Walkman.prototype.defineEffectMap = function (map) {
    var self = this;
    map.forEach(function (effectsAtPos) {
        effectsAtPos.forEach(function (effectName) {
            var effectScheduleAt;

            if (effectName)
                effectScheduleAt = self.playEffect[effectName];

            if (effectName !== null && typeof effectScheduleAt !== 'function')
                throw Error('Invalid effect definition: ' + effectName);
        });
    });

    this.effectMap = map;
};

Walkman.prototype.play = function (symbols) {
    var self = this,
        col = this.col,
        effectMap = this.effectMap,
        interval = this.period / this.speed,
        startTime = this.audioContext.currentTime + 0.4;

    if (this._isSuspend) {
        this._isSuspend = false;

        if (this.audioContext)
            this.audioContext.resume();
    } else {
        if (!this.effectMap)
            throw new Error('Effect map is not defined.');

        if (!Array.isArray(symbols))
            throw new Error('symbols should be an array.');

        symbols.forEach(function (sym, i) {
            var pos = i % col,
                effectsAtPos = effectMap[pos],
                effectName = effectsAtPos[sym],
                atTime = startTime + i * interval,
                effectScheduleAt;

            if (effectName !== null) {
                effectScheduleAt = self.playEffect[effectName];
                effectScheduleAt(atTime);
            }
        });
    }
};

Walkman.prototype.stop = function () {
    //this.instruments[instrName]

    for (var k in this.instruments) {
        if (this.instruments.hasOwnProperty(k)) {
            this.instruments[k].stop();
        }
    }
    // if (this.audioContext) {
    //     this.audioContext.suspend();
    //     this._isSuspend = true;
    // }
};

Walkman.prototype.pause = function () {
    if (this.audioContext) {
        this.audioContext.suspend();
        this._isSuspend = true;
    }
};

module.exports = Walkman;

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