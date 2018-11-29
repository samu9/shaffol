<template>
  <div class="note-matrix">
    <div class="time-slot" 
      v-for="(time, timeKey) in noteGrid" 
      v-bind:class="{active: timeKey == timeIndex % gridDim}"
      :key="timeKey">
      <div
        class="note-slot"
        v-for="(note, noteKey) in time"
        v-bind:class="{active: note}"
        :key="noteKey"
        v-on:click="toggleNote(timeKey,noteKey)"></div>
    </div>
  </div>
</template>


<script>
import Tone from "tone";

export default {
  props: { noteGrid: Object, gridDim: Number },
  data() {
    return {
      synth: new Tone.PolySynth().toMaster(),
      timeIndex: -1
    };
  },
  methods: {
    toggleNote: function(time, note) {
      this.noteGrid[time][note] = !this.noteGrid[time][note];
    },
    repeat: function(time) {
      this.timeIndex++;
      var notes = ['C2','D#2','F2','G2','C3','D#3','F3','G3','C4','D#4','F4','G4','C5','D#5','F5','G5',];
      let step = this.timeIndex % this.gridDim;
      for (let n in this.noteGrid[step]) {
        if (this.noteGrid[step][n]) {
          this.synth.triggerAttackRelease(notes[n], "8n", time);
        }
      }
    }
  },
  created: function() {},
  mounted: function() {
    // var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
    // this.synth.connect(pingPong);
    Tone.Transport.scheduleRepeat(this.repeat, "8n");
    Tone.Transport.start();
    Tone.Transport.bpm.value = 80;
  }
};
</script>

<style>
@import "./NoteMatrix.css";
</style>
