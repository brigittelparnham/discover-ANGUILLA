<script>
  import { writable } from "svelte/store";
  import P5 from "p5-svelte";
  import { get } from "svelte/store";
 //import videoFile from "../videos/scene1a.mp4";

  export let noiseValue = 0;
  let blurAmount = writable(0);  // blurAmount for controlling blur
  $: noiseValue, blurAmount.set(noiseValue);
  let screenSize;

  let videoPlaying = writable(false);
  let videoLoaded = writable(false);
  let video;
  

  // Sketch function for p5.js
  function sketch(p) {
      let videoWidth, videoHeight;

      p.setup = () => {
          // Create a temporary video element to get metadata
          let tempVideo = document.createElement("video");
          tempVideo.src = "/videos/scene1a2.mp4";
          //console.log("Video file path:", tempVideo.src);

          tempVideo.onloadedmetadata = () => {
              videoWidth = tempVideo.videoWidth;
              videoHeight = tempVideo.videoHeight;
              let aspectRatio = videoWidth / videoHeight;

              // Calculate video size based on window size
              let calculatedWidth = screenSize < 768 ? screenSize : screenSize * 0.6;
              //let calculatedHeight = calculatedWidth / aspectRatio;
              let calculatedHeight = Math.max(500, calculatedWidth / aspectRatio);
              // Create p5 canvas based on calculated width and height
              p.createCanvas(calculatedWidth, calculatedHeight);
              p.pixelDensity(1);

              // Set up the video in p5
              video = p.createVideo('/videos/scene1a2.mp4', () => {
                  video.size(p.width, p.height);
                  video.hide();
                  video.volume(0);
                  video.loop();
                  video.autoplay = true;
                  video.play();
                  videoLoaded.set(true);
              });

              video.onplay = () => {
                  videoPlaying.set(true);
              };
          };
      };

      p.windowResized = () => {
          if (videoWidth && videoHeight) {
              let aspectRatio = videoWidth / videoHeight;
              let newWidth = screenSize < 768 ? screenSize : screenSize * 0.6;
              let newHeight = Math.max(500, newWidth / aspectRatio);
              p.resizeCanvas(newWidth, newHeight);
              video.size(p.width, p.height);
          }
      };

      p.draw = () => {
          if (!get(videoLoaded)) {
              p.background(0);
              p.fill(255);
              p.textAlign(p.CENTER, p.CENTER);
              p.text("Loading Video...", p.width / 2, p.height / 2);
              return;
          }

          p.background(0);
          p.image(video, 0, 0); // Draw the video frame

          // Apply the blur effect based on the noiseValue
          p.filter(p.BLUR, get(blurAmount));  // Apply blur effect controlled by noiseValue
      };

      p.mousePressed = () => {
          if (!get(videoPlaying)) {
              video.play();
          
      };
    }
  }
</script>

<svelte:window  bind:innerWidth={screenSize}/>

<P5 {sketch} />


