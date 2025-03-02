<script>
	import { selectedGenre } from '$lib/globalState.svelte.js';
	import { genreOptions } from '$lib/data/genreOptions.js';
	import { fly, fade } from 'svelte/transition';

	let selectedGenreText = $derived.by(
		() => genreOptions.find((genre) => genre.value === selectedGenre.value)?.text
	);

	let selectedGenreYear = $derived.by(
		() => genreOptions.find((genre) => genre.value === selectedGenre.value)?.year
	);
</script>

<article>
	<p>Explore Science Fiction books, or switch to another genre through the drop down menu!</p>
	<p>
		Over the last fifty years, {#key selectedGenre.value}<span in:fade={{ duration: 250 }}
				>{selectedGenre.value}</span
			>{/key} was most popular in {#key selectedGenreYear}<span in:fade={{ duration: 250 }}
				>{selectedGenreYear}</span
			>{/key}.
	</p>
	{#key selectedGenreText}
		<p in:fly={{ y: 5, duration: 800 }}>
			{@html selectedGenreText}
		</p>
	{/key}
</article>
