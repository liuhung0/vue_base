<template>
  <div>
    <div style="position: relative">
      <div :class="{'treeview':isc!=1||isc==undefined}" v-show="open==1">
        <ul :class="{'rootUL':isc!=1||isc==undefined}"  v-show="open==1" v-if="">
          <li v-for="(item,i) in rootMenus" :data-id="item.id">
            <div class="label">
              <span class="haschildren" v-if="item.children.length >0" @click="toggle(i)"><b>+</b></span>
              <span class="haschildren2" v-else><b>&minus;</b></span>
              <span class="names" @click="checkNode(item[data_id],item.name)"> {{item.name}}</span>
            </div>
            <vtreecom v-if="item.children.length >0"
                      v-show="item.open==1"
                      :rootMenu.syrc="item.children"
                      :open.syrc="item.open"
                      @checkNode="checkNode"
                      :data_id="fdata_id"
                      :data_pid="fdata_pid"
                      :isc="1"
            ></vtreecom>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props: ['rootMenu', 'open', "data_id", "data_pid", "isc"],
    name: "vtreecom",
    data(){
      return {
        rootMenus:this.rootMenu,
        open: this.open ? this.open : 0,
        copen: 0,
        fdata_id: this.data_id,
        fdata_pid: this.data_pid,
      }
    },
    watch:{
      rootMenu(val){
          this.rootMenus=val;
      }
    },
    methods: {
      toggle(i){
        if (this.rootMenus[i].open==null||this.rootMenus[i].open==undefined||this.rootMenus[i].open === 0) {
            let len = this.rootMenus.length;
            if(len>0){
              for(let i=0; i<len;i++){
                this.$set(this.rootMenus[i],"open",0);
              }
            }
            this.$set(this.rootMenus[i],"open",1);
        } else {
          this.$set(this.rootMenus[i],"open",0);
        }
      },
      checkNode(id, name){
        this.$emit("checkNode", id, name)
      }
    }
  }
</script>
<style scoped>
  * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }

  .treeview {
    position: absolute;
    border:1px solid #9fb4c1;
    border-top: 0;
    width: 100%;
    margin-top: -4px;
    background: #FFFFFF;
    border-radius: 0 0 4px 4px;
    z-index: 200000;
  }
  .rootUL{
    margin-left: 10px;
    padding: 0;
    list-style: none;
    border-left: 3px solid #337ab7;
    min-width: 260px;
    position: relative;
    height:auto;
  }
   ul{
     padding: 0;
    list-style: none;
    margin-left: 36px;
    border: 0;
    width: 100px;
    background: transparent;
    height:auto;
    position: relative;
    border-left: 3px solid #337ab7;
  }

  ul li {
    margin-left: -12px;
    padding: 2px;
    line-height: 24px;
    cursor: pointer;
    height:auto;
  }

  ul li .label {
    padding: 0 10px;
    color: #337ab7;
    font-weight: 300;
    display: block;
    text-align: left;
    margin-left: 30px;
    margin-top: 4px;
    height: 24px;
    width: 200px;
  }

  ul li .label .names {
    padding: 0 10px;
    line-height: 16px;
    font-size: 13px;
    height: 24px;
  }

  ul li .label:hover {
    background: #e4fbe8;
    border: 1px solid #c3d5e3;
  }

  ul li .haschildren {
    padding: 4px 10px;
    font-size: 24px;
    line-height: 16px;
    color: #337ab7;
    width: 20px;
    height: 20px;
    margin-left: -51px;
  }

  ul li .haschildren b {
    background: #f3fbef;
    border: 1px solid #decacd;
    line-height: 16px;
    width: 18px;
    height: 18px;
    display: inline-block;
    text-align: center;
  }

  ul li .haschildren b:hover {
    background: #e4fbe8;
    border: 1px solid #c3d5e3;
    line-height: 16px;
    width: 18px;
    height: 18px;
    display: inline-block;
    text-align: center;
  }

  ul li .haschildren2 {
    padding: 4px 10px;
    font-size: 24px;
    line-height: 16px;
    color: #337ab7;
    width: 20px;
    height: 20px;
    margin-left: -42px;
  }

  /*ul li:before {*/
  /*content: "---";*/
  /*color: #828282;*/
  /*font-size: 16px;*/
  /*margin-left: -16px;*/
  /*line-height: 24px;*/
  /*}*/
</style>
