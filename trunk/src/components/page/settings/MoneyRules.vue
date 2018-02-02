<template>
  <div class="box ">
    <h1>收费规则</h1>
    <el-form ref="form" :model="form" label-width="200px" class="settings">
      <div  style="display: flex">
          <div class="left">
            <h2>临时停车收费规则<span style="font-size:20px">(时段计费)</span>
              <el-switch  style="float:right;padding:10px 0;width:10%;" v-model="form.isOpenThird"></el-switch>
            </h2>
            <el-form-item label="临停免费时间">

              <el-input  style="float:left;width:30%;" v-model="form.beforeMinute"></el-input>
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
            <div class="night">
              <h3>夜间计费<el-switch  style="float:right;padding:10px 0;width:10%;" v-model="form.isOpenFourth"></el-switch></h3>
              <el-form-item label="选择开始结束时间">
                <el-time-picker  style="float:left;" v-model="form.nightStartTime"></el-time-picker>
                <el-time-picker  style="float:left;" v-model="form.nightEndTime"></el-time-picker>
              </el-form-item>
              <el-form-item style="color: #fff;width: 70%">
                <label class="feiy">过夜费</label>
                  <el-input style="width:20%;" v-model="form.nightFee"></el-input>元
                  <br>
                <div>
                  <!--<label class="feiy">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前</label>-->
                  <!--<el-input style="width:20%;"></el-input>-->
                  <label class="feiy">每小时</label>
                   <el-input style="width:20%;" v-model="form.nightHour"></el-input>元
                </div>
                <!--<div>-->
                  <!--<label class="feiy">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;后</label>-->
                  <!--<el-input style="width:20%;"></el-input>-->
                  <!--<label class="feiy">每小时</label>-->
                  <!--<el-input style="width:20%;"></el-input>元-->
                <!--</div>-->
              </el-form-item>
            </div>
            <div class="time">
              <h3>时段封顶<el-switch  style="float:right;padding:10px 0;width:10%;" v-model="form.isOpenFifth"></el-switch></h3>
              <el-form-item label="封顶规则">
                <el-select  style="float:left;" value="自然日" v-model="form.maxHour">
                  <el-option value="1">24小时</el-option>
                  <el-option value="2" >自然日</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最高">
                <el-input  style="float:left;width:16%;" v-model="form.maxFee"></el-input>
                <label>元</label>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <!--<el-button>取消</el-button>-->
              </el-form-item>
            </div>
          </div>
          <div class="right">
            <div class="yue">
              <h2>包年包月用户<el-switch  style="float:right;padding:10px 0;" v-model="form.isOpenFirst"></el-switch></h2>
              <div style="display: flex">
                <el-form-item label="包年费用" class="years">
                  <el-input v-model="form.annualFee"></el-input>
                </el-form-item>
                <el-form-item label="优惠价格" class="years">
                  <el-input v-model="form.annualManagerDiscountFee"></el-input>
                </el-form-item>
              </div>
              <div style="display: flex">
                <el-form-item label="包季费用" class="years">
                  <el-input v-model="form.quarterFee"></el-input>
                </el-form-item>
                <el-form-item label="优惠价格" class="years">
                  <el-input v-model="form.quarterManagerDiscountFee"></el-input>
                </el-form-item>
              </div>
              <div style="display: flex">
                <el-form-item label="包月费用" class="years">
                  <el-input v-model="form.monthlyFee"></el-input>
                </el-form-item>
                <el-form-item label="优惠价格" class="years">
                  <el-input v-model="form.monthlyManagerDiscountFee"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="yez">
              <h2>业主管理费用<el-switch  style="float:right;padding:10px 0;" v-model="form.isOpenSecond"></el-switch></h2>
              <el-form v-model="form.delivery" style="color: #fff">
                <el-form-item >
                  <label class="feiy">年管理费（十二个月）</label>
                  <el-input style="width:30%;" v-model="form.annualManagerFee"></el-input>元
                </el-form-item>
                <el-form-item>
                  <label class="feiy">季管理费（三个月）</label>
                  <el-input style="width:30%;" v-model="form.quarterManagerFee"></el-input>元
                </el-form-item>
                <el-form-item>
                  <label class="feiy">月管理费（一个月）</label>
                  <el-input style="width:30%;" v-model="form.monthlyManagerFee"></el-input>元
                </el-form-item>
              </el-form>

            </div>
          </div>
      </div>
    </el-form>
  </div>

</template>
<script>

  import ElCheckbox from "../../../../node_modules/element-ui/packages/checkbox/src/checkbox.vue";
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElForm from "../../../../node_modules/element-ui/packages/form/src/form.vue";

  export default {
    components: {
      ElForm,
      ElFormItem,
      ElCheckbox},
    data() {
      return {
        form: {
          //年优惠价
          annualManagerDiscountFee:'',
          //季优惠价
          quarterManagerDiscountFee:'',
          //月度优惠价
          monthlyManagerDiscountFee:'',
          //是否开启临时停车计费规则(1,关闭  2 开启)
          isOpenThird:'',
          //是否开启夜间计费(1,关闭  2，开启)
          isOpenFourth:'',
          //是否开启时段封顶（1，关闭 ，2开启）
          isOpenFifth:'',
          //是否开启包年包月（1，关闭，2，开启）
          isOpenFirst:'',
          //   前多少分钟免费
          beforeMinute:'',
          //   前几小时
          beforeHour:'',
          //   前每小时费用
          beforeFee:'',
          //   后几小时
          afterFee:'',

          delivery:'',

          //   夜间开始时间
          nightStartTime:'',
          //   夜间结束时间
          nightEndTime:'',
          //   过夜费
          nightFee:'',
          //   夜间每小时费用
          nightHour:'',
          //   累计24小时封顶为1，自然日为2（00：00-24:00)
          maxHour:'',
          //   封顶费用
          maxFee:'',
          //   年费
          annualFee:'',
          //   季费
          quarterFee:'',
          //   月费
          monthlyFee:'',
          //   是否开启业主管理费(1,关闭，2开启)
          isOpenSecond:'',
          //   年管理费
          annualManagerFee:'',
          //   季管理费
          quarterManagerFee:'',
          //   月管理费
          monthlyManagerFee:'',
        }
      }
    },
    methods: {
      onSubmit() {
       let that = this;
       that.$http.post(that.Constants.REST_MERCHANT_SETPRICE,that.form,{elmulateJSON:true}).then(function(res){
         if(res.data.result){
            that.$message.success("信息修改成功！");
         }else{
           that.$message.info(that.res.data.message)
         }
         },function () {
           that.$message.error("网络发生错误");
         }
        )
      }
    }
  }
</script>
<style scoped>
  @import "../../../assets/css/MoneyRules.css";
</style>
