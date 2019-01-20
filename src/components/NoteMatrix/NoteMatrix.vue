<template>
  <div v-if="open" class="note-matrix">
    <div
      class="time-slot"
      v-for="(time, timeKey) in noteGrid"
      v-bind:class="{active: timeKey == instrument.timeIndex % instrument.gridDim}"
      :key="timeKey"
    >
      <div
        class="note-slot"
        v-for="(note, noteKey) in time"
        v-on:click="toggleNote(timeKey,noteKey)"
        v-bind:class="{active: noteGrid[timeKey][noteKey]}"
        :key="noteKey"
      ></div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import Tone from "tone";
import InstrumentService from "../../services/InstrumentService";
// import { EventBus } from "../../main";

export default {
  props: {
    instrument: Object,
  },
  data() {
    return {
      noteGrid: {},
      open: true
    };
  },
  created() {
    for (let t = 0; t < this.instrument.gridDim; t++) {
      let obj = {};
      for (let n = 0; n < this.instrument.gridDim; n++) {
        obj[n] = false;
      }
      Vue.set(this.noteGrid, t, obj);
    }
    this.instrument.EventBus.$on("updatedPattern", pattern => {
      this.updateGrid();
    });
    this.instrument.shufflePattern();
  },
  methods: {
    toggleNote: function(time, note) {
      this.noteGrid[time][note] = !this.noteGrid[time][note];
      if (this.noteGrid[time][note]) {
        this.instrument.patterns[this.instrument.currentPattern][time].push(parseInt(note));
        this.instrument.playNote([note]);
      } else {
        let removeIndex = this.instrument.patterns[this.instrument.currentPattern][time].indexOf(parseInt(note));
        this.instrument.patterns[this.instrument.currentPattern][time].splice(removeIndex, 1);
      }
      this.instrument.updatedPattern();
    },
    clearGrid() {
      for (let t in this.noteGrid) {
        for (let n in this.noteGrid) {
          this.noteGrid[t][n] = false;
        }
      }
    },
    updateGrid() {
      this.clearGrid();
      for (let t in this.instrument.patterns[this.instrument.currentPattern]) {
        for (let n of this.instrument.patterns[this.instrument.currentPattern][t]) {
          this.noteGrid[t][n] = true;
        }
      }
    }
  }
};
</script>

<style>
@import "./NoteMatrix.css";
</style>
