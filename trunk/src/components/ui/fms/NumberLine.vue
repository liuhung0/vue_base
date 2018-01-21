<template>
  <div>
    <div class='textline'>
      <span>{{label}}</span>
      <div class="input_area">
        <input type='text' v-model="currentValue" @input="emitValue"/>&nbsp;<B style="color:#fd934e">*</B>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props: ['value', 'label'],
    data(){
      return {
        currentValue: this.value
      }
    },
    watch: {
      value(val, old){
        if (!this.isNumber(val) || val < 0) {
            this.currentValue = old;
        } else {
          this.currentValue = val;
        }
      }
    },
    methods: {
      emitValue(){
        this.$emit("input", this.currentValue);
      },
      isNumber(val) {
        var regu = /^[0-9]+\.?[0-9]*$/;
        return regu.test(val);
      },
    }

  }
</script>

