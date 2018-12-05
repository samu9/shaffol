<template>
  <div class="main-panel">
    <InstrumentTab
        v-for="inst in instruments"
        :key=inst
        :name=inst
    />
    <div class="controls">
      <button v-if="playable" v-on:click="startSong"><font-awesome-icon icon="play" /></button>
      <button v-else v-on:click="pauseSong"><font-awesome-icon icon="pause" /></button>
      <button v-on:click="stopSong"><font-awesome-icon icon="stop" /></button>
    </div>
  </div>
</template>


<script>
    import InstrumentTab from './InstrumentTab/InstrumentTab.vue';
    import './MainPanel.css'
    
    export default {
        data() {
            return {
                instruments: [
                    'lead','bass','drums'
                ],
                playable: true
            }
        },
        methods: {
            startSong: function () {
                console.log("started song");
                this.playable = false;
            },
            pauseSong: function () {
                console.log("paused song");
                this.playable = true;
            },
            stopSong: function () {
                console.log("stopped song");
            }
        },
        components: {
            InstrumentTab
        }
    }
</script>