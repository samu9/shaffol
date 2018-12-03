import Tone from 'tone'

export default class InstrumentService {
    synth = new Tone.Synth().toMaster();
    reverb = new Tone.Reverb().toMaster();
    muted = false;

    constructor(oscillator) {
        // this.synth.connect(this.reverb);
        this.synth.envelope.attack = 0.005;
        this.synth.envelope.decay = 0.1;
        this.synth.envelope.release = 1;
        this.synth.oscillator.type = oscillator;
    }
}