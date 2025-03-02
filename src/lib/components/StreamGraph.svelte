<script>
	import { currentPage } from '$lib/globalState.svelte.js';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import { stack, stackOffsetWiggle, stackOrderAscending, area, curveBasis } from 'd3-shape';
	import { index, extent, union } from 'd3-array';
	import { fade } from 'svelte/transition';
	import StreamYearAxis from './StreamYearAxis.svelte';
	import StreamLegend from './StreamLegend.svelte';
	import StreamTooltip from './StreamTooltip.svelte';

	let { data } = $props();
	// $inspect(hoveredData);

	// dimensions of the visualization
	const chartMargin = { top: 0, right: 60, bottom: 20, left: 60 };
	let width = $state(400);
	let height = $state(400);
	let chartWidth = $derived(Math.max(0, width - chartMargin.left - chartMargin.right));
	let chartHeight = $derived(Math.max(0, height - chartMargin.top - chartMargin.bottom));

	const genreKeys = union(data.map((d) => d.genres)); // InternSet(3) [Set] { 'Middle Grade', 'Science Fiction', 'Romance' }

	// stack generator for converting data to stacked format
	const stackGenerator = stack()
		.offset(stackOffsetWiggle)
		.order(stackOrderAscending)
		.keys(genreKeys) // distinct genre keys, in input order
		.value(([, D], key) => (D.get(key) ? D.get(key).count : 0)); // get value for each series key and stack

	const stackedData = stackGenerator(
		index(
			data,
			(d) => d.year,
			(d) => d.genres
		) // group data by year then genre key
	);

	let yearScale = $derived.by(() => {
		return scaleLinear()
			.domain(extent(data, (d) => d.year))
			.range([0, chartWidth]);
	});

	let streamScale = $derived.by(() => {
		return scaleLinear()
			.domain(extent(stackedData.flat(2)))
			.rangeRound([chartHeight, 0]);
	});

	const colorScale = $derived.by(() => {
		return scaleOrdinal()
			.domain(stackedData.map((d) => d.key))
			.range(['#FFCD29', '#0D99FF', '#FF24BD']);
	});

	// area generator for drawing the shapes of streams
	const areaGenerator = area()
		.curve(curveBasis)
		.x((d) => yearScale(d.data[0]))
		.y0((d) => streamScale(d[0]))
		.y1((d) => streamScale(d[1]));

	const callOutData = data.filter((d) => d.year === 2013); // data for creating the initial tooltip
	let hoveredData = $state(null);
	let callOutMouseX = $derived(yearScale(2013)); // position x for initial tooltip
	let callOutMouseY = $derived(chartHeight / 2); // position y for initial tooltip
	// $inspect(callOutMouseX, callOutMouseY);
	let mouseX = $state(0);
	let mouseY = $state(0);

	let hoveredStream = $state(null);

	$effect(() => {
		// after all other value updates, assign initial values to tooltip variables
		hoveredData = callOutData;
		mouseX = callOutMouseX;
		mouseY = callOutMouseY;
	});

	function handleMouseMove(e) {
		const rect = e.currentTarget.getBoundingClientRect(); // get the client of chart
		mouseX = e.clientX - rect.left; // mouse position x within the chart
		mouseY = e.clientY - rect.top; // mouse position y within the chart

		console.log(mouseX, mouseY);

		const closestInvertedX = Math.round(yearScale.invert(mouseX)); // get year value from mouse position x
		hoveredData = data.filter((d) => d.year === closestInvertedX); // filter and get tooltip data based on year
	}
</script>

<!-- class="absolute top-0 left-0" -->
<div
	class="chart-outer-wrapper {currentPage.value === 3 ||
	currentPage.value === 4 ||
	currentPage.value === 5
		? 'block'
		: 'hidden'}"
>
	<div class="chart-inner-warpper" bind:clientWidth={width} bind:clientHeight={height}>
		<svg {width} {height}>
			<g
				transform={`translate(${chartMargin.left}, ${chartMargin.top})`}
				onmousemove={handleMouseMove}
			>
				<!-- Transparent rect to capture mouse events -->
				<rect
					width={chartWidth}
					height={chartHeight}
					class="pointer-events-auto fill-transparent"
				/>
				<!-- Axis -->
				<StreamYearAxis {yearScale} {chartWidth} {chartHeight} />
				<!-- Streams -->
				<g class="streams"
					>{#each stackedData as stream (stream.key)}
						<path
							transition:fade={{ duration: 1000 }}
							d={areaGenerator(stream)}
							fill={colorScale(stream.key)}
							opacity={hoveredStream ? (hoveredStream.key === stream.key ? 1 : 0.2) : 0.9}
							onmousemove={handleMouseMove}
							onmouseover={() => (hoveredStream = stream)}
							onmouseleave={() => (hoveredStream = null)}
						/>
					{/each}
				</g>
				<!-- Reference Line -->
				{#if hoveredData}
					<line
						x1={yearScale(hoveredData[0].year)}
						x2={yearScale(hoveredData[0].year)}
						y1="0"
						y2={chartHeight}
						stroke="var(--color-foreground)"
						stroke-width="0.5px"
					/>
				{/if}
			</g>
		</svg>
		<!-- Legend -->
		<div class="absolute top-[3rem] left-[3rem]"><StreamLegend {colorScale} /></div>
		<!-- Chart Title -->
		<h1 class="chart-title">Romance, Middle Grade, and Science Fiction</h1>
		<!-- Tooltip -->
		{#if hoveredData}
			<StreamTooltip {hoveredData} {chartWidth} {chartHeight} {colorScale} {mouseX} {mouseY} />
		{/if}
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";

	/* prettier-ignore */
	.chart-outer-wrapper  {
		@apply h-[90vh] w-full mb-[3rem]
					 md:fixed md:bottom-0 md:left-0 md:h-[65vh] md:mb-0;
	}

	.chart-inner-warpper {
		@apply relative h-full w-full;
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
