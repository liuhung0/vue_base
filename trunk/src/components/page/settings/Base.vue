<template>
  <div class="box ">
    <h1>基础设置</h1>
    <el-form ref="form" :model="form" label-width="120px" class="settings">
      <h2>企业信息</h2>
      <el-form-item label="企业名称">
        <el-input v-model="form.cname"></el-input>
      </el-form-item>
      <el-form-item label="统一信用代码">
        <el-input v-model="form.creditno"></el-input>
      </el-form-item>
      <h2>管理者信息</h2>
      <el-form-item label="管理者姓名">
        <el-input v-model="form.oname"></el-input>
      </el-form-item>
      <el-form-item style="width: 90%" label="选择城市">
        <area-select style="width: 114%;" :level='2' type='text' v-model='form.selected'></area-select>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        form: {
          uId:sessionStorage.getItem("LOGIN_PARKING_UID"),
          cid:'',
          cname:'',
          creditno:'',
          oid:'',
          oname:'',
          province:'',
          city:'',
          area:'',
          tel:'',
          email:'',
          selected:[],
        }
      }
    },
    mounted(){
      let that = this;
      that.$http.post(that.Constants().REST_MERCHANT_INFO, that.form, {emulateJSON: true}).then(function (res) {
        console.log(res.data.result)
        if (res.data.result) {
          that.form.cid = res.data.data.cloudMerchant.id;
          that.form.cname = res.data.data.cloudMerchant.name;
          that.form.creditno = res.data.data.cloudMerchant.creditno;

          that.form.oid = res.data.data.pmOwnerInfo.id;
          that.form.oname = res.data.data.pmOwnerInfo.name;
          that.form.tel = res.data.data.pmOwnerInfo.tel;
          that.form.email = res.data.data.pmOwnerInfo.email;
          that.form.selected =[res.data.data.pmOwnerInfo.province,res.data.data.pmOwnerInfo.city,res.data.data.pmOwnerInfo.area];
          console.log(that.form.cid)
        }
        else {
          that.$message.info(that.res.data.message);
        }
      }, function () {
        that.$message.error("网络发生错误");
      })
    },
    methods: {
      onSubmit() {
        let that =this;
        that.form.province =  that.form.selected[0];
        that.form.city =  that.form.selected[1];
        that.form.area =  that.form.selected[2];
        that.$http.post(that.Constants().REST_MERCHANT_ADD, that.form, {emulateJSON: true}).then(function (res) {
          if (res.data.result) {
            console.log("新增成功")
            that.$message.success("保存成功")
          }else {
            that.$message.info(that.res.data.message);
          }
        }, function () {
          that.$message.error("网络发生错误");
        })
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
  .area-select{
    width: 100%;
    float: left;
    margin-left: -11px;
  }

</style>
