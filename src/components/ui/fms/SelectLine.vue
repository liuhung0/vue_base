<template>
  <div>
    <div class='textline'>
      <span>{{label}}:</span>
      <div class="input_area">
        <el-select v-model="currentValue" @change="emitValue">
          <el-option
            v-for="item in thisoptions"
            :key="item.value"
            :label="item[optionLabel]"
            :value="item[optionValue]"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    components: {
    },
    props: ['value', 'label', 'options','ovalue','olabel'],
    data(){
      return {
        currentValue: this.value,
        optionValue:this.ovalue,
        optionLabel:this.olabel,
        thisoptions:this.options,
      }
    },
    watch: {
      value(val, old){
        this.currentValue = val;
      },
      options(val){
          this.$set(this,"thisoptions",val);
      },
      ovalue(val){
          this.optionValue=val;
      },
      olabel(val){
          this.optionLabel=val;
      }

    },
    methods: {
      emitValue(){
        this.$emit("input", this.currentValue);
      },
      isInteger(val) {
        let reg = /^[1-9]\d*$/;
        return reg.test(val);
      },
    }

  }
</script>
<style>
  .el-select{
    width:100%;
  }
  .el-select .el-input{
    height:32px;
    width:100%;
  }
  .el-select .el-input .el-input-icon{
    margin-top:40px;
    display:block;
  }
</style>
