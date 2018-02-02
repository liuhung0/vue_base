<template>
  <div class="main">
    <h2>{{id?"编辑":"新增"}}业主</h2>
    <el-form ref="form" :rules="form" :model="form" label-width="80px">

      <el-form-item label="所属区域" prop="username">
        <el-input v-model="form.district"></el-input>
      </el-form-item>
      <el-form-item label="楼号(栋)" prop="number">
        <el-input  v-model="form.tower"></el-input>
      </el-form-item>
      <el-form-item label="单元" prop="phone">
        <el-input v-model="form.element"></el-input>
      </el-form-item>
      <el-form-item label="房间号" prop="name">
        <el-input  v-model="form.room"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="identityCard">
        <el-input  v-model="form.identityCard"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="gender">
        <el-input  v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setInfo">保 &nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import ElRadio from "../../../../node_modules/element-ui/packages/radio/src/radio.vue";
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElCheckbox from "../../../../node_modules/element-ui/packages/checkbox/src/checkbox.vue";

  export default {
    components: {
      ElCheckbox,
      ElFormItem,
      ElRadio},
    name: "sub-info",
    props:["id"],
    data() {
      return {
        form: {
          uId: sessionStorage.getItem("LOGIN_PARKING_UID"),
          ids:'',
          pId:'',
          rId:'',
          id:this.id||-1,
          district:'',
          tower:'',
          element:'',
          room: '',
          identityCard:'',
          tel:'',
        },
        roleList:[],
        pidList:[],
      }
    },
    mounted(){
      let that = this;
      console.log(that.id);
      if(that.form.id&&that.form.id>0){
        that.getInfo();
      }
    },
    methods: {
      getInfo(){
        let that = this;
        that.$http.post(that.Constants().HOUSE_OWNER_ID,{id:that.form.id},{emulateJSON: true}).then(function(res){
          if(res.data.result){
            console.log(res.data.data)
            that.form = res.data.data;
            that.form.status = res.data.data.status.toString();
            that.form.gender = res.data.data.gender.toString();
            that.form.pId = res.data.data.parkingId;
            that.form.rId = res.data.data.role;
            console.log("账号信息获取成功!");
          }
          else{
            that.$message.error(res.data.message);
          }
        },function(res){
          that.$message.error("获取权限列表失败.网络发生错误");
        });
      },
      setInfo(){
        let that = this;
        that.form.parkingId = that.form.pId;
        that.$http.post(that.Constants().REST_SUB_USER_SAVE, that.form,{emulateJSON: true}).then(function (res) {
          if(res.data.result){
            that.$message.success("保存子账号信息成功！");
            that.$emit("addOK");
          }else {
            that.$message.error(that.res.data.message);
          }
        },function (res) {
          that.$message.error(res);
        });
      }
    }
  }
</script>

<style scoped>
  .main{
    padding:20px 60px;
    background:#fff;
    border-radius: 10px;
  }
  .main h2{
    font-size:24px;
    font-weight: 400;
    color:#828282;
    padding-top:20px;
    padding-bottom: 20px;
    text-align:left;
    border-bottom:1px dashed #ccc;
  }
  .el-transfer {
    font-size: 14px;
    float: left;
    text-align: left;
  }
</style>
