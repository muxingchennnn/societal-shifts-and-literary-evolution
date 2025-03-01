<script>
	import Grid from './Grid.svelte';
</script>

<!-- <Grid /> -->
<footer class="grid-ctn note-body mt-[4rem] mb-[4rem] h-auto">
	<p class="col-span-4 h-auto">
		A story made by Muxing Chen and Bethany Ward <br /><br /> Advised by Prof. Rahul Bhargava<br />
		JRNL 5500 Coding for Digital Storytelling<br /> Northeastern University
	</p>
	<div class="reference-section h-auto">
		<h3 class="font-serif text-[1.125rem] leading-none font-bold tracking-[-0.01575rem]">
			References:
		</h3>
		<section>
			<h4>Literature</h4>
			<p>
				- Aspire Publishing Hub, LLC. 2023. <a
					target="_blank"
					href="https://www.aspirehub.info/genre-evolution-dynamic-transformations-in-literary-genres/"
					>Genre Evolution: Dynamic Transformations in Literary Genres.</a
				>
			</p>
			<p>
				- Scharla. 2023. <a
					target="_blank"
					href="https://tidepooloctopus.com/blog/history-evolution-book-genres"
					>The History and Evolution of Book Genres.</a
				>
			</p>
			<p>
				- Nechama First. 2020. <a
					target="_blank"
					href="https://www.wherewhatwhen.com/article/trends-in-children-s-books"
					>Trends in Children’s Books.</a
				>
			</p>
			<p>
				- Harvard. <a target="_blank" href="https://poetry.harvard.edu/glossary-poetic-genres"
					>Glossary of Poetic Genres.</a
				>
			</p>
			<p>
				- David Moller. 2009. <a
					target="_blank"
					href="https://iea.org.uk/blog/self-help-by-samuel-smiles-%E2%80%93-still-relevant-today"
					>Self-Help by Samuel Smiles – still relevant today.</a
				>
			</p>
			<p>
				- Bruce Sterling. 2025. <a
					target="_blank"
					href="https://www.britannica.com/art/science-fiction">Science fiction.</a
				>
			</p>
			<p>
				- David W. Dunlap. 2015. <a
					target="_blank"
					href="https://www.nytimes.com/2015/09/30/insider/life-on-mars-you-read-it-here-first.html"
					>Life on Mars? You Read It Here First.</a
				>
			</p>
			<p>
				- Chris M. Arnone. 2024. <a
					target="_blank"
					href="https://bookriot.com/the-most-popular-book-genres/"
					>The Most Popular Book Genres Right Now.</a
				>
			</p>
		</section>
		<section>
			<h4>Design</h4>
			<p>
				- David Mora and Michelle Jia. 2024. <a
					target="_blank"
					href="https://pudding.cool/2024/11/love-songs/">Is the love song dying?</a
				>
			</p>
			<p>
				- Alice Liang, Jan Diehm and Sandra Chiu. 2023. <a
					target="_blank"
					href="https://pudding.cool/2023/10/romance-covers/">What does a happily ever after look like?</a
				>
			</p>
		</section>
		<section>
			<h4>Dataset</h4>
			<p>
				- Pooria Mostafapoor. 2025. <a
					target="_blank"
					href="https://www.kaggle.com/datasets/pooriamst/best-books-ever-dataset"
					>Best Books Ever Dataset.</a
				>
			</p>
		</section>
		<section>
			<h4>Code</h4>
			<p>
				- D3 Gallery. 2023. <a target="_blank" href="https://observablehq.com/@d3/streamgraph/2"
					>Streamgraph.</a
				>
			</p>
			<p>
				- Connor Rothschild. 2024. <a
					target="_blank"
					href="https://observablehq.com/@d3/streamgraph/2"
					>Build a Beeswarm Chart with Svelte and D3.</a
				>
			</p>
		</section>
		<section>
			<h4>Video</h4>
			<p>
				- Nightwolfone. 2022. <a target="_blank" href="https://www.youtube.com/watch?v=5IcY0biPhoQ"
					>Pixabay.</a
				>
			</p>
			<p>
				- UniverseUnique. 2023. <a
					target="_blank"
					href="https://pixabay.com/videos/ai-generated-astronaut-planet-180523/">Pixabay.</a
				>
			</p>
			<p>
				- UniverseUnique. 2024. <a
					target="_blank"
					href="https://pixabay.com/videos/exoplanet-planet-space-alien-planet-211785/">Pixabay.</a
				>
			</p>
		</section>
	</div>
</footer>

<style lang="postcss">
	@reference "tailwindcss/theme";

	.note-body p {
		@apply font-sans text-[1rem] leading-[1.5rem] font-[200] tracking-[-0.011rem];
	}

	/* prettier-ignore */
	.reference-section {
		@apply col-span-4 flex flex-col gap-[1rem] mt-[2rem]
           sm:mt-0
           lg:col-span-6;
	}

	/* prettier-ignore */
	h4 {
    @apply font-serif text-[1rem] italic font-[400] text-gray-500 mb-[0.3rem];
  }

	a {
		@apply cursor-pointer text-gray-500 underline underline-offset-2 hover:text-(--color-foreground);
	}
</style>
