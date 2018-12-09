import Tone from 'tone'

export default class InstrumentService {
    synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
    muted = false;
    timeIndex = 0;
    reverb = new Tone.Reverb().toMaster();
    noteGrid = {};

    constructor(name, musicService, gridDim, octave, oscillator = 'triangle') {
        this.name = name;
        this.gridDim = gridDim;
        this.octave = octave;
        this.noteLength = gridDim / 2 + "n";
        this.musicService = musicService;

        // synth settings
        // this.synth.envelope.attack = 0.005;
        // this.synth.envelope.decay = 0.1;
        // this.synth.envelope.release = 1;
        // this.synth.oscillator.type = oscillator;

        // noteGrid initialization
        for (let t = 0; t < gridDim; t++) {
            let obj = {};
            let count = 0;
            for (let n = 0; n < gridDim; n++) {
                obj[n] = Math.random() < 0.2 && count < 2 ? true : false;
                if (obj[n]) count++;
                // obj[n] = false;
                // obj[n] = (t == n);
            }
            this.noteGrid[t] = obj;
        }

        // starting the repeat function
        this.musicService.transport.scheduleRepeat(time => {
            this.repeat(time);
        }, "8n");
    }

    reinitializeGrid(){
        for (let t = 0; t < gridDim; t++) {
            let obj = {};
            let count = 0;
            for (let n = 0; n < gridDim; n++) {
                // obj[n] = Math.random() < 0.2 && count < 1 ? true : false;
                // if (obj[n]) count++;
                obj[n] = false;
            }
            this.noteGrid[t] = obj;
        }
    }

    repeat(time) {
        // updating timeIndex
        this.timeIndex = Math.floor(
            this.musicService.timeIndex / (16 / this.gridDim)
        );

        // check if play the note
        for (let n in this.noteGrid[this.timeIndex]) {
            if (
                !this.muted &&
                (this.musicService.solo == null ||
                    this.musicService.solo == this.name) &&
                this.noteGrid[this.timeIndex][n] &&
                this.musicService.timeIndex % Math.floor(16 / this.gridDim) == 0
            ) {
                this.synth.triggerAttackRelease(this.musicService.getNote(n, this.octave), this.noteLength, time);
            }
        }
    }
}