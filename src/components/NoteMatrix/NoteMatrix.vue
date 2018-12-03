<template>
  <div v-if="open" class="note-matrix">
    <font-awesome-icon v-on:click="open = false" class="close-button" icon="times-circle"/>
    <div
      class="time-slot"
      v-for="(time, timeKey) in noteGrid"
      v-bind:class="{active: timeKey == timeIndex % gridDim}"
      :key="timeKey"
    >
      <div
        class="note-slot"
        v-for="(note, noteKey) in time"
        v-bind:class="{active: note}"
        :key="noteKey"
        v-on:click="toggleNote(timeKey,noteKey)"
      ></div>
    </div>
  </div>
</template>


<script>
import Tone from "tone";
import InstrumentService from '../../services/InstrumentService'

export default {
  props: {
    noteGrid: Object,
    gridDim: Number,
    noteService: Object,
    octave: Number,
    settings: Object
  },
  data() {
    return {
      // synth: new Tone.PolySynth(4,Tone.Synth).toMaster(),
      instrument: new InstrumentService(this.settings.oscillator),
      timeIndex: 0,
      noteLength: this.gridDim / 2 + "n", // es. per una griglia 16x16 suona 8n = ottavi
      open: true
    };
  },
  methods: {
    toggleNote: function(time, note) {
      this.noteGrid[time][note] = !this.noteGrid[time][note];
    },
    repeat: function(time) {
      if(this.noteService.transport.status == 'stopped'){
        this.timeIndex = 0;
        return;
      }
      this.timeIndex = Math.floor(
        this.noteService.timeIndex / (16 / this.gridDim)
      );
      for (let n in this.noteGrid[this.timeIndex]) {
        if (
          !this.instrument.muted &&
          this.noteGrid[this.timeIndex][n] &&
          this.noteService.timeIndex % Math.floor(16 / this.gridDim) == 0
        ) {
          let note = this.noteService.getNote(n, this.octave);
          this.instrument.synth.triggerAttackRelease(note, this.noteLength, time);
        }
      }
    }
  },
  created: function() {
    this.noteService.transport.scheduleRepeat(time => {
      this.repeat(time);
    }, "8n");
  },
  mounted: function() {}
};
</script>

<style>
@import "./NoteMatrix.css";
</style>
