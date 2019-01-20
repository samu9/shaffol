<template>
  <div class="instrument-tab">
    <div class="name-container">
      <div @click="showModal" class="circle">
        <h1>{{name | capitalize }}</h1>
      </div>

      <NoteMatrix v-if="name != 'drums'" :instrument="instrument"/>

      <div class="drums-namebox" v-else>
        <p>Pattern</p>
        <h3>{{ pattern }}</h3>
        <!-- <font-awesome-icon class="drum-icon" icon="drum"/> -->
      </div>

      <b-modal ref="myModalRef" hide-footer v-bind:title="name|capitalize" hide-header>
        <h5 class="modal-title">{{name|capitalize}}</h5>
        <NoteMatrix v-if="name != 'drums'" class="modal-nm" :instrument="instrument"/>
        <div class="drums-modal" v-else>
          <p>Pattern</p>
          <h3>{{ pattern }}</h3>
          <!-- <font-awesome-icon class="drum-icon" icon="drum"/> -->
        </div>
        <div class="modal-controls">
          <md-button
            v-for="i in instrument.totalPatterns"
            :key="i"
            v-bind:class="instrument.currentPattern == i - 1 ? 'active' : ''"
            @click="instrument.selectPattern( i - 1)"
            class="md-raised shuffle"
          >{{ i }}</md-button>
          <md-button
            v-if="instrument.totalPatterns < 4"
            @click="instrument.addPattern()"
            class="md-raised shuffle"
          >
            <font-awesome-icon icon="plus"/>
          </md-button>
        </div>
        <div class="modal-controls">
          <md-button
            v-on:click="instrument.shufflePattern(instrument.currentPattern)"
            onclick="this.blur()"
            class="md-raised shuffle"
          >
            <font-awesome-icon icon="random" fixed-width/>Shuffle
          </md-button>
          <md-button
            v-if="instrument.name!= 'drums'"
            v-on:click="instrument.clearPattern(instrument.currentPattern)"
            onclick="this.blur()"
            class="md-raised shuffle"
          >
            <font-awesome-icon icon="eraser" fixed-width/>Clear
          </md-button>
          <md-button
            v-on:click="instrument.deletePattern(instrument.currentPattern)"
            v-if="instrument.totalPatterns > 1"
            onclick="this.blur()"
            class="md-raised clear"
          >
            <font-awesome-icon icon="trash-alt" fixed-width/>Delete
          </md-button>
        </div>
        <b-btn class="mt-3" variant="outline-primary" block @click="hideModal">Close</b-btn>
      </b-modal>
    </div>

    <ul class="pattern-selector nav flex-column">
      <li
        v-for="i in instrument.totalPatterns"
        :key="i"
        class="nav-item"
        v-bind:class="instrument.currentPattern == i - 1 ? 'active' : ''"
        @click="instrument.selectPattern( i - 1)"
      >{{ i }}</li>
      <li v-if="instrument.totalPatterns < 4" @click="instrument.addPattern()" class="nav-item">
        <font-awesome-icon icon="plus"/>
      </li>
      <li v-if="instrument.totalPatterns > 1" @click="instrument.deletePattern(instrument.totalPatterns - 1)" class="nav-item">
        <font-awesome-icon icon="minus"/>
      </li>
    </ul>

    <div class="row">
      <div class="col-md-1 volume-controls">
        <font-awesome-icon icon="volume-up"/>
        <input
          v-model="instrument.volumeControl.volume.value"
          type="range"
          min="-50"
          max="5"
          class="volume-slider"
          orient="vertical"
        >
        <font-awesome-icon icon="volume-down"/>
      </div>
      <div class="col-md-2">
        <div class="btn-container">
          <md-button
            v-bind:class="{active: instrument.volumeControl.mute}"
            v-on:click="mute"
            onclick="this.blur()"
            class="md-raised mute"
          >Mute</md-button>
          <md-button
            v-bind:class="{active: soloInst}"
            v-on:click="solo"
            onclick="this.blur()"
            class="md-raised solo"
          >Solo</md-button>
        </div>
      </div>

      <div class="col-md-6">
        <SynthControls
          v-if="name != 'drums'"
          :instrument="instrument"
          :musicService="musicService"
        />
        <DrumsControls v-else :instrument="instrument" :musicService="musicService"/>
      </div>
      <div class="col-md-2 right-side">
        <md-button
          v-on:click="instrument.clearAllPatterns()"
          onclick="this.blur()"
          class="md-raised shuffle"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Clear all patterns"
        >
          <font-awesome-icon icon="eraser" fixed-width size="lg"/>
        </md-button>
        <md-button
          v-on:click="instrument.shuffleAllPatterns()"
          onclick="this.blur()"
          class="md-raised shuffle"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Shuffle instrument"
        >
          <font-awesome-icon icon="random" fixed-width size="lg"/>
        </md-button>
      </div>
    </div>
  </div>
</template>


<script>
import "./InstrumentTab.css";
import NoteMatrix from "../../NoteMatrix/NoteMatrix";
import SynthControls from "./Controls/SynthControls";
import DrumsControls from "./Controls/DrumsControls";
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
      soloInst: false,
      slider: 45,
      pattern: null
    };
  },
  components: {
    NoteMatrix,
    SynthControls,
    DrumsControls
  },
  methods: {
    mute: function() {
      this.instrument.mute();
    },
    solo: function() {
      this.instrument.soloControl.solo = !this.instrument.soloControl.solo;
      this.soloInst = this.instrument.soloControl.solo;
    },
    showModal: function() {
      this.$refs.myModalRef.show();
    },
    hideModal: function() {
      this.$refs.myModalRef.hide();
    }
  },
  created() {
    this.musicService.EventBus.$on("stop", stop => {
      this.instrument.stop();
    });
    if (this.name == "drums") {
      this.pattern = this.instrument.patterns[this.instrument.currentPattern];
      this.instrument.EventBus.$on("updatedPattern", pattern => {
        this.pattern = this.instrument.patterns[this.instrument.currentPattern];
      });
    }
  }
};
</script>