<template>
  <div class="main">
    <h2>{{$route.params.id?"修改":"修改"}}业主</h2>
    <el-form ref="reqData" v-model="reqData"  label-width="80px">

      <!--<el-form-item label="小区名称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>-->
      <el-form-item label="所属区域" prop="number">
        <el-input  v-model="reqData.district"></el-input>
      </el-form-item>
      <el-form-item label="楼号(栋)" prop="phone">
        <el-input v-model="reqData.tower"></el-input>
      </el-form-item>
      <el-form-item label="单元" prop="name">
        <el-input  v-model="reqData.element"></el-input>
      </el-form-item>
      <el-form-item label="房间号" prop="identityCard">
        <el-input  v-model="reqData.room"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="gender">
        <el-input  v-model="reqData.ownerName"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="gender">
        <el-input  v-model="reqData.tel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保 &nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
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
        reqData: {
          uId: sessionStorage.getItem("LOGIN_PARKING_UID"),
          pId:67,
          district:'',
          tower:'',
          element:'',
          room: '',
          ownerName:'',
          tel:'',
          id:this.$route.params.id,
        },
      }
    },
    mounted(){
      let that = this;
      that.$http.post(this.Constants().HOUSE_OWNER_ID, that.reqData,{emulateJSON: true}).then(function (res) {
        if (res.data.result) {
          that.reqData = res.data.data;
        }
        else {
          that.$message.info(that.res.data.data.message);
        }
      }, function () {
        that.$message.error("网络发生错误");
      })
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
