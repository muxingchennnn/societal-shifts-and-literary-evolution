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
</script>

<RenderedPage />

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
		@apply text-[1rem] leading-[1.5rem] tracking-[-0.011rem]
		       sm:text-[1.125rem] sm:leading-[1.5rem] sm:tracking-[-0.014rem];
	}
</style>
