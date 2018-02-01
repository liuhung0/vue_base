<template>
  <div class="main">
    <h2>{{id?"编辑":"新增"}}账号</h2>
    <el-form ref="form" :rules="form" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="编号" prop="remark">
        <el-input  v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="remark">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="remark">
        <el-input  v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="remark">
        <el-input  v-model="form.identityCard"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="remark">
        <el-radio-group v-model="form.gender" size="medium" style="width: 400px">
          <el-radio  label="1" >男</el-radio>
          <el-radio  label="2" >女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item  label="角色名称">
          <el-radio v-model="form.ids"  style="width:300px;margin-left: -55px" v-for="item in roleList"
                    :key="item.ids"
                    :label="item.name"
                    :value="item.id">
            <!--<el-option-->
              <!--v-for="item in roleList"-->
              <!--:key="item.ids"-->
              <!--:label="item.name"-->
              <!--:value="item.id">-->
            <!--</el-option>-->
          </el-radio>
        </el-form-item>

      <el-form-item label="账号状态" prop="remark">
        <el-radio-group v-model="form.status" size="medium" style="width: 400px">
          <el-radio  label="1" >启用</el-radio>
          <el-radio  label="2" >禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input type="textarea" v-model="form.mark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setInfo">保 &nbsp;&nbsp;&nbsp;&nbsp;   存</el-button>
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
          ids:'',
          parkingId:24,
          id:this.id||-1,
          username:'',
          number:'',
          phone:'',
          name: '',
          identityCard:'',
          gender:'',
          mark:'',
          status:'',
        },
        roleList:[],
      }
    },
    mounted(){
      let that = this;
      that.getInfo();
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
        that.$http.post(that.Constants().REST_SUB_USER_SAVE, that.form,{emulateJSON: true}).then(function (res) {
          if(res.data.result){
            that.$message.success("保存子账号信息成功！")
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
