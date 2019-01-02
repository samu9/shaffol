<template>
  <div class="control-select">
    <md-field>
      <label for="pattern">Pattern</label>
      <md-select v-model="instrument.pattern" name="pattern">
        <md-option v-for="(pattern, p) in instrument.drumPatterns" v-bind:key="p" v-bind:value="p">{{ p }}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    instrument: Object,
    musicService: Object
  },
};
</script>

<style>
/* @import "./Controls.css"; */
</style>
