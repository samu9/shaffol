<template>
  <div class="control-select">
    <md-field>
      <label for="pattern">Pattern</label>
      <md-select
        v-model="pattern"
        @md-selected="instrument.changeDrumPattern(pattern)"
        name="pattern"
      >
        <md-option
          v-for="(pattern, p) in instrument.drumPatterns"
          v-bind:key="p"
          v-bind:value="p"
        >{{ p }}</md-option>
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
  data() {
    return {
      pattern: 0
    };
  },
  created() {
    this.pattern = this.instrument.patterns[this.instrument.currentPattern];
    this.instrument.EventBus.$on("updatedPattern", pattern => {
      this.pattern = this.instrument.patterns[this.instrument.currentPattern];
    });
  }
};
</script>

<style>
/* @import "./Controls.css"; */
</style>
