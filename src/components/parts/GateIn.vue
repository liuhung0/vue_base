<template>
  <!--入场-->
  <div class="gate">
    <div v-if="record.car_number" class="img">
      <div class="item">
        <img  :src="record.approach_picture">
      </div>
    </div>
    <div class="enter">
      <div class="enter_top">
        <span>入口:{{record.passageway}}</span>
        <span>门闸编号:{{record.terminal_number}}</span>
        <span>摄像头编号:{{record.approach_camera}}</span>
      </div>
      <div v-if="record.car_number" class="row">
        <div class="item">
          <b class="label">车牌号:</b><span class="sp">{{record.car_number}}</span>
          <el-form class="number" :model="boss" status-icon :rules="bossRole" ref="bossForm">
            <el-form-item>
              <el-autocomplete
                v-model="state4"
                :fetch-suggestions="querySearchAsync"
                placeholder="手动矫正车牌号"
                @select="handleSelect"
                class="xiala"></el-autocomplete>
              <el-button class="sure" @click="submitForm()">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="item"><b class="label">入口:</b><span class="sp">{{record.passageway}}</span></div>
        <div class="item"><b class="label">门闸编号:</b><span class="sp">{{record.terminal_number}}</span></div>
        <!--<div class="item"><b class="label">摄像头编号:</b><span>{{record.approach_camera}}</span></div>-->
        <div class="item"><b class="label">车牌号:</b><span class="sp">{{record.car_number}}</span></div>
        <div class="item"><b class="label">进场时间:</b><span class="sp">{{record.enter_time}}</span></div>


        <!--<div class="item"><b class="label">进场时间:</b><span class="sp">{{new Date(record.dateline*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span></div>-->
        <!--<div class="item"><b class="label">出场时间:</b><span class="sp">{{record.car_number}}</span></div>-->
        <!--<div class="item"><b class="label">收费金额:</b><span class="sp">{{record.car_number}}</span></div>-->
        <!--<div class="item"><b class="label">停泊类型:</b><span class="sp">{{record.car_number}}</span></div>-->
      </div>
    </div>
    <el-button  @click="GateIn" class="startGate">手动开闸</el-button>
      <!--<div class="link">-->
        <!--<a> 更多记录</a>-->
      <!--</div>-->
    <!--<div v-if="!record.car_number">暂无记录</div>-->
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    components: {
    },
    props: ["doorId"],
    data() {
      let that = this;
      return {
        restaurants: [],
        state4: '',
        timeout:  null,
        canshu:{
          pid:67,
          carNumber:"",
        },
        updata:{
          oId:'',
          oldCarNumber:'',
          newCarNumber:'',
        },
        record:{
          pid:67,
          passageway:"A通道",
          enter_time:"",
          car_number:"",
          terminal_number:"SXT-001"
        }

      }
    },
    mounted(){
      this.getRecord(this.doorId);
    },
    methods: {
      getRecord(doorId) {
        let that = this;
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();
        var number = date.getTime().toString(12).substring(6);
        console.log(number);
        that.record.enter_time = currentdate;
        that.record.car_number = "甘A-" + number;
        console.log(currentdate);
        console.log(that.records.pid);

      },
      GateIn: function () {
        let that = this;
        console.log("进来没有");
        that.$http.post(that.Constants().REST_MENZHA_SAVE, that.record, {emulateJSON: true}).then(function (res) {
          if (res.data.result == true) {
            that.$message.info("开闸成功");
            window.location.reload();
//            that.$set(that, "record", res.data.data);
//            console.log("接受" + that.record);
          } else {
            that.$message.error(res.data.message);
          }
        }, function () {
          that.$message.error("获取记录失败,网络连接错误");
        })
      },
      //以下mothod方法里面的是搜索服务端数据
      querySearchAsync(queryString, cb) {
        let that = this;
        that.canshu.carNumber = queryString;
        that.$http.post(that.Constants().REST_QUERY_CARNUMBER,that.canshu,{emulateJSON: true}).then(function(res){
          if(res.data.result){
            for(var i=0;i<res.data.data.length;i++){
              that.restaurants.push({"id": res.data.data[i].id,"value":res.data.data[i].carNumber});
            }
          }else{
            that.$message.error(res.data.message);
          }
        },function(){
          that.$message.error("获取记录失败,网络连接错误");
        })
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.updata.oId = item.id;
        this.updata.oldCarNumber = item.value;
      },
      submitForm(){
        let that = this;
        that.updata.newCarNumber = that.state4;
        if(that.updata.oldCarNumber === '' || that.updata.oldCarNumber === null){
          that.$message.info("请选定车牌!");
          return;
        }
        if(that.updata.oldCarNumber === that.updata.newCarNumber){
          that.$message.info("车牌号未做任何修改!");
          return;
        }
        that.$http.post(that.Constants().REST_UPDATA_ODER_CARNUMBER,that.updata,{emulateJSON: true}).then(function(res){
          if(res.data.result){
            that.$message.success('车牌号矫正成功');
          }else{
            that.$message.error(res.data.message);
          }
        },function(){
          that.$message.error("修改记录失败,网络连接错误");
        })
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/GateIn.css";
  .sp{
    color: #fff;
  }
</style>
<style>
  .el-popper[x-placement^=bottom]{
    width: 130px !important;
  }
</style>
