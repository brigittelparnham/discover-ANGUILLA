<script>
    import {onMount} from "svelte";
    import {fade} from 'svelte/transition';
    import Controler from "../lib/components/controler_component.svelte"
    import BlurVideo from "../lib/components/videoBlur.svelte";
    import DisplaceVideo from "../lib/components/videoDisplace.svelte"
    import WaveVideo from "../lib/components/videoWave.svelte";
    //export const prerender = true;
    let noiseValue = 0;

    let activePage = "scene1a";
    let width = 200;
    $: currentPage = pages.find(page => page.id === activePage);

    const pages = [
        {
          id: "scene1a", 
          img: "1a.png", 
          vid: BlurVideo,
          lengthTitle: "DISCOVERY - DISCOVERY - DISCOVERY - DISCOVERY - DISCOVERY - DISCOVERY",
          title: "EXT. SUNRISE. THE YORKSHIRE DALES",
          text: "it's very early morning and the sun is creeping into the day over the horizon. a man is stood topless and silhousetted in the way of the sun. we move closer to hime from a big distance. he is stood perfectly still with his back to us. we get closer and closer eventually about a meter away. he leans to one side. we move to the front of him and his eyes are closed but eyeballs moving under the lids. he abruptly opens them and he is tearing. he wipes his eyes with a tissue and begins to laugh with happiness staring into the beauty of the surrounding landscape."
        },
        {
          id: "scene7a", 
          img: "7a.png", 
          vid: DisplaceVideo,
          lengthTitle: "EXPERIMENTATION - EXPERIMENTATION - EXPERIMENTATION - EXPERIMENTATION",
          title: "INT. SINGLE ROOM STUDIO APARTMENT",
          text: "he goes to the mirror and checks his gums intensely and washes his mouth out.he puts his top back on and returns to the tank and looks inside, he tests the water temperature of the tank. he then boils a kettle already full of water.he walks to the other end of the room into a corner.He stares at the kettle intensely and it starts to steam. He watches it intensely and tension grows as it begins to boil. It begins to steam and bubble. His eyes close and he gets rapid eye movement and looks as if he is mildly possessed. The kettle clicks up. It boiled. He runs towards the kettle and turns it off at the wall with unexplained urgency and fear. He pours the water into the tank and takes the temperature again. the radio switches on again to another shipping forecast. he puts down the kettle and he stares at the radio across the room whilst getting a pen and paper ready on his desk.RADIO PRESENTER: valley, south west, falling slower,south gem haven, 1015 rising, Gail,12, manning bottom, 9miles, 1014 now falling, general situation, a thundery low is expected to lose character over 19-47, anguilla.He writes down the numbers that the radio read to him but the radio drops out. then he is distracted by a sound from the tank. dropping the notebook on the desk we see the numbers are the coordinates of the Bermuda but this is not shown."
        },
        {
          id: "scene7b", 
          img: "7b.png", 
          vid: WaveVideo,
          lengthTitle: "ENLIGHTMENT - ENLIGHTMENT - ENLIGHTMENT - ENLIGHTMENT - ENLIGHTMENT",
          title: "INT. SINGLE ROOM STUDIO APARTMENT",
          text: "he gets distracted by the tank revealing the water is now full of worms. he takes a worm out of the tank with long tweezers he walks to the bathroom he observes it on his hand he grabs the glass of water by the bathroom sink. he hesitates before walking to the toilet. he puts the lid down and puts the worm ontop. he takes the glass and crushes the worm underneath. he scrambles for something to scrape with (empty toothpaste tube) and scrapes the contents into the glass of water. he mixes it with his finger. he stares at himself in the mirror of the bathroom cabinet he prepares himself. he drinks the water. he gags but always returning to a straight face. and then gagging again but going deadpan and repeat. he grips the door and swings it open he starts twitching and cracking he abruptly undresses his top half to reveal his spine is a lot bigger and defined. he rushes to the bath in his bathroom and jumps in with his clothes on. we see him twitching. he screams and yells inaudible noises. he abruptly stops and he goes out of view seeing just a hand grip the side and we go over to the bath to reveal he is gone. we zoom into the white of the bath."
        }
    ];

    let isMobile = false;

    const updateLayout = () => {
     // console.log(window.innerWidth);
        isMobile = window.innerWidth < 768; // Adjust breakpoint if needed
    };

    onMount(() => {
        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    });

