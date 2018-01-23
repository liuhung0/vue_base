<template>
  <div>
    <div><h2>{{config.title}}</h2><br/></div>
    <div class="btn—group">
      <button v-if="config.showCheckAll=='1'" class="btn btn-blue" @click="checkAll">全 选</button>
      <button v-if="config.showCheckBack=='1'" class="btn btn-main" @click="checkBack">反 选</button>
      <button v-if="config.showAdd=='1'" class="btn btn-green" @click="addObj">新 增</button>
      <button v-if="config.showDel=='1'" class="btn btn-err" @click="delObj">删 除</button>
    </div>
    <div class="table">

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
          <th class="ids" style="width:76px">编号</th>
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
          <th class="actions" >操作</th>
        </tr>
        </thead>
        <tbody v-if="config.dataset.length>0">
        <tr v-for="(data,i) in config.dataset" :class="{'odd':i%2==0,'sin':i%2==1}">
          <td class="ids" style="text-align:center">
            <input type="checkbox" ref="ids" :key="data[config.key]" :value="data[config.key]"/>
          </td>
          <td v-for="(c,i) in config.columns" v-html="c.render(data[c.prop])"></td>
          <td style="text-align:right"  class="actions">
            <button v-for=" (a,i) in config.actions" v-if="a.show(data)" @click="a.handler(data[config.key])"
                    v-text="a.name"
                    class="btn" :class="a.btnClass"></button>
          </td>
        </tr>
        </tbody>
      </table>


      <div v-if="config.dataset.length==0"
           style="padding:20px 20px;width:100%;text-align:center; font-size:17px;color:#ccc;">
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
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    components: {},
    props: ['confignation'],
    data(){
      let that = this;
      return {
        config: that.confignation,
        pagenation: that.confignation.pagenation,
        queryData: {},
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
        this.$emit("addObjHandler");
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
          that.$message.warning("您需要选择至少一项记录才可以执行删除操作!");
        }

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
        let queryData = !!that.queryData ? that.queryData : {};
        that.pagenation =that.pagenation?that.pagenation:{};
        queryData.page = that.pagenation.page?that.pagenation.page:1;
        queryData.rows = that.pagenation.rows?that.pagenation.rows:10;
        queryData.username = sessionStorage.getItem(that.Constants.LOGIN_USERS);
        queryData.token = sessionStorage.getItem(that.Constants.LOGIN_TOKEN);
        if(that.config.serverurl){
          that.$http.post(that.config.serverurl, queryData, {emulateJSON: true})
            .then(function (res) {
              if (res.data.result) {
                that.config =that.config?that.config:that.defaultConfig;
                if(that.config.pageable==undefined||that.config.pageable==true){
                  that.config.dataset.splice(0, that.config.dataset.length, ...res.data.data.data);
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
                that.$message.error(res.data.message,);
              }
            }, function (e) {
              that.$message.error("数据访问发生错误!");
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
  h2 {
    color: #828282;
  }

  .btn—group {
    width: 100%;

    padding: 10px 20px;
    margin-top: -36px;
    text-align: right;
  }

  .table table {
    width: 100%;
  }

  .table table thead th {
    text-align: center;
    font-size: 15px;
    border-left: 1px solid #23adfd;
    border-right: 1px solid #fff;
    margin-left: 2px;
    font-weight: 400;
    background: #23adfd;
    line-height: 26px;
    padding: 4px 10px;
    color: #fff;
  }

  .table table thead th:last-child {
    border-right: 1px solid #23adfd;
  }

  .table table thead td {
    text-align: center;
    padding: 2px 4px;
    font-size: 15px;
    border-left: 1px solid #23adfd;
    border-right: 1px solid #23adfd;
    margin-left: 2px;
    font-weight: 400;
    background: #23adfd;

  }

  .table table thead th input, .table table thead th select {
    text-align: left;
    width: calc(100% - 32px);
    padding: 2px 2px;
    border: 1px solid #37baec;
    border-radius: 4px;
    font-size: 15px;
    color: #679ba1;
  }

  .table table thead th i {
    text-align: center;
    font-size: 12px;
    color: #fff;
    float: right;
    padding: 10px 8px;
  }

  .table table tbody td {
    line-height: 26px;
    padding: 4px 10px;
    color: #828282;
    font-size: 15px;
    border-bottom: 1px dashed #23adfd;
    border-left: 1px dashed #23adfd;
  }

  .table table tbody td:first-child {
    border-left: 0px dashed #23adfd;
  }

  .table table .ids {
    margin: 2px 4px;
    width: 76px;
  }

  .sin {
    background: #fff;
  }

  .odd {
    background: #faf7f0;
  }

  .table table .actions {
    margin: 2px 4px;
    width: 120px;
    text-align: center;
  }

  .table table tbody .actions .btn {
    margin: 2px 4px;
  }

  .pageation {
    height: 56px;
    padding: 6px 10px;
    line-height: 18px;
    overflow: hidden;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #23adfd;
    border-right: 1px solid #23adfd;
    clear: both;
    background: #23adfd;
  }

  .pageation .info {
    color: #fff;
    float: left;
    width: 30%;
    line-height: 36px;
  }

  .pageation .info select {
    color: #23adfd;
    height: 26px;
    line-height: 36px;
    margin: 2px 10px 2px 0;
  }

  .pageation .pages {
    color: #fff;
    float: right;
    width: 60%;
    margin-left:-100px;
    text-align: right;
  }

  .pageation .pages .pageLi {
    color: #fff;
    border: 1px solid #fff;
    min-width: 30px;
    text-align: center;
    padding: 4px 6px;
    margin: 2px 4px;
    display: inline-block;
    border-radius: 4px;
    cursor: pointer;
  }

  .pageation .pages .active {
    color: rgba(29, 122, 191, 1);
    background: #ffffff;
    border: 1px solid #ffffff;
    min-width: 30px;
    text-align: center;
    padding: 4px 6px;
    margin: 2px 4px;
    display: inline-block;
    border-radius: 4px;
    cursor: pointer;
  }

  .pageation .pages .pageLis {
    color: #fff;
    line-height: 32px;
    display: inline-block;
    text-align: center;
    margin: 2px 4px;
    padding: 4px 12px;
    cursor: pointer;
    font-size: 24px;
  }

</style>
<style>
  .table table tbody td > a {
    color: rgba(134, 85, 20, 0.03);
    cursor: pointer;
  }

  .table table tbody td > a:hover {
    color: rgba(192, 161, 107, 0.07);
    text-decoration: none;
  }
</style>
