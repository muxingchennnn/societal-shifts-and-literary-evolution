<script>
	let { dateScale, chartWidth, chartHeight, isHorizontal } = $props();

	let ticks = $derived(dateScale.ticks(5));
	// output: [1970, 1980, 1990, 2000, 2010, 2020]

	// $inspect(isHorizontal);
</script>

<g>
	{#if isHorizontal}
		{#each ticks as tick, i (i)}
			<g class="tick" transform="translate({dateScale(tick)}, 0)">
				<text x="8" y={chartHeight} fill="var(--color-foreground)"
					>{tick.getFullYear().toString().slice(-2) + 's'}</text
				>
				<line x1="0" x2="0" y1="0" y2={chartHeight} stroke="var(--color-gray-500)"></line>
			</g>
		{/each}
	{:else}
		{#each ticks as tick, i (i)}
			<g class="tick" transform="translate(0, {dateScale(tick)})">
				<text x={chartWidth - 28} y="16" fill="var(--color-foreground)"
					>{tick.getFullYear().toString().slice(-2) + 's'}</text
				>
				<line x1="0" x2={chartWidth} y1="0" y2="0" stroke="var(--color-gray-500)"></line>
			</g>
		{/each}
	{/if}
</g>
