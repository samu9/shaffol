<template>
  <div class="instrument-tab">
    <div class="name-container">
      <div
        @click="showModal"
        v-on:click="openNoteMatrix()"
        class="circle"
      >
        <h1>{{name | capitalize }}</h1>
      </div>
      <NoteMatrix v-if="name != 'drums'" :instrument="instrument"/>
      <font-awesome-icon v-else class="drum-icon" icon="drum"/>
      <b-modal ref="myModalRef" hide-footer title="Note Matrix" hide-header>
        <h5 class="modal-title">{{name|capitalize}} Note Matrix</h5>
        <NoteMatrix v-if="name != 'drums'" class="modal-nm" :instrument="instrument"/>
        <b-btn class="mt-3" variant="outline-primary" block @click="hideModal">Close</b-btn>
      </b-modal>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-4">
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
          <div class="col-md-7">
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
        </div>
      </div>
      <div class="col-md-6 effects">
        <SynthControls v-if="name != 'drums'" :instrument="instrument" :musicService="musicService"/>
        <DrumsControls v-else :instrument="instrument" :musicService="musicService"/>
      </div>
      <div class="col-md-3 last">
        <div class="row-md-3 cleardiv">
          <md-button
            v-on:click="instrument.clearPattern()"
            onclick="this.blur()"
            class="md-raised clear"
          >
            <font-awesome-icon icon="trash-alt"/>
          </md-button>
        </div>
        <div class="row-md-3">
          <md-button
            v-on:click="instrument.shufflePattern()"
            onclick="this.blur()"
            class="md-raised shuffle"
          >
            <font-awesome-icon icon="random"/>
          </md-button>
          <div class="row-md-3 offset"></div>
        </div>
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
      slider: 45
    };
  },
  components: {
    NoteMatrix,
    SynthControls,
    DrumsControls
  },
  methods: {
    mute: function() {
      this.instrument.mute()
    },
    solo: function() {
      this.instrument.soloControl.solo = !this.instrument.soloControl.solo;
      this.soloInst = this.instrument.soloControl.solo;
    },
    showModal: function() {
      if (this.name != "drums") {
        this.$refs.myModalRef.show();
      }
    },
    openNoteMatrix: function() {
      /*this.noteMatrixState = "open";*/
    },
    hideModal: function() {
      this.$refs.myModalRef.hide();
    }
  },
  created() {
    if (this.name != "drums") {
      this.instrument.shufflePattern();
    }
  }
};
</script>