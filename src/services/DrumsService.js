import Tone from 'tone'

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
            'release' : 1,
            'baseUrl': 'https://s3.eu-central-1.amazonaws.com/shaffol/'
        }
    ).toMaster();

    pattern = {
        "0": "C3",
        "1": null,
        "2": "C3",
        "3": null,
    }
    muted = false;
    timeIndex = 0;

    constructor(musicService) {
        this.musicService = musicService;
        this.musicService.transport.scheduleRepeat(time => {
            this.repeat(time);
        }, "8n");
    }

    repeat() {
        this.timeIndex = this.musicService.timeIndex % 4;
        if(typeof(this.pattern[this.timeIndex]) != 'object'){
            this.sampler.triggerAttack(this.pattern[this.timeIndex]);
        }
        else{
            for(let n in this.pattern[this.timeIndex]){
                this.sampler.triggerAttack(this.pattern[this.timeIndex][n]);
            }
        }

    }
}