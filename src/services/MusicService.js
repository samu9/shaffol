import Tone from 'tone'
import Vue from 'vue';

export default class MusicService {
    notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    scales = {
        "Minor": [0, 2, 3, 5, 7, 8, 10],
        "Major": [0, 2, 4, 5, 7, 9, 11],
        "Pentatonic Minor": [0, 3, 5, 7, 8],
        "Pentatonic Major": [0, 2, 4, 7, 9],
    };
    time = 0;
    timeIndex = -1;
    measure = 16;
    transport = Tone.Transport;
    EventBus = new Vue();

    constructor(key, scale, bpm) {
        this.key = key;
        this.keyIndex = this.notes.indexOf(key);
        this.scale = scale;
        this.transport.bpm.value = bpm;
        this.transport.scheduleRepeat(
            (time) => {
                this.repeat(time);
            }, "8n");
        // this.transport.start();
    }
    repeat(time) {
        this.timeIndex = (this.timeIndex + 1) % this.measure;
    }

    changeKey(newKey) {
        this.keyIndex = this.notes.indexOf(newKey);
        this.key = newKey;
    }
    randomKey() {
        let randIndex = Math.floor(Math.random() * this.notes.length);
        this.keyIndex = randIndex;
        this.key = this.notes[this.keyIndex];
    }
    changeScale(newScale) {
        this.scale = newScale;
    }
    randomScale() {
        let keys = Object.keys(this.scales);
        let newScale = this.scale;
        while (newScale == this.scale) {
            newScale = keys[Math.floor(Math.random() * keys.length)];
        }
        this.scale = newScale;
    }
    changeBpm(bpm) {
        if (bpm < 60) {
            bpm = 60;
        } else if (bpm > 220) {
            bpm = 220;
        }
        this.transport.bpm.value = bpm;
        this.EventBus.$emit('bpm', bpm);
    }
    randomBpm(){
        let newBpm = Math.floor(Math.random() * 220);
        console.log(newBpm);
        this.changeBpm(newBpm);
    }
    getNote(index, octave) {
        let notes = []
        if (index.length > 0) {
            for (let i of index) {
                let octaves = octave + Math.floor(i / this.scales[this.scale].length);
                let noteIndex = this.scales[this.scale][i % this.scales[this.scale].length] + this.keyIndex;
                let newOctave = octaves + Math.floor(noteIndex / this.notes.length);
                notes.push(this.notes[noteIndex % this.notes.length] + newOctave);
            }
        }
        return notes;
    }
    toggleStartPause() {
        if (this.transport.state == "started") {
            this.transport.pause();
        }
        else {
            this.transport.start();
        }
    }
    stop() {
        this.timeIndex = -1;
        this.transport.stop();
    }
}