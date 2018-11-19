<template>
    <header>
        <button @click="createEventClick"></button>
    </header>
</template>

<script>
import {
    mapActions
} from 'vuex'


export default {
    name: 'Header',
    data() {
        return {

        }
    },
    methods: {
        ...mapActions([
            'createEventFormShow',
            'eventListShowEvent',
            "panelShowEvent"
        ]),
        createEventClick() {
            this.createEventFormShow(true)
            this.eventListShowEvent(false)
            this.panelShowEvent(false)
        }
    },
    components: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
    display: flex;
    width: 100%;
    height: 60px;
    position: fixed;
    background-color: #C8E49D;
    z-index: 1000;
}
</style>
