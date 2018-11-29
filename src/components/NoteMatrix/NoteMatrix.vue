<template>
  <div class="note-matrix">a
      <!-- <div class="note-matrix-cell" 
      v-for="i in array(width*height)" 
      :key=i>a</div> -->
  </div>
</template>



<script>
export default {
    name: NoteMatrix,
    props: {

    },
    data() {
        return{
            width: 16,
            height: 16
        }
    }
};
</script>