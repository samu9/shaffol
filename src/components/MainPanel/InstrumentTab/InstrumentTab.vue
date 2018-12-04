<template>
  <div class="instrument-tab">
    <div class="circle-container">
      <div class="circle">
        <h1>{{name | capitalize}}</h1>
      </div>
    </div>
    <div class="dd-list">
      <select v-model="selected">
        <option v-for="inst in musicStyle" v-bind:key="inst.value">{{ inst.value }}</option>
      </select>
    </div>
    <div class="btn-container">
      <button
        v-bind:style="{background : muteColor}"
        v-on:click="muteSong"
        id="mute"
        class="btn-opt"
      >
        <h1>{{mute}}</h1>
      </button>
      <button
        v-bind:style="{background : soloColor}"
        v-on:click="soloSong"
        id="solo"
        class="btn-opt"
      >
        <h1>{{solo}}</h1>
      </button>
    </div>
  </div>
</template>


<script>
import "./InstrumentTab.css";

export default {
  props: {
    name: String
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
      musicStyle: [{ value: "Jazz" }, { value: "Rock" }, { value: "Pop" }],
      mute: "MUTE",
      solo: "SOLO",
      muteColor: "rgba(245, 245, 127, 0.596)",
      soloColor: "rgb(207, 124, 124)",
      selected: "Jazz"
    };
  },
  methods: {
    printPattern() {
      if (!this.pattern) return;
      let patt = [];
      for (let p of this.pattern) {
        patt.push(p.join("-"));
      }
      return patt.join(" , ");
    },
    muteSong: function() {
      if (this.mute == "MUTE") {
        this.mute = "NO MUTE";
        this.muteColor = "yellow";
      } else {
        (this.mute = "MUTE"), (this.muteColor = "rgba(245, 245, 127, 0.596)");
      }
      console.log(this.mute);
    },

    soloSong: function() {
      if (this.solo == "SOLO") {
        this.solo = "NO SOLO";
        this.soloColor = "red";
      } else {
        this.solo = "SOLO";
        this.soloColor = "rgb(207, 124, 124)";
      }
      console.log(this.solo);
    }
  }
};
</script>