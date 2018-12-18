<template>
  <div>
    <div class="control-select">
      <label>Sound</label>
      <select v-model="instrument.synth.voices[0].oscillator.type">
        <option
          v-for="inst in soundwave"
          v-bind:key="inst"
          v-on:click="instrument.changeOscillator(inst)"
        >{{ inst }}</option>
      </select>
    </div>
    <div class="control-select">
      <label>Effect</label>
      <select v-model="selectedEffect">
        <option v-for="inst in effects" v-bind:key="inst.value">{{ inst.value }}</option>
      </select>
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
@import './Controls.css';
</style>

