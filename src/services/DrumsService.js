import Tone from 'tone'
import drumPatterns from '../assets/drumPatterns';
import InstrumentService from "./InstrumentService";

export default class DrumsService extends InstrumentService {
    sampler = new Tone.Sampler({
        "C3": "kick0.wav",
        "C#3": "snare0.wav",
        "D3": "hihat1.WAV",
        "D#3": "hihat2.WAV",
        "E3": "clap0.WAV",
        "F3": "clap1.WAV",
    },
        {
            'release': 1,
            'baseUrl': 'https://s3.eu-central-1.amazonaws.com/shaffol/'
        }
    );
    drumPatterns = drumPatterns;

    constructor(name, musicService) {
        super(name, musicService);
        this.sampler.chain(this.volumeControl, this.soloControl, Tone.Master);

        // pattern initialization
        for (let p = 0; p < this.totalPatterns; p++) {
            this.initializePattern(p);
        }

        this.musicService.transport.scheduleRepeat(time => {
            this.repeat(time);
        }, "8n");
    }

    repeat() {
        let pat = this.drumPatterns[this.patterns[this.currentPattern]];
        this.timeIndex = (this.musicService.timeIndex % pat.length);

        if (this.musicService.timeIndex == 0 && !this.restarted) {
            this.currentPattern = (this.currentPattern + 1) % this.totalPatterns;
            pat = this.drumPatterns[this.patterns[this.currentPattern]];
            this.updatedPattern();
        }

        if (typeof (pat[this.timeIndex]) != 'object') {
            this.sampler.triggerAttack(pat[this.timeIndex]);
        }
        else {
            for (let n in pat[this.timeIndex]) {
                this.sampler.triggerAttack(pat[this.timeIndex][n]);
            }
        }

        if (this.restarted) {
            this.restarted = false;
        }
    }
    initializePattern(p) {
        this.shufflePattern(p);
    }
    shufflePattern(i) {
        let newPattern = Math.floor(Math.random() * this.drumPatterns.length);
        while (newPattern == this.patterns[i]) {
            newPattern = Math.floor(Math.random() * this.drumPatterns.length);
        }
        this.patterns[i] = newPattern;
        this.updatedPattern();
    }
    changeDrumPattern(pattern){
        this.patterns[this.currentPattern] = pattern;
        this.updatedPattern();
    }

}