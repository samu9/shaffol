<template>
    <div class="instrument-tab">
        <h1>{{name | capitalize}}</h1>
        <button v-on:click="shufflePattern">Shuffle</button>
    </div>
</template>


<script>
import './InstrumentTab.css'

export default {
    props: {
        name: String,
    },
    data() {
        return{
        }
    },
    methods: {
        printPattern(){
            if(!this.pattern) return;
            let patt = [];
            for (let p of this.pattern){
                patt.push(p.join("-"));
            }
            return patt.join(" , ");
        },
        shufflePattern(){

        }
    }
}
</script>