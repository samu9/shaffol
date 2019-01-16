<template>
  <div class="row">
    <div class="col-md-6">
      <md-field>
        <label for="sound">Sound</label>
        <md-select
          v-model="selectedSoundwave"
          @md-selected="instrument.changeOscillator(selectedSoundwave)"
          @md-opened="musicService.toggleStartPause()"
          @md-closed="musicService.toggleStartPause()"
          name="sound"
          md-dense
        >
          <md-option
            v-for="inst in soundwaves"
            v-bind:key="inst"
            v-bind:value="inst"
          >{{ inst | capitalize }}</md-option>
        </md-select>
      </md-field>
    </div>
    <div class="col-md-6">
      <md-field>
        <label for="effect">Effect</label>
        <md-select
          v-model="selectedEffect"
          @md-selected="instrument.changeEffect(selectedEffect)"
          name="effect"
          md-dense
        >
          <md-option v-for="eff in effects" v-bind:key="eff" v-bind:value="eff">{{ eff | capitalize }}</md-option>
        </md-select>
      </md-field>
    </div>
  </div>
</template>

<script>
import Tone from 'tone'
export default {
  props: {
    name: String,
    instrument: Object,
    musicService: Object
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  data() {
    return {
      soundwaves: ["sine", "sawtooth", "triangle"],
      effects: Object.keys(this.instrument.effects),
      selectedEffect: "none",
    };
  },
  created() {
    
    this.selectedSoundwave = this.instrument.synth.voices[0].oscillator.type;
    this.musicService.EventBus.$on("bpm", bpm => {
      this.instrument.buildEffects();
    });
  },
  methods: {
    changeEffect(newEffect) {
      console.log(newEffect);
    }
  }
};
</script>

<style>
@import "./Controls.css";
</style>

