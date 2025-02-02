<script>
    import P5 from 'p5-svelte';
    import videoFile from "../videos/scene7a.mp4";
    
    export let noiseValue = 0;
    let sliderValue = 0;
    let screenSize;

    // Map slider value to the effect
    $: noiseValue, sliderValue = noiseValue;
  
    let video1, video2;
    let offset = 0;
    let videosPlayed = false; // Flag to track if videos are played
  
    // Function to handle video play on user interaction
    function playVideos() {
        if (!videosPlayed) {
            video1.loop();
            video2.loop();
            videosPlayed = true;
        }
    }
  
    // p5.js sketch function
    function sketch(p) {
        let videoWidth, videoHeight;

        p.setup = function () {
            // Create canvas
            let tempVideo = document.createElement("video");
            tempVideo.src = videoFile;
            tempVideo.onloadedmetadata = () => {
                videoWidth = tempVideo.videoWidth;
                videoHeight = tempVideo.videoHeight;
                let aspectRatio = videoWidth / videoHeight;

                // Calculate canvas size based on window width
                let calculatedWidth = screenSize < 768 ? screenSize : screenSize * 0.6;

                // Enforce a minimum height of 300px
                let calculatedHeight = Math.max(300, calculatedWidth / aspectRatio);

                // Create canvas based on calculated width and height
                p.createCanvas(calculatedWidth, calculatedHeight);
                p.pixelDensity(1);

                // Load video files
                video1 = p.createVideo(videoFile);
                video2 = p.createVideo(videoFile);
                video1.hide();
                video2.hide();

                // Play videos on user interaction (mouse press)
                p.mousePressed = playVideos;
            }
        };

        p.windowResized = () => {
            if (videoWidth && videoHeight) {
                let aspectRatio = videoWidth / videoHeight;
                let newWidth = screenSize < 768 ? screenSize : screenSize * 0.6;

                // Ensure minimum height of 300px for smaller screens
                let newHeight = Math.max(300, newWidth / aspectRatio);

                p.resizeCanvas(newWidth, newHeight);
                video1.size(p.width, p.height);
                video2.size(p.width, p.height);
            }
        };

        p.draw = function () {
            p.background(0);

            // Draw the first (top) video with some transparency (blending effect)
            p.filter(p.INVERT);
            p.tint(255, 150); // Adjust the second argument to control transparency of the top video
            p.image(video1, 0, 0);

            // Update the offset based on the slider value passed from Svelte
            offset = p.map(sliderValue, 0, 100, -p.width / 4, p.width / 4);

            // Draw the second (bottom) video with a bit more transparency if needed
            p.tint(255, 200); // Adjust transparency for the second video
            p.image(video2, p.width / 4 + offset, 0); // Move only the second video
        };
    }
</script>

<svelte:window  bind:innerWidth={screenSize}/>
<main>
    <P5 {sketch} />
</main>



  
