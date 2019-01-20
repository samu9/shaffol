import Tone from 'tone'
import Vue from 'vue';
import InstrumentService from "./InstrumentService";

export default class SynthService extends InstrumentService{
    synth = new Tone.PolySynth(3, Tone.Synth);
    activeEffect = "none"

    constructor(name, musicService, gridDim, octave, oscillator = 'triangle') {
        super(name, musicService);
        this.synth.chain(this.volumeControl, this.soloControl, Tone.Master);
        this.gridDim = gridDim;
        this.octave = octave;
        this.noteLength = gridDim / 2 + "n";
        this.measureSize = Math.floor(musicService.measure / gridDim);
        this.blocked = false;

        // synth settings
        for (let v in this.synth.voices) {
            this.synth.voices[v].envelope.attack = 0.005;
            this.synth.voices[v].envelope.decay = 0.1;
            this.synth.voices[v].envelope.release = 1;
            this.synth.voices[v].oscillator.type = oscillator;
        }
        // pattern initialization
        for (let p = 0; p < this.totalPatterns; p++) {
            this.initializePattern(p);
        }
        // building effects
        this.buildEffects();

        // starting the repeat function
        this.musicService.transport.scheduleRepeat(time => {
            this.repeat(time);
        }, "8n");
    }

    repeat(time) {
        // updating timeIndex
        this.timeIndex = Math.floor(this.musicService.timeIndex / this.measureSize);

        if (this.musicService.timeIndex == 0 && !this.restarted) {
            this.currentPattern = (this.currentPattern + 1) % this.totalPatterns;
            this.updatedPattern();
        }
        
        if ((this.musicService.timeIndex % this.measureSize == 0) && !this.blocked) {
            this.synth.triggerAttackRelease(
                this.musicService.getNote(this.patterns[this.currentPattern][this.timeIndex], this.octave), this.noteLength, time
            );
        }
        if(this.restarted){
            this.restarted = false;
        }
    }
    playNote(note, time){
        this.synth.triggerAttackRelease(
            this.musicService.getNote(note, this.octave), this.noteLength, time)
    };
    initializePattern(i){
        this.patterns[i] = [];
            for (let t = 0; t < this.gridDim; t++) {
                this.patterns[i][t] = [];
            }
    }
    shufflePattern(p) {
        for (let t in this.patterns[p]) {
            if (Math.random() > 0.2) {
                let newNote = Math.floor(Math.random() * this.gridDim);
                this.patterns[p][t] = [newNote];
            } else {
                this.patterns[p][t] = [];
            }
        }
        this.updatedPattern();
    }
    clearPattern(i) {
        for (let t in this.patterns[i]) {
            this.patterns[i][t] = [];
        }
        this.updatedPattern();
    }
    clearAllPatterns(){
        for (let p in this.patterns){
            this.clearPattern(p);
        }
    }
    addPattern(){
        super.addPattern();
        if(this.totalPatterns <= 4){
            this.initializePattern(this.totalPatterns-1);
        }
    }
    changeOscillator(oscillator) {
        this.blocked = true;
        for (let v in this.synth.voices) {
            this.synth.voices[v].oscillator.type = oscillator;
        }
        setTimeout( () => {
            this.blocked = false;
        },1500);
    }
    shuffleOscillator(){

    }
    buildEffects() {
        // used to rebuild effects when bpm is changed to synchronize effects to the new bpm
        // every instrument is switched to none, every effects is rebuilt and the swtich back to the
        // previous effect
        let eff = this.activeEffect;
        this.changeEffect("none");
        delete this.effects;
        this.effects = {
            none: null,
            delay: new Tone.FeedbackDelay(
                {
                    "delayTime": "4n",
                    "feedback": 0.3,
                    "wet": 1
                }),
            reverb: new Tone.Reverb(
                {
                    "wet": 1,
                    "decay": 3,
                    "preDelay": 1
                }),
            tremolo: new Tone.Vibrato(),
        }
        this.changeEffect(eff);
    }
    changeEffect(effect) {
        if (effect == this.activeEffect) return;
        if (this.activeEffect != "none") {
            this.effects[this.activeEffect].disconnect(this.synth);
        }
        this.activeEffect = effect;
        if (effect == "reverb") {
            this.effects[effect].generate();
        }
        if (effect != "none") {
            this.effects[effect].chain(this.volumeControl, this.soloControl);
            this.synth.connect(this.effects[effect]);
        }
    }
    shuffleEffect(){
        
    }
}