<script>
	import bgVideoFireSrc from '$lib/assets/bg-video-fire.mp4';
	import bgVideoMarsSrc from '$lib/assets/bg-video-mars.mp4';
	import bgVideoEarthSrc from '$lib/assets/bg-video-earth.mp4';
	import { currentPage } from '$lib/globalState.svelte.js';

	let bgVideo;

	let videoSrc = $derived.by(() => {
		if (currentPage.value === 6 || currentPage.value === 8) {
			return bgVideoMarsSrc;
		} else if (currentPage.value === 9 || currentPage.value === 10) {
			return bgVideoEarthSrc;
		} else {
			return bgVideoFireSrc;
		}
	});
	// $inspect(videoSrc);

	$effect(() => {
		if (videoSrc) {
			bgVideo.load(); // reload the video element when source changes
		}
	});

	function handleBrightness(currentPage) {
		if (currentPage === 1) {
			return 'brightness-90';
		} else if (currentPage === 2) {
			return 'brightness-10';
		} else if (currentPage === 6 || currentPage === 8 || currentPage === 9 || currentPage === 10) {
			return 'brightness-40';
		} else {
			return 'brightness-0 invisible';
		}
	}
</script>

<video
	autoplay
	muted
	playsinline
	loop
	preload="auto"
	bind:this={bgVideo}
	class="fixed top-0 left-0 -z-50 min-h-[100vh] w-full object-cover {handleBrightness(
		currentPage.value
	)}"
	style="transition: filter 1200ms ease"
>
	<source src={videoSrc} type="video/mp4" />
</video>
