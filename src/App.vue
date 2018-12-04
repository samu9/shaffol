<template>
  <div id="main">
    <h1>Shaffol</h1>
    <MainPanel/>
  </div>
</template>


<script>
import MainPanel from "./components/MainPanel/MainPanel.vue";
export default {
  components: {
    MainPanel
  }
};
</script>

<style>
#main {
  width: 100%;
  height: 100%;
}
#main > h1 {
  text-align: center;
  font-size: 95px;
  margin-bottom:0;
  color: #ffffff5d;
  text-shadow: -1px 0 20px royalblue, 0 1px royalblue, 1px 0 royalblue, 0 -1px royalblue;
}
</style>