var Walkman = require('walkman');
var wm = new Walkman(5, 8);

wm.useInstrument('drum').then(function () {
    // instrObjs = [ { instrName: 'xxx', note: 'C1', double: false }, ... ];
    wm.defineEffect('basedrum', [ { instrName: 'drum', note: 'C1', double: false } ]);
    wm.defineEffect('hihat', [ { instrName: 'drum', note: 'Ab1', double: false } ]);
    wm.defineEffect('snare', [ { instrName: 'drum', note: 'D1', double: false } ]);
    wm.defineEffect('open-hihat', [ { instrName: 'drum', note: 'Bb1', double: false } ]);
    wm.defineEffect('drum-and-hihat', [ { instrName: 'drum', note: 'C1', double: false }, { instrName: 'drum', note: 'Ab1', double: false } ]);
    wm.defineEffect('drum-and-crash', [ { instrName: 'drum', note: 'C1', double: false }, { instrName: 'drum', note: 'C#2', double: false } ]);
    wm.defineEffect('drum-and-snare', [ { instrName: 'drum', note: 'C1', double: false }, { instrName: 'drum', note: 'D1', double: false } ]);
    wm.defineEffect('clap-twice', [ { instrName: 'drum', note: 'Eb1', double: true } ]);

    wm.defineEffectMap([
        [ 'basedrum' , 'drum-and-hihat', 'drum-and-crash', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
        [ 'snare', 'drum-and-snare', 'drum-and-crash', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
        [ 'hihat', 'open-hihat', 'snare', 'clap-twice', null ],
    ]);
});

var symbols = [ 0, 1, 2, 3, 4, 0, 2, 4, 2, 1 ];
wm.play(symbols);