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
import InstrumentService from "../../services/InstrumentService";

export default {
  props: {
    name: String,
    noteGrid: Object,
    gridDim: Number,
    noteService: Object,
    octave: Number,
    voice: Object
  },
  data() {
    return {
      timeIndex: 0,
      noteLength: this.gridDim / 2 + "n", // es. per una griglia 16x16 suona 8n = ottavi
      open: true
    };
  },
  methods: {
    toggleNote: function(time, note) {
      this.noteGrid[time][note] = !this.noteGrid[time][note];
    },
    repeat: function(time) { //dovrebbe andare nell InstrumentService
      this.timeIndex = Math.floor(
        this.noteService.timeIndex / (16 / this.gridDim)
      );
      let note;
      for (let n in this.noteGrid[this.timeIndex]) {
        if (
          !this.voice.muted &&
          (this.noteService.solo == null ||
            this.noteService.solo == this.name) &&
          this.noteGrid[this.timeIndex][n] &&
          this.noteService.timeIndex % Math.floor(16 / this.gridDim) == 0
        ) {
          note = this.noteService.getNote(n, this.octave);
          this.voice.synth.triggerAttackRelease(note, this.noteLength, time);
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
