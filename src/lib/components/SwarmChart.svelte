<script>
	import { forceSimulation, forceX, forceY, forceCollide, forceManyBody } from 'd3-force';
	import { scaleLinear, scaleTime, scaleBand, scaleSqrt } from 'd3-scale';
	import { extent, max } from 'd3-array';
	import { currentPage, windowWidth } from '$lib/globalState.svelte.js';
	import SwarmDateAxis from '$lib/components/SwarmDateAxis.svelte';
	import SwarmTooltip from '$lib/components/SwarmTooltip.svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props();
	let isHorizontal = $state(true);

	const scifiData = data.filter((d) =>
		['Science Fiction'].some((genre) => d.genres.includes(genre))
	);
	const callOutData = scifiData.filter((d) => d.title === 'The Martian (The Martian #1)').at(0);
	$inspect(callOutData);

	const chartMargin = { top: 0, right: 60, bottom: 20, left: 60 };
	let width = $state(400);
	let height = $state(400);
	let chartWidth = $derived(width - chartMargin.left - chartMargin.right);
	let chartHeight = $derived(height - chartMargin.top - chartMargin.bottom);

	// date axis on wide screen
	let dateXScale = $derived.by(() => {
		return scaleTime()
			.domain(extent(scifiData, (d) => d.date))
			.range([0, chartWidth]);
	});

	// date axis on mobile
	let dateYScale = $derived.by(() => {
		return scaleTime()
			.domain(extent(scifiData, (d) => d.date))
			.range([0, chartHeight]);
	});

	let dateScale = $derived.by(() => (isHorizontal ? dateXScale : dateYScale));

	// radius scale
	let rScale = $derived.by(() => {
		return scaleSqrt()
			.domain(extent(scifiData, (d) => d.rating))
			.range([2, isHorizontal ? 6 : 4]);
	});

	let nodes = $state([]);
	let hoveredNode = $state(callOutData);

	const simulation = forceSimulation(scifiData);
	simulation.on('tick', () => {
		nodes = simulation.nodes();
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
			hoveredNode = callOutData;
		}
	});

	$effect(() => {
		if (windowWidth.value > 1024) {
			isHorizontal = true;
		} else {
			isHorizontal = false;
		}
	});
</script>

<!-- <svelte:window bind:innerWidth={width} bind:innerHeight={height} /> -->
<!-- chart title -->
<!-- <h1 class="absolute top-0 left-[2rem] bg-black text-[2rem] font-[700]">
	Sci-fi books from 70s to 20s
</h1> -->
<!-- chart body -->
<div class="chart-container h-full w-full" bind:clientWidth={width} bind:clientHeight={height}>
	<svg class="absolute top-0 left-0" {width} {height}>
		<g transform={`translate(${chartMargin.left}, ${chartMargin.top})`}>
			<!-- <SwarmDateXAxis {xScale} {chartWidth} {chartHeight} /> -->
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
	<h1 class="chart-title">Sci-fi books from 70s to 20s</h1>
	<!-- Swarmtooltip -->
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
		/* transition:
			fill 100ms ease,
			opacity 100ms ease; */
	}

	/* prettier-ignore */
	.chart-title {
		@apply absolute top-0 left-1/2 -translate-x-1/2 
		       min-w-[400px] text-center
		       bg-black/50 
					 font-serif text-[1rem] font-[700] 
           md:absolute md:left-[3rem] md:-translate-x-0
					 md:text-left;
	}
</style>
