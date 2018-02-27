<template>
  <div class="gate">
    <div v-if="record.car_number" class="img">
      <div class="item">
        <img  :src="record.exit_picture">
      </div>
    </div>
    <div class="enter"     style="margin-top: 5%;" >
        <div class="enter_top">
          <span>出口:{{record.exit_alleyway}}</span>
          <span>门闸编号:{{record.exit_door}}</span>
          <span>摄像头编号:{{record.approach_camera}}</span>
        </div>
      <div v-if="record.car_number" class="row">
        <div class="item">
          <b class="label" >车牌号:</b><span class="sp">{{record.car_number}}</span>
          <el-form class="number" :model="boss" status-icon :rules="bossRole" ref="bossForm">
            <el-form-item>
              <el-autocomplete
                v-model="state4"
                :fetch-suggestions="querySearchAsync"
                placeholder="手动矫正车牌号"
                @select="handleSelect" class="xial"></el-autocomplete>
              <el-button class="sure" @click="submitForm()">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="item item2"><b class="label">进场时间:</b><span class="sp">{{new Date(record.approach_time*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span></div>
        <div class="item item2"><b class="label">出场时间:</b><span class="sp">{{new Date(record.exit_time*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span></div>
        <div class="item item2"><b class="label">停车总时长:</b><span class="sp">{{params.totalTime}}</span></div>
        <div class="item item2"><b class="label">进场门闸编号:</b><span class="sp">{{record.approach_door}}</span></div>
        <div class="item item2"><b class="label">进场通道:</b><span class="sp">{{record.approach_alleyway}}</span></div>
        <div class="item item2"><b class="label">停泊类型:</b><span class="sp">{{record.vehicle_type==5?"临时车":"月租车"}}</span></div>
        <div class="item item2"><b class="label">收费金额:</b><span class="sp">{{record.cope_with}}元</span></div>
        <div class="item item2"><b class="label">应收金额:</b><span class="sp">{{record.cope_with}}元</span></div>
        <div class="item item2" v-if="boolean"><b class="label">实收金额:</b><span class="sp">{{record.real_income}}元</span></div>
        <div class="item item2" v-if="boolean" id="ids"><b class="label">支付方式:</b><span class="sp">{{record.payment==4?"现金收费":"免费"}}</span></div>
      </div>
        <el-button @click="GateOut" class="freetGate" >收费开闸</el-button>
        <el-button @click="FreeOut" class="chargeGate">免费开闸</el-button>
      <div v-if="!record.car_number">暂无记录</div>
    </div>
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
        boolean:false,
        record:{
          real_income:"",
        },
        params:{
          pid:67,
          passageway:"",
          exit_time:"",
          car_number:"",
          terminal_number:"",
          totalTime:'',
        },
        canshu:{
          pid:67,
          carNumber:"",
        },
        updata:{
          oId:'',
          oldCarNumber:'',
          newCarNumber:'',
        }
      }
    },
    mounted(){
      this.getRecord(this.doorId);
    },
    methods: {
      getRecord(doorId){
        console.log("dajiahao"+doorId);
        let that = this;
        that.$http.post(that.Constants().REST_RECORD_OUT_FIRST,{id:doorId},{emulateJSON: true}).then(function(res){
          if(res.data.result){
            that.$set(that,"record",res.data.data);
            that.params.car_number =that.record.car_number;
            that.params.passageway =that.record.exit_alleyway;
            that.params.terminal_number =that.record.exit_door;
            //下面算法计算停车总时长
            var between=(that.record.exit_time-that.record.approach_time);//除以1000是为了转换成秒
            var hour=between/3600;
            var minute=between%3600/60;
            if(hour==0 && minute==0){
              minute=1;
            }
            that.params.totalTime =parseInt(hour)+"小时"+parseInt(minute)+"分钟";
          }
        },function(){
          that.$message.error("获取记录失败,网络连接错误");
        });
        console.log(that.params.car_number);
        console.log(that.params.passageway);
      },
      //门闸手动收费操作
      GateOut :function () {
        let that = this;
        that.$http.post(that.Constants().REST_MENZHA_OUT,that.params,{emulateJSON: true}).then(function(res){
          if(res.data.result ==true){
            that.boolean=true;
            that.$message.info("开闸成功");
          }else{
            that.$message.error(res.data.message);
          }
        },function(){
          that.$message.error("获取记录失败,网络连接错误");
        })
      },
      //门闸出厂免费操作
      FreeOut :function () {
        let that = this;
        that.$http.post(that.Constants().REST_MENZHA_FREE,that.params,{emulateJSON: true}).then(function(res){
          if(res.data.result ==true){
            that.record.real_income=res.data.data.real_income;
            that.boolean = true;
            that.$message.info("开闸成功");
          }else{
            that.$message.error(res.data.message);
          }
        },function(){
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
              console.log(res.data.data.length)
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
            that.$massage.success("车牌号矫正成功!");
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
  .gate .number{
    width: 200px;
    height: 20px;
    display: flex;
    position: absolute;
    top:-17%;
    right: -4%;
  }
  .gate .el-input{
    width: 110px;
  }
  .gate .el-form-item__content{
    height: 20px;
  }
  .gate .el-input__inner{
    width: 110px;
    font-size: 10px;
    height: 20px;
    padding: 5px 10px;
  }
  .gate .sure{
    background: #278BFF;
    border-radius: 2px;
    border:none;
    width: 40px;
    height: 20px;
    color:#fff;
    text-align: center;
    line-height: 20px;
    padding: 0;
  }
  .gate .sure > span{
    font-size: 10px;
  }
  .gate{
    width:44%;
    min-width: 520px;
    background: #3D4E66;
    box-shadow: 0 4px 16px 0 rgba(0,0,0,0.30);
    border-radius: 4px;
    margin: 20px;
    padding: 20px;
    overflow: hidden;
    float:left;
  }
  .img {
    width:100%;
  }
  .img .item{
    width:100%;
    margin:4px;
    text-align: center;
  }
  .img .item img{
    height: 265px;
  }
  .enter{
    background: #4B607C;
    padding: 20px;

  }
  .enter_top{
    text-align: left;
    margin-bottom: 10px;
  }
  .enter_top >span{
    font-size: 12px;
    color: #FFFFFF;
    margin: 0 10px;
  }
  .row{
    width:100%;
    height: 280px;
    border:1px solid #fff;
  }
  .row .item{
    width:100%;
    float:left;
    text-align: center;
    border-bottom:1px solid #fff;
    position: relative;
  }
  .row .item:nth-child(9){
    border-bottom:none;
  }
  .row .item b{
    width:100px;
    height: 30px;
    line-height: 30px;
    float:left;
    display: block;
    border-right: 1px solid #fff;
    text-align: center;
    font-size: 13px;
    color: #FFFFFF;
  }
  .row .item > span{
    display: block;
    height: 30px;
    line-height: 30px;
    font-size: 13px !important;
  }
  .row .link{
    clear: both;
    float:right;
    margin-top:30px;
  }
  .startGate{
    width: 100px;
    height: 36px;
    background: #278BFF;
    border-radius: 2px;
    text-align: center;
    line-height: 13px;
    font-size: 18px;
    color: #fff;
    border:none !important;
    padding: 14px 0;
    margin-top: 7px;
    margin-left: 75%;
  }
  .freetGate,.chargeGate{
    width: 100px;
    height: 36px;
    boeder:1px solid #278BFF;
    background: #278BFF;
    border-radius: 2px;
    text-align: center;
    line-height: 13px;
    color: #fff;
    padding: 14px 0;
    margin-top: 7px;
    margin-left: 65%;
    border:none !important;
  }
  .chargeGate{
    margin-left: 10px;
  }
  .chargeGate{
    background: #E74D3D;
  }
  .freetGate > span,.chargeGate >span{
    font-size: 18px;
  }
  .gaizheng .el-input{
    height: 20px !important;
  }
  .sp{
    color: #fff;
  }

</style>
<style>
  .el-popper[x-placement^=bottom]{
    width: 130px !important;
  }
</style>

