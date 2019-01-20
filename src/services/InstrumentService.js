import Tone from 'tone'
// import { EventBus } from '../main'
import Vue from 'vue';

export default class InstrumentService {
    volumeControl = new Tone.Volume();
    soloControl = new Tone.Solo();
    timeIndex = 0;
    patterns = [];
    totalPatterns = 2;
    currentPattern = 0;
    restarted = true;
    EventBus = new Vue();

    constructor(name, musicService) {
        this.name = name;
        this.musicService = musicService;
    }
    updatedPattern() {
        this.EventBus.$emit('updatedPattern', this.currentPattern);
    }
    shuffleAllPatterns() {
        for (let p in this.patterns) {
            this.shufflePattern(p);
        }
    }
    clearAllPatterns() {
        for (let p in this.patterns) {
            this.clearPattern(p);
        }
    }
    selectPattern(i) {
        if (this.musicService.transport.state == "started") return;
        this.currentPattern = i;
        this.updatedPattern();
    }
    addPattern() {
        if (this.musicService.transport.state == "started") return;
        if (this.totalPatterns < 4) {
            this.totalPatterns++;
        }
        this.selectPattern(this.totalPatterns - 1)
    }
    deletePattern(i) {
        if (this.totalPatterns == 1) return;
        this.patterns.splice(i, 1);
        this.totalPatterns--;
        this.musicService.stop();
    }
    mute() {
        this.volumeControl.mute = !this.volumeControl.mute;
        this.effectsVolumeControl.mute = !this.effectsVolumeControl.mute;
    }
    stop() {
        this.currentPattern = 0;
        this.timeIndex = 0;
        this.restarted = true;
        this.updatedPattern();
    }
}