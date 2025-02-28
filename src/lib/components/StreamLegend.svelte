<script>
	let { colorScale } = $props();

	// console.log(colorScale.domain(), colorScale.range());
</script>

{#each colorScale.domain().reverse() as genre}
	<div class="flex items-center space-x-2">
		<div class="h-4 w-4 rounded-lg" style="background-color: {colorScale(genre)};"></div>
		<span class="text-[0.875rem] font-[200]">{genre}</span>
	</div>
{/each}
