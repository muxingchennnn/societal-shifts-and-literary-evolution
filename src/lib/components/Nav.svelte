<script>
	import { currentPage, windowWidth, windowHeight } from '$lib/globalState.svelte.js';
	import { Icon } from 'svelte-icons-pack';
	import { RiArrowsArrowDropLeftLine, RiArrowsArrowDropRightLine } from 'svelte-icons-pack/ri';

	// Handles navigation with keys
	function handleKeyNavigation(event) {
		if (event.key === 'ArrowLeft') {
			currentPage.value = Math.max(1, currentPage.value - 1);
		} else if (['ArrowRight', ' ', 'Enter'].includes(event.key)) {
			event.preventDefault(); // Prevents spacebar from scrolling down
			currentPage.value = Math.min(12, currentPage.value + 1);
		}
	}
</script>

<!-- Key Navigation -->
<svelte:window
	onkeydown={handleKeyNavigation}
	bind:innerWidth={windowWidth.value}
	bind:innerHeight={windowHeight.value}
/>

<!-- Tab Navigation -->
<nav class="fixed top-0 w-full px-4">
	<div class="flex h-[3rem] items-center gap-1">
		{#each Array(12) as _, i (i)}
			<button
				class="nav-tab {currentPage.value === i + 1
					? 'bg-purple-500 hover:bg-purple-500'
					: 'bg-gray-400 opacity-30'} "
				onclick={() => (currentPage.value = i + 1)}
			>
			</button>
		{/each}
	</div>
</nav>

<!-- Button Navigation -->
<!-- Left Button -->
<button
	class="nav-button left-0 translate-x-[-50%] justify-end rounded-e-[3rem] hover:translate-x-[-45%] {windowWidth.value <=
	768
		? 'w-[4rem]'
		: 'w-[6rem]'}"
	onclick={() => (currentPage.value = Math.max(1, currentPage.value - 1))}
>
	<Icon
		src={RiArrowsArrowDropLeftLine}
		viewBox="0 0 1024 1024"
		color="white"
		size={windowWidth.value <= 768 ? '36' : '48'}
	/>
</button>
<!-- Right Button -->
<button
	class="nav-button right-0 translate-x-[50%] justify-start rounded-s-[3rem] hover:translate-x-[45%] {windowWidth.value <=
	768
		? 'w-[4rem]'
		: 'w-[6rem]'}"
	onclick={() => (currentPage.value = Math.min(12, currentPage.value + 1))}
>
	<Icon
		src={RiArrowsArrowDropRightLine}
		viewBox="0 0 1024 1024"
		color="white"
		size={windowWidth.value <= 768 ? '36' : '48'}
	/>
</button>

<style>
	@reference "../../app.css";

	/* prettier-ignore */
	.nav-tab {
		@apply h-[0.4rem]
		       grow 
		       rounded
					 hover:h-[0.8rem]
					 transition-all duration-300
					 text-white 
					 ;
	}

	/* prettier-ignore */
	.nav-button {
		@apply fixed top-[50vh] translate-y-[-50%]
					 h-[6rem] 
					 flex items-center
		       pointer-events-auto cursor-pointer
					 bg-gray-500 opacity-50
					 hover:bg-purple-500 hover:opacity-80
					 transition-all
					 ;
	}
</style>
