import Tone from 'tone'
// import { EventBus } from '../main'
import Vue from 'vue';

export default class InstrumentService {
    synth = new Tone.PolySynth(2, Tone.Synth);
    volumeControl = new Tone.Volume();
    soloControl = new Tone.Solo();
    timeIndex = 0;
    reverb = new Tone.Reverb();
    pattern = [];
    EventBus = new Vue();

    constructor(name, musicService, gridDim, octave, oscillator = 'triangle') {
        this.synth.chain(this.volumeControl, this.soloControl, Tone.Master);
        this.name = name;
        this.gridDim = gridDim;
        this.octave = octave;
        this.noteLength = gridDim / 2 + "n";
        this.measureSize = Math.floor(musicService.measure / gridDim);
        this.musicService = musicService;

        // synth settings
        for (let v in this.synth.voices) {
            this.synth.voices[v].envelope.attack = 0.005;
            this.synth.voices[v].envelope.decay = 0.1;
            this.synth.voices[v].envelope.release = 1;
            this.synth.voices[v].oscillator.type = oscillator;
        }
        // pattern initialization
        for (let t = 0; t < gridDim; t++) {
            this.pattern[t] = [];
        }

        // starting the repeat function
        this.musicService.transport.scheduleRepeat(time => {
            this.repeat(time);
        }, "8n");
    }

    repeat(time) {
        // updating timeIndex
        this.timeIndex = Math.floor(this.musicService.timeIndex / this.measureSize);
        // auto-shuffle
        // if (this.musicService.timeIndex == 0) {
        //     this.shufflePattern();
        // }
        if (this.musicService.timeIndex % this.measureSize == 0) {
            this.synth.triggerAttackRelease(
                this.musicService.getNote(this.pattern[this.timeIndex], this.octave), this.noteLength, time
            );
        }
    }

    shufflePattern() {
        for (let t in this.pattern) {
            if (Math.random() > 0.2) {
                let newNote = Math.floor(Math.random() * this.gridDim);
                this.pattern[t] = [newNote];
            } else {
                this.pattern[t] = [];
            }
        }
        this.EventBus.$emit('shuffled', this.pattern);
    }
    changeOscillator(oscillator) {
        for (let v in this.synth.voices) {
            this.synth.voices[v].oscillator.type = oscillator;
        }
    }
}