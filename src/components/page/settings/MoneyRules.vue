<template>
  <div class="box ">
    <h1>收费规则</h1>
    <el-form ref="form" :model="form" label-width="200px" class="settings">
      <h2>包年包月用户<el-switch  style="float:right;padding:10px 0;" v-model="form.delivery"></el-switch></h2>
      <el-form-item label="包年费用">
        <el-input v-model="form.annualFee"></el-input>
      </el-form-item>
      <el-form-item label="包季费用">
        <el-input v-model="form.quarterFee"></el-input>
      </el-form-item>
      <el-form-item label="包月费用">
        <el-input v-model="form.monthlyFee"></el-input>
      </el-form-item>

      <h2>业主管理费用<el-switch  style="float:right;padding:10px 0;" v-model="form.delivery"></el-switch></h2>
      <el-radio-group v-model="form.delivery" size="medium" style="width: 500px">
        <el-checkbox  label="1" >月费用（一个月）</el-checkbox>
        <el-checkbox  label="2" >季费用（三个月）</el-checkbox>
        <el-checkbox  label="3" >年费用（十二个月）</el-checkbox>
      </el-radio-group>

      <h2>临时停车收费规则<span style="font-size:20px">(时段计费)</span>
        <el-switch  style="float:right;padding:10px 0;width:10%;" v-model="form.delivery"></el-switch>
      </h2>
      <el-form-item label="临停免费时间">

        <el-input  style="float:left;width:30%;" v-model="form.name"></el-input>
          <span style="float:left;width:80px;">分钟</span>

      </el-form-item>
      <el-form-item label="前">
        <el-input style="float:left;width:10%;" v-model="form.name"></el-input>
        <label style="float:left;width:20%;">小时每小时</label>
        <el-input style="float:left;width:10%;" v-model="form.name"></el-input>
        <label style="float:left;width:10%;">元</label>
        <label style="float:left;width:20%;">后每小时</label>
        <el-input style="float:left;width:10%;" v-model="form.name"></el-input>
        <label style="float:left;width:10%;">元</label>
      </el-form-item>

      <h3>夜间计费<el-switch  style="float:right;padding:10px 0;width:10%;" v-model="form.delivery"></el-switch></h3>
      <el-form-item label="选择开始结束时间">
        <el-time-picker  style="float:left;" v-model="form.name"></el-time-picker>
        <el-time-picker  style="float:left;" v-model="form.name"></el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group style="float:left;" v-model="form.type">
          <el-checkbox  style="float:left;margin-left:-80px;" label="过夜费" name="type">过夜费<el-input style="width:20%;">
          </el-input>元</el-checkbox>
          <br><div style="clean:both;height:10px;Width:100%;">123</div>
          <el-checkbox style="float:left;margin-left:-80px;" label="每小时" name="type">每小时<el-input style="width:20%;">
          </el-input>元</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <h3>时段封顶<el-switch  style="float:right;padding:10px 0;width:10%;" v-model="form.delivery"></el-switch></h3>
      <el-form-item label="封顶规则">
      <el-select  style="float:left;" value="自然日">
        <el-option value="自然日">自然日</el-option>
        <el-option value="24小时" >24小时</el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="最高">
        <el-input  style="float:left;width:42%;"v-model="form.name"></el-input>
        <label style="float:left;padding-left:20px">元</label>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>

  import ElCheckbox from "../../../../node_modules/element-ui/packages/checkbox/src/checkbox.vue";

  export default {
    components: {ElCheckbox},
    data() {
      return {
        form: {
          annualFee:'',
          quarterFee:'',
          monthlyFee:'',

        }
      }
    },
    methods: {
      onSubmit() {
       let that = this;
       that.$http.post(that.Constants.REST_MERCHANT_SETPRICE,that.form,{elmulateJSON:true}).then(function(res){
         if(res.data.result){

         }else{
           that.$message.info(that.res.data.message)
         }
         },function () {
           that.$message.error("网络发生错误");
         }
        )
      }
    }
  }
</script>
<style>
  .box{
    padding:20px;
  }
  .box h1{
    text-align: left;
    font-weight: 400;
    padding:10px 10px 30px 10px;
    border-bottom: 1px dashed #ccc;
    color:#666666;
  }
  .settings{
    max-width: 800px;
    margin:0 2%;
    background:#f6f6f6;
    height:100%;
    padding:60px 40px;
    border-radius: 10px;
    margin-left: 22%;
  }
  .el-form h2,.el-form h3{
    text-align:left;
    padding:10px 20px;
    border-bottom: 1px dashed #ccc;
  }

</style>
