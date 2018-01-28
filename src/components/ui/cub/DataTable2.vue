<template>
  <div >
    <div><h2>{{config.title}}</h2><br/>
    </div>
    <div class="btn—group">
      <div style="text-align: left">
        <h3 style="width: 20%;float: left;">当日总金额:<span style="color: red">{{resData.moy}}</span>元</h3>
        <h3 style="width: 20%">当前总金额:<span style="color: red">{{resData.sumMoney}}</span>元</h3>
      </div>
      <button v-if="config.hi=='1'" style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 30px;
      min-height: 37px;color: #fff; background: #f7ba2a;border: 1px solid #f7ba2a" @click="tu()">可视化统计图表</button>
      <button v-if="config.showAdd=='1'" style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 30px;
      min-height: 37px;color: #fff;background: #239BFA;border: 1px solid #45bb77" @click="myall(5652)">全部</button>
      <button v-if="config.showAdd=='1'" style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 30px;
      min-height: 37px;color: #fff; background: #f7ba2a;border: 1px solid #f7ba2a" @click="myyear(454)">全年</button>
      <button v-if="config.showAdd=='1'" style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 30px;
      min-height: 37px;color: #fff;background: red;border: 1px solid red" @click="mymonth(5656)">本月</button>
      <button v-if="config.showAdd=='1'" style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 30px;
      min-height: 37px;color: #fff;background: #00ff00;border: 1px solid #00ff00" @click="myday(56)">今日</button>
      <button v-if="config.showAdd=='1'" style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 30px;
      min-height: 37px;color: #fff;background: #239BFA;border: 1px solid #45bb77" @click="myweek(565)">本周</button>
      <el-date-picker
        v-model="resData.startTime"
        type="date"
        placeholder="开始时间">
      </el-date-picker>
      至
      <el-date-picker
        v-model="resData.endTime"
        type="date"
        placeholder="结束时间">
      </el-date-picker>
      <button v-if="config.showAdd=='1'" style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 80px;
      min-height: 37px;color: #fff;background: #239BFA;border: 1px solid #45bb77" @click="sousuo">搜索</button>
      <button v-if="config.A=='1'" style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 80px;
      min-height: 37px;color: #fff;background: #239BFA;border: 1px solid #45bb77" @click="addObj(454)">导出excel表格</button>
      <button v-if="config.hi=='1'" style="cursor: pointer;text-align: center;letter-spacing: 2px; min-width: 80px;
      min-height: 37px;color: #fff;background: #239BFA;border: 1px solid #45bb77" @click="excelExport(454)">导出excel表格</button>
    </div>
    <!--<hr style="background:#249CFA; height: 2px;width: 100%;border:0px;"/>-->
    <div class="table table_all" >
      <div class="pageation" ref="pagenation" v-if="config.pageable==undefined||config.pageable==true">
        <div class="info">
          <select v-model="pagenation.rows" @change="changeRows">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>显示第{{(pagenation.page - 1) * pagenation.rows + 1}}至
          {{pagenation.page * pagenation.rows}}项,共{{pagenation.num}}项
        </div>
        <div class="pages">
          <span v-if="pagenation.page > 1" class="pageLi" @click="pagePev">上页</span>
          <span v-for="i in pagenation.total">
              <i v-if="i<5 || i > pagenation.total-1 || (i > (pagenation.page-2)  && i < (pagenation.page+2))"
                 class="pageLi" :class="{'active':i==pagenation.page}" @click="pageTo(i)">
                {{i}}
              </i>
              <i v-else-if="i==5||i==pagenation.total-4" class="pageLis">...</i>
          </span>
          <span v-if="pagenation.page < pagenation.total" class="pageLi"
                @click="pageNext">下页</span>
        </div>
      </div>

      <table>
        <thead>
        <tr class="header">

          <th v-for="(c,i) in  config.columns" :prop="c.prop" :width="c.width">
            <input v-if="c.filter.type=='input'"
                   type="text" ref="c.prop"
                   v-model="c.filterData"
                   @input="changeFilter(c.prop,c.filterData)"
                   :placeholder="c.name"
            />
            <select v-if="c.filter.type=='select'" @change="changeFilter(c.prop,$event.target.value)">
              <option value="" selected="selected">{{c.name}}</option>
              <option v-for="(o,i) in c.filter.data" :value="o.value">{{o.text}}</option>
            </select>

            <span v-if="c.filter.type=='none'">{{c.name}}</span>

            <i v-if="c.sortable" class="el-icon-caret-bottom" @click="changeSort($event,i)"></i>
          </th>
        </tr>
        </thead>
        <tbody v-if="config.dataset.length>0">
        <tr v-for="(data,i) in config.dataset" :class="{'odd':i%2==0,'sin':i%2==1}">

          <td v-for="(c,i) in config.columns" v-html="c.render(data[c.prop])"></td>
        </tr>
        </tbody>
      </table>

      <div v-if="config.dataset.length==0"
           style="padding:20px 20px;width:100%;text-align:center; font-size:13px;color:#ccc;">
        查无数据或发生错误!
      </div>

      <div class="pageation" ref="pagenation"  v-if="config.pageable==undefined||config.pageable==true">
        <div class="info">
          <select v-model="pagenation.rows" @change="changeRows">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          显示第{{(pagenation.page - 1) * pagenation.rows + 1}}至
          {{pagenation.page * pagenation.rows}}项,共{{pagenation.num}}项
        </div>
        <div class="pages">
          <span v-if="pagenation.page>1" class="pageLi" @click="pagePev">上页</span>
          <span v-for="i in pagenation.total">
              <i v-if="i<5 || i>pagenation.total-4 || i > pagenation.page-2 && i < pagenation.page+2"
                 class="pageLi" :class="{'active':i==pagenation.page}" @click="pageTo(i)">
                {{i}}
              </i>
              <i v-else-if="i==5||i==pagenation.total-4" class="pageLis">...</i>
          </span>
          <span v-if="pagenation.page < pagenation.total+1" class="pageLi"
                @click="pageNext">下页</span>
        </div>
      </div>
      <br/>

    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  export default{
    components: {},
    props: ['confignation'],
    data(){
      let that = this;
      return {
        resData:{
          sumMoney:0,
          moy:0,
          startTime:null,
          endTime:null,
          year:null,
          month:null,
          day:null,
          week:null,
          all:null,
          payment:null,
          charge_standard:null,
          vehicle_type:null
        },
        config: that.confignation,
        pagenation: that.confignation.pagenation,
        queryData: {
          appId:'',
          payment:null,
        },
        checkedIds: "",
        defaultConfig:{
          pagenation: {
            page: 1,
            rows: 10,
            num: 0,

          },
          dataset: [],
          draw: 1,
          showAdd:0,
          showDel:0,
          showCheckAll:0,
          showCheckBack:0,
        }
      }
    },
    watch: {
      pagenation: {
        handler(val, oldval){
          //    alert(JSON.stringify(val))
        },
        deep: true
      },
      confignation(val){
        this.config=val;
        this.$set(this,"config",val);
        this.pagenation =val.pagenation;
        this.loadData();
      }
    },
    mounted(){
      this.config=this.confignation;
      this.pagenation =this.confignation.pagenation;
      this.loadData();
    },
    methods: {
      checkAll(){
        for (let i = 0; i < this.$refs.ids.length; i++) {
          this.$refs.ids[i].checked = true;
        }
      },
      checkBack(){
        for (let i = 0; i < this.$refs.ids.length; i++) {
          if (this.$refs.ids[i].checked) {
            this.$refs.ids[i].checked = false;
          }
          else {
            this.$refs.ids[i].checked = true;
          }
        }
      },
      addObj(){
        let that = this;
        let startTime;
        let endTime;
        let payment = that.queryData.payment;
        let vehicle_type =that.queryData.vehicle_type;
        let queryData = !!that.queryData ? that.queryData : {};
        if (that.resData.startTime instanceof Date) {
          startTime = parseInt(that.resData.startTime.getTime()/1000);
          queryData.startTime = startTime;
        }
        if (that.resData.endTime instanceof Date) {
          endTime = parseInt(that.resData.endTime.getTime()/1000);
          queryData.endTime = endTime;
        }
        that.pagenation =that.pagenation?that.pagenation:{};
        queryData.page = that.pagenation.page?that.pagenation.page:1;
        let page = queryData.page;
        queryData.rows = that.pagenation.rows?that.pagenation.rows:10;
        let rows = queryData.rows;
        let user_id = sessionStorage.getItem("LOGIN_PARKING_UID");
        let token = sessionStorage.getItem("LOGIN_PARKING_TOKEN");
        let exit_time ='1514099197';
        queryData.year = that.resData.year;
        let year;
        let month;
        let day;
        let week;
        let all;
        if(that.queryData.startTime == null){
          startTime = '4553225';
        }else{
          startTime = queryData.startTime;
        }

        if(that.queryData.endTime == null){
          endTime = '4553225';
        }else{
          endTime = queryData.endTime;
        }

        if(that.queryData.year == null){
          year = '4553225';
        }else{
          year = that.resData.year;
        }

        if(that.queryData.month == null){
          month = '4553225';
        }else{
          month = that.resData.month;
        }

        if(that.queryData.day == null){
          day = '4553225';
        }else{
          day = that.resData.day;
        }

        if(that.queryData.week == null){
          week = '4553225';
        }else{
          week = that.resData.week;
        }

        if(that.queryData.all == null){
          all = '4553225';
        }else{
          all = that.resData.all;
        }

        if(payment == null){
          payment = '100';
        }
        if(vehicle_type == null){
          vehicle_type = '100';
        }
        that.reqData  = null;
        //用此种方式可以解决excel表格导出不弹窗的问题
        window.open(
          that.Constants().EXCEL+
          user_id+"/"+month+"/"+exit_time+"/"+token+
          "/"+startTime+"/"+endTime+"/"+year+"/"+day+
          "/"+week+"/"+all+"/"+payment+"/"+vehicle_type
        );
      },
      excelExport(){

        let that = this;
        let startTime;
        let endTime;
        let payment = that.queryData.payment;
        console.log(payment);
        let charge_standard =that.queryData.charge_standard ;
        let queryData = !!that.queryData ? that.queryData : {};
        if (that.resData.startTime instanceof Date) {
          startTime = parseInt(that.resData.startTime.getTime()/1000);
          queryData.startTime = startTime;
        }
        if (that.resData.endTime instanceof Date) {
          endTime = parseInt(that.resData.endTime.getTime()/1000);
          queryData.endTime = endTime;
        }
        that.pagenation =that.pagenation?that.pagenation:{};
        queryData.page = that.pagenation.page?that.pagenation.page:1;
        let page = queryData.page;
        queryData.rows = that.pagenation.rows?that.pagenation.rows:10;
        let rows = queryData.rows;
        let user_id = sessionStorage.getItem("LOGIN_PARKING_UID");
        let token = sessionStorage.getItem("LOGIN_PARKING_TOKEN");
        queryData.exit_time = '1514099197';
        let exit_time =queryData.exit_time;
        queryData.year = that.resData.year;
        let year;
        let month;
        let day;
        let week;
        let all;
        if(that.queryData.startTime == null){
          startTime = '4553225';
        }else{
          startTime = queryData.startTime;
        }

        if(that.queryData.endTime == null){
          endTime = '4553225';
        }else{
          endTime = queryData.endTime;
        }

        if(that.queryData.year == null){
          year = '4553225';
        }else{
          year = that.resData.year;
        }

        if(that.queryData.month == null){
          month = '4553225';
        }else{
          month = that.resData.month;
        }

        if(that.queryData.day == null){
          day = '4553225';
        }else{
          day = that.resData.day;
        }

        if(that.queryData.week == null){
          week = '4553225';
        }else{
          week = that.resData.week;
        }

        if(that.queryData.all == null){
          all = '4553225';
        }else{
          all = that.resData.all;
        }

        if(payment == null){
          payment = '100';
        }


        if(charge_standard == null){
          charge_standard = '100';
        }

        that.reqData  = null;
        //用此种方式可以解决excel表格导出不弹窗的问题
        window.open(
          that.Constants().DOWNLOADFINACE+
          user_id+"/"+month+"/"+exit_time+"/"+token+
          "/"+startTime+"/"+endTime+"/"+year+"/"+day+
          "/"+week+"/"+all+"/"+payment+"/"+charge_standard
        );
      },
      delObj(){
        let ids = "";
        let s = 0;
        for (let i = 0; i < this.$refs.ids.length; i++) {
          if (this.$refs.ids[i].checked) {
            ids += this.$refs.ids[i].value + ","
            s++;
          }
        }
        if (s > 0) {
          ids = ids.substring(0, ids.lastIndexOf(","));
          this.$emit("delObjHandler", ids);
        }
        else {
          this.$swal("警告!", "您需要选择至少一项记录才可以执行删除操作!", "warning");
        }

      },
      sousuo(){
        let that = this;
        that.resData.year = null;
        that.resData.month = null;
        that.resData.day = null;
        that.resData.week = null;
        that.resData.all=null;
        that.loadData();
      },
      myyear(data){
        let that =this;
        that.resData.year = data;
        that.resData.month = null;
        that.resData.day = null;
        that.resData.week = null;
        that.resData.all=null;
        that.loadData();
      },
      mymonth(data){
        let that =this;
        that.resData.month = data;
        that.resData.year = null;
        that.resData.day = null;
        that.resData.week = null;
        that.resData.all=null;
        that.loadData();
      },
      myday(data){
        let that =this;
        that.resData.day = data;
        that.resData.year = null;
        that.resData.month = null;
        that.resData.week = null;
        that.resData.all=null;
        that.loadData();
      },
      myweek(data){
        let that =this;
        that.resData.week = data;
        that.resData.year = null;
        that.resData.month = null;
        that.resData.day = null;
        that.resData.all=null;
        that.loadData();
      },
      myall(data){
        let that =this;
        that.resData.all=data;
        that.resData.week = null;
        that.resData.year = null;
        that.resData.month = null;
        that.resData.day = null;
        that.loadData();
      },
      tu(){
        this.$router.push("/page/log/FinancePic")
      },
      changeRows(){
        let that = this;
        that.pagenation.page = parseInt(1);
        that.loadData();
      },
      changeFilter(prop, fitervalue){
        let that = this;
        setTimeout(function(){
          if(prop=="username"){
            prop = prop+"Search";
          }
          that.queryData[prop] = fitervalue;
          that.pagenation.page = parseInt(1);
          that.loadData();
        },200);
      },
      pagePev(){
        let that = this;
        if (that.pagenation.page > 1) {
          that.pagenation.page--;
        }
        that.loadData();
      },
      pageNext(){
        let that = this;
        if (that.pagenation.page < that.pagenation.total) {
          that.pagenation.page++;
        }
        that.loadData();
      },
      pageTo(i){
        let that = this;
        if (that.pagenation.page < that.pagenation.total+1) {
//          that.$set(that.pagenation,"page",i);
          that.pagenation.page = i;
        }
        that.loadData();
      },
      changeSort(e, i){
        let that = this;
        let sort = that.config.columns[i].sort;
        if (sort == "asc") {
          that.config.columns[i].sort = "desc";
          e.target.setAttribute('class', "el-icon-caret-top");
        }
        if (sort == "desc") {
          that.config.columns[i].sort = "asc";
          e.target.setAttribute('class', "el-icon-caret-bottom");
        }
        that.queryData.sort = that.config.columns[i].prop;
        that.queryData.order = that.config.columns[i].sort == "desc" ? 1 : 0;
        that.loadData();
      },
      loadData(){
        let that = this;
        let startTime;
        let endTime;
        let queryData = !!that.queryData ? that.queryData : {};
        if (that.resData.startTime instanceof Date) {
          startTime = parseInt(that.resData.startTime.getTime()/1000);
          if(that.resData.year != null || that.resData.month != null || that.resData.day != null || that.resData.week != null || that.resData.all != null){
            queryData.startTime = null
          }else{
            queryData.startTime = startTime;
          }
        }
        if (that.resData.endTime instanceof Date) {
           endTime = parseInt(that.resData.endTime.getTime()/1000);
          if(that.resData.year != null || that.resData.month != null || that.resData.day != null || that.resData.week != null || that.resData.all != null) {
            queryData.endTime = null;
          }else{
            queryData.endTime = endTime;
          }
        }
        that.pagenation =that.pagenation?that.pagenation:{};
        queryData.page = that.pagenation.page?that.pagenation.page:1;
        queryData.rows = that.pagenation.rows?that.pagenation.rows:10;
        queryData.user_id = sessionStorage.getItem("LOGIN_PARKING_UID");
        queryData.token = sessionStorage.getItem("LOGIN_PARKING_TOKEN");
        queryData.username = sessionStorage.getItem("LOGIN_PARKING_USENAME");
        queryData.appId = this.$route.params.id;
        queryData.exit_time = '1514099197';
        queryData.year = that.resData.year;
        queryData.month = that.resData.month;
        queryData.day = that.resData.day;
        queryData.week = that.resData.week;
        queryData.all = that.resData.all;
        if(that.config.serverurl){
          that.$http.post(that.config.serverurl, queryData, {emulateJSON: true})
            .then(function (res) {
              if (res.data.result) {
                that.config =that.config?that.config:that.defaultConfig;
                if(that.config.pageable==undefined||that.config.pageable==true){
                  that.config.dataset.splice(0, that.config.dataset.length, ...res.data.data.data);
                  that.resData.moy = res.data.data.moy;
                  that.resData.sumMoney = res.data.data.sumMoney;
                  that.pagenation.page = parseInt(res.data.data.pagenation.page);
                  that.pagenation.rows = parseInt(res.data.data.pagenation.rows);
                  that.pagenation.num = parseInt(res.data.data.pagenation.num);
                  that.pagenation.total = Math.ceil(res.data.data.pagenation.num / res.data.data.pagenation.rows);
                }
                else{
                  that.config.dataset.splice(0, that.config.dataset.length, ...res.data.data);
                }
              }
              else {
                that.$swal("错误", res.data.message, "error");
              }
            }, function (e) {
              that.$swal("错误", JSON.stringify(e), "error");
            });
        }

      }
    },
    created(){
      this.loadData();
    }
  }
