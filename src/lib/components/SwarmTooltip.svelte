<script>
	import { timeFormat } from 'd3-time-format';
	import { currentPage, windowWidth } from '$lib/globalState.svelte.js';
	let { hoveredNode, chartWidth, chartHeight } = $props();

	// $inspect(hoveredNode);

	let tooltipHeight = $state(400);
	const tooltipWidth = 400;
	const xNudge = 80;
	const yNudge = 20;

	let xPosition = $derived.by(() =>
		hoveredNode.x + xNudge + tooltipWidth > chartWidth
			? hoveredNode.x - tooltipWidth + xNudge / 2
			: hoveredNode.x + xNudge
	);

	let yPosition = $derived.by(() =>
		hoveredNode.y + yNudge + tooltipHeight > chartHeight
			? hoveredNode.y - tooltipHeight - yNudge
			: hoveredNode.y + yNudge
	);
</script>

<div
	class="tooltip -translate-x-1/2 lg:translate-x-0"
	style="left: {windowWidth.value <= 1024
		? windowWidth.value / 2
		: xPosition}px; top: {yPosition}px;"
	bind:clientHeight={tooltipHeight}
>
	<img src={hoveredNode.coverImg} class="h-auto w-[120px] object-contain" alt="book cover image" />
	<div class="tooltip-text flex max-w-[232px] flex-col gap-2">
		<p><span class="font-[600]">{hoveredNode.title}</span></p>
		<div class="flex flex-col gap-1">
			<p>
				<span class="font-serif font-[300] text-gray-500 italic">{hoveredNode.author}</span>
			</p>
			<p>
				<span class="text-[0.85rem] leading-[100%]"
					>{timeFormat('%B %d, %Y')(hoveredNode.date)}</span
				>
			</p>
		</div>
		<p class="my-3 flex max-w-[232px] flex-wrap gap-1">
			{#each hoveredNode.genres as genre, i}
				{#if i < 6}
					<span class="rounded bg-gray-300 px-1 py-0.25 text-[0.85rem] font-[400] text-gray-900"
						>{genre}</span
					>
				{/if}
			{/each}
		</p>
		<div class="flex flex-col gap-1">
			<p>
				<span class="text-[0.85rem] leading-[100%]">Rating: {hoveredNode.rating}/5</span>
			</p>
			<p>
				<span class="text-[0.85rem] leading-[100%]">BBE Votes: {hoveredNode.bbeVotes}</span>
			</p>
		</div>
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";

	/* prettier-ignore */
	.tooltip {
		@apply absolute w-[400px]
		       flex items-start gap-[1rem]
           rounded border border-solid border-[#2c2c2c] bg-[rgb(44,44,44)]/[.4] p-[1rem] backdrop-blur-sm;
	}

	.tooltip-text p {
		@apply font-sans text-[1rem] leading-[100%] font-[200] tracking-[-0.011rem];
	}
</style>
