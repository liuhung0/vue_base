<template>
  <div class="main">
    <h2>{{id?"编辑":"新增"}}账号</h2>
    <el-form ref="form" :rules="form" :model="form" label-width="100px" class="addAccount">
      <!--<el-form-item label="隶属停车场" prop="name">-->
        <!--<el-select v-model="form.pId" filterable placeholder="请选择停车场"  class="selec">-->
          <!--<el-option-->
            <!--v-for="item in pidList"-->
            <!--:key="item.pId"-->
            <!--:label="item.name"-->
            <!--:value="item.id">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="number">
        <el-input  v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input  v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="identityCard">
        <el-input  v-model="form.identityCard"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender" class="xing">
        <el-radio-group v-model="form.gender" size="medium" class="radio">
          <el-radio  label="1" >男</el-radio>
          <el-radio  label="2" >女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-select v-model="form.rId" filterable placeholder="请选择角色" class="selec">
          <el-option
            v-for="item in roleList"
            :key="item.rId"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="账号状态" prop="status" class="xing">
        <el-radio-group v-model="form.status" size="medium" class="radio2">
          <el-radio  label="1" >启用</el-radio>
          <el-radio  label="2" >禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述" prop="mark">
        <el-input type="textarea" v-model="form.mark"></el-input>
      </el-form-item>
        <el-button type="primary" @click="setInfo">保 &nbsp;&nbsp;存</el-button>
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
          pId:sessionStorage.getItem("LOGIN_PARKING_PID"),
          rId:'',
          id:this.id||-1,
          username:'',
          number:'',
          phone:'',
          name: '',
          identityCard:'',
          gender:'',
          mark:'',
          status:'',
          role:'',
          parkingId:'',
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
      that.$http.post(that.Constants().VIP_PARKING_LIST,that.form,{emulateJSON: true}).then(function (res) {
        if (res.data.result) {
          that.pidList.splice(0, that.pidList.length, ...res.data.data);
        }
      }).catch(function () {
      }),
      that.$http.post(that.Constants().REST_SUB_USER_ROLE_INFO,{emulateJSON: true}).then(function (res) {
        if(res.data.result){
          console.log("进入角色list");
          that.roleList.splice(0, that.roleList.length, ...res.data.data);
        }else {
          that.$message.error(that.res.data.message);
        }
      },function (res) {
        that.$message.error(res);
      });
    },
    methods: {
      getInfo(){
        let that = this;
        that.$http.post(that.Constants().REST_SUB_USER_INFO,{id:that.form.id},{emulateJSON: true}).then(function(res){
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
    background: #3D4E66;
    border-radius: 4px;
  }
  .main h2{
    color: #fff;
    font-weight: 300;
    padding-left:20px;
    border-left:4px solid #49a9ff;
    text-align: left;
  }
  .el-transfer {
    font-size: 14px;
    float: left;
    text-align: left;
  }
</style>
<style>
  .addAccount  .el-form-item__content{
    width: 360px;
  }
  .addAccount .el-form-item__label{
    color:#fff;
  }
  .addAccount .selec{
    width:300px;
    margin-right: 15%;

  }
  .addAccount .selec .el-select-dropdown__item span{
    color: #444 !important;
  }
  .addAccount .el-select-dropdown__item.hover{
    color: #444;
  }
  .addAccount .radio{
    margin-left: -240px;
  }
  .addAccount .radio2{
    margin-left: -207px;
  }
  .xing .el-radio__label {
    color: #fff;
  }
</style>
