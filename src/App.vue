<template>
  <div id="main">
    <h1>Shaffol</h1>
    <div class="main-element">
      <NoteMatrix
        v-for="(inst, i) in instruments"
        :key="i"
        :noteGrid="inst.noteGrid"
        :gridDim="inst.gridDim"
        :noteService="noteService"
        :octave="inst.octave"
        :voice="inst.voice"
        :name="i"
      />
    </div>

    <div class="temporary-controls">
      <button
        class="btn btn-default"
        v-for="(instM,m) in instruments"
        v-bind:class="{disabled: instM.voice.muted}"
        :key="m"
        v-on:click="instM.voice.muted=!instM.voice.muted"
      >{{ 'Mute ' + m }}</button>
      <button
        class="btn btn-default"
        v-for="(instS,s) in instruments"
        v-bind:class="{disabled: noteService.solo == s}"
        :key="s"
        v-on:click="solo(s)"
      >{{ 'Solo ' + s }}</button>
      <button
        class="btn btn-default"
        v-on:click="noteService.changeTonic()"
      >Change Tonic: {{ this.noteService.tonic }}</button>
      <button
        class="btn btn-default"
        v-on:click="noteService.changeScale()"
      >Change Scale: {{ this.noteService.scale }}</button>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import MainPanel from "./components/MainPanel/MainPanel.vue";
import NoteMatrix from "./components/NoteMatrix/NoteMatrix.vue";
import NoteService from "./services/NoteService.js";
import { noteService } from "./main.js";
import InstrumentService from "./services/InstrumentService";
export default {
  data() {
    return {
      instruments: {
        lead: {
          noteGrid: {},
          gridDim: 16,
          octave: 4,
          voice: new InstrumentService("sawtooth")
        },
        bass: {
          noteGrid: {},
          gridDim: 4,
          octave: 2,
          voice: new InstrumentService("triangle")
        }
      },
      noteService: noteService
    };
  },
  components: {
    MainPanel,
    NoteMatrix
  },
  created: function() {
    for (let inst in this.instruments) {
      this.initializeGrid(
        this.instruments[inst].noteGrid,
        this.instruments[inst].gridDim
      );
    }
  },
  methods: {
    initializeGrid: function(grid, gridDim) {
      for (let t = 0; t < gridDim; t++) {
        let obj = {};
        let count = 0;
        for (let n = 0; n < gridDim; n++) {
          obj[n] = Math.random() < 0.2 && count < 1 ? true : false;
          if (obj[n]) count++;
          // obj[n] = false;
          // obj[n] = (t == n);
        }
        Vue.set(grid, t, obj);
      }
    },
    solo(s) {
      if(this.noteService.solo == s){
        this.noteService.solo = null;
      } else{
        this.noteService.solo = s;
      }
      console.log(this.noteService.solo);
    }
  }
};
</script>

<style>
#main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#main > h1 {
  text-align: center;
  font-size: 120px;
  margin: 0;
  padding: 0;
  /* color: transparent; */
  /* -webkit-text-stroke: 2px #ffffff5d; */
  background: -webkit-linear-gradient(
    -86deg,
    #ffffff7d 0%,
    #ffffff2d 50%,
    #ffffff8d 100%
  );
  -webkit-background-clip: text;
  -webkit-text-stroke: 4px transparent;
  color: #202020;
}
#main p {
  color: white;
}
/*provvisorio*/
.main-element {
  display: flex;
  flex-direction: row;
}
.temporary-controls {
  margin-top: 5px;
  display: flex;
  justify-content: center;
}
.temporary-controls .btn {
  margin: 0px 5px;
}
</style>