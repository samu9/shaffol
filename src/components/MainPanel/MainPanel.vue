<template>
  <div class="main-panel">
    <InstrumentTab v-for="inst in instruments" :key="inst" :name="inst"/>
    <div class="controls">
      <button v-if="playable" v-on:click="startSong" onclick="this.blur()">
        <font-awesome-icon icon="play"/>
      </button>
      <button v-else v-on:click="pauseSong" onclick="this.blur()">
        <font-awesome-icon icon="pause"/>
      </button>
      <button v-on:click="stopSong" onclick="this.blur()">
        <font-awesome-icon icon="stop"/>
      </button>
    </div>
  </div>
</template>


<script>
import InstrumentTab from "./InstrumentTab/InstrumentTab.vue";
import "./MainPanel.css";

export default {
  data() {
    return {
      instruments: ["LEAD", "BASS", "DRUMS"],
      playable: true
    };
  },
  mounted() {
    this.$root.$on("handlingMute", () => {

    });
  },
  methods: {
    startSong: function() {
      console.log("started song");
      this.playable = false;
    },
    pauseSong: function() {
      console.log("paused song");
      this.playable = true;
    },
    stopSong: function() {
      console.log("stopped song");
    }
  },
  components: {
    InstrumentTab
  }
};
</script>