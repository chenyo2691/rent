<template>
  <div class="t1-container">

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="t1-text">
            m3u8播放on Nodejs<i style="color:green" class="el-icon-check"></i>
        </div>
        <video id="video1" width="512px" controls></video>
        <br>
        <el-button @click="setCurTime">从+30秒开始</el-button>
      </el-col>
      <el-col :span="12">
        <div class="t1-text">
            m3u8播放on Apache<i style="color:green" class="el-icon-check"></i>
        </div>
        <video id="video2" width="512px" controls></video>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="t1-text">
            PDF播放on Nodejs<i style="color:green" class="el-icon-check"></i>
        </div>
        <input v-model.number="page" type="number" style="width: 5em"> /{{numPages}}
        <pdf ref="myPdfComponent" style="border:1px solid smokeWhite" :src="pdfUrl" :page="page" @numPages="numPages"></pdf>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const Hls = require('hls.js');
import pdf from 'vue-pdf'

export default {
  name: "t1",
  mounted() {
    this.videoPlay('video1');
    this.videoPlay('video2');
  },
  data() {
    return {
      video1Url: '/static/upload/playlist.m3u8',
      // video2Url: 'http://localhost/rent/public/static/upload/playlist.m3u8'
      video2Url: '/web/static/upload/playlist.m3u8',
      pdfUrl: '/static/upload/test.pdf',
      page: 1,
      numPages: 3,
    };
  },
  methods: {
    setCurTime() {
      let Media = document.getElementById('video1');
      Media.currentTime = Media.currentTime + 30;
      Media.play();
    },
    videoPlay(id) {
      if (Hls.isSupported()) {
        let Media = document.getElementById(id);
        let hls = new Hls();
        hls.loadSource(id==='video1'?this.video1Url:this.video2Url);
        hls.attachMedia(Media);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          // video.play()
        })

        let eventTester = function(e){
        Media.addEventListener(e,function(){
            console.log((new Date()).getTime(),e)
          },false);
        }

        // eventTester("loadstart"); //客户端开始请求数据
        // eventTester("progress"); //客户端正在请求数据
        // eventTester("suspend"); //延迟下载
        // eventTester("abort"); //客户端主动终止下载（不是因为错误引起）
        // eventTester("loadstart"); //客户端开始请求数据
        eventTester("progress"); //客户端正在请求数据
        // eventTester("suspend"); //延迟下载
        // eventTester("abort"); //客户端主动终止下载（不是因为错误引起），
        // eventTester("error"); //请求数据时遇到错误
        // eventTester("stalled"); //网速失速
        // eventTester("play"); //play()和autoplay开始播放时触发
        // eventTester("pause"); //pause()触发
        // eventTester("loadedmetadata"); //成功获取资源长度
        // eventTester("loadeddata"); //
        // eventTester("waiting"); //等待数据，并非错误
        // eventTester("playing"); //开始回放
        // eventTester("canplay"); //可以播放，但中途可能因为加载而暂停
        // eventTester("canplaythrough"); //可以播放，歌曲全部加载完毕
        // eventTester("seeking"); //寻找中
        eventTester("seeked"); //寻找完毕
        // eventTester("timeupdate"); //播放时间改变
        eventTester("ended"); //播放结束
        // eventTester("ratechange"); //播放速率改变
        // eventTester("durationchange"); //资源长度改变
        // eventTester("volumechange"); //音量改变
      }
    }
  },
  components: {
    pdf
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.t1 {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
