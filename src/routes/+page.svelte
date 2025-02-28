<script>
	import { currentPage } from '$lib/globalState.svelte.js';
	import BackgroundVideo from '$lib/components/BackgroundVideo.svelte';
	import PageOne from '$lib/components/PageOne.svelte';
	import PageTwo from '$lib/components/PageTwo.svelte';
	import PageThree from '$lib/components/PageThree.svelte';
	import PageFour from '$lib/components/PageFour.svelte';
	import PageFive from '$lib/components/PageFive.svelte';
	import PageSix from '$lib/components/PageSix.svelte';
	import PageSeven from '$lib/components/PageSeven.svelte';
	import PageEight from '$lib/components/PageEight.svelte';
	import PageNine from '$lib/components/PageNine.svelte';
	import PageTen from '$lib/components/PageTen.svelte';
	import PageEleven from '$lib/components/PageEleven.svelte';
	import PageTwelve from '$lib/components/PageTwelve.svelte';
	import StreamGraph from '$lib/components/StreamGraph.svelte';
	import SwarmChart from '$lib/components/SwarmChart.svelte';

	const pages = [
		PageOne,
		PageTwo,
		PageThree,
		PageFour,
		PageFive,
		PageSix,
		PageSeven,
		PageEight,
		PageNine,
		PageTen,
		PageEleven,
		PageTwelve
	]; // dynamically render the page based on the 'currentPage' value
	const RenderedPage = $derived(pages[currentPage.value - 1]);

	let { data } = $props(); // receive data from +page.js
	const { bookData, streamData } = data; // deconstruct the data object received
</script>

<BackgroundVideo />
<RenderedPage />
<div
	class="stream-ctn {currentPage.value === 3 || currentPage.value === 4 || currentPage.value === 5
		? 'block'
		: 'hidden'}"
>
	<StreamGraph data={streamData} />
</div>
<div class="swarm-ctn {currentPage.value === 7 ? 'block' : 'hidden'}">
	<SwarmChart data={bookData} />
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";

	/* prettier-ignore */
	:global(.grid-ctn) {
		@apply grid grid-cols-4 mx-[2rem] gap-x-[1rem] gap-y-[2px] max-w-[1440px] 
					 sm:grid-cols-8 sm:mx-[3rem] 
					 md:gap-x-[1.5rem]
					 lg:grid-cols-12 
					 2xl:mx-auto;
	}

	/* prettier-ignore */
	:global(article) {
		@apply mx-auto max-w-[400px] mt-[4rem]
					 flex flex-col gap-[1rem] 
		       sm:max-w-[600px]
					 md:max-w-[750px];
	}

	/* prettier-ignore */
	:global(p) {
		@apply text-[1rem] leading-[1.5rem] tracking-[-0.011rem] font-[400]
		       sm:text-[1.125rem] sm:leading-[1.5rem] sm:tracking-[-0.014rem];
	}

	/* prettier-ignore */
	.stream-ctn {
		@apply h-[90vh] w-full mt-[2rem]
					 md:fixed md:bottom-0 md:left-0 md:h-[65vh];
	}

	/* prettier-ignore */
	.swarm-ctn {
		@apply h-[120vh] w-full mt-[2rem]   
					 lg:fixed lg:bottom-0 lg:left-0 lg:h-[70vh];
	}
</style>
