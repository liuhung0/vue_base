<template>
  <div>
    <div class="treeClass">
      <input type="hidden" readonly  v-model="currentValue">
      <input type="text" readonly @click="showTree" v-model="currentName" class="defaultInput" :class="{'opens':open==1}"></input>
      <div class="treeview">
        <VTreeCom :rootMenu.sync="rootMenu" :open.sync="open" @checkNode="checkNode" :data_id="data_id" :data_pid="data_pid"></VTreeCom>
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import VTreeCom from '@/components/ui/cub/VtreeCom'
  export default{
    props: ["value","labelname",'loadserver',"data_id","data_pid","root_id"],
    components:{VTreeCom},
    name:"vtree",
    data(){
      return {
        currentName:this.labelname,
        currentValue:this.value?this.value:"",
        loadurl:this.loadserver,
        open:0,
        data_id: this.data_id,
        data_pid:this.data_pid,
        rootid:this.root_id,
        name: "name",
        treeData: [
        ],
        rootMenu:[],
      }
    },
    mounted(){
      this.loadData();
    },
    watch:{
      value(val) {
        console.log(val);
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val);
      },
      labelname(val) {
        console.log(val);
        this.currentName = val;
      },
      currentName(val) {
        //this.$emit('input', val);
      }
    },
    methods: {
      loadData(){
          let that= this;
          this.$http.post(this.loadurl,{},{emulateJSON: true}).then(function (res) {
                  that.treeData.splice(0,that.treeData.length,...res.data);
                  that.formatTreeData();
          },function () {
            //return
          })
      },
      formatTreeData(){
        let that= this;
        let newData = [];
        for (let i = 0; i < that.treeData.length; i++) {
          let item = that.treeData[i];
          if (!item.children) {
            that.$set(item, 'children', []);
          }
          if (item[that.data_pid] === null || item[that.data_pid] === undefined || item[that.data_pid].length === 0 ||item[that.data_pid]==that.rootid) {
             // alert(item[that.data_pid]+"__"+that.rootid);
            newData.push(item);
          }
          else if (item[that.data_pid] !== null) {
            for (let j = 0; j < that.treeData.length; j++) {
              let item2 = that.treeData[j];
              if (item2[that.data_id] === item[that.data_pid]) {
                if (!item2.children) {
                  that.$set(item2, 'children', []);
                }
                item2.children.push(item);
              }
            }
          }
        }
         // alert(JSON.stringify(newData));
          this.$set(this,"rootMenu",newData);
      },
      showTree(){
          this.open=1;
          let that=this;
          window.document.body.addEventListener("click",function(event){
            let evtTarget = event.target || event.srcElement;
            let parents = [];
            function getParents(el){
              if(el.parentElement){
                  parents.push(el.parentElement);
                  getParents(el.parentElement)
              }
            }
            let canClose=true;
            getParents(evtTarget);
            for(let i=0;i<parents.length;i++){
                if(parents[i].className=="treeClass"){
                  canClose=false;
                  break;
                }
            }
            if(canClose){
              that.open=0;
            }
          })
      },
      checkNode(id,name){
          this.currentValue=id;
          this.currentName=name;
          this.open=0;
          this.$emit('input',this.currentValue);
      }
    }
  }
</script>
<style scoped>
  .defaultInput{
    width:100%;
    padding:5px 0;
    line-height:24px;
    border:1px solid #9fb4c1;
    border-radius:4px;
    color:#828282;
  }
  .opens{
    border-radius: 4px 4px 0 0;
    border-bottom: 0;
    background: #FFFfff;
  }
</style>
