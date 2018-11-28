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
  font-size: 60px;
  color: #ffffff5d;
}
</style>