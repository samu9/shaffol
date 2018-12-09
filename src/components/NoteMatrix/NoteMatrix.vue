<template>
  <div v-if="open" class="note-matrix">
    <font-awesome-icon v-on:click="open = false" class="close-button" icon="times-circle"/>
    <div
      class="time-slot"
      v-for="(time, timeKey) in instrument.noteGrid"
      v-bind:class="{active: timeKey == instrument.timeIndex % instrument.gridDim}"
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
    instrument: Object
  },
  data() {
    return {
      open: true
    };
  },
  methods: {
    toggleNote: function(time, note) {
      this.instrument.noteGrid[time][note] = !this.instrument.noteGrid[time][note];
    }
  },
};
</script>

<style>
@import "./NoteMatrix.css";
</style>
