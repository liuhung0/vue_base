<template>
  <div class="app">
    <div class="layout" style="background:#e8e8e8;height:100%;border-left:1px solid #ccc;">
      <div class="line" style="height:100%;">
        <div class="toolbar">
          <hr/>
          <h2 style="text-align: center;color:#00AA00">好出行<br>地图编辑器</h2>
          <hr/>
          <!--<el-upload
            class="upload-demo"
            :on-preview="handlePreview"
            list-type="picture">
            <el-button title="导入SVG"><i class="fa fa-upload"></i>导入SVG</el-button>
          </el-upload>-->
          <el-button title="导入SVG"><i class="fa fa-upload"></i>导入SVG</el-button>
         <!-- <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>-->
          <el-button title="基础参数" @click="settingData"><i class="fa fa-edit"></i>基础参数</el-button>
          <el-button title="分析SVG" ><i class="fa fa-edit"></i>分析SVG</el-button>
          <hr/>
          <el-button title="标记可通行" @click="setState(1)"><i class="fa fa-road"></i>标记可通行</el-button>
          <el-button title="标记不可通行" @click="setState(0)"><i class="fa fa-stop"></i>标记不可通行</el-button><br />
          <hr/>
          <el-button title="标记车位" @click="setState(2)"><i class="fa fa-car"></i>标记车位</el-button>
          <hr/>
          <el-button title="标记人类出口" @click="setState(3)"><i class="fa fa-user-md"></i>标记人员出口</el-button>
          <el-button title="标记人类入口" @click="setState(4)"><i class="fa fa-user-md"></i>标记人员入口</el-button>
          <br>
          <el-button title="标记车辆出口" @click="setState(5)"><i class="fa fa-rebel"></i>标记车辆出口</el-button>
          <el-button title="标记车辆入口" @click="setState(6)"><i class="fa fa-rebel"></i>标记车辆入口</el-button>
          <hr/>
          <el-button title="删除" @click="setState(7)"><i class="fa fa-rebel"></i>删除属性</el-button>
          <hr>
          <el-button title="查看车位列表" @click="getCarSeatList"><i class="fa fa-list"></i>车位列表</el-button>
          <el-button title="查看出入口列表" @click="getExitOrInList"><i class="fa fa-list"></i>出入口列表</el-button>
          <el-button title="导出"><i class="fa fa-sign-out"></i>导出</el-button>
        </div>

        <el-dialog title="设置大小" :visible.sync="baseDataTableVisible" style="width: 800px;margin-left: 600px;margin-top: 200px">
          <el-form :model="ruleForm">
            <el-row>
              <el-form-item label="地图宽度" style="width: 100px;">
                <el-input v-model="ruleForm.width"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="地图高度" style="width: 100px;">
                <el-input v-model="ruleForm.height"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="baseDataTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="baseDataTableVisible = false">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="出入口列表" :visible.sync="exitOrInTableVisible" :modal="false">
          <el-table :data="gridData" border align="center" valign="center">
            <el-table-column property="parking_id" label="停车场编号"></el-table-column>
            <el-table-column property="cell_x" label="X坐标"></el-table-column>
            <el-table-column property="cell_y" label="Y坐标"></el-table-column>
            <el-table-column property="floor" label="楼层"></el-table-column>
            <el-table-column property="type" label="类型"></el-table-column>
          </el-table>
        </el-dialog>
        <el-dialog title="车位列表" :visible.sync="carSeatTableVisible" :modal="false">
          <el-table :data="gridData1" border align="center" valign="center">
            <el-table-column property="parking_id" label="停车场编号" width="150"></el-table-column>
            <el-table-column property="seat_number" label="车位号" width="200"></el-table-column>
            <el-table-column property="floor" label="楼层" width="200"></el-table-column>
            <el-table-column property="cell_x" label="X坐标"></el-table-column>
            <el-table-column property="cell_y" label="Y坐标"></el-table-column>
          </el-table>
        </el-dialog>
        <div class="main" style="background:#fefefe;height:100%;overflow: auto;">
          <ul class="bar">
            <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
              <el-tab-pane
                :key="item.name"
                v-for="(item, index) in editableTabs"
                :label="item.title"
                :name="item.name"
              >
              </el-tab-pane>
            </el-tabs>
            <li style="float:right;width:600px;">
              <div class="statusbar" style="background:#eeeeee;height:100%;overflow: auto;color:#333;">
                  <label style="margin-left: -10px">坐标</label>
                  <label>x:</label>
                    <span id="cell_x" style="margin-left: -10px">32</span>
                  <label>y:</label>
                    <span id="cell_y" style="margin-left: -10px">32</span>
                  <label>分类:</label>
                  <span id="exitOrin" style="margin-left: -10px">人员入口</span>
                  <label style="margin-left: -10px">是否通行:</label>
                  <span id="tongXing" style="margin-left: -10px">可通行</span>
                  <label>class:</label>exi
                  <label>floor:</label>4
              </div>
            </li>
          </ul>
          <hr/>
          <div class="work_console">
            <button title="查看源代码" style="margin-left: -1550px"><i class="fa fa-code"></i></button>
            <button title="预览"><i class="fa fa-firefox"></i></button>
           <!-- <div style="background:url(images/map.png);width:2400px;height:1920px;clear：both;padding:40px;">
              <div v-for="n in cellWidth*cellHeight" class="gz" @click="clickCell($event)"  v-for="(item,index) in imgList">
                <img :src="item.file.src">
              </div>
            </div>-->
            <div style="background:url(images/map.png);width:2400px;height:1920px;clear：both;padding:40px;">
               <div v-for="n in cellWidth*cellHeight" class="gz" @click="clickCell($event)">
               </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow

    },
    data() {
      return {
        cellWidth:0,
        cellHeight:0,
        clickState:1,
        gridData: [{
          parking_id: '72',
          cell_x: '23',
          cell_y: '43',
          floor: '2楼',
          type: '车辆出口'
        },{
          parking_id: '72',
          cell_x: '23',
          cell_y: '43',
          floor: '2楼',
          type: '车辆出口'
        },{
          parking_id: '72',
          cell_x: '23',
          cell_y: '43',
          floor: '2楼',
          type: '车辆出口'
        }],
        exitOrInTableVisible: false,
        carSeatTableVisible:false,
        baseDataTableVisible:false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '50px',
        editableTabsValue: '2',
        editableTabs: [{
          title: 'newSVG1.svg',
          name: '1',
          content: 'newSVG1.svg'
        }, {
          title: 'newSVG2.svg',
          name: '2',
          content: 'newSVG2.svg'
        }],
        tabIndex: 2,
        gridData1: [{
          parking_id: '72',
          seat_number: 'H906701',
          floor: '-1楼',
          cell_x: '45',
          cell_y: '53'
        },{
          parking_id: '72',
          seat_number: 'H906701',
          floor: '-1楼',
          cell_x: '45',
          cell_y: '53'
        },{
          parking_id: '72',
          seat_number: 'H906701',
          floor: '-1楼',
          cell_x: '45',
          cell_y: '53'
        },{
          parking_id: '72',
          seat_number: 'H906701',
          floor: '-1楼',
          cell_x: '45',
          cell_y: '53'
        },{
          parking_id: '72',
          seat_number: 'H906701',
          floor: '-1楼',
          cell_x: '45',
          cell_y: '53'
        }],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        labelPosition: 'right',
        ruleForm:{
          width:'',
          height:''
        }
      }
    },
   created: function (){

    },
    methods: {
     //设置地图大小
      settingData:function () {
        var ths = this;
        ths.baseDataTableVisible = true;
      },
     //获取出入口列表
     getExitOrInList:function () {
       var ths = this;
       ths.exitOrInTableVisible = true;
     },
      //获取车位列表
      getCarSeatList:function () {
       var ths = this;
       ths.carSeatTableVisible = true;
      },
     setState(i){
       this.clickState = i;
     },
      clickCell(e){
        alert(e.x/100 +" " +e.y/80);
        document.getElementById('cell_x').innerText = e.x;
        document.getElementById('cell_y').innerText = e.y;
        switch (this.clickState){
          case 1:
            document.getElementById('tongXing').innerText = "此处可通行";
            alert("标记此处可通行");
            break;
          case 0:
            document.getElementById('tongXing').innerText = "此处不可通行";
            alert("标记此处不可通行");
            break;
          case 2:
            alert("标记此处是车位");
            break;
          case 3:
            document.getElementById('exitOrin').innerText = "人员出口";
            alert("标记此处是人员出口");
            break;
          case 4:
            document.getElementById('exitOrin').innerText = "人员入口";
            alert("标记此处是人员入口");
            break;
          case 5:
            document.getElementById('exitOrin').innerText = "车辆出口";
            alert("标记此处是车辆出口");
            break;
          case 6:
            document.getElementById('exitOrin').innerText = "车辆入口";
            alert("标记此处是车辆入口");
            break;
        }
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'newSVG.svg',
            name: newTabName,
            content: 'newSVG.svg'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      },
    }
  }
