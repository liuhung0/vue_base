<template>
  <div class="box">
    <h1>收费规则</h1>
    <div class="con">
      <div class="left">
        <el-form ref="form" :model="form" label-width="200px" class="settings">
          <h2>临时停车收费规则</h2>
          <div>
            <h3>时段计费
              <small>通用计费规则</small>
            </h3>
            <el-form-item label="临停前免费时间">
              <el-input style="float:left;width:30%;" v-model="form.beforeMinute"></el-input>
              <span style="float:left;width:80px;">分钟</span>
            </el-form-item>
            <el-form-item label="临停后免费时间">
              <el-input style="float:left;width:30%;" v-model="form.beforeMinute"></el-input>
              <span style="float:left;width:80px;">分钟</span>
            </el-form-item>
            <el-form-item label="前">
              <el-input style="float:left;width:10%;" v-model="form.beforeHour"></el-input>
              <label style="float:left;width:20%;">小时每小时</label>
              <el-input style="float:left;width:10%;" v-model="form.beforeFee"></el-input>
              <label style="float:left;width:10%;">元</label>
              <label style="float:left;width:20%;">后每小时</label>
              <el-input style="float:left;width:10%;" v-model="form.afterFee"></el-input>
              <label style="float:left;width:10%;">元</label>
            </el-form-item>
          </div>
          <div>
            <h3>夜间计费
              <small>夜间特殊计费规则 可以打开或者关闭</small>
              <el-switch style="float:right;padding:10px 0;width:10%;" v-model="form.isOpenFourth"/>
            </h3>
            <div v-if="form.isOpenFourth==1">
              <el-form-item label="选择开始结束时间">
                <el-time-picker style="float:left;width:40%" v-model="form.nightStartTime"></el-time-picker>

                <el-time-picker style="float:left;width:40%;padding-left:20px;"
                                v-model="form.nightEndTime"></el-time-picker>
              </el-form-item>
              <el-form-item label="过夜费">
                <el-input style="float:left;width:20%" v-model="form.nightFee"></el-input>
                <span class="rightSpan">元</span>
              </el-form-item>
              <el-form-item label="每小时">
                <el-input style="float:left;width:20%" v-model="form.nightHour"></el-input>
                <span class="rightSpan">元</span>
              </el-form-item>
            </div>

          </div>
          <div>
            <h3>时段封顶
              <small>夜间特殊计费规则 可以打开或者关闭</small>
              <el-switch style="float:right;padding:10px 0;width:10%;" v-model="form.isOpenFifth"></el-switch>
            </h3>
            <div v-if="form.isOpenFifth==1">
              <el-form-item label="封顶规则">
                <el-select style="float:left;" v-model="form.maxHour">
                  <el-option value="1" key="1" label="24小时" selected>24小时</el-option>
                  <el-option value="2" key="2" label="自然日">自然日</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最高">
                <el-input style="float:left;width:16%;" v-model="form.maxFee"></el-input>
                <label>元</label>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="right">
        <h2>包年包月用户
          <el-switch style="float:right;padding:10px 0;" v-model="form.isOpenFirst"></el-switch>
        </h2>
        <el-form ref="form" :model="form" label-width="80px" class="sm" v-if="form.isOpenFirst==1">
          <el-form-item label="包年费用" class="years">
            <el-input v-model="form.annualFee"></el-input><span class="rightSpan">元</span>
          </el-form-item>
          <el-form-item label="优惠价格" class="years">
            <el-input v-model="form.annualManagerDiscountFee"></el-input><span class="rightSpan">元</span>
          </el-form-item>
          <el-form-item label="包季费用" class="years">
            <el-input v-model="form.quarterFee"></el-input><span class="rightSpan">元</span>
          </el-form-item>
          <el-form-item label="优惠价格" class="years">
            <el-input v-model="form.quarterManagerDiscountFee"></el-input><span class="rightSpan">元</span>
          </el-form-item>
          <el-form-item label="包月费用" class="years">
            <el-input v-model="form.monthlyFee"></el-input><span class="rightSpan">元</span>
          </el-form-item>
          <el-form-item label="优惠价格" class="years">
            <el-input v-model="form.monthlyManagerDiscountFee"></el-input><span class="rightSpan">元</span>
          </el-form-item>
        </el-form>
        <div>
          <h2>业主管理费用
            <el-switch style="float:right;padding:10px 0;" v-model="form.isOpenSecond"></el-switch>
          </h2>
          <el-form ref="form" :model="form" label-width="200px" class="sm2" v-if="form.isOpenSecond==1">
            <el-form-item label="年管理费（十二个月）">
              <el-input  v-model="form.annualManagerFee"></el-input><span class="rightSpan">元</span>
              元
            </el-form-item>
            <el-form-item label="季管理费（三个月）">
              <el-input  v-model="form.quarterManagerFee"></el-input><span class="rightSpan">元</span>
              元
            </el-form-item>
            <el-form-item label="月管理费（一个月）">
              <el-input  v-model="form.monthlyManagerFee"></el-input><span class="rightSpan">元</span>
              元
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class ="footer">
        <el-form ref="form" :model="form" label-width="200px" class="sm2" v-if="form.isOpenSecond==1">
          <el-form-item>
            <el-button  style="float:right;margin-right:64px;margin-top:60px;" type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>

