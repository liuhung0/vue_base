<template>
  <div class="main">
    <h2>{{ruleid?"编辑":"新增"}}角色</h2>
    <el-form ref="ruleForm" :rules="rules" :model="rule" label-width="80px">
      <el-form-item label="角色名称" prop="name" class="rulesName">
        <el-input v-model="rule.name" maxlength="32"></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="remark" class="rulesName">
        <el-input type="textarea" v-model="rule.remark" maxlength="32"></el-input>
      </el-form-item>
      <el-form-item label="权 限" prop="menus" class="rulesName">
        <el-transfer style="float: left;width: 105%;" v-model="rule.menus"
                     :titles="['权限列表', '已有权限']"
                     :data="menuList"
                     :props="{key:'id',label:'name'}"
        ></el-transfer>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setInfo" class="bc">保 &nbsp;&nbsp;&nbsp;&nbsp;   存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    export default {
      components: {},
      name: "rule-info",
      props:["ruleid"],
      data() {
        return {
          rule: {
            id:this.ruleid||-1,
            name: '',
            remark: '',
            menus:[],
          },
          menuList:[],
          rules:{
            name:[
              {
                required:true,
                message:"请输入角色名称",
                trigger:"blur",
              },
            ]
          }
        }
      },
      mounted(){
        let  that = this;
        that.init();
      },
      methods: {
        init(){
          let that = this;
          console.log("加载权限菜单")
          that.$http.post(that.Constants().REST_MENU_LIST,{},{emulteJSON: true}).then(function(res){
            if(res.data.result){
              that.menuList.splice(0,that.menuList.length,...res.data.data.data);
              console.log("菜单数据获取成功,一共有"+that.menuList.length);
              if(that.rule.id&&that.rule.id>0){
                that.getInfo();
              }
            }
            else{
              that.$message.error(res.data.message);
            }
          },function(res){
            that.$message.error("获取权限列表失败.网络发生错误:"+JSON.stringify(res));
          });
        },
        getInfo(){
          let that = this;
          that.$http.post(that.Constants().REST_RULE_INFO,{id:that.rule.id},{emulateJSON: true}).then(function(res){
            if(res.data.result){
             that.rule = res.data.data
              console.log("角色信息获取成功!");
            }
            else{
              that.$message.error(res.data.message);
            }
          },function(res){
            that.$message.error("获取权限列表失败.网络发生错误");
          });
        },
        setInfo(){
          this.$refs["ruleForm"].validate((valid) => {
            if (valid) {
              let that = this;
              let menuIds ="";
              let len = that.rule.menus.length;
              for(let i=0;i<len;i++){
                menuIds+=that.rule.menus[i]+",";
              }
              console.log("m",menuIds);
              menuIds = menuIds.substring(0,menuIds.length-1);
              console.log("m2",menuIds);
              that.rule.menusStr=menuIds;
              let reqData ={
                pId:sessionStorage.getItem("LOGIN_PARKING_PID"),
                id:that.rule.id?that.rule.id:null,
                name:that.rule.name?that.rule.name:null,
                remark:that.rule.remark?that.rule.remark:"这家伙很懒,什么都没有留下",
                menusStr:menuIds
              }
              that.$http.post(that.Constants().REST_RULE_SAVE,reqData,{emulateJSON: true}).then(function(res){
                if(res.data.result){
                  console.log("角色信息保存成功!");
                  that.$message.success("保存成功");
                  that.$emit("addOK");
                }
                else{
                  that.$message.error(res.data.message);
                }
              },function(res){
                that.$message.error("保存失败,网络发生错误");
              });
            } else {

              return false;
            }
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
    font-size: 20px;
    color: #FFFFFF;
    text-align: left;
    padding-left: 20px;
    padding-bottom: 10px;
    border-bottom:1px solid #314158;
  }
  .el-transfer {
    font-size: 14px;
    float: left;
    text-align: left;
  }
  .el-transfer-panel{color: #1D242E}
</style>
<style>
  .rulesName .el-form-item__label{
    color: #fff;
  }
  .power .el-transfer-panel .el-transfer-panel__header{
    background: #54647b;
  }
  .power .el-transfer-panel{
    border: 1px solid #8797AE;
    border-radius: 2px;
  }
  .power .el-checkbox__label{
    color: #fff !important;
  }
  .power .el-transfer-panel__body{
    background: #344256;
  }
  .bc{
    margin-right: 6%;
  }
</style>
