<script>
	import Grid from './Grid.svelte';
	import { references } from '$lib/data/referenceInfo';
</script>

<!-- <Grid /> -->

<footer class="grid-ctn note-body mt-[4rem] mb-[4rem] h-auto">
	<p class="col-span-4 h-auto" tabIndex="0">
		A story made by Muxing Chen and Bethany Ward <br /><br /> Advised by Prof. Rahul Bhargava<br />
		JRNL 5500 Coding for Digital Storytelling<br /> Northeastern University
	</p>
	<div class="reference-section h-auto">
		<h3 class="font-serif text-[1.125rem] leading-none font-bold tracking-[-0.01575rem]">
			References:
		</h3>
		{#each references as reference}
			<section>
				<h4>{reference.referenceType}</h4>
				{#each reference.referenceContent as item}
					<p>
						- {item.author ? item.author : ''}. {item.year ? item.year : ''}.
						<a tabIndex="-1" target="_blank" href={item.link ? item.link : ''}
							>{item.title ? item.title : ''}.</a
						>
					</p>
				{/each}
			</section>
		{/each}
	</div>
</footer>

<style>
	@reference "../../app.css";

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
