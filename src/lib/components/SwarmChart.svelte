<script>
	import { forceSimulation, forceX, forceY, forceCollide, forceManyBody } from 'd3-force';
	import { scaleLinear, scaleTime, scaleBand, scaleSqrt } from 'd3-scale';
	import { extent, max } from 'd3-array';
	import { currentPage, windowWidth } from '$lib/globalState.svelte.js';
	import SwarmDateAxis from '$lib/components/SwarmDateAxis.svelte';
	import SwarmTooltip from '$lib/components/SwarmTooltip.svelte';
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';
	import { genres, selectedGenre } from '$lib/globalState.svelte.js';

	let { data } = $props();
	let selectedData = $derived.by(() =>
		data.filter((d) => [selectedGenre.value].some((genre) => d.genres.includes(genre)))
	);
	// $inspect(selectedData);

	let isHorizontal = $state(true);

	// dimensions of the visualization
	const chartMargin = { top: 0, right: 60, bottom: 20, left: 60 };
	let width = $state(400);
	let height = $state(400);
	let chartWidth = $derived(width - chartMargin.left - chartMargin.right);
	let chartHeight = $derived(height - chartMargin.top - chartMargin.bottom);

	// date scale on wide screen
	let dateXScale = $derived.by(() => {
		return scaleTime()
			.domain(extent(selectedData, (d) => d.date))
			.range([0, chartWidth]);
	});

	// date scale on mobile
	let dateYScale = $derived.by(() => {
		return scaleTime()
			.domain(extent(selectedData, (d) => d.date))
			.range([0, chartHeight]);
	});

	// a derived scale based on orientation that depends on screen size
	let dateScale = $derived.by(() => (isHorizontal ? dateXScale : dateYScale));

	// radius scale
	let rScale = $derived.by(() => {
		return scaleSqrt()
			.domain(extent(selectedData, (d) => d.rating))
			.range([2, isHorizontal ? 6 : 4]);
	});

	let nodes = $state([]);
	// $inspect(nodes);
	let simulation;
	let hoveredNode = $state(null);
	const calloutBookTitle = 'The Martian (The Martian #1)';
	let calloutData = $derived.by(() => nodes.filter((d) => d.title === calloutBookTitle).at(0));
	// $inspect(calloutData);

	$effect(() => {
		simulation = forceSimulation(selectedData);

		simulation.on('tick', () => {
			nodes = simulation.nodes();
		});
	});

	$effect(() => {
		simulation
			.force(
				'x',
				forceX()
					.x(isHorizontal ? (d) => dateScale(d.date) : chartWidth / 2)
					.strength(isHorizontal ? 0.8 : 0.2)
			)
			.force(
				'y',
				forceY()
					.y(isHorizontal ? chartHeight / 2 : (d) => dateScale(d.date))
					.strength(isHorizontal ? 0.09 : 0.85)
			)
			.force(
				'collide',
				forceCollide()
					.radius((d) => rScale(d.rating) + 1)
					.strength(1)
			)
			.force(
				'charge',
				forceManyBody().strength(-4) // add repulsion between nodes
			)
			.alpha(1) // start with full energy
			.alphaDecay(0.02) // faster decay to stabilize quicker
			.alphaMin(0.01) // stop at higher threshold
			.restart();

		return () => {
			simulation.stop();
		};
	});

	$effect(() => {
		if (currentPage.value === 7) {
			selectedGenre.value = 'Science Fiction';
			hoveredNode = calloutData;
		} else {
			hoveredNode = null;
		}
	});

	$effect(() => {
		// decide orientation based on screen width
		if (windowWidth.value > 1024) {
			isHorizontal = true;
		} else {
			isHorizontal = false;
		}
	});
</script>

<!-- Visualization -->
<div class="chart-container h-full w-full" bind:clientWidth={width} bind:clientHeight={height}>
	<svg class="absolute top-0 left-0" {width} {height}>
		<g transform={`translate(${chartMargin.left}, ${chartMargin.top})`}>
			<SwarmDateAxis {dateScale} {chartWidth} {chartHeight} {isHorizontal} />
			{#each nodes as node}
				<circle
					in:fade={{ delay: 1000, duration: 1000 }}
					cx={node.x}
					cy={node.y}
					r={rScale(node.rating)}
					fill={hoveredNode ? (hoveredNode.id === node.id ? '#0D99FF' : '#f5f5f5') : '#f5f5f5'}
					opacity={hoveredNode ? (hoveredNode.id === node.id ? 1 : 0.2) : 1}
					onmouseover={() => (hoveredNode = node)}
					onmouseleave={() => (hoveredNode = null)}
				/>
			{/each}
		</g>
	</svg>
	<h1 class="chart-title">{selectedGenre.value} books from 70s to 20s</h1>

	<!-- Drop Down Menu -->
	{#if currentPage.value === 11}
		<select bind:value={selectedGenre.value} class="dropdown-menu">
			{#each genres as genre}
				<option value={genre.value}>
					{genre.label}
				</option>
			{/each}
		</select>
	{/if}

	<!-- Tooltip -->
	{#if hoveredNode}
		<SwarmTooltip {hoveredNode} {chartWidth} {chartHeight} />
	{/if}
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";

	.chart-container {
		position: relative;
		overflow: hidden;
	}

	circle {
		cursor: pointer;
	}

	/* prettier-ignore */
	.chart-title {
		@apply absolute top-0 left-1/2 -translate-x-1/2  
		       min-w-[400px] 
		       bg-black/50 
					 font-serif text-[1rem] font-[700] text-center
           md:left-[3rem] md:-translate-x-0
					 md:text-left;
	}

	/* prettier-ignore */
	.dropdown-menu {
		@apply absolute top-[3rem] left-1/2 -translate-x-1/2 rounded-md opacity-70
		       w-[18rem] border-[1px] border-solid border-gray-500 bg-gray-700 p-2
		       md:left-[3rem] md:-translate-x-0;
	}
</style>
