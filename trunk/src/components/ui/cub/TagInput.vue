<template>
    <div>
      <div class="textline1">
        <span>{{label}}:</span>
        <div class="input_area inputTag" >
          <input type="hidden">
          <div class="tag" v-for="(tag,index) in tagList">
            <div class="taginner"  @click="canEdit($event)"
                 @blur="cantEdit($event)"
                 @input="changeTags($event,index)">{{tag}}</div> <div class="clo" @click="removeTag(tag,index)">&times;</div></div>
          <input type="text" v-model="tag" @keyup.enter="addToTagList" @keyup.space="addToTagList" placeholder="请在此输入后回车或空格,或者从下方选择">
          <div  class="inputTag2">
              <div class="tag" v-for="(t,i) in defList" @click="getTag(t,i)" >{{t}}</div>
          </div>
        </div>

      </div>

    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        props: ["label","value"],
        data(){
            return {
                tagsValue:this.value,
                tagList:[],
                defList:["热菜","冷菜","特色菜","硬菜","清真","主食","酒水"],
                tag:"",
            }
        },
        watch:{
            value(val){
                let that =this;
               this.tagsValue=val;
               let tagtempList =val.split(",").filter(function(item){return item.toString().length>0});

               this.tagList.splice(0,this.tagList.length,...tagtempList);
               let indexList =[];
               this.tagList.forEach(function(item){
                  for(let i=0; i<that.defList.length;i++){
                    if(item == that.defList[i]){
                      indexList.push(i);
                    }
                  }
               })
              for(let j=0; j < indexList.length;j++){
                   that.defList.splice(indexList[j]-j,1);
              }
            },
            tagList(val){
              this.tagsValue=val.toString();
              this.$emit("input",this.tagsValue);
            }
        },
        methods:{
          addToTagList(){
              if(this.tag.length>0){
                this.tagList.push(this.tag);
                this.tagsValue=this.tagList.toString();
                this.tag="";
              }
          },
          changeTags(e,i){
              this.$set(this.tagList,i,e.target.innerText);
          },
          removeTag(tag,index){
            this.tagList.splice(index,1);
            this.defList.push(tag);

          },
          canEdit(e){
              e.target.setAttribute("contenteditable",true);
              e.target.classList.add("editor");
//              e.target.style.background="#fff";
//              e.target.style.borderLeft="1px dashed #ff9966"
//              e.target.style.borderRight="1px dashed #ff9966"
//              e.target.style.padding="2px 10px";
          },
          cantEdit(e){
              e.target.setAttribute("contenteditable",false);
              e.target.classList.remove("editor");
          },
          getTag(t,i){
            this.defList.splice(i,1);
            this.tagList.push(t);
            this.tagsValue=this.tagList.toString();
          }

        }

    }
</script>
<style scoped>
  .textline1 {
    line-height: 32px;
    color: #828282;
    width: calc(100% - 40px);
    display: block;
    padding: 4px 20px 4px 20px;
  }

  .textline1 span {
    line-height: 28px;
    padding: 0 4px;
    color: #828282;
    width: 140px;
    display: block;
    float: left;
    margin-top: 2px;
    font-size: 15px;
  }
  .textline1 span:before{
    width:10px;
    height:10px;
    display: block;
    border:1px solid #ff9966;
    border-radius: 50%;
    margin:11px;
    content: "";
    float:left;
  }

  .textline1 .input_area {
    text-align: left;
    float:left;
    width:calc(100% - 140px);
    font-size:15px;
  }

  .inputTag{
    padding:2px;
    border:1px dashed #fd9933;
    min-height: 94px;
    border-radius: 4px;
    float:left;
    width: 100%;

  }
  .inputTag2{
    padding:2px 6px;
    border:1px dashed #fd9933;
    min-height: 64px;
    border-radius: 4px;
    float:left;
    margin-top:0px;
    width: 100%;
    background: #f8f6e7;
  }
  .inputTag .tag{
    float:left;
    margin:2px 4px;
    padding:0 30px 0px 10px;
    background: #fff2ea;
    border:1px solid #fd9933;
    border-radius: 4px;
    position:relative;
    height:32px;
  }
  .inputTag2 .tag{
    float:left;
    margin:2px 4px;
    padding:0 10px;
    background: #fff2ea;
    border:1px solid #fd9933;
    border-radius: 4px;
    position:relative;
    cursor: pointer;
  }
  .inputTag .tag .clo{
    border:1px solid #fd6473;
    border-radius: 4px;
    color:#fd6473;
    display: block;
    padding:0 4px;
    text-align: center;
    line-height: 16px;
    cursor: pointer;
    background: #fff;
    margin-top:6px;
    right:2px;
    top:2px;
    position: absolute;
  }
  .inputTag input[type='text']{
    border:0;
    line-height:28px;
    width:100%;
    background: #fefefe;
  }
  .taginner{
    line-height:24px;
    font-size:15px;
    margin:4px 2px;
  }
  .editor{
    line-height:20px;
    margin:2px 4px;
    background:#fff;
    padding: 2px 4px;
    border: 1px solid #fd9933;
    border-radius: 4px;
  }
</style>
