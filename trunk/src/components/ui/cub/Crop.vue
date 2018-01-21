<template>
  <div>
    <div class="crop">
      <div class="wrapper">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          @realTime="realTime"
        ></vueCropper>
      </div>
      <div class="tool_ins">
        <input type="file" id="uploads" style="position:absolute; " @change="load" class="el-button load"/>
        <el-button>加载文件</el-button>
        <el-button @click="rate">旋转</el-button>
        <el-button @click="big">放大</el-button>
        <el-button @click="small">缩小</el-button>
        <el-button @click="finish">确定</el-button>

      </div>
    </div>
    <div v-show="showPreview==1" class="preview" @click="hidePreview">
      <img src="" ref="previewIframe" class="imginPreview" />
      <div class="tips">点击阴暗处取消预览</div>
      <el-button @click="upload" class="el-button btn-main btn-upload">上传</el-button>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">

  import vueCropper from 'vue-cropper'

  var opts = {};
  opts.region = "oss-cn-shanghai", 	      // 对应阿里云机房位置
    opts.bucket = "isbein",     // 对应bucketName
    opts.accessKeyId = "LTAIarzd41OS5sPA", // 对应阿里云OSS API中的accessKeyId
    opts.accessKeySecret = "cpcPY6FDsfJ5Bq9RpzgWXlIKM3qIAq", // 对应阿里云OSS API中的accessKeySecret
    opts.type = ["jpg", "jpeg", "png", "gif", "bmp"],      // 允许上传的类型
    opts.maxSize = 2 * 1024 * 1024;   // 允许上传的最大文件
  var UUID = {
    getID: function () {
      var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
      var dc = new Date();
      var t = dc.getTime() - dg.getTime();
      var tl = UUID.getIntegerBits(t, 0, 31);
      var tm = UUID.getIntegerBits(t, 32, 47);
      var thv = UUID.getIntegerBits(t, 48, 59) + '1'; // version 1, security
                                                      // version is 2
      var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
      var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
      // since detection of anything about the machine/browser is far to
      // buggy,
      // include some more random numbers here
      // if NIC or an IP can be obtained reliably, that should be put in
      // here instead.
      var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7)
        + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
        + UUID.getIntegerBits(UUID.rand(8191), 0, 7)
        + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
        + UUID.getIntegerBits(UUID.rand(8191), 0, 15); // this last
      return tl + tm + thv + csar + csl + n;
    },
    getIntegerBits: function (val, start, end) {
      var base16 = UUID.returnBase(val, 16);
      var quadArray = [];
      var quadString = '';
      var i = 0;
      for (i = 0; i < base16.length; i++) {
        quadArray.push(base16.substring(i, i + 1));
      }
      for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
        if (!quadArray[i] || quadArray[i] == '')
          quadString += '0';
        else
          quadString += quadArray[i];
      }
      return quadString;
    },
    returnBase: function (number, base) {
      return (number).toString(base).toUpperCase();
    },
    rand: function (max) {
      return Math.floor(Math.random() * (max + 1));
    }
  };
  export default{
    props: [],
    components: {
      vueCropper
    },
    data(){
      return {
        crap: false,
        previews: {},
        option: {
          img: '',
          size: 1,
          outputType: 'jpeg'
        },
        showPreview:0
      }
    },
    methods: {
      // 实时预览函数
      realTime (data) {
        this.previews = data
      },
      hidePreview(){
        this.showPreview=0
      },
      load(e){
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          this.option.img = e.target.result
        }
        reader.readAsDataURL(file);
        this.$refs.cropper.startCrop();
      },
      rate(){
        this.$refs.cropper.rotateLeft();
      },
      big(){
        this.$refs.cropper.changeScale(1);
      },
      small(){
        this.$refs.cropper.changeScale(-1);
      },
      finish(){
        this.$refs.cropper.getCropData((data) => {
          this.$refs.previewIframe.src = data;
          this.showPreview=1
        })
      },
      upload(event){
        let that = this;
        that.$refs.cropper.getCropBlob((data) => {
          //alert(data);
          let houzName = ".jpg";
          let timetemp = new Date();
          let dateFolderName = timetemp.getFullYear() + "" + (timetemp.getMonth() + 1) + "" + timetemp.getDate();
          let radomName = UUID.getID();
          let storeAs = '/data/opo/' + dateFolderName + '/' + radomName + "." + houzName;
          var client = new OSS.Wrapper({
            region: opts.region,
            accessKeyId: opts.accessKeyId,
            accessKeySecret: opts.accessKeySecret,
            bucket: opts.bucket
          });
          let arrayBuffer;
          let fileReader = new FileReader();
          fileReader.onload = function () {
            arrayBuffer = this.result;
            function toBuffer(ab) {
              var buf = new Buffer(ab.byteLength);
              var view = new Uint8Array(ab);
              for (var i = 0; i < buf.length; ++i) {
                buf[i] = view[i];
              }
              return buf;
            }

            let OSSBUFFER = toBuffer(arrayBuffer);
            client.put(storeAs, OSSBUFFER).then(function (result) {
              var url = "http://" + "oss.isbein.com/" + result.name;
              that.$emit('setURL', url);
              console.log(result);
            }).catch(function (err) {
              console.log(err);
            });
          };
          fileReader.readAsArrayBuffer(data);
        });
        event.stopPropagation();
        return false;
      }
    }
  }
</script>
<style scoped>
  .crop {
    border: 1px solid #ffbe96;
    padding: 10px;
    width: 100%;
  }

  .wrapper {
    background: rgba(0, 0, 0, .4);
    width: 100%;
    height: 480px;
    border: 1px dashed #ffbe96;
    position: relative;
  }

  .tool_ins {
    height: 48px;
    margin-top: 8px;
    text-align: left;
  }

  .tool_ins .load {
    width: 96px;
    height: 32px;
    background: #003333;
    opacity: 0;
  }
  .preview{
    position:fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.8);
  }
  .imginPreview{
    margin:20px auto;
    position: relative;
    display: block;
    top: 10%; /*偏移*/
    border:1px dashed #fd9933;
    border-radius: 20px;
    padding:20px;
    background:#fff;
    max-width: 800px;
  }
  .btn-upload{
    margin:-60px auto;
    bottom:240px;
    position: fixed;
    left:48%;
    display: block;
    padding: 10px 30px;
    border-radius: 20px;
    font-size:19px;
    font-weight: 300;
    text-align: center;
  }
  .tips{
    margin:120px auto;
    bottom:300px;
    left:40%;
    position: fixed;
    display: block;
    color: #f0dfdc;
    font-size:32px;
    text-align: center;
    text-shadow: 2px 2px 2px  #333,0 2px 10px  #333,2px 0 10px  #333;
  }
</style>
