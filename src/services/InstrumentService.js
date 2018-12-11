import Tone from 'tone'
// import { EventBus } from '../main'
import Vue from 'vue';

export default class InstrumentService {
    synth = new Tone.PolySynth(2, Tone.Synth).toMaster();
    muted = false;
    timeIndex = 0;
    reverb = new Tone.Reverb().toMaster();
    pattern = [];
    EventBus = new Vue();

    constructor(name, musicService, gridDim, octave, oscillator = 'triangle') {
        this.name = name;
        this.gridDim = gridDim;
        this.octave = octave;
        this.noteLength = gridDim / 2 + "n";
        this.measureSize = Math.floor(musicService.measure / gridDim);
        this.musicService = musicService;

        // synth settings
        // this.synth.envelope.attack = 0.005;
        // this.synth.envelope.decay = 0.1;
        // this.synth.envelope.release = 1;
        // this.synth.oscillator.type = oscillator;

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
        if (
            !this.muted &&
            (this.musicService.solo == null ||
                this.musicService.solo == this.name) &&
            this.musicService.timeIndex % this.measureSize == 0
        ) {
            this.synth.triggerAttackRelease(
                this.musicService.getNote(this.pattern[this.timeIndex],this.octave), this.noteLength, time
            ); 
        }
    }

    shufflePattern(){
        for(let t in this.pattern){
            if(Math.random() > 0.2){
                let newNote = Math.floor(Math.random() * this.gridDim);
                this.pattern[t] = [newNote];
            } else {
                this.pattern[t] = [];
            }
        }
        this.EventBus.$emit('shuffled',this.pattern);
    }
}