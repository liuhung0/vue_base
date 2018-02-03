<template>
  <div class="main">
    <h2>{{id?"编辑":"新增"}}业主</h2>
    <el-form ref="ruleForm" v-model="ruleForm"  label-width="80px" class="yezhu">

      <!--<el-form-item label="小区名称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>-->
      <el-form-item label="所属区域" prop="number">
        <el-input  v-model="ruleForm.district"></el-input>
      </el-form-item>
      <el-form-item label="楼号(栋)" prop="phone">
        <el-input v-model="ruleForm.tower"></el-input>
      </el-form-item>
      <el-form-item label="单元" prop="name">
        <el-input  v-model="ruleForm.element"></el-input>
      </el-form-item>
      <el-form-item label="房间号" prop="identityCard">
        <el-input  v-model="ruleForm.room"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="gender">
        <el-input  v-model="ruleForm.ownerName"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="gender">
        <el-input  v-model="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保 &nbsp;&nbsp;存</el-button>
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
        ruleForm: {
          id:this.id||-1,
          uId: sessionStorage.getItem("LOGIN_PARKING_UID"),
          pId:67,
          district:'',
          tower:'',
          element:'',
          room: '',
          ownerName:'',
          tel:'',
        },
      }
    },
    mounted(){

    },
    methods: {
      onSubmit() {
        let that = this;

        this.$http.post(that.Constants().HOUSE_OWNER_ADD, that.ruleForm,{emulateJSON: true}).then(function (res) {

          if (res.data.result) {

            that.$message.info("设备添加成功");
            this.$router.push("/console/device");
          } else {
            that.$message.error("添加失败："+res.date.message);
          }
        }).catch(function () {
          that.$message.error("网络发生异常");
        })
      }
    }
  }
</script>

<style scoped>
  .main{
    padding:20px 60px;
    background:#3D4E66;
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
  .yezhu{
    margin-left: 10%;
  }
  .yezhu .el-form-item__label{
    color:#fff;
  }
  .yezhu .el-form-item__content{
    width: 360px;
  }
</style>
