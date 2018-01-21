<template>
  <div>
    <div class='textline'>
      <span>{{label}}</span>
      <div class="input_area">
        <input type='text'  v-model="currentValue" @input="emitValue"/><B style="color:#fd934e" class="after">元</B>
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
            if(this.isNumber(val)){
                if(val>=0){
                    if(val.indexOf(".")!==val.length-1){
                      val=Math.round(val * 100)/ 100;
                    }
                  this.currentValue=val;
                }
                else{
                    this.currentValue=old;
                }
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
      isNumber(val) {

        var regu = /^[0-9]+\.?[0-9]*$/;
        return regu.test(val);
      },
    }

  }
</script>
<style>
  .textline .input_area .after{
    margin-left:-20px;
  }

</style>

