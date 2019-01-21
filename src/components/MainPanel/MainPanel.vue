<template>
  <div class="main-panel">
    <InstrumentTab
      v-for="(inst, i) in instruments"
      :key="i"
      :name="i"
      :instrument="inst"
      :musicService="musicService"
    />

    <div class="row controls" style= "margin: 10px auto;">
      <div style="padding-left:0; padding-right:0;" class="col-md-3">
        <md-button
          class="md-raised"
          v-on:click="musicService.toggleStartPause();"
          onclick="this.blur()"
        >
          <font-awesome-icon
            v-bind:icon="musicService.transport.state == 'started'?  'pause' : 'play'"
            size="lg"
          />
        </md-button>
        <md-button class="md-raised" v-on:click="musicService.stop();" onclick="this.blur()">
          <font-awesome-icon icon="stop" size="lg"/>
        </md-button>
      </div>
      <div class="col-md-2">
        <md-field>
          <label for="key">Key</label>
          <md-select
            v-model="musicService.key"
            @md-selected="musicService.changeKey(musicService.key)"
            name="key"
            md-dense
          >
            <md-option v-for="(key,i) in musicService.notes" :key="i" :value="key">{{ key }}</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="col-md-3">
        <md-field>
          <label for="scale">Scale</label>
          <md-select v-model="musicService.scale" class="scale" name="scale" md-dense>
            <md-option
              v-for="(scale, name) in musicService.scales"
              :key="name"
              :value="name"
            >{{ name }}</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="col-md-2">
        <md-field>
          <label>BPM</label>
          <md-input v-model.number="bpm" @change="changeBpm(bpm)" @submit="changeBpm(bpm)"></md-input>
        </md-field>
      </div>
      <div class="col-md-2">
        <md-button
          v-on:click="shuffleAll()"
          onclick="this.blur()"
          class="md-raised shuffle"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Shuffle ALL"
        >
          <font-awesome-icon icon="random" size="lg"/>
        </md-button>
      </div>
    </div>
  </div>
</template>


<script>
import "./MainPanel.css";
import { musicService } from "../../main.js";
import InstrumentTab from "./InstrumentTab/InstrumentTab.vue";
import InstrumentService from "../../services/InstrumentService";
import SynthService from "../../services/SynthService";
import DrumsService from "../../services/DrumsService";

export default {
  data() {
    return {
      instruments: {
        lead: new SynthService("lead", musicService, 16, 3, "triangle"),
        bass: new SynthService("bass", musicService, 4, 2, "triangle"),
        drums: new DrumsService("drums", musicService)
      },
      musicService: musicService,
      bpm: musicService.transport.bpm.value
    };
  },
  components: {
    InstrumentTab
  },
  created() {
    for (let i in this.instruments) {
      this.instruments[i].shuffleAllPatterns();
    }
    this.musicService.EventBus.$on("bpm", bpm => {
      this.bpm = bpm;
    });
  },
  methods: {
    changeBpm: function() {
      this.musicService.changeBpm(this.bpm);
      this.bpm = Math.round(musicService.transport.bpm.value);
    },
    shuffleAll: function() {
      for (let i in this.instruments) {
        this.instruments[i].shuffleAllPatterns();
      }
      this.musicService.randomKey();
      this.musicService.randomScale();
      this.musicService.randomBpm();
      this.musicService.stop();
      this.musicService.toggleStartPause();
    }
  }
};
</script>