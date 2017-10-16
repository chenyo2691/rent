<template>
  <div class="t1-container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="m3u8播放" name="1">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="t1-text">
              on Nodejs(无跨域)
              <i style="color:green" class="el-icon-check"></i>
            </div>
            <video id="video1" width="512px" controls></video>
            <br>
            <el-button @click="setCurTime">从+30秒开始</el-button>
          </el-col>
          <el-col :span="12">
            <div class="t1-text">
              on Apache(前端控制跨域)
              <i style="color:green" class="el-icon-check"></i>
            </div>
            <video id="video2" width="512px" controls></video>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="PDF播放" name="2">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-select v-model="src" placeholder="请选择">
              <el-option v-for="item in pdfList" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.value }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
              </el-option>
            </el-select>
            <el-button @click="page--">上一页</el-button>
            <el-button @click="page++">下一页</el-button>
            <el-button @click="rotate=rotate+90">旋转</el-button>
            <el-button @click="page=2">跳状到第2页</el-button>
          </el-col>
          <el-col :offset="6" :span="12" style="margin-top:15px;text-align:center">
            <span v-if="numPages>0">第{{page}}页/共{{numPages}}页</span>
            <div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: black; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">
              {{ Math.floor(loadedRatio * 100) }}%
            </div>
            <pdf ref="myPdfComponent" style="border:1px dashed black" :src="src" :page="page" :rotate="rotate" @password="password" @progress="loadedRatio = $event" @error="error" @numPages="numPages = $event" @handleChange="handleChange"></pdf>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
const Hls = require('hls.js');
import pdf from 'vue-pdf'

export default {
  name: "t1",
  components: {
    pdf
  },
  mounted() {
    this.videoPlay('video1');
    this.videoPlay('video2');
  },
  data() {
    return {
      activeNames: ['2'],
      video1Url: '/static/upload/playlist.m3u8',
      video2Url: '/web/static/upload/playlist.m3u8',
      pdfUrl: '/static/upload/test.pdf',
      pdfList: [
        '',
        {
          value: '/static/upload/test.pdf',
          label: 'Nodejs(不跨域)'
        },
        {
          value: '/web/static/upload/test.pdf',
          label: 'Apache(前端解决跨域)'
        },
        {
          value: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
          label: '第三方'
        }
        // 'data:application/pdf;base64,JVBERi0xLjUKJbXtrvsKMyAwIG9iago8PCAvTGVuZ3RoIDQgMCBSCiAgIC9GaWx0ZXIgL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQp4nE2NuwoCQQxF+/mK+wMbk5lkHl+wIFislmIhPhYEi10Lf9/MVgZCAufmZAkMppJ6+ZLUuFWsM3ZXxvzpFNaMYjEriqpCtbZSBOsDzw0zjqPHZYtTrEmz4eto7/0K54t7GfegOGCBbBdDH3+y2zsMsVERc9SoRkXORqKGJupS6/9OmMIUfgypJL4KZW5kc3RyZWFtCmVuZG9iago0IDAgb2JqCiAgIDEzOAplbmRvYmoKMiAwIG9iago8PAogICAvRXh0R1N0YXRlIDw8CiAgICAgIC9hMCA8PCAvQ0EgMC42MTE5ODcgL2NhIDAuNjExOTg3ID4+CiAgICAgIC9hMSA8PCAvQ0EgMSAvY2EgMSA+PgogICA+Pgo+PgplbmRvYmoKNSAwIG9iago8PCAvVHlwZSAvUGFnZQogICAvUGFyZW50IDEgMCBSCiAgIC9NZWRpYUJveCBbIDAgMCA1OTUuMjc1NTc0IDg0MS44ODk3NzEgXQogICAvQ29udGVudHMgMyAwIFIKICAgL0dyb3VwIDw8CiAgICAgIC9UeXBlIC9Hcm91cAogICAgICAvUyAvVHJhbnNwYXJlbmN5CiAgICAgIC9DUyAvRGV2aWNlUkdCCiAgID4+CiAgIC9SZXNvdXJjZXMgMiAwIFIKPj4KZW5kb2JqCjEgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzCiAgIC9LaWRzIFsgNSAwIFIgXQogICAvQ291bnQgMQo+PgplbmRvYmoKNiAwIG9iago8PCAvQ3JlYXRvciAoY2Fpcm8gMS4xMS4yIChodHRwOi8vY2Fpcm9ncmFwaGljcy5vcmcpKQogICAvUHJvZHVjZXIgKGNhaXJvIDEuMTEuMiAoaHR0cDovL2NhaXJvZ3JhcGhpY3Mub3JnKSkKPj4KZW5kb2JqCjcgMCBvYmoKPDwgL1R5cGUgL0NhdGFsb2cKICAgL1BhZ2VzIDEgMCBSCj4+CmVuZG9iagp4cmVmCjAgOAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDA1ODAgMDAwMDAgbiAKMDAwMDAwMDI1MiAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAyMzAgMDAwMDAgbiAKMDAwMDAwMDM2NiAwMDAwMCBuIAowMDAwMDAwNjQ1IDAwMDAwIG4gCjAwMDAwMDA3NzIgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSA4CiAgIC9Sb290IDcgMCBSCiAgIC9JbmZvIDYgMCBSCj4+CnN0YXJ0eHJlZgo4MjQKJSVFT0YK',
      ],
      src: '',
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0,
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
        hls.loadSource(id === 'video1' ? this.video1Url : this.video2Url);
        hls.attachMedia(Media);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          // video.play()
        })

        let eventTester = function(e) {
          Media.addEventListener(e, function() {
            console.log((new Date()).getTime(), e)
          }, false);
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
    },
    password: function(updatePassword, reason) {
      updatePassword(prompt('password is "test"'));
    },
    error: function(err) {
      console.log(err);
      if (this.page == 0) {
        this.page = 1
      } else if (this.page > this.numPages) {
        this.page = this.numPages;
      }
      // this.page = 1;
      // alert(this.$refs.myPdfComponent.numPages);
      // alert(this.numPages);

    },
    handleChange() {
      console.log('handleChange');
    }
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
