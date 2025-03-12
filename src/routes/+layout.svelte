<script>
	import '../app.css';
	import '@fontsource-variable/source-serif-4';
	import '@fontsource-variable/source-serif-4/opsz.css';
	import '@fontsource-variable/source-serif-4/wght-italic.css';
	import '@fontsource-variable/source-serif-4/opsz-italic.css';
	import '@fontsource-variable/geist';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta property="og:title" content="Societal Shifts & Literary Evolution Go Hand in Hand" />
	<meta property="og:url" content="https://societal-shifts-and-literary-evolution.vercel.app/" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:type" content="article" />
	<meta
		property="og:description"
		content="Learn about the interplay between societal shifts and literary evolution with interactive visualizations."
	/>
	<meta property="og:image" content="https://i.imgur.com/eHmH5SS.png" />
</svelte:head>

{@render children()}
<Nav />
