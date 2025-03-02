<script>
	import { fade } from 'svelte/transition';
</script>

<article>
	<p>
		The way we categorize stories has changed over the centuries, in large part because as society
		and technology develop, so too do the stories we tell.
	</p>
	<p>
		These graphs of three genres’ popularity over the last 50 years illustrate this idea fairly
		well:
	</p>
	<p in:fade={{ duration: 250 }}>
		<span class="font-[1.125rem] font-bold text-[#FFCD29]">Middle Grade & Children’s Fiction</span> has
		also increased in popularity over the years. Books for that specific demographic- children- were
		not commonly written before the 1850s, and were not particularly marketable before the 1970s. For
		most of literary history, fiction books were written for adult audiences!
	</p>
</article>
