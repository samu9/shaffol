<template>
  <div class="instrument-tab">
    <div class="name-container">
      <div v-on:click="openNoteMatrix()" v-if="noteMatrixState == 'preview'" class="circle">
        <h1>{{name}}</h1>
      </div>
      <NoteMatrix v-if="name != 'drums'" :instrument="instrument" :state="noteMatrixState"/>
      <font-awesome-icon v-else class="drum-icon" icon="drum"/>
    </div>

    <input
      v-model="instrument.volumeControl.volume.value"
      type="range"
      min="-50"
      max="5"
      class="volume-slider"
      orient="vertical"
    >
    <div class="btn-container">
      <button
        v-bind:class="{active: instrument.volumeControl.mute}"
        v-on:click="mute"
        onclick="this.blur()"
        class="mute"
      >MUTE</button>
      
      <button
        v-bind:class="{active: soloProva}"
        v-on:click="solo"
        onclick="this.blur()"
        class="solo"
      >SOLO</button>
    </div>

    <SynthControls class="instrument-controls" v-if="name != 'drums'" :instrument="instrument"/>
    <DrumsControls class="instrument-controls" v-else :instrument="instrument"/>

    <button class="shuffle" v-on:click="instrument.shufflePattern()" onclick="this.blur()">
      <font-awesome-icon icon="random"/>
    </button>

    <div class="clear">
      <button v-on:click="clearInstrument" onclick="this.blur()">
        <font-awesome-icon icon="trash-alt"/>
      </button>
    </div>
  </div>
</template>


<script>
import "./InstrumentTab.css";
import NoteMatrix from "../../NoteMatrix/NoteMatrix";
import SynthControls from "./Controls/SynthControls";
import DrumsControls from "./Controls/DrumsControls";
export default {
  props: {
    name: String,
    instrument: Object,
    musicService: Object
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  data() {
    return {
      noteMatrixState: "preview",
      soloProva: false
    };
  },
  components: {
    NoteMatrix,
    SynthControls,
    DrumsControls
  },
  methods: {
    mute: function() {
      this.instrument.volumeControl.mute = !this.instrument.volumeControl.mute;
      console.log(this.instrument.volumeControl.volume.value)
    },
     solo() {
        this.instrument.soloControl.solo = !this.instrument.soloControl.solo;
        this.soloProva = this.instrument.soloControl.solo;
    },
    shuffle: function() {
      this.instrument.shufflePattern();
    },
    clearInstrument: function() {
      console.log("clear inst");
    },
    openNoteMatrix: function() {
      this.noteMatrixState = "open";
    }
  },
  created() {
    if (this.name != "drums") {
      this.instrument.shufflePattern();
    }
  }
};
</script>