<template>
  <div class="moneyRules">
    <h1>收费规则</h1>
    <div class="con">
      <div class="left">
        <el-form ref="form" :model="form" status-icon :rules="formPrice" label-width="200px" class="settings">
          <h2>临时停车收费规则</h2>
          <div>
            <h3>时段计费
              <small>通用计费规则</small>
            </h3>
            <el-form-item label="临停前免费时间" prop="beforeMinute" class="sj">
              <el-input style="float:left;width:30%;" v-model="form.beforeMinute" :maxlength="4"></el-input>
              <span class="minute">分钟</span>
            </el-form-item>
            <el-form-item label="临停后免费时间" prop="afterMinute" class="sj">
              <el-input style="float:left;width:30%;" v-model="form.afterMinute" :maxlength="4"></el-input>
              <span class="minute">分钟</span>
            </el-form-item>

            <el-form-item label="前" prop="beforeHour" style="float: left;width: 33%"class="sj">
              <el-input v-model="form.beforeHour" :maxlength="4" prop="beforeHour"/>
            </el-form-item>
            <el-form-item label="小时每小时" prop="beforeFee" style="float: left;width: 33%;margin-left: -115px" class="sj">
              <el-input v-model="form.beforeFee" :maxlength="10"/>
            </el-form-item>
            <el-form-item label="元后每小时" prop="afterFee" style="float: left;width: 34%;margin-left: -115px" class="sj">
              <el-input v-model="form.afterFee" :maxlngth="10"/>
              <label style="float:left;width:200px;margin-top: -40px">元</label>
            </el-form-item>
          </div>
          <div style="margin-top: 120px">
            <h3>夜间计费
              <small>夜间特殊计费规则 可以打开或者关闭</small>
              <el-switch style="float:right;padding:10px 0;width:10%;" v-model="form.isOpenFourth"/>
            </h3>
            <div v-if="form.isOpenFourth==1">
              <el-form-item label="选择开始时间" class="sj">
                <el-select v-model="form.nightStartTime" placeholder="开始" style="width:75px;float:left" >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <label style="float:left;margin-left: 10px">选择结束时间</label>
                <el-select v-model="form.nightEndTime" placeholder="结束" style="width:75px;float:left;margin-left:18px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="过夜费" prop="nightFee" class="sj">
                <el-input style="float:left;width:12%" v-model="form.nightFee" :maxlength="10"></el-input>
                <span class="rightSpan">元</span><span class="remark"> 设置过夜费用后,将无法打开时段封顶</span>
              </el-form-item>
              <el-form-item label="前" prop="beforeNightHour" style="float: left;width: 33%" class="sj">
                <el-input v-model="form.beforeNightHour" :maxlength="4" prop="beforeHour"></el-input>
              </el-form-item>
              <el-form-item label="小时每小时" prop="nightHour" style="float: left;width: 33%;margin-left: -115px" class="sj">
                <el-input v-model="form.nightHour" :maxlength="10"></el-input>
              </el-form-item>
              <el-form-item label="元后每小时" prop="beforeNightFee" style="float: left;width: 34%;margin-left: -115px" class="sj">
                <el-input v-model="form.beforeNightFee" :maxlength="10"></el-input>
                <label style="float:left;width:200px;margin-top: -40px">元</label>
              </el-form-item>
            </div>

          </div>
          <div style="margin-top: 120px" v-if="timetopShow==1">
            <h3>时段封顶
              <small>封顶计费规则 可以打开或者关闭</small>
              <el-switch style="float:right;padding:10px 0;width:10%;" v-model="form.isOpenFifth"
                         @click.native="changeData()"></el-switch>
            </h3>
            <div v-if="form.isOpenFifth==1">
              <el-form-item label="封顶规则" class="sj">
                <el-select style="float:left;width: 90px" v-model="form.maxHour">
                  <el-option value="1" key="1" label="24小时" selected>24小时</el-option>
                  <el-option value="2" key="2" label="自然日">自然日</el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="最高" prop="maxFee" class="sj">
                <el-input style="float:left;width:14%;" v-model="form.maxFee" maxlength="10"></el-input>
                <label style="margin-left: -500px">元</label>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="right">
        <h2>包年包月用户
          <el-switch style="float:right;padding:10px 0;" v-model="form.isOpenFirst"></el-switch>
        </h2>
        <el-form ref="form" :model="form" status-icon :rules="formPrice" label-width="80px" class="sm"
                 v-if="form.isOpenFirst==1">
          <el-form-item label="包年费用" class="years" prop="annualFee" class="sj">
            <el-input v-model="form.annualFee" maxlength="10"></el-input>
            <span class="rightSpan">元</span>
          </el-form-item>
          <el-form-item label="优惠价格" class="years" prop="annualManagerDiscountFee" class="sj">
            <el-input v-model="form.annualManagerDiscountFee" maxlength="10"></el-input>
            <span class="rightSpan">元</span>
          </el-form-item>
          <el-form-item label="包季费用" class="years" prop="quarterFee" class="sj">
            <el-input v-model="form.quarterFee" maxlength="10"></el-input>
            <span class="rightSpan">元</span>
          </el-form-item>
          <el-form-item label="优惠价格" class="sj" prop="quarterManagerDiscountFee">
            <el-input v-model="form.quarterManagerDiscountFee" maxlength="10"></el-input>
            <span class="rightSpan">元</span>
          </el-form-item>
          <el-form-item label="包月费用" class="sj" prop="monthlyFee">
            <el-input v-model="form.monthlyFee" maxlength="10"></el-input>
            <span class="rightSpan">元</span>
          </el-form-item>
          <el-form-item label="优惠价格" class="sj"  prop="monthlyManagerDiscountFee">
            <el-input v-model="form.monthlyManagerDiscountFee" maxlength="10"></el-input>
            <span class="rightSpan">元</span>
          </el-form-item>
        </el-form>
        <div>
          <h2>业主管理费用
            <el-switch style="float:right;padding:10px 0;" v-model="form.isOpenSecond"></el-switch>
          </h2>
          <el-form ref="form" :model="form" status-icon :rules="formPrice" label-width="200px" class="sm2"
                   v-if="form.isOpenSecond==1">
            <el-form-item label="年管理费（十二个月）" prop="annualManagerFee" class="sj">
              <el-input v-model="form.annualManagerFee" maxlength="10"></el-input>
              <span class="rightSpan">元</span>
            </el-form-item>
            <el-form-item label="季管理费（三个月）" prop="quarterManagerFee" class="sj">
              <el-input v-model="form.quarterManagerFee" maxlength="10"></el-input>
              <span class="rightSpan">元</span>
            </el-form-item>
            <el-form-item label="月管理费（一个月）" prop="monthlyManagerFee" class="sj">
              <el-input v-model="form.monthlyManagerFee" maxlength="10"></el-input>
              <span class="rightSpan">元</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div>
        <el-button style="float:right;margin-right:64px;margin-top:60px;" type="primary" @click="onSubmit('form')">保存
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item.vue";

  export default {
    components: {ElFormItem},
    data() {
      var validatebeforeMinute = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空!'));
        }
        if (isNaN(value) || parseInt(value) != value) {
          callback(new Error('只能是正整数!'));
        } else {
          callback();
        }
      };
      var validatorBeforeHour = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空！'));
        }
        if (isNaN(value) || parseFloat(value) <= 0) {
          callback(new Error('只能是大于零的数字！'));
        } else {
          callback();
        }
      };
      var validatorNightFee = (rule, value, callback) => {
        if (this.form.isOpenFifth === true) {
          if (value != "") {
            callback(new Error('时段封顶开启，过夜费必须为空！'));
          }
        }
        if (isNaN(value) || parseFloat(value) <= 0) {
          callback(new Error('只能是大于零的数字！'));
        } else {
          callback();
        }
      };
