<template>
  <div class="control-select">
    <label>Pattern</label>
    <select v-model="instrument.pattern">
      <option v-for="(pattern, p) in instrument.drumPatterns" v-bind:key="p">{{ p }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    instrument: Object,
    musicService: Object
  }
};
</script>

<style>
@import './Controls.css';
</style>
