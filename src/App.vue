<template>
  <div id="main">
    <h1>Shaffol</h1>
    <MainPanel/>
    <!-- <div class="main-element">
      <NoteMatrix v-for="(inst, i) in instruments" :key="i" :instrument="inst"/>
    </div> -->

    <!-- <div class="temporary-controls">
      <button
        class="btn btn-default"
        v-for="(instM,m) in instruments"
        v-bind:class="{disabled: instM.muted}"
        :key="m"
        v-on:click="instM.muted=!instM.muted"
      >{{ 'Mute ' + m }}</button>
      <button
        class="btn btn-default"
        v-for="(instS,s) in instruments"
        v-bind:class="{disabled: musicService.solo == s}"
        :key="s"
        v-on:click="solo(s)"
      >{{ 'Solo ' + s }}</button>
      <button
        class="btn btn-default"
        v-on:click="musicService.changeTonic()"
      >Change Tonic: {{ this.musicService.tonic }}</button>
      <button
        class="btn btn-default"
        v-on:click="musicService.changeScale()"
      >Change Scale: {{ this.musicService.scale }}</button>
    </div> -->
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
  data() {
    return {
      // instruments: {
      //   lead: new InstrumentService("lead", musicService, 16, 4, "triangle"),
      //   bass: new InstrumentService("bass", musicService, 4, 2, "triangle")
      // },
      // drums: new DrumsService(musicService),
      // musicService: musicService
    };
  },
  components: {
    MainPanel,
    NoteMatrix
  },
  created: function() {},
  methods: {

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