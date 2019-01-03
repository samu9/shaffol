<template>
  <div class="main-panel">
    <InstrumentTab
      v-for="(inst, i) in instruments"
      :key="i"
      :name="i"
      :instrument="inst"
      :musicService="musicService"
    />

    <div class="row controls">
      <div class="col-md-3">
        <button v-on:click="musicService.toggleStartPause();" onclick="this.blur()">
          <font-awesome-icon
            v-bind:icon="musicService.transport.state == 'started'?  'pause' : 'play'"
          />
        </button>
        <button v-on:click="musicService.stop();" onclick="this.blur()">
          <font-awesome-icon icon="stop"/>
        </button>
      </div>
      <div class="col-md-3">
        <md-field>
          <label for="tonic">Tonic</label>
          <md-select v-model="musicService.tonic" name="tonic">
            <md-option
              v-for="(tonic,i) in musicService.notes"
              :key="i"
              v-on:click="musicService.changeTonic(tonic)"
              v-bind:value="tonic"
            >{{ tonic }}</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="col-md-3">
        <md-field>
          <label for="scale">Scale</label>
          <md-select v-model="musicService.scale" class='scale' name="scale">
            <md-option
              v-for="(scale, name) in musicService.scales"
              :key="name"
              v-bind:value="name"
            >{{ name }}</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="col-md-2">
        <input v-model.number="musicService.transport.bpm.value" type="number" min="60" max="260">
      </div>
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
        lead: new InstrumentService("lead", musicService, 16, 3, "triangle"),
        // lead2: new InstrumentService("lead2", musicService, 8, 4, "sine"),
        bass: new InstrumentService("bass", musicService, 4, 2, "triangle"),
        drums: new DrumsService("drums", musicService)
      },
      musicService: musicService
    };
  },
  components: {
    InstrumentTab
  }
};
</script>