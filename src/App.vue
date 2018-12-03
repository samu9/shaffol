<template>
  <div id="main">
    <h1>Shaffol</h1>
    <!-- <div class="main-element">
      <p>{{noteService.scale}}</p>
      <p>{{noteService.tonic}}</p>
      <button class="btn btn-success" v-on:click="noteService.changeTonic()">Change Tonic</button>
      <button class="btn btn-warning" v-on:click="noteService.changeScale()">Change Scale</button>
    </div>-->
    <div class="main-element">
      <NoteMatrix
        v-for="(inst, i) in instruments"
        :key="i"
        :noteGrid="inst.noteGrid"
        :gridDim="inst.gridDim"
        :noteService="noteService"
        :octave="inst.octave"
        :settings="inst.voice"
      />
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import MainPanel from "./components/MainPanel/MainPanel.vue";
import NoteMatrix from "./components/NoteMatrix/NoteMatrix.vue";
import NoteService from "./services/NoteService.js";
import { noteService } from "./main.js";
export default {
  data() {
    return {
      instruments: {
        lead: {
          noteGrid: {},
          gridDim: 16,
          octave: 4,
          voice: {
            oscillator: "sawtooth"
          }
        },
        bass: {
          noteGrid: {},
          gridDim: 4,
          octave: 2,
          voice: {
            oscillator: "triangle"
          }
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
</style>