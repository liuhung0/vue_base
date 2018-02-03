<template>
  <el-container style="height: 780px;">
    <el-container style="background-color: rgb(249, 249, 249);height: 1150px">
      <button  style="cursor: pointer;text-align: center;letter-spacing: 2px; width: 50px;
      height: 30px; margin-left:2%;color: #fff;background: #239BFA;border: 1px solid #45bb77"><router-link style="color: #0000cc" to="/main/statistics/settlelog">返回</router-link></button>
      <div style="border: 2px #C5C5C5;width: 100%;height:500px;position:relative;margin-top:35px">

        <div class="bing2">
          <button   style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 30px;
        min-height: 37px;color: #fff;background: #239BFA;border: 1px solid #45bb77" @click="myallA(5652)">全部</button>
          <button   style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 30px;
        min-height: 37px;color: #fff; background: #f7ba2a;border: 1px solid #f7ba2a" @click="myyearA(454)">全年</button>
          <button   style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 30px;
        min-height: 37px;color: #fff;background: red;border: 1px solid red" @click="mymonthA(5656)">本月</button>
          <button   style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 30px;
        min-height: 37px;color: #fff;background: #00ff00;border: 1px solid #00ff00" @click="mydayA(56)">今日</button>
          <button   style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 30px;
        min-height: 37px;color: #fff;background: #239BFA;border: 1px solid #45bb77" @click="myweekA(565)">本周</button>
        </div>

        <div id="bing1" class="bing1"></div>

        <div id="bingA" class="bingA"></div>
        <div id="echartContainerC" class="echartContainerC"></div>
      </div>
    </el-container>
  </el-container>
</template>

<script>
  import ElContainer from "../../../../node_modules/element-ui/packages/container/src/main.vue";
  var echarts = require('echarts');
  export default {
    components: {ElContainer},
    props: [],
    data() {
      return {
        reqData: {
         ppID: sessionStorage.setItem("LOGIN_PARKING_PID",this.pid)
        },
        resDate:{
          ppID: sessionStorage.setItem("LOGIN_PARKING_PID",this.pid),
          year:null,
          month:null,
          day:null,
          week:null,
          all:null
        },
        Resdata:{
          a1:15,
          a2:15,
          a3:15,
          sumA1:1000,
          sumA2:5200,
          sumA3:15145,
          yiyue:4545,
          eryue:454,
          sanyue:4545,
          siyue:5454,
          wuyue:445,
          liuyue:748,
          qiyue:45,
          bayue:5646,
          jiuyue:12,
          shiyue:4545,
          shiyiyue:121,
          shieryue:454
        },
      }
    },
    mounted() {
      let that = this;
      this.$http.post(that.Constants().CARTYPE, that.reqData, {emulateJSON: true}).then(function (response) {
        that.resData = response.data;
        that.Resdata = response.data.data;
        this.viewbing1(that.Resdata);
        this.viewbingA(that.Resdata)
      });
      this.$http.post(that.Constants().MONTHMPNRY, that.reqData, {emulateJSON: true}).then(function (response) {
        that.resData = response.data;
        that.Resdata = response.data.data;
        this.viewData(that.Resdata);
      });
    },
    methods: {
      loadData(){
        let that = this;
        that.resDate.year = that.resData.year;
        that.resDate.month = that.resData.month;
        that.resDate.day = that.resData.day;
        that.resDate.week = that.resData.week;
        that.resDate.all = that.resData.all;
        this.$http.post(that.Constants().DATECARTYPE, that.resDate, {emulateJSON: true}).then(function (response) {
          that.Resdata = response.data.data;
          this.viewbing1(that.Resdata);
          this.viewbingA(that.Resdata)
        });
      },
      myyearA(data){
        let that =this;
        that.resData.year = data;
        that.resData.month = null;
        that.resData.day = null;
        that.resData.week = null;
        that.resData.all=null;
        that.loadData();
      },
      mymonthA(data){
        let that =this;
        that.resData.month = data;
        that.resData.year = null;
        that.resData.day = null;
        that.resData.week = null;
        that.resData.all=null;
        that.loadData();
      },
      mydayA(data){
        let that =this;
        that.resData.day = data;
        that.resData.year = null;
        that.resData.month = null;
        that.resData.week = null;
        that.resData.all=null;
        that.loadData();
      },
      myweekA(data){
        let that =this;
        that.resData.week = data;
        that.resData.year = null;
        that.resData.month = null;
        that.resData.day = null;
        that.resData.all=null;
        that.loadData();
      },
      myallA(data){
        let that =this;
        that.resData.all=data;
        that.resData.week = null;
        that.resData.year = null;
        that.resData.month = null;
        that.resData.day = null;
        that.loadData();
      },
      viewData:function(data) {
        let myChart = this.$echarts.init(document.getElementById('echartContainerC'));
        var  datas = data;
        myChart.setOption({
          title: {
            text: '停车场收入情况分析',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['单位：元']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '单位：元',
              type: 'bar',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '\n{c}元'
                  }
                }
              },
              data: [datas.yiyue, datas.eryue, datas.sanyue, datas.siyue, datas.wuyue, datas.liuyue, datas.qiyue,datas.bayue,datas.jiuyue,datas.shiyue,datas.shiyiyue,datas.shieryue],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        });
      },
      viewbing1:function(data) {
        let myChart = this.$echarts.init(document.getElementById('bing1'));
        var datas = data;
        myChart.setOption({
          title: {
            text: '各类车收入情况（单位：元）',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['临时车', '月租车', '免费车',]
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    x: '25%',
                    width: '50%',
                    funnelAlign: 'left',
                    max: 1548,
                  }
                }
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          series: [

            {
              name: '泊联',
              type: 'pie',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}收入\n{c}元'
                  }
                }
              },
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: datas.sumA1, name: '临时车'},
                {value: datas.sumA2, name: '月租车'},
                {value: datas.sumA3, name: '免费车'},
              ],
            }
          ]
        });
      },
      viewbingA:function(data) {
        let myChart = this.$echarts.init(document.getElementById('bingA'));
        var datas = data;
        myChart.setOption({
          title: {
            text: '各类车进出频次（单位：辆）',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['临时车', '月租车', '免费车',]
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    x: '25%',
                    width: '50%',
                    funnelAlign: 'left',
                    max: 1548
                  }
                }
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          series: [
            {
              name: '泊联',
              type: 'pie',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}泊车\n{c}辆'
                  }
                }
              },
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: datas.a1, name: '临时车'},
                {value: datas.a2, name: '月租车'},
                {value: datas.a3, name: '免费车'},
              ]
            }
          ]
        });
      }
    }
  }
</script>
<style scoped>
  .bing1{
    width: 40%;
    height: 439px;
    position: absolute;
    top: 16%;
    margin-left: 30px;
    border:2px solid #C5C5C5;
  }
  .pick{
    width: 96%;
    height: 439px;
    position: absolute;
    top: 110%;
    left: 2%;
  }
  .echartContainerC {
    width: 96%;
    height: 439px;
    position: absolute;
    top: 120%;
    left: 2%;
    border:2px solid #C5C5C5;
  }
  .bingA{
    width: 50%;
    height: 439px;
    position: absolute;
    top: 16%;
    left: 48%;
    border:2px solid #C5C5C5;
  }
  .bing2{
    width: 40%;
    height: 439px;
    position: absolute;
    top: 1%;
    margin-right: 10%;
    margin-left: 2%;
  }

  .echartContainerC2{
    width: 95%;
    height: 439px;
    position: absolute;
    top: 1%;
    left: 48%;
  }

</style>

