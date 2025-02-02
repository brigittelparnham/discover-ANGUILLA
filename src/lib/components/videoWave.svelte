<script>
    import { writable } from "svelte/store";
    //import videoFile from "../videos/scene7b.mp4";
    import P5 from "p5-svelte";
    import { createNoise2D } from "simplex-noise";
    import { get } from "svelte/store";

    export let noiseValue = 0;
    let rippleStrength = writable(0.5);
    $: noiseValue, rippleStrength.set(noiseValue);

    const simplex = createNoise2D();
    let videoPlaying = writable(false);
    let videoLoaded = writable(false);
    let video;

    let screenSize;


    function sketch(p) {
        let ripple = 0.5;
        let videoWidth, videoHeight;

        p.setup = () => {
            let tempVideo = document.createElement("video");
            tempVideo.src = '/videos/scene7b1.mp4';
            tempVideo.onloadedmetadata = () => {
                videoWidth = tempVideo.videoWidth;
                videoHeight = tempVideo.videoHeight;
                let aspectRatio = videoWidth / videoHeight;

                // If screen width < 768px, make video cover full width
                let calculatedWidth = screenSize < 768 ? screenSize : screenSize * 0.6;
                let calculatedHeight = Math.max(500, calculatedWidth / aspectRatio);

                p.createCanvas(calculatedWidth, calculatedHeight);
                p.pixelDensity(1);

                video = p.createVideo('/videos/scene7b1.mp4', () => {
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


            // Add event listener to prevent fullscreen
            video.elt.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the browser's default action of fullscreen
            });

            // Ensure no fullscreen can be triggered by other means
            video.elt.setAttribute('webkit-playsinline', ''); // For iOS devices to play inline
            video.elt.setAttribute('playsinline', ''); // Standard plays inline for mobile browsers
            };

        };

        p.windowResized = () => {
            if (videoWidth && videoHeight) {
                let aspectRatio = videoWidth / videoHeight;
                let newWidth = screenSize < 768 ?screenSize : screenSize * 0.6;
                let newHeight = Math.max(500, newWidth / aspectRatio);
                p.resizeCanvas(newWidth, newHeight);
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

            rippleStrength.set(p.map(noiseValue, 0, 100, 0, 1));
           // console.log($rippleStrength);
            ripple = get(rippleStrength);
  
            p.background(0);
            p.image(video, 0, 0);
  
            // Apply ripple effect using SimplexNoise
            p.push();
            p.loadPixels();
            for (let y = 0; y < p.height; y++) {
                for (let x = 0; x < p.width; x++) {
                    let index = (x + y * p.width) * 4;
                    let offsetX = simplex(x * 0.1, y * 0.1) * ripple * 40;
                    let offsetY = simplex(x * 0.1 + 100, y * 0.1 + 100) * ripple * 40;
                 

                    let newX = p.constrain(Math.floor(x + offsetX), 0, p.width - 1);
                    let newY = p.constrain(Math.floor(y + offsetY), 0, p.height - 1);
                    let newIndex = (newX + newY * p.width) * 4;

                    p.pixels[index] = p.pixels[newIndex];
                    p.pixels[index + 1] = p.pixels[newIndex + 1];
                    p.pixels[index + 2] = p.pixels[newIndex + 2];
                    p.pixels[index + 3] = p.pixels[newIndex + 3];
                }
            }
            p.updatePixels();
            p.pop();
        };

        p.mousePressed = () => {
            if (!get(videoPlaying)) {
                video.play();
            }
        };
    }
</script>

<svelte:window  bind:innerWidth={screenSize}/>

<P5 {sketch} />
