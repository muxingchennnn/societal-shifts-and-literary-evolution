<script>
	import { currentPage } from '$lib/globalState.svelte.js';
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
	import BackgroundVideo from '$lib/components/BackgroundVideo.svelte';
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
	];
	let RenderedPage = $derived(pages[currentPage.value - 1]); // dynamically render the page based on the 'currentPage' value

	let { data } = $props(); // receive data from +page.js
	const { bookData, streamData } = data; // deconstruct the data object received
</script>

<BackgroundVideo />
<RenderedPage />
<StreamGraph data={streamData} />
<SwarmChart data={bookData} />

<style>
</style>
