<template>
  <div class="instrument-tab">
    <div class="circle-container">
      <div class="circle">
        <h1>{{name}}</h1>
      </div>
      <NoteMatrix v-if="name!='drums'" :instrument="instrument"/>
      <font-awesome-icon class="drum-icon" v-else icon="drum"/>
    </div>
    <div class="btn-container">
      <button
        v-bind:class="{active: instrument.muted}"
        v-on:click="mute"
        onclick="this.blur()"
        id="mute"
      >
        <h1>MUTE</h1>
      </button>
      
      <button
        v-bind:class="{active: musicService.solo == name}"
        v-on:click="instrument.solo()"
        onclick="this.blur()"
        id="solo"
      >
        <h1>SOLO</h1>
      </button>
    </div>
    <div class="instrument-settings" v-if="name!='drums'">
      <div class="sound">
        <h1>SOUND</h1>
        <select>
          <option
            v-for="inst in musicStyle"
            v-bind:key="inst"
            v-on:click="instrument.changeOscillator(inst)"
          >{{ inst }}</option>
        </select>
      </div>
      <div class="effect">
        <h1>EFFECT</h1>
        <select v-model="selected2">
          <option v-for="inst in effects" v-bind:key="inst.value">{{ inst.value }}</option>
        </select>
      </div>
    </div>
    <div class="shuffle">
      <button v-on:click="instrument.shufflePattern()" onclick="this.blur()">
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
import NoteMatrix from "../../NoteMatrix/NoteMatrix";
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
      musicStyle: ["sine", "sawtooth", "triangle"],
      effects: [
        { value: "Reverb" },
        { value: "Distortion" },
        { value: "Delay" }
      ],
      // mute: false,
      solo: false,
      selected: "Jazz",
      selected2: "Triangle"
    };
  },
  components: {
    NoteMatrix
  },
  methods: {
    mute: function() {
      this.instrument.muted = !this.instrument.muted;
      // if (this.mute == false) {
      //   this.mute = true;
      // } else {
      //   this.mute = false;
      // }
      // console.log("muted " + this.name);
    },
    // soloSong: function() {
    //   if (this.solo == false) {
    //     this.solo = true;
    //   } else {
    //     this.solo = false;
    //   }
    //   console.log("solo: " + this.solo);
    // },
    shuffle: function() {
      this.instrument.shufflePattern();
      console.log("shuffle song");
    },
    clearInstrument: function() {
      console.log("clear inst");
    }
  },
  created() {
    if (this.name != "drums") {
      this.instrument.shufflePattern();
    }
  }
};
</script>