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
            v-for="inst in soundwave"
            v-bind:key="inst"
            v-on:click="instrument.changeOscillator(inst)"
            v-bind:value="inst"
          >{{ inst | capitalize }}</md-option>
        </md-select>
      </md-field>
    </div>
    <div class="col-md-6">
      <md-field>
        <label for="effect">Effect</label>
        <md-select v-model="selectedEffect" name="effect" md-dense>
          <md-option v-for="e in effects" v-bind:key="e.value" v-bind:value="e.value">{{ e.value }}</md-option>
        </md-select>
      </md-field>
    </div>
  </div>
</template>

<script>
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
      soundwave: ["sine", "sawtooth", "triangle"],
      effects: ["Reverb", "Distortion", "Delay"],
      selectedEffect: "Delay",
      noteMatrixState: "preview"
    };
  },
  created() {
    this.selectedSoundwave = this.instrument.synth.voices[0].oscillator.type;
  },
  methods: {
    prova: function() {
      console.log(0);
    }
  }
};
</script>

<style>
@import "./Controls.css";
</style>