</script>
<style scoped>
  .table_all{
    border:1px solid #eee;
  }
  h2 {
    color: #333;
    font-weight: 300;
    padding-left:20px;
    border-left:4px solid #49a9ff;
  }
  .btn—group {
    width: 100%;
    padding: 10px 0;
    margin-top: -36px;
    margin-bottom: 20px;
    text-align: right;
  }

  .table table {
    width: 100%;
    margin: 0 auto;
  }

  .table table thead th {
    text-align: center;
    font-size: 14px;
    border-left: 2px solid #e8e8e8;
    border-right: 2px solid #fff;
    margin-left: 2px;
    font-weight: 400;
    background: #e8e8e8;
    line-height: 26px;
    padding: 4px 10px;
    color: #888;
  }

  .table table thead th:last-child {
    border-right: 1px solid #e8e8e8;
  }

  .table table thead td {
    text-align: center;
    padding: 2px 4px;
    font-size: 14px;
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    margin-left: 2px;
    font-weight: 400;
    background: #e8e8e8;

  }

  .table table thead th input, .table table thead th select {
    text-align: left;
    width: calc(100% - 32px);
    padding: 2px 2px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    font-size: 14px;
    color: #101314;
  }

  .table table thead th i {
    text-align: center;
    font-size: 12px;
    color: #888;
    float: right;
    padding: 10px 8px;
  }

  .table table tbody td {
    line-height: 26px;
    padding: 4px 10px;
    color: #828282;
    font-size:12px!important;
    border-bottom: 1px dashed #e8e8e8;
    border-left: 1px dashed #e8e8e8;
    word-wrap:break-word;
    word-break:break-all;
  }

  .table table tbody td:first-child {
    border-left: 0px dashed #e8e8e8;
  }

  .table table .ids {
    margin: 2px 4px;
    width: 76px;
  }
  .sin {
    background: #e7f6ff;
  }
  .odd {
    background: #fefefe;
  }

  .table table .actions {
    margin: 2px 4px;
    width: 120px;
    text-align: center;
  }
  .table table .actions .btn {
    margin: 2px 4px;
    padding:2px 6px;
    text-align: center;
    font-size:11px;
    min-height:20px;
    min-width:60px;
  }

  .table table tbody .actions .btn {
    margin: 2px 4px;
  }

  .pageation {
    height: 32px;
    padding: 2px 6px;
    line-height: 18px;
    overflow: hidden;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    clear: both;
    background: #e8e8e8;
  }

  .pageation .info {
    color: #888;
    float: left;
    width: 30%;
    line-height: 36px;
  }

  .pageation .info select {
    color: #888;
    height: 26px;
    line-height: 36px;
    margin: 2px 10px 2px 0;
  }

  .pageation .pages {
    color: #888;
    float: right;
    width: 60%;
    margin-left:-100px;
    text-align: right;
  }

  .pageation .pages .pageLi {
    color: #888;
    border: 1px solid #cccccc;
    min-width: 24px;
    text-align: center;
    padding: 4px;
    margin: 2px;
    display: inline-block;
    cursor: pointer;
  }

  .pageation .pages .active {
    color: #2d5b88;
    background: #ffffff;
    border: 1px solid #7fddff;
    min-width: 24px;
    text-align: center;
    padding: 4px;
    margin: 2px;
    display: inline-block;
    cursor: pointer;
  }

  .pageation .pages .pageLis {
    color: #7fddff;
    line-height: 32px;
    display: inline-block;
    text-align: center;
    margin: 2px 4px;
    padding: 4px 6px;
    cursor: pointer;
    font-size: 12px;
  }

</style>
<style>
  .table table tbody td > a {
    color: #409ef1;
    cursor: pointer;
  }

  .table table tbody td > a:hover {
    color: #5faec0;
    text-decoration: none;
  }
</style>
