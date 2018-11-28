<template>
  <div class="main-panel">
    <InstrumentTab
        v-for="inst in instruments"
        :key=inst
        :name=inst
    />
    <div class="controls">
      <button v-on:click="startSong"><font-awesome-icon icon="play" /></button>
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
                ]
            }
        },
        methods: {
            startSong: function () {
                console.log("started song");
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