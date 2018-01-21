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
        value(val,old){
            if(this.isInteger(val)) {
                val=Math.round(val * 1);
              this.currentValue = val;
            }
            else{
              this.currentValue=old;
            }
        }
    },
    methods: {
      emitValue(){
         this.$emit("input",this.currentValue);
      },
      isInteger(val) {
        let reg = /^[1-9]\d*$/;
        return reg.test(val);
      },
    }

  }
</script>

