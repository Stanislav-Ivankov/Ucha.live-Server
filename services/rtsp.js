const fs = require("fs");
const Stream = require('./node-rtsp-stream/videoStream')

const rtspService = () => {
  const init = async(repository) => {
    repository.find({ modelName: 'Cameras' })
			.then(cameras => {
        cameras.forEach(camera => {
          console.log('camera: ', camera)
          startRTSPconnection(camera);
        });
			})
			.catch(error => console.log(error));
  }

  const startRTSPconnection = async (camera, reset = false) => {
    if (!fs.existsSync(`./streams/${camera.name}/`)) {
      fs.mkdirSync(`./streams/${camera.name}/`)
      console.log('Folder was created');
    }
    let options = {
      '-fflags': 'nobuffer',
      '-rtsp_transport': 'tcp',
      '-i': `rtsp://${camera.RTPusername}:${camera.RTPpassword}@${camera.ip}`,
      // '-i': 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov',
      '-loglevel': 'error',
      '-stats': '',
      '-vsync': 0,
      '-copyts': '',
      '-vcodec': 'copy',
      '-acodec': 'aac',
      '-movflags': 'frag_keyframe+empty_moov',
      '-hls_flags': 'delete_segments+append_list',
      '-reconnect': 1,
      '-reconnect_at_eof': 1,
      '-reconnect_streamed': 1,
      '-reconnect_delay_max': 2,
      '-f': 'segment',
      '-ar': 44100,
      '-ac': 1,
      '-filter:a': 'highpass=f=300, lowpass=f=2000, volume=5.0',
      '-segment_list_flags': 'live',
      '-segment_time': 1,
      '-segment_list_size': 3,
      '-segment_format': 'mpegts',
      '-segment_list': `./streams/${camera.name}/index.m3u8`,
      '-segment_list_type': 'm3u8',
      '-segment_wrap': 50
    };
    options[`./streams/${camera.name}/%d.ts`] = '';
    // Start the stream
    const stream = new Stream({
      name: camera.name,
      ffmpegOptions: options
    })

    if(!reset) {
      setInterval(() => {
        const stats = fs.statSync(`./streams/${camera.name}/0.ts`);
        console.log('Time: ', stats.mtime);
        let fileDate = new Date(stats.mtime);
        let currentDate = new Date();
        if(+fileDate + 600000 < +currentDate) {
          console.log(camera.name + ' is failing. We reset');
          startRTSPconnection(camera, true);
        } else {
          console.log(camera.name + ' is working good');
        }
      }, 600000);
    }
  }

  return {
    init,
    startRTSPconnection
  };
};

module.exports = rtspService;