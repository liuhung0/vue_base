<template>
  <div class="box ">
    <h1>收费规则</h1>
    <el-form ref="form" :model="form" label-width="120px" class="settings">
      <h2>包年包月用户</h2>
      <el-form-item label="是否开启包年包月" >
        <el-switch  style="float:left;padding:10px 0;" v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="包年费用">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="包季费用">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="包月费用">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <h2>业主管理费用</h2>
      <el-form-item label="是否开启业主管理费用" >
        <el-switch  style="float:left;padding:10px 0;" v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="年费用">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="季费用">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="月费用">
        <el-input v-model="form.name"></el-input>
      </el-form-item>


      <h2>临时停车收费规则</h2>
      <h3>时段计费</h3>
      <el-form-item label="临停免费时间">
        <el-input  style="float:left;width:30%;" v-model="form.name"></el-input>
        <el-select style="float:left;width:80px;" value="分钟">
          <el-option value="分钟">分钟</el-option>
          <el-option value="时" >时</el-option>
        </el-select>
        <el-switch  style="float:right;padding:10px 0;width:10%;" v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="前">
        <el-input style="float:left;width:10%;" v-model="form.name"></el-input>
        <label style="float:left;width:20%;">小时每小时</label>
        <el-input style="float:left;width:10%;" v-model="form.name"></el-input>
        <label style="float:left;width:10%;">元</label>
        <el-switch  style="float:right;padding:10px 0;width:10%;" v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="后">
        <el-input style="float:left;width:10%;" v-model="form.name"></el-input>
        <label style="float:left;width:20%;">小时每小时</label>
        <el-input style="float:left;width:10%;" v-model="form.name"></el-input>
        <label style="float:left;width:10%;">元</label>
        <el-switch  style="float:right;padding:10px 0;width:10%;" v-model="form.delivery"></el-switch>
      </el-form-item>
      <h3>夜间计费</h3>
      <el-form-item label="是否启用">
        <el-switch  style="float:right;padding:10px 0;width:10%;" v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-time-picker  style="float:left;" v-model="form.name"></el-time-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-time-picker  style="float:left;" v-model="form.name"></el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group style="float:left;" v-model="form.type">
          <el-radio  style="float:left;margin-left:-80px;" label="过夜费" name="type">过夜费<el-input style="width:20%;"></el-input>元</el-radio>
          <br><div style="clean:both;height:10px;Width:100%;">123</div>
          <el-radio style="float:left;margin-left:-80px;" label="每小时" name="type">每小时<el-input style="width:20%;"></el-input>元</el-radio>
        </el-checkbox-group>
      </el-form-item>
      <h3>时段封顶</h3>
      <el-form-item label="是否启用">
        <el-switch  style="float:right;padding:10px 0;width:10%;" v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="封顶规则">
      <el-select  style="float:left;" value="分钟">
        <el-option value="分钟">分钟</el-option>
        <el-option value="时" >时</el-option>
      </el-select>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-time-picker  style="float:left;" v-model="form.name"></el-time-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-time-picker  style="float:left;" v-model="form.name"></el-time-picker>
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

  export default {
    components: {},
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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
    max-width: 640px;
    margin:0 2%;
    background:#f6f6f6;
    height:100%;
    padding:60px 40px;
    border-radius: 10px;
  }
  .el-form h2,.el-form h3{
    text-align:left;
    padding:10px 20px;
    border-bottom: 1px dashed #ccc;
  }

</style>
