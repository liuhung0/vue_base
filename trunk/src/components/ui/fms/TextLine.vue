<template>
  <div>
    <div class='textline'>
      <span>{{label}}:</span>
      <div class="input_area">
        <input type='text' v-model="currentValue" @input="emitValue"/>
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props: ['value','label'],
    data(){
      return {
        currentValue:this.value
      }
    },
    watch: {
        value(val){
            this.currentValue=val;
        }
    },
    methods: {
      emitValue(){
         this.$emit("input",this.currentValue);
      }
    }
  }
</script>

