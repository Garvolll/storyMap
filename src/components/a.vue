<template>
    <div class="a">
        <ul>
            <li v-for="item in list" @click="click(item)" :style="'backgroundColor:'+(item=='单选'?'red':item==='输入域'?'green':'blue')">{{item}}</li>
        </ul>

        <div class="inputs">
            <template v-for="i in inputs">
                 <input :type="i.InputType" :value="i.value">
                 <汇总组件 :name=""></汇总组件>
            </template>
           
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            list: ["单选", "输入域", "密码框"],
            inputs: []
        }
    },
    methods: {
        click(item) {
            let InputType;
            let value = item
            switch (value) {
                case "单选":
                    InputType="radio"
                    break;
                case "输入域":
                    InputType="textarea"
                    break;
                case "密码框":
                    InputType="password"
                    break;
            }
            this.inputs.push({InputType:InputType,value:value})
        },

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
