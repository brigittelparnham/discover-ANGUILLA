<script>
    import { writable } from "svelte/store";
    import P5 from "p5-svelte";
    //import videoFile from "../videos/scene7a.mp4";
  
    export let noiseValue = 0;
    let displaceValue = writable(0);  // blurAmount for controlling blur
    $: noiseValue, $displaceValue = noiseValue;
    let screenSize;
  
    let video1Playing = writable(false);
    let video1Loaded = writable(false);
    let video1;
    let video2Playing = writable(false);
    let video2Loaded = writable(false);
    let video2;
    let offset = 0;
    
  
    // Sketch function for p5.js
    function sketch(p) {
        let videoWidth, videoHeight;
  
        p.setup = () => {
            // Create a temporary video element to get metadata
            let temp1Video = document.createElement("video");
            let temp2Video = document.createElement("video");
            temp1Video.src = "/videos/scene7a.mp4";
            temp2Video.src = "/videos/scene7a.mp4";
            temp1Video.onloadedmetadata = () => {
                videoWidth = temp1Video.videoWidth;
                videoHeight = temp1Video.videoHeight;
                let aspectRatio = videoWidth / videoHeight;
  
                // Calculate video size based on window size
                let calculatedWidth = screenSize < 768 ? screenSize : screenSize * 0.6;
                let calculatedHeight = Math.max(500, calculatedWidth / aspectRatio);
                // Create p5 canvas based on calculated width and height
                p.createCanvas(calculatedWidth, calculatedHeight);
                p.pixelDensity(1);
  
                // Set up the video in p5
                video1 = p.createVideo(videoFile, () => {
                    video1.size(p.width, p.height);
                    video1.hide();
                    video1.volume(0);
                    video1.loop();
                    video1.autoplay = true;
                    video1.play();
                    video1Loaded.set(true);
                });
  
                video1.onplay = () => {
                    video1Playing.set(true);
                };
            };

            temp2Video.onloadedmetadata = () => {
                videoWidth = temp2Video.videoWidth;
                videoHeight = temp2Video.videoHeight;
                let aspectRatio = videoWidth / videoHeight;
  
                // Calculate video size based on window size
                let calculatedWidth = screenSize < 768 ? screenSize : screenSize * 0.6;
                let calculatedHeight = Math.max(500, calculatedWidth / aspectRatio);
                // Create p5 canvas based on calculated width and height
                p.createCanvas(calculatedWidth, calculatedHeight);
                //p.pixelDensity(1);
  
                // Set up the video in p5
                video2 = p.createVideo(videoFile, () => {
                    video2.size(p.width, p.height);
                    video2.hide();
                    video2.volume(0);
                    video2.loop();
                    video2.autoplay = true;
                    video2.play();
                    video2Loaded.set(true);
                });
  
                video2.onplay = () => {
                    video2Playing.set(true);
                };
            };
        };
  
        p.windowResized = () => {
            if (videoWidth && videoHeight) {
                let aspectRatio = videoWidth / videoHeight;
                let newWidth = screenSize < 768 ? screenSize : screenSize * 0.6;
                let newHeight = Math.max(500, newWidth / aspectRatio);
                p.resizeCanvas(newWidth, newHeight);
                video1.size(p.width, p.height);
                video2.size(p.width, p.height);
            }
        };
  
        p.draw = () => {
            // Ensure video1Loaded and video2Loaded are accessed correctly
            if (!$video1Loaded || !$video2Loaded) {
                p.background(0);
                p.fill(255);
                p.textAlign(p.CENTER, p.CENTER);
                p.text("Loading Video...", p.width / 2, p.height / 2);
                return;
            }
            
            //console.log('draw running'); // Debugging if draw is called
            p.background(0);
            p.filter(p.INVERT);
            p.tint(255, 150);
            p.image(video1, 0, 0); // Draw the video frame
            offset = p.map($displaceValue, 0, 100, -p.width / 4, p.width / 4);
            //console.log('displace', $displaceValue, offset); // Check displaceValue and offset
            p.tint(255, 200);
            p.image(video2, p.width/4 + offset, 0);
            
        };
  
        p.mousePressed = () => {
            if (!$video1Playing) {
                video1.play();
            }
            if (!$video2Playing) {
                video2.play();
            }
        }
    }
</script>
  
<svelte:window bind:innerWidth={screenSize}/>

<P5 {sketch} />

  