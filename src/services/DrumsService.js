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

    pattern = [
        ["C3","D#3"],
        "D3",
        ["D3"],
        ["C3","D3"],
        ["D3","E3","C#3"],
        "D3",
        ["C3","D3"],
        "D3",
        ["C3","D3"],
        ["C3","D3"],
        "D3",
        "D3",
        ["D3","E3","C#3"],
        ["C3","D3"],
        ["C3","D3"],
        "D3",
    ];
    muted = false;
    timeIndex = 0;

    constructor(name, musicService) {
        this.name = name;
        this.musicService = musicService;
        this.musicService.transport.scheduleRepeat(time => {
            this.repeat(time);
        }, "8n");
    }

    repeat() {
        this.timeIndex = this.musicService.timeIndex % 16;
        if(this.muted || (this.musicService.solo != this.name && this.musicService.solo != null))  return;
        if(typeof(this.pattern[this.timeIndex]) != 'object'){
            this.sampler.triggerAttack(this.pattern[this.timeIndex]);
        }
        else{
            for(let n in this.pattern[this.timeIndex]){
                this.sampler.triggerAttack(this.pattern[this.timeIndex][n]);
            }
        }
    }

    solo() {
        if (this.musicService.solo == this.name) {
            this.musicService.solo = null;
        } else {
            this.musicService.solo = this.name;
        }
    }
}