<template>
  <div id="main">
    <h1>Shaffol</h1>
    <MainPanel/>
  </div>
</template>


<script>
import Vue from "vue";
import MainPanel from "./components/MainPanel/MainPanel.vue";
import NoteMatrix from "./components/NoteMatrix/NoteMatrix.vue";
import MusicService from "./services/MusicService.js";
import { musicService } from "./main.js";
import InstrumentService from "./services/InstrumentService";
import DrumsService from "./services/DrumsService";
export default {
  components: {
    MainPanel,
  },
  created: function() {},
  methods: {
  }
};
</script>

<style>
@import url('../node_modules/bootstrap/dist/css/bootstrap.min.css');
@import url('../node_modules/bootstrap-vue/dist/bootstrap-vue.css');
@import url('./main.css');

#main {
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