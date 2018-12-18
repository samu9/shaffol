import Tone from 'tone'
import drumPatterns from '../assets/drumPatterns';
export default class DrumsService {
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
    volumeControl = new Tone.Volume();
    soloControl = new Tone.Solo();
    drumPatterns = drumPatterns;
    pattern = 6;
    timeIndex = 0;

    constructor(name, musicService) {
        this.sampler.chain(this.volumeControl, this.soloControl, Tone.Master);
        this.name = name;
        this.musicService = musicService;
        this.musicService.transport.scheduleRepeat(time => {
            this.repeat(time);
        }, "8n");
    }

    repeat() {
        this.timeIndex = this.musicService.timeIndex % this.drumPatterns[this.pattern].length;
        if (typeof (this.drumPatterns[this.pattern][this.timeIndex]) != 'object') {
            this.sampler.triggerAttack(this.drumPatterns[this.pattern][this.timeIndex]);
        }
        else {
            for (let n in this.drumPatterns[this.pattern][this.timeIndex]) {
                this.sampler.triggerAttack(this.drumPatterns[this.pattern][this.timeIndex][n]);
            }
        }
        // auto-shuffle
        // if(this.musicService.timeIndex == this.musicService.measure - 1){
        //     this.shufflePattern();
        // }
    }

    shufflePattern() {
        let newPattern = Math.floor(Math.random() * this.drumPatterns.length);
        while (newPattern == this.pattern) {
            newPattern = Math.floor(Math.random() * this.drumPatterns.length);
        }
        this.pattern = newPattern;
    }
}