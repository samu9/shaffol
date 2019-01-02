<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <md-field>
          <label for="sound">Sound</label>
          <md-select v-model="instrument.synth.voices[0].oscillator.type" name="sound">
            <md-option
              v-for="inst in soundwave"
              v-bind:key="inst"
              v-on:click="instrument.changeOscillator(inst)"
              v-bind:value="inst"
            >{{ inst }}</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="col-md-6">
        <md-field>
          <label for="effect">Effect</label>
          <md-select v-model="selectedEffect" name="effect">
            <md-option
              v-for="e in effects"
              v-bind:key="e.value"
              v-bind:value="e.value"
            >{{ e.value }}</md-option>
          </md-select>
        </md-field>
      </div>
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
  data() {
    return {
      soundwave: ["sine", "sawtooth", "triangle"],
      effects: ["Reverb", "Distortion", "Delay"],
      selectedEffect: "Delay",
      noteMatrixState: "preview"
    };
  }
};
</script>

<style>
@import "./Controls.css";
</style>

