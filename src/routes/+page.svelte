<script>
    import {onMount} from "svelte";
    import {fade} from 'svelte/transition';
   // import scene1aVid from '../../static/videos/scene1a.mp4';
   // import scene7aVid from '../../static/videos/scene7a.mp4';
  //  import scene7bVid from '../../static/videos/scene7b.mp4';
    import Controler from "../lib/components/controler_component.svelte"
    export const prerender = true;

    let move = false;
    let activePage = "home";
    $: currentPage = pages.find(page => page.id === activePage);

    const pages = [
        {id: "scene1a", img: "1a.png"},// vid: scene1aVid},
        {id: "scene7a", img: "7a.png"},// vid: scene7aVid},
        {id: "scene7b", img: "7b.png"}//, vid: scene7bVid}
    ];

    onMount(() => {
        setTimeout(() => {
            move = true;
            activePage = "scene1a"
        }, 1000);
    });

</script>
<style>
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
    width: 70%; 
    position: absolute;
    transition: transform 2s ease-in-out, top 2s ease-in-out, left 2s ease-in-out;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }

  .move {
    top: 0px; 
    left: 0px;
    transform: translate(0, 0) scale(0.2) rotate(-90deg);
  }

  .nav {
    position: fixed;
    left: 0;
    top: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .nav-item {
    cursor: pointer;
    transition: transform 0.2s ease, filter 0.2s ease;
  }

  .nav-item img {
    display: block;
    width: 50px;

    object-fit: cover;
    border-radius: 8px;
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
  </style>
<div class="main-body">
    <!---<img src="/images/logo.png" alt="logo" class="logo" class:move={move}/>
    {#if activePage != "home"}
    <div class="nav" role="navigation" aria-label="Sidebar Navigation" transition:fade={{delay: 1000}}>
        {#each pages as page}
          <div
            class="nav-item {page.id === activePage ? 'active' : 'inactive'}"
            on:click={() => activePage = page.id}
          >
            <img src={'/images/'+ page.img} alt={`Icon for ${page.id}`} />
          </div>
        {/each}
    </div>
    <div class="video-container">
        {#key currentPage}
            <video preload="auto" controls>
                <source src={currentPage.vid} type="video/mp4">
            </video>
        {/key}
    </div>
    <div class="controller-container">

    </div>
    <div class="text-container">

    </div>
    {/if}-->
    <Controler />

</div>

