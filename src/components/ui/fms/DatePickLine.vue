<template>
  <div>
    <div class='textline'>
      <span>{{label}}:</span>
      <div class="input_area">
        <el-date-picker
          v-model="currentValue"
          type="datetime"
          @change="emitValue"
          placeholder="选择日期时间">
        </el-date-picker>
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
        this.currentValue = val;
      }
    },
    methods: {
      emitValue(){
        this.$emit("input", this.currentValue);
      },
    }

  }
</script>

