import Tone from 'tone'

export default class InstrumentService {
    synth = new Tone.Synth().toMaster();
    reverb = new Tone.Reverb().toMaster();
    muted = false;
    
    constructor(oscillator) {
        // this.synth.connect(this.reverb);
        this.synth.envelope.decay = 0;
        this.synth.envelope.release = 1;
        this.synth.oscillator.type = oscillator;
    }
}