</script>

<style scoped>
  @import "/static/css/font-awesome.min.css";
  @import "/static/css/pintuer.css";
  .toolbar {
    width: 10%;
    float: left;
    height: 100%;
  }
  .toolbar button {
    background: #fff;
    height: 32px;
    width: 164px;
    margin: 4px 10px;
    border: 1px dashed #000000;
    text-align: left;
    padding-left: 10px;
  }
  .file{
    background: #fff;
    height: 32px;
    width: 164px;
    margin: 4px 10px;
    border: 1px dashed #000000;
    text-align: left;
    padding-left: 10px;
  }
  .main {
    width: 88%;
    float: right;
    height: 100%;
  }
  .statusbar span {
    padding: 0 10px;
  }
  .statusbar label {
    font-weight: 700;
  }
  .bar {
    width: 100%;
    float: left;
    height: 48px;
    background: #fefefe;
    border-bottom: 1px solid #aaa;
    margin-left: 0;
    padding-left: 0;
  }
  .bar li {
    list-style: none;
    width: 120px;
    height: 48px;
    float: left;
    line-height: 48px;
    border: 1px solid #ccc;
    background: #aaa;
    margin-left: 0;
    padding-left: 0;
    text-align: center;
    color: #fff;
  }
  .bar .label {
    list-style: none;
    width: 60px;
    height: 48px;
    float: right;
    line-height: 48px;
    margin-left: 0;
    padding-left: 0;
    text-align: center;
    background: #fff;
    color: #0099CC;
  }
  .gz {
    width: 22px;
    height: 22px;
    border: 1px dashed #ececec;
    margin-top: -1px;
    margin-left: -1px;
    float: left;
  }

  i {
    padding: 2px 10px;
    color: #00AA00;
  }

  .work_console {
    background: #fff;
    width: 100%;
    overflow: auto;
  }
  .start {
    width: 780px;
    margin: 160px auto;
  }
  .start .vol {
    float: left;
    padding: 20px 60px;
    border: 1px dashed #ccc;
    margin: 10px;
    cursor: pointer;
  }
  .start .vol i {
    display: block;
    font-size: 98px;
    padding: 10px;
    margin: 2px auto;
  }
  .start .vol button {
    display: block;
    font-size: 18px;
    padding: 10px;
    text-align: center;
    margin: 2px auto;
    background: #fff;
    border: 0;
  }
</style>