//      var validatorIsOpenFifth = (rule, value ,callback) => {
//        if(value === true){
//          if(this.form.nightFee != "" || this.form.nightFee != null ){
//            callback(new Error('夜间计费，过夜费只能为空！'));
//          }
//        }
//        if(value === false){
//          if(this.form.nightFee === "" || this.form.nightFee === null ){
//            callback(new Error('夜间计费，过夜费不能为空！'));
//          }
//        }else{
//          callback();
//        }
//      };
      return {
        timetopShow: 1,
        formPrice: {
          beforeMinute: [
            {validator: validatebeforeMinute, trigger: 'blur'}
          ],
          afterMinute: [
            {validator: validatebeforeMinute, trigger: 'blur'}
          ],
          beforeHour: [
            {validator: validatebeforeMinute, trigger: 'blur'}
          ],
          beforeFee: [
            {validator: validatorBeforeHour, trigger: 'blur'},
          ],
          afterFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          nightFee: [
            {validator: validatorNightFee, trigger: 'blur'}
          ],
          nightHour: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          maxFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          annualFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          annualManagerDiscountFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          quarterFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          quarterManagerDiscountFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          monthlyFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          monthlyManagerDiscountFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          annualManagerFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          quarterManagerFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          monthlyManagerFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          beforeNightHour: [
            {validator: validatebeforeMinute, trigger: 'blur'}
          ],
          beforeNightFee: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
          nightHour: [
            {validator: validatorBeforeHour, trigger: 'blur'}
          ],
//          isOpenFifth:[
//            {validator: validatorIsOpenFifth, trigger:'switchChange'}
//          ],
        },
        form: {
          id: '',
          pId: sessionStorage.getItem("LOGIN_PARKING_PID"),
          uId: sessionStorage.getItem("LOGIN_PARKING_UID"),
          token: sessionStorage.getItem("LOGIN_PARKING_TOKEN"),
          beforeNightHour: '',
          beforeNightFee: '',
          nightHour: '',
          afterMinute: '',
          //年优惠价
          annualManagerDiscountFee: '',
          //季优惠价
          quarterManagerDiscountFee: '',
          //月度优惠价
          monthlyManagerDiscountFee: '',
          //是否开启临时停车计费规则(1,关闭  2 开启)
          isOpenThird: false,
          //是否开启夜间计费(1,关闭  2，开启)
          isOpenFourth: false,
          //是否开启时段封顶（1，关闭 ，2开启）
          isOpenFifth: false,
          //是否开启包年包月（1，关闭，2，开启）
          isOpenFirst: false,
          //   前多少分钟免费
          beforeMinute: '',
          //   前几小时
          beforeHour: '',
          //   前每小时费用
          beforeFee: '',
          //临时停车后多少分钟
          after_minute: '',
          //   后几小时
          afterFee: '',
          //   夜间开始时间
          nightStartTime: '',
          //   夜间结束时间
          nightEndTime: '',
          //   过夜费
          nightFee: '',
          //   夜间每小时费用
          nightHour: '',
          //   累计24小时封顶为1，自然日为2（00：00-24:00)
          maxHour: '',
          //   封顶费用
          maxFee: '',
          //   年费
          annualFee: '',
          //   季费
          quarterFee: '',
          //   月费
          monthlyFee: '',
          //   是否开启业主管理费(1,关闭，2开启)
          isOpenSecond: false,
          //   年管理费
          annualManagerFee: '',
          //   季管理费
          quarterManagerFee: '',
          //   月管理费
          monthlyManagerFee: '',
        },
        options: [{value: 1, lable: 1}, {value: 1, lable: 1}, {value: 1, lable: 1}, {value: 1, lable: 1}, {
          value: 1,
          lable: 1
        }, {value: 1, lable: 1}, {value: 1, lable: 1}
          , {value: 1, lable: 1}, {value: 1, lable: 1}, {value: 1, lable: 1}, {value: 1, lable: 1}, {
            value: 1,
            lable: 1
          }, {value: 1, lable: 1}, {value: 1, lable: 1}, {value: 1, lable: 1}
          , {value: 1, lable: 1}, {value: 1, lable: 1}, {value: 1, lable: 1}, {value: 1, lable: 1}, {
            value: 1,
            lable: 1
          }, {value: 1, lable: 1}, {value: 1, lable: 1}, {value: 1, lable: 1}
          , {value: 1, lable: 1}, {value: 1, lable: 1}
        ]
      }
    },
    mounted() {
      let that = this;
      that.init();
      for (var i = 0; i <= 24; i++) {
        that.options[i].value = i
        that.options[i].lable = i
      }
    },
    watch: {
      'form.nightFee': {
        handler(val, oldval) {
          if (val) {
            console.log("过夜费有值了", val);
            this.timetopShow = 0;
          }
          else {
            console.log("过夜费没值了", val);
            this.timetopShow = 1;
          }
        }
      }
    },
    methods: {
      init() {
        let that = this;
        that.$http.post(that.Constants().REST_MERCHANT_QUERYPRICE, that.form, {emulateJSON: true}).then(function (res) {
            if (res.data.result) {
              if (res.data.data != null) {
                that.$set(that, "form", res.data.data)
                console.log("拉取收费设置成功");
                that.form.isOpenThird === 1 ? that.form.isOpenThird = false : that.form.isOpenThird = true;
                that.form.isOpenFourth === 1 ? that.form.isOpenFourth = false : that.form.isOpenFourth = true;
                that.form.isOpenFifth === 1 ? that.form.isOpenFifth = false : that.form.isOpenFifth = true;
                that.form.isOpenSecond === 1 ? that.form.isOpenSecond = false : that.form.isOpenSecond = true;
                that.form.isOpenFirst === 1 ? that.form.isOpenFirst = false : that.form.isOpenFirst = true;
                that.form.maxHour = res.data.data.maxHour.toString();
              }
            } else {
              that.$message.info(that.res.data.message)
            }
          }, function () {
            that.$message.error("网络发生错误");
          }
        )
      }
      ,
      onSubmit(formName) {
        if (this.form.isOpenFourth === false) {
          this.form.nightStartTime = null;
          this.form.nightEndTime = null;
          this.form.nightFee = null;
          this.form.beforeNightHour = null;
          this.form.nightHour = null;
          this.form.beforeNightFee = null;
        }
        if (this.form.isOpenFifth) {
          this.form.maxHour = null;
          this.form.maxFee = null;
        }
        if (this.form.isOpenFirst === false) {
          this.form.annualFee = null;
          this.form.annualManagerDiscountFee = null;
          this.form.quarterFee = null;
          this.form.quarterManagerDiscountFee = null;
          this.form.monthlyFee = null;
          this.form.monthlyManagerDiscountFee = null;
        }
        if (this.form.isOpenSecond) {
          this.form.annualManagerFee = null;
          this.form.quarterManagerFee = null;
          this.form.monthlyManagerFee = null;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let that = this;
            that.form.isOpenThird === false ? that.form.isOpenThird = 1 : that.form.isOpenThird = 2;
            that.form.isOpenFourth === false ? that.form.isOpenFourth = 1 : that.form.isOpenFourth = 2;
            that.form.isOpenFifth === false ? that.form.isOpenFifth = 1 : that.form.isOpenFifth = 2;
            that.form.isOpenSecond === false ? that.form.isOpenSecond = 1 : that.form.isOpenSecond = 2;
            that.form.isOpenFirst === false ? that.form.isOpenFirst = 1 : that.form.isOpenFirst = 2;
            that.$http.post(that.Constants().REST_MERCHANT_SETPRICE, that.form, {emulateJSON: true}).then(function (res) {
              if (res.data.result) {
                that.init();
                that.$message.success("信息修改成功！");
              } else {
                that.$message.info(that.res.data.message)
              }
            }, function () {
              that.$message.error("网络发生错误");
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      ,
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  /*@import "../../../assets/css/MoneyRules.css";*/
  .moneyRules {
    margin: 0;
    padding: 0;
  }

  /*.moneyRules .shoufei{*/
  /*color: #fff;*/
  /*line-height: 58px;*/
  /*font-weight: 300;*/
  /*text-align: left;*/
  /*padding-left: 20px;*/
  /*background: #1D242E;*/
  /*moneyRules-shadow: 0 2px 6px 0 rgba(46,46,46,0.50);*/
  /*-webkit-margin-before: 0em;*/
  /*}*/
  .moneyRules h1 {
    color: #fff !important;
    font-size: 18px;
    font-family: fantasy;
    padding: 20px 20px 16px;
    background: #1D242E  !important;
    margin-top: -6px;
    text-align: left;
    font-weight: normal;
  }

  .moneyRules .con {
    margin: 20px auto;
    padding: 20px;
    background: #3D4E66;
    moneyRules-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.30);
    border-radius: 4px;
    border: 1px solid #333;
    width: 90%;
    min-height: 680px;
    overflow: hidden;
  }

  .moneyRules .con .left {
    width: 56%;
    min-width: 560px;
    float: left;
    /*border-right: 2px solid #FFFFFF !important;*/
    padding-right: 40px;
  }

  small {
    padding-left: 20px;
    color: #ccc;
    font-weight: 300;
  }

  .moneyRules .con .right {
    width: 32%;
    min-width: 360px;
    float: left;
    padding-left: 40px;
  }

  .con h2, .con h3 {
    color: #fff;
    font-size: 20px;
    border-bottom: 1px solid #314158 !important;
    text-align: left;
    padding: 10px 20px;
    font-weight: normal;
  }

  .rightSpan {
    float: left;
    margin-left: 20px;
    font-size: 14px;
    color: #fff;
  }
  .settings{
    max-width: 100%;
    margin:2%;
    background: none !important;
    /*box-shadow: 0 0 8px 0 rgba(5,5,5,0.50);*/
    padding:10px 20px;
    border-radius: 10px;
  }

  .settings label{
    color: #fff !important;
  }


  .sm label, .sm2 label {
    color: #fff !important;
  }


  .sm2 {
    clear: both;
    display: block;
  }

  .minute {
    color: #fff;
    float: left;
    width: 80px;
  }
</style>
<style>
  .sj .el-form-item__label{
    color: #fff !important;
  }
  .settings .el-input__prefix {
    margin-left: 98%;
  }

  .sm .el-form-item {
    width: 50%;
    float: left;
  }
  .sm .el-input {
    width: 60%;
    float: left;
  }
  .sm2 .el-form-item {
  }

  .sm2 .el-input {
    width: 60%;
    float: left;
  }
</style>
