<template>
  <div>
      <div class="modal-content" v-for="(comp,index) in comps" v-bind:style="style(index,comp)">
        <div class="modal-head">
          <span @click='clickHandler(close, comp, index)'>&times;</span>
        </div>
        <div class="modal-body">
          <component :is="comp" @addOK="clickHandler(close, comp, index)"></component>
        </div>
      </div>
      <hDialogBack ref="back" v-bind:z-index="realIndex-1"></hDialogBack>
  </div>
</template>

<script>
  import hDialogBack from '@/components/ui/fms/layer/Shadow'
  function getclientPoint() {
    return {
      width: document.documentElement.clientWidth || document.body.clientWidth,
      height: document.documentElement.clientHeight || document.body.clientHeight
    }
  }
  export default {
    name: 'HDialog',
    data () {
      return {
        comps: []
      }
    },
    props: {
      'btns': {
        type: Array,
        default: function () {
          return [{text: 'ok', value: 'ok'}, {text: 'cancel', value: 'cancel'}]
        }
      },
      'mIndex': {
        type: Number,
        default: 201
      }
    },
    computed: {
      realIndex: function () {
        return this.mIndex
      }
    },
    components: {
      hDialogBack
    },
    methods: {
      open: function (comp) {
        comp.promise = new Promise(function (resolve, reject) {
          comp.resolve = resolve
          comp.reject = reject
        })
        this.comps.push(comp)
        if (!this.$refs.back.show) {
          this.$refs.back.open()
        }
        return comp.promise
      },
      close(){
        let self = this;
        self.comps.splice(0, 1)
        if (self.comps.length === 0 && self.$refs.back.show) {
          self.$refs.back.close()
        }
      },
      clickHandler: function (type, comp, index) {
        let self = this;
        let close = function () {
          self.comps.splice(index, 1)
          if (self.comps.length === 0 && self.$refs.back.show) {
            self.$refs.back.close()
          }
        }
        /** 只提供promise模式 */
        comp.resolve({'type': type, 'close': close})
      },
      style: function (index, comp) {
        let point = getclientPoint()
        return {
          zIndex: this.realIndex + index,
          width: comp.width + 'px',
          height: comp.height + 'px',
          left: ((point.width - comp.width) / 2) + 'px',
          top: ((point.height - comp.height) / 2-60) + 'px'
        }
      }
    }
  }
</script>
<style scoped>
  .modal-head span {
    position: relative;
    font-size: 32px;
    cursor: pointer;
    margin-right: 10px;
    display: block;
    float: right;
    color: #838383;
    z-index: 21;
    text-align: center;
    line-height: 32px;
    width: 32px;
    height: 32px;
    transition: All 0.4s ease-in-out;
  }

  .modal-head span:hover {
    transition: All 0.4s ease-in-out;
    width: 32px;
    height: 32px;
    transform: rotate(90deg);
  }

  .modal-content {
    position: fixed;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    top:60px;
  }

</style>

