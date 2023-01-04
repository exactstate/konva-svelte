<script lang="ts">
	/**
	 * Demo taken from https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/drop_image_into_stage?from-embed
	 * https://konvajs.org/docs/react/Drop_Image.html
	 *
	 * Replicated in Svelte using the component wrapper
	 */

	import { Layer, Image as SvelteImage, Stage } from '$lib';
	import type Konva from 'konva';
	import { onMount } from 'svelte';

	// State
	let screenDimensions = {
		width: 0,
		height: 0
	};
	let stage: Konva.Stage;
	let images: any = [];
	let dragUrl: string;

	// Initialise state
	onMount(() => {
		screenDimensions = {
			width: window.innerWidth,
			height: window.innerHeight
		};
	});

	// Functions
	function onImageDragStart(e: DragEvent) {
		// @ts-ignore
		if (e.target) dragUrl = e.target.src;
	}

	function onImageDrop(e: DragEvent) {
		const img = new Image();
		img.src = dragUrl;
		img.onload = () => {
			stage.setPointersPositions(e);
			images = [
				...images,
				{
					...stage.getPointerPosition(),
					src: dragUrl,
					width: img.width,
					height: img.height
				}
			];
		};
	}
</script>

<title>Konva Simple Window drawing</title>

<body>
	<div>
		Try to drag an image into the stage:
		<br />
		<img alt="lion" src="https://konvajs.org/assets/lion.png" on:dragstart={onImageDragStart} />
	</div>

	<div on:drop|preventDefault={onImageDrop} on:dragover|preventDefault>
		<Stage
			bind:stage
			config={{
				...screenDimensions,
				style: {
					border: '1px solid black'
				}
			}}
		>
			<Layer>
				{#each images as image, index (index)}
					<SvelteImage
						src={image.src}
						config={{
							x: image.x,
							y: image.y,
							offsetX: image.width / 2,
							offsetY: image.height / 2
						}}
					/>
				{/each}
			</Layer>
		</Stage>
	</div>
</body>
