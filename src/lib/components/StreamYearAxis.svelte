<script>
	import { currentPage, windowWidth } from '$lib/globalState.svelte.js';
	let { yearScale, chartWidth, chartHeight } = $props();

	let ticks = $derived.by(() => {
		return windowWidth.value >= 768 ? yearScale.ticks(5) : [1970, 1995, 2020];
	});

	// $inspect(ticks);
</script>

<g>
	{#each ticks as tick, i (i)}
		<g class="tick" transform="translate({yearScale(tick)}, 0)">
			<text x="8" y={chartHeight} fill="var(--color-foreground)"
				>{windowWidth.value >= 768 ? tick.toString().slice(-2) + 's' : tick}</text
			>
			<line x1="0" x2="0" y1="0" y2={chartHeight} stroke="var(--color-gray-500)"></line>
		</g>
	{/each}
</g>
