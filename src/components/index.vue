<template>
  <div class="map" >
    <p class="pre">好出行地图编辑器1.0</p>
    <div class="showDiv">
    <ul style="float: left;list-style: none;text-align: center;">
      <li style="float: left">
        <div class="newFile">
          <img src="/static/images/创建项目.png" style="margin-top: 30px"/>
          <el-button class="btn1" @click="dialogFormVisible = true">创建项目</el-button>
        </div>
      </li>
      <li style="float: left">
        <div class="newFile">
          <img src="/static/images/载入项目.png" style="margin-top: 30px"/>
          <el-button class="btn2" @click="projectTableVisible = true">载入项目</el-button>
        </div>
      </li>
      <li style="float: left">
        <div class="newFile">
          <img src="/static/images/使用说明.png" style="margin-top: 25px"/>
          <el-button class="btn3">使用说明</el-button>
        </div>
      </li>
    </ul>
      <el-dialog title="新建项目" :visible.sync="dialogFormVisible" style="width: 820px;margin-left: 500px;margin-top: 200px;">
        <el-form :model="form" :rules="rules">
          <el-form-item label="项目名称" style="margin-left: 55px" required>
            <el-input v-model="form.project_name" prop="project_name" style="width: 200px;margin-left: -48px"/>
          </el-form-item>
          <el-form-item label="停车场编号" style="margin-left: 45px" required>
            <el-input v-model="form.parking_id" style="width: 200px;margin-left: -50px"/>
          </el-form-item>
          <el-form-item label="停车场名称" style="margin-left: 45px" required>
            <el-input v-model="form.parking_name" style="width: 200px;margin-left: -50px"/>
          </el-form-item>
        <!-- <el-form-item label="停车场">
            <el-select v-model="form.parking_name" placeholder="请选择停车场">
              <el-option label="浩泰电建停车场" value="shanghai"/>
              <el-option label="甘肃移动总公司停车场" value="beijing"/>
              <el-option label="甘肃互联网创新创业大厦停车场" value="beijing"/>
              <el-option label="兰州职业技术学院停车场" value="beijing"/>
            </el-select>
          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="项目列表" :visible.sync="projectTableVisible" :modal="true">
        <el-table :data="projectData" border align="center" valign="center" @row-click="openDetails">
          <!--<el-table-column
            property="id"
            label="项目编号"
            v-show="isShow">
          </el-table-column>-->
          <el-table-column
            property="project_name"
            label="项目名称">
          </el-table-column>
          <el-table-column
            property="parking_name"
            label="停车场名称">
          </el-table-column>
          <el-table-column
            property="parking_id"
            label="停车场编号">
          </el-table-column>
          <el-table-column
            property="dateline"
            label="创建时间">
          </el-table-column>
          <el-table-column
            property="updateline"
            label="更新时间">
          </el-table-column>
        </el-table>
      </el-dialog>
  </div>
  </div>
</template>
<script>
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
import ElIcon from "../../node_modules/element-ui/packages/icon/src/icon.vue";
import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
import ElTabPane from "../../node_modules/element-ui/packages/tabs/src/tab-pane.vue";
export default {
  components: {
    ElTabPane,
    ElFormItem,
    ElIcon,
    ElInput,
    ElButton
  },
  name: 'HelloWorld',
  data () {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      projectTableVisible:false,
      form: {
        project_name: '',
        parking_id:'',
        parking_name: ''
      },
      formLabelWidth: '120px',
     rules:{

      },
      projectData:[{
        id:'fdfaf396c2cf11e7acc6f44d306a06b0',
        project_name:'XXXXX项目一',
        parking_id:'72',
        parking_name:'浩泰电建停车场',
        dateline:'1509958747',
        updateline:'1509958747'
      },{
        id:'fdfaf396c2cf11e7acc6f44d306a06b0',
        project_name:'XXXXX项目二',
        parking_id:'72',
        parking_name:'甘肃移动总公司停车场',
        dateline:'1509958747',
        updateline:'1509958747'
      },{
        id:'fdfaf396c2cf11e7acc6f44d306a06b0',
        project_name:'XXXXX项目三',
        parking_id:'72',
        parking_name:'甘肃互联网创新创业大厦停车场',
        dateline:'1509958747',
        updateline:'1509958747'
      },{
        id:'fdfaf396c2cf11e7acc6f44d306a06b0',
        project_name:'XXXXX项目四',
        parking_id:'72',
        parking_name:'兰州职业技术学院停车场',
        dateline:'1509958747',
        updateline:'1509958747'
      }]
    }
  },
  created: function (){

  },
  methods:{
    submitForm:function () {
      var ths = this;
      ths.dialogFormVisible = false;
      /*$.ajax({
        url: "",
        type: "POST",
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        dataType: "json",
        //data: JSON.stringify(customerArray),    //将Json对象序列化成Json字符串，JSON.stringify()原生态方法
        data: $.toJSON(ths.from),
        success: function (res) {
          console.log(res);
        }
      });*/
      window.location.href = "index.html#/page";
    },
    dateFormat:function (row, column) {
      var dateline = row[column.property];
      var date = new Date(dateline);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()) + '-';
      var D = date.getDate() + '';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + " " + "0" + h + "0" + m + "0" + s;
    },
    //打开详情页弹窗
    openDetails(row, event, column) {
      console.log(row.id)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pre{
    font-size: 80px;
    color: #8c939d;
    margin-top: 100px;
  }
  .newFile {
    border: 2px dotted;
    color: #8c939d;
    width: 200px;
    height: 200px;
    margin-left: 30px;
  }
  .btn1{
      margin-top: 15px;
      font-size: 20px;
      background-color: white;
      border: solid white;
  }
  .btn2{
    margin-top: 10px;
    font-size: 20px;
    background-color: white;
    border: solid white;
  }
  .btn3{
    font-size: 20px;
    background-color: white;
    border: solid white;
  }
  .showDiv{
    margin-left: 470px;
    margin-top:150px;
  }
</style>
