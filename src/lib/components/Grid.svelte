<script>
	let columns = $state(0);

	// Function to update columns based on screen size
	function updateColumns() {
		const width = window.innerWidth;

		if (width >= 1024) {
			columns = 12;
		} else if (width >= 640) {
			columns = 8;
		} else {
			columns = 4;
		}
	}

	$effect(() => {
		updateColumns();
		window.addEventListener('resize', updateColumns);

		// Clean up event listener on component destroy
		return () => {
			window.removeEventListener('resize', updateColumns);
		};
	});
</script>

<div class="grid-ctn">
	{#each Array(columns).fill(0) as _, index}
		<div class="col-span-1 bg-gray-500 text-center text-base font-bold">
			Col{index + 1}
		</div>
	{/each}
</div>
