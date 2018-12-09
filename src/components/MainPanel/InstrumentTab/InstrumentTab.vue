<template>
  <div  class="instrument-tab">
    <div class="circle-container">
      <div class="circle">
        <h1>{{name | capitalize}}</h1>
      </div>
    </div>
    <div class="btn-container">
      <button v-bind:class="{active: mute}"  v-on:click="muteSong" onclick="this.blur()" id="mute">
        <h1>MUTE</h1>
      </button>
      <button v-bind:class="{active: solo}" v-on:click="soloSong" onclick="this.blur()" id="solo">
        <h1>SOLO</h1>
      </button>
    </div>
    <div class="sound">
      <select v-model="selected">
        <option v-for="inst in musicStyle" v-bind:key="inst.value">{{ inst.value }}</option>
      </select>
    </div>
    <div class="effect">
      <select v-model="selected2">
        <option v-for="inst in effects" v-bind:key="inst.value">{{ inst.value }}</option>
      </select>
    </div>
    <div class="shuffle">
      <button v-on:click="shuffleSong" onclick="this.blur()">
        <font-awesome-icon icon="random"/>
      </button>
    </div>
    <div class="clear">
      <button v-on:click="clearInstrument" onclick="this.blur()">
        <font-awesome-icon icon="trash-alt"/>
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
      effects: [
        { value: "Triangle" },
        { value: "Distortion" },
        { value: "Delay" }
      ],
      mute: false,
      solo: false,
      selected: "Jazz",
      selected2: "Triangle"
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
      if (this.mute == false) {
        this.mute = true;
      } else {
        this.mute = false;
      }
      console.log("mute: " + this.mute);
    },
    soloSong: function() {
      if (this.solo == false) {
        this.solo = true;
      } else {
        this.solo = false;
      }
      console.log("solo: " + this.solo);
    },
    shuffleSong: function() {
      console.log("shuffle song");
    },
    clearInstrument: function() {
      console.log("clear inst");
    }
  }
};
</script>