<template>
  <div v-if="open" class="note-matrix">
    <!-- <font-awesome-icon v-if="state == 'open'" v-on:click="open = false" class="close-button" icon="times-circle"/> -->
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
    this.instrument.EventBus.$on("shuffled", pattern => {
      this.updateGrid();
    });
    this.instrument.shufflePattern();
  },
  methods: {
    toggleNote: function(time, note) {
      this.noteGrid[time][note] = !this.noteGrid[time][note];
      if (this.noteGrid[time][note]) {
        this.instrument.pattern[time].push(parseInt(note));
      } else {
        let removeIndex = this.instrument.pattern[time].indexOf(parseInt(note));
        this.instrument.pattern[time].splice(removeIndex, 1);
      }
      this.instrument.updatePattern();
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
      for (let t in this.instrument.pattern) {
        for (let n of this.instrument.pattern[t]) {
          this.noteGrid[t][n] = true;
        }
      }
    }
    // getIndex: function(note) {
    //   let noteLetter = note[0];
    //   let noteOctave = note[1];
    //   console.log(note[0]);
    // }
  }
};
</script>

<style>
@import "./NoteMatrix.css";
</style>