</script>
<style>
  

    p{
      font-family: "ibm-plex-mono", sans-serif;
      font-weight: 300;
      font-style: normal;
      margin:0px;
    }
   .main-body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    margin:0px;
    padding: 0px;
  }

  .logo {
    top: 100px;
    left: -100px;
    transform: rotate(-90deg);
    position: absolute;
    width: 260px;
  }

  .nav-item.active img {
    width: 80px;
    filter: none;
  }

  .nav-item.inactive img {
    filter: grayscale(80%);
    opacity: 0.5;
  }

  .nav-item:hover img {
    transform: scale(1.1);
    filter: brightness(1.2);
  }

  .controller-container{
    position: absolute;
  }


  .vertical-title {
        position: absolute;
        left: 0;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
    writing-mode: vertical-rl;
    font-size: 20px;
    white-space: nowrap;
    z-index: -1;
    }


/* MOBILE VIEW: Nav below video, text under icons */
@media (max-width: 768px) {

  .logo {
    display:none;
  }

  .main-body{
    width: 100vw;
    height: 100vh;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    position: relative;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    flex-direction: column;
  }
    .nav {
      position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: calc(100% - 30px);
        align-items: flex-end;
        margin-left: 30px;
        /* margin-right: 5px; */
        gap: 10px;
    }

    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0px 5px;

    }


    .nav-item.scene-0{
      width:18%;
    }

    .nav-item.scene-1{
      width:40%;
    }

    .nav-item.scene-2{
      width:35%;
    }

    .nav-item img {
        width: 40px;
    }

    .nav-item p {
        font-size: 8px;
        text-align: left;
    }

    .nav-item.inactive p{
      color:#bbb;
    }


    /* Scene text below each nav item on mobile */
    .scene-text {
        text-align: left;

        margin-top: 5px;
    }
}

/* DESKTOP VIEW: Nav on left, text on right */
@media (min-width: 769px) {
    .nav {
      position: fixed;
        left: -5px;
        top: 245px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .text-container {
      position: fixed;
        top: 0;
        right: 0;

        width: 30%;
        max-width: 200px;
    }

    .scene-text p {
        font-size: 16px;
    }
}

.video-container {
  position: relative;
    top: 0px;
    width: 100%;
    min-height: 300px;
    /* padding-top: 56.25%; */
    transition: height 0.3s ease-in-out;
    overflow: hidden;
}

.video-container video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease-in-out; /* Smooth transition for opacity */
}

.video-container.video-loaded video {
    opacity: 1; /* Fade the video in when it is fully loaded */
}


 /* .video-container {
    position: relative;
    width: 100%;
    height: 100%;
       
  }

    video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }*/

    /* Mobile: Full width */
    @media (max-width: 768px) {
        .video-container video {
            width: 100%;
        }
    }

    /* Desktop: Constrained width */
    @media (min-width: 769px) {

      .video-container{
        position: absolute;
        top: 0px;
        display:flex;
        justify-content: center;
      }
      .vertical-title{
        display: none;
      }
        .video-container video {
            width: 60vw; /* Adjust as needed */
            max-width: 1200px;
        }
    }
  </style>
<svelte:window bind:innerWidth={width} /> 
<div class="main-body">
   <img src="/images/logo.png" alt="logo" class="logo"/>
    {#if activePage != "home"}
    <div>
      {#key currentPage}
      <p class="vertical-title">{currentPage.lengthTitle}</p>
      {/key}
    </div>
    <div class="video-container">
      {#key currentPage}
          <!---<video preload="auto" autoplay loop muted playsinline>
              <source src={currentPage.vid} type="video/mp4">
          </video>-->
          <svelte:component this={currentPage.vid} noiseValue={noiseValue}/> 
      {/key}
    </div>

    <div class="nav" role="navigation" aria-label="Sidebar Navigation" transition:fade={{delay: 1000}}>
      {#each pages as page, index}
        <div
          class="nav-item {"scene-"+index} {page.id === activePage ? 'active' : 'inactive'}"
          on:click={() => activePage = page.id}
        >
          <img src={'/images/'+ page.img} alt={`Icon for ${page.id}`} />
          {#if isMobile} 
              <p>{page.title}</p>
              <div class="scene-text">
                <p>{page.text}</p>
              </div>
          {/if}
        </div>
      {/each}
  </div>
  
  {#if !isMobile}
      <div class="text-container">
          {#each pages as page}
              {#if page.id === activePage}
                <p>{page.title}</p>
                  <div class="scene-text">
                      <p>{page.text}</p>
                  </div>
              {/if}
          {/each}
      </div>
  {/if}

    <div class="controller-container" style={`bottom: ${isMobile ? -Math.min((width*0.5), 350) : 10}px; left: ${isMobile ? '' : 100}px`}>
     <Controler bind:noiseValue={noiseValue}/>
    </div>

    {/if}


</div>


