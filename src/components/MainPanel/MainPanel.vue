<template>
  <div class="main-panel">
    <InstrumentTab
      v-for="(inst, i) in instruments"
      :key="i"
      :name="i"
      :instrument="inst"
      :musicService="musicService"
    />
    <div class="controls">
      <!-- anzichè v-if ho associato il valore dell'icona alla condizione del transport -->
      <button v-on:click="musicService.toggleStartPause();" onclick="this.blur()">
        <font-awesome-icon
          v-bind:icon="musicService.transport.state == 'started'?  'pause' : 'play'"
        />
      </button>
      <button v-on:click="musicService.stop();" onclick="this.blur()">
        <font-awesome-icon icon="stop"/>
      </button>

      <select v-model="musicService.tonic">
        <option v-for="(tonic,i) in musicService.notes" :key="i">{{ tonic }}</option>
      </select>
      <select v-model="musicService.scale">
        <option v-for="(scale, name) in musicService.scales" :key="name">{{ name }}</option>
      </select>
      <input v-model="musicService.transport.bpm.value" type="number" min="60" max="260">
    </div>
  </div>
</template>


<script>
import "./MainPanel.css";
import { musicService } from "../../main.js";
import InstrumentTab from "./InstrumentTab/InstrumentTab.vue";
import InstrumentService from "../../services/InstrumentService";
import DrumsService from "../../services/DrumsService";

export default {
  data() {
    return {
      instruments: {
        lead: new InstrumentService("lead", musicService, 16, 4, "triangle"),
        bass: new InstrumentService("bass", musicService, 4, 2, "triangle"),
        drums: new DrumsService("drums", musicService)
      },
      musicService: musicService
      // instruments: ["LEAD", "BASS", "DRUMS"],
      // playable: true
    };
  },
  mounted() {
    this.$root.$on("handlingMute", () => {});
  },
  methods: {
    // startSong: function() {
    //   console.log("started song");
    //   this.playable = false;
    // },
    // pauseSong: function() {
    //   console.log("paused song");
    //   this.playable = true;
    // },
    // stopSong: function() {
    //   console.log("stopped song");
    // }
  },
  components: {
    InstrumentTab
  }
};
</script>