</template>
<script>
  export default {
    components: {},
    data() {
      return {
        form: {
          id: '',
          pId: '900',
          uId: sessionStorage.getItem("LOGIN_PARKING_UID"),
          token: sessionStorage.getItem("LOGIN_PARKING_TOKEN"),
          //年优惠价
          annualManagerDiscountFee: '',
          //季优惠价
          quarterManagerDiscountFee: '',
          //月度优惠价
          monthlyManagerDiscountFee: '',
          //是否开启临时停车计费规则(1,关闭  2 开启)
          isOpenThird: '',
          //是否开启夜间计费(1,关闭  2，开启)
          isOpenFourth: '',
          //是否开启时段封顶（1，关闭 ，2开启）
          isOpenFifth: '',
          //是否开启包年包月（1，关闭，2，开启）
          isOpenFirst: '',
          //   前多少分钟免费
          beforeMinute: '',
          //   前几小时
          beforeHour: '',
          //   前每小时费用
          beforeFee: '',
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
          isOpenSecond: '',
          //   年管理费
          annualManagerFee: '',
          //   季管理费
          quarterManagerFee: '',
          //   月管理费
          monthlyManagerFee: '',
        }
      }
    },
    mounted() {
      let that = this;
      that.$http.post(that.Constants().REST_MERCHANT_QUERYPRICE, that.form, {emulateJSON: true}).then(function (res) {
          if (res.data.result) {
            that.$set(that, "form", res.data.data)
            console.log("拉取收费设置成功");
            that.form.isOpenThird === 1 ? that.form.isOpenThird = false : that.form.isOpenThird = true;
            that.form.isOpenFourth === 1 ? that.form.isOpenFourth = false : that.form.isOpenFourth = true;
            that.form.isOpenFifth === 1 ? that.form.isOpenFifth = false : that.form.isOpenFifth = true;
            that.form.isOpenSecond === 1 ? that.form.isOpenSecond = false : that.form.isOpenSecond = true;
            that.form.isOpenFirst === 1 ? that.form.isOpenFirst = false : that.form.isOpenFirst = true;
          } else {
            that.$message.info(that.res.data.message)
          }
        }, function () {
          that.$message.error("网络发生错误");
        }
      )
    },
    methods: {
      onSubmit() {
        let that = this;
        that.form.isOpenThird === false ? that.form.isOpenThird = 1 : that.form.isOpenThird = 2;
        that.form.isOpenFourth === false ? that.form.isOpenFourth = 1 : that.form.isOpenFourth = 2;
        that.form.isOpenFifth === false ? that.form.isOpenFifth = 1 : that.form.isOpenFifth = 2;
        that.form.isOpenSecond === false ? that.form.isOpenSecond = 1 : that.form.isOpenSecond = 2;
        that.form.isOpenFirst === false ? that.form.isOpenFirst = 1 : that.form.isOpenFirst = 2;
        that.$http.post(that.Constants().REST_MERCHANT_SETPRICE, that.form, {emulateJSON: true}).then(function (res) {
            if (res.data.result) {
              that.$message.success("信息修改成功！");
            } else {
              that.$message.info(that.res.data.message)
            }
          }, function () {
            that.$message.error("网络发生错误");
          }
        )
      }
    }
  }
</script>
<style>
  .box {
    margin: 0;
    padding: 0;
  }

  .box h1 {
    color: #fff;
    font-size: 18px;
    font-family: fantasy;
    padding: 20px 20px 16px;
    background: #1D242E;
    margin-top: -6px;
    text-align: left;

  }

  .box .con {
    margin: 20px auto;
    padding: 20px;
    background: #3D4E66;
    box-shadow: 0 4px 16px 0 rgba(0,0,0,0.30);
    border-radius: 4px;
    border: 1px solid #333;
    width: 90%;
    min-height: 680px;
    overflow: hidden;
  }

  .box .con .left {
    width: 56%;
    min-width: 560px;
    float: left;
    border-right: 2px solid #FFFFFF;
    padding-right: 40px;
  }

  small {
    padding-left: 20px;
    color: #ccc;
    font-weight: 300;
  }

  .box .con .right {
    width: 32%;
    min-width: 360px;
    float: left;
    padding-left: 40px;
  }

  .con h2, .con h3 {
    color: #fff;
    border-bottom: 2px solid #122133;
    text-align: left;
    padding: 10px 20px;
  }

  .rightSpan {
    float: left;
    margin-left: 20px;
    font-size: 14px;
  }

  .settings label, .settings .el-form-item__label {
    color: #fff !important;
  }

  .settings .el-input__prefix {
    margin-left: 98%;
  }

  .sm .el-form-item {
   width:50%;
    float:left;
  }
  .sm label,.sm2 label{
    color: #fff !important;
  }
  .sm .el-input {
    width:60%;
    float:left;
  }
  .sm2 .el-form-item {
  }
  .sm2 .el-input {
    width:60%;
    float:left;
  }
</style>
