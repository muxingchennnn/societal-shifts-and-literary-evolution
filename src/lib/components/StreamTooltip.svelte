<script>
	import { windowWidth } from '$lib/globalState.svelte.js';
	let { hoveredData, chartWidth, chartHeight, colorScale, mouseX, mouseY } = $props();

	// $inspect(hoveredData);

	let tooltipHeight = $state(400);
	const tooltipWidth = 180;
	const xNudge = 80;
	const yNudge = 20;

	let xPosition = $derived.by(() =>
		mouseX + xNudge + tooltipWidth > chartWidth
			? mouseX - tooltipWidth + xNudge / 2
			: mouseX + xNudge
	);

	let yPosition = $derived.by(() =>
		mouseY + yNudge + tooltipHeight > chartHeight
			? mouseY - tooltipHeight - yNudge
			: mouseY + yNudge
	);
</script>

<div
	class="tooltip -translate-x-1/2 lg:translate-x-0"
	style="width: {tooltipWidth}px; left: {windowWidth.value <= 1024
		? windowWidth.value / 2
		: xPosition}px; top: {yPosition}px;"
	bind:clientHeight={tooltipHeight}
>
	<h1 class="mb-2 text-[0.875rem] font-bold">{hoveredData.at(0).year}</h1>
	<div class="flex flex-col gap-2">
		{#each hoveredData.toReversed() as stream, i (i)}
			<div class="tooltip-text flex w-full justify-between">
				<p
					class="relative flex items-center before:mr-2 before:block before:h-3 before:w-1 before:bg-[var(--pseudo-color)] before:content-['']"
					style="--pseudo-color: {colorScale(stream.genres)};"
				>
					{stream.genres}
				</p>
				<p>{stream.count}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	@reference "../../app.css";

	/* prettier-ignore */
	.tooltip {
		@apply absolute rounded border border-solid border-(--color-gray-800) bg-(--color-gray-800)/40 p-[1rem] backdrop-blur-sm;
	}

	.tooltip-text p {
		@apply font-sans text-[0.875rem] leading-[100%] font-[200] tracking-[-0.011rem];
	}
</style>
