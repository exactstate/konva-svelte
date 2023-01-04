<script lang="ts">
	/**
	 * Demo taken from https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/undo_redo?from-embed=&file=/src/index.js
	 * https://konvajs.org/docs/react/Undo-Redo.html
	 *
	 * Replicated in Svelte using the component wrapper
	 */

	import { Layer, Text } from '$lib';
	import Rect from '$lib/Shapes/Rect.svelte';
	import Stage from '$lib/Stage.svelte';
	import { onMount } from 'svelte';

	// State
	let history = [
		{
			x: 20,
			y: 20
		}
	];
	let historyStep = 0;
	let position = history[0];
	let screenDimensions = {
		width: 0,
		height: 0
	};

	// Initialise state
	onMount(() => {
		screenDimensions = {
			width: window.innerWidth,
			height: window.innerHeight
		};
	});

	// Functions

	/**
	 * Undo the last action
	 */
	function undo() {
		if (historyStep > 0) {
			historyStep--;
			position = history[historyStep];
		}
	}

	/**
	 * Redo the last action
	 */
	function redo() {
		if (historyStep < history.length - 1) {
			historyStep++;
			position = history[historyStep];
		}
	}

	/**
	 * Handle drag end to append new position to history
	 */
	function handleActionEnd(event: any) {
		history = history.slice(0, historyStep + 1);
		history = [
			...history,
			{
				x: event.detail.target.x(),
				y: event.detail.target.y()
			}
		];
		historyStep++;
		position = history[historyStep];
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
			<Text content="undo" on:click={undo} />
			<Text content="redo" config={{ x: 40 }} on:click={redo} />

			<Rect
				config={{
					...position,
					width: 50,
					height: 50,
					fill: 'black',
					draggable: true
				}}
				on:dragend={handleActionEnd}
			/>
		</Layer>
	</Stage>
</body>
