<template>
  <div id="main">
    <h1>Shaffol</h1>
    <NoteMatrix :noteGrid="grid" :gridDim="gridDim"/>
  </div>
</template>


<script>
import Vue from "vue";
import MainPanel from "./components/MainPanel/MainPanel.vue";
import NoteMatrix from "./components/NoteMatrix/NoteMatrix.vue";
export default {
  data() {
    return {
      gridDim: 16,
      grid: {},
      gridB: {}
    };
  },
  components: {
    MainPanel,
    NoteMatrix
  },
  created: function() {
    for (let t = 0; t < this.gridDim; t++) {
      var obj = {};
      for (let n = 0; n < this.gridDim; n++) {
        // obj[n] = Math.random() > 0.15?false: true;
        obj[n] = false;
      }
      Vue.set(this.grid, t, obj); 
    }
  },
  methods:{
    initializeGrid: function(grid){
    }
  }
};
</script>

<style>
#main {
  width: 100%;
  height: 100%;
}
#main > h1 {
  text-align: center;
  font-size: 60px;
  color: #ffffff5d;
}
</style>