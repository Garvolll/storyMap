<template>
    <div class="b">
        <template v-if="name=='xxx'">
            <input :type="name">    
        </template>
        <template v-if="name=='xxx'">
            <input :type="name">
        </template>
        <template v-if="name=='xxx'">
            <input :type="name">
        </template>
        <template v-if="name=='xxx'">
            <input :type="name">
        </template>
        <template v-if="name=='xxx'">
            <input :type="name">
        </template>
        <template v-if="name=='xxx'">
            <input :type="name">
        </template>
        <template v-if="name=='xxx'">
            <input :type="name">
        </template>
        <template v-if="name=='xxx'">
            <input :type="name">
        </template>
    </div>
</template>

<script>

export default {
    data() {
        return {
           
        }
    },
    props:['name'],
    methods: {

    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.a {
    display: flex;
    width: 100%;
    height: 100%;
    position: fixed;
}

.a ul li {
    width: 300px;
    height: 300px;
    font-size: 24px;
    line-height: 300px;
    text-align: center;
}
.inputs input{
    width:200px;
    height: 40px;
    display: block;
}
</style>
