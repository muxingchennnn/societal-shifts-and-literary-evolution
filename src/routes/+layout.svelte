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

{@render children()}
<Nav />
