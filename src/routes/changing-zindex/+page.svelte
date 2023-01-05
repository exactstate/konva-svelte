<script lang="ts">
	/**
	 * Demo taken from https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/zIndex?from-embed
	 * https://konvajs.org/docs/react/zIndex.html
	 *
	 * Replicated in Svelte using the component wrapper
	 */

	import { Circle, Layer, Stage } from '$lib';
	import Konva from 'konva';
	import { onMount } from 'svelte';

	// State
	let screenDimensions = {
		width: 0,
		height: 0
	};
	let items: any[] = [];

	// Initialise state
	onMount(() => {
		screenDimensions = {
			width: window.innerWidth,
			height: window.innerHeight
		};
		items = generateItems();
	});

	// Functions
	function generateItems() {
		const items = [];
		for (let i = 0; i < 10; i++) {
			items.push({
				x: Math.random() * screenDimensions.width,
				y: Math.random() * screenDimensions.height,
				id: i,
				color: Konva.Util.getRandomColor()
			});
		}
		return items;
	}
</script>

<title>Konva Simple Window drawing</title>

<body>
	<Stage
		config={{
			...screenDimensions
		}}
	>
		<Layer>
			{#each items as item (item.id)}
				<Circle
					config={{
						x: item.x,
						y: item.y,
						fill: item.color,
						radius: 50,
						draggable: true,
						name: item.id.toString()
					}}
					on:dragstart={(e) => e.detail.target.moveToTop()}
				/>
			{/each}
		</Layer>
	</Stage>
</body>
