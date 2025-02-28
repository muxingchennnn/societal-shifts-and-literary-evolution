<script>
	import { genres, selectedGenre } from '$lib/globalState.svelte.js';

	let selectedGenreText = $derived.by(
		() => genres.find((genre) => genre.value === selectedGenre.value)?.text
	);

	let selectedGenreYear = $derived.by(
		() => genres.find((genre) => genre.value === selectedGenre.value)?.year
	);
</script>

<article>
	<p>Explore Science Fiction books, or switch to another genre through the drop down menu!</p>
	<p>Over the last fifty years, {selectedGenre.value} was most popular in {selectedGenreYear}.</p>
	<p>
		{@html selectedGenreText}
	</p>
</article>
