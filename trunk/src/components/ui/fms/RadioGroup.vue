<template>
  <div>
      <span v-for="(tag,index) in gList" class="radio-item">
        <span @click="chc(index)">
          <img v-if="tag[prop.status]==1" :src='checkedImgUrl' >
          <img v-if="tag[prop.status]==0||tag[prop.status]==undefined" :src='noCheckImgUrl' >
        </span>
        <span v-text="tag[prop.val]"></span>
      </span>
  </div>
</template>
<script type="text/ecmascript-6">
  import checkedImg from '@/assets/yixuan.png'
  import noCheckImg from '@/assets/weixuan.png'
  export default{
    props: ["list", "prop","value"],
    data(){
      return {
        thisvalue:this.value,
        noCheckImgUrl: noCheckImg,
        checkedImgUrl: checkedImg,
        gList: this.list,
        prop: {
          key: this.prop.key ? this.prop.key : "id",
          val: this.prop.val ? this.prop.val : "val",
          status: this.prop.status ? this.prop.status : "status",
        }
      }
    },
    watch:{
        value(val){
            let that = this;
            that.thisvalue=val;
            that.gList.forEach(function(item){
              if(item[that.prop.key]==val){
                that.$set(item,that.prop.status,1);
              }
            })
        }
    },
    methods:{
        chc(index){
            let that= this;
            that.gList.forEach(function(item){
                item[that.prop.status]=0;
            })
            that.gList[index][that.prop.status]=1;
            that.thisvalue=that.gList[index][that.prop.key];
            that.$emit("input",that.thisvalue);
        }
    }
  }
</script>
<style scoped>
  .radio-item{
    list-style: none;
    float: left;
    margin: 10px;
    border: 1px dashed #aeaeae;
    padding: 4px 10px;
    border-radius: 10px;
    background: #ffeecc;
    color: #828282;
  }
</style>
