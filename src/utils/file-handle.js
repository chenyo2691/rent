const fs = require('fs');
const path = require('path');
const moment = require('moment');
const BBPromise = require('bluebird');
const ffmpeg = require('fluent-ffmpeg');

const filenameInfo = str => {
  const name = (/(.*)\.[^.]+/).exec(str);
  const ext = (/\.[^\.]+$/).exec(str);
  return {
    name: name ? name[1] : '',
    ext: ext ? ext[0] : ''
  };
};


/* eslint-disable fecs-camelcase */
module.exports = {
  video2m3u8(str, origName) {
    const createFolder = function (folder) {
      try {
        fs.accessSync(folder);
      } catch (e) {
        fs.mkdirSync(folder);
      }
    };/*  */
    return new BBPromise((resolve, reject) => {
      const time = moment().format('x');
      const m3u8File = moment().format('x') + '.m3u8';
      const savePath = path.join(__dirname, '../../', 'static/upload/' + time);
      createFolder(savePath);
      const readStream = fs.createReadStream(str);
      // fs.exists(str, bool => {
      //     console.log(bool);
      // });
      ffmpeg(readStream).videoCodec('libx264')
        .audioCodec('aac')
        .size('1280x720').
        on('end', flag => {
          console.log(flag);
          resolve({
            ext: 'm3u8',
            origName: origName,
            fileName: m3u8File,
            filePath: savePath
          });
        }).on('error', error => {
          console.log(error);
        }).save(savePath + '/' + m3u8File);
    });
  }
};

/* eslint-enable fecs-camelcase */
