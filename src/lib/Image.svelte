<script lang="ts">
	import type Konva from 'konva';
	import { onMount } from 'svelte';
	import GenericShape from './GenericShape.svelte';

	export let config: Omit<Konva.ImageConfig, 'image'> = {};
	export let image: Konva.Image | undefined = undefined;

	export let src: string = '';

	onMount(() => {
		config.image = new Image();
		config.image.src = src;

		if (image) {
			image.image(config.image);
		}
	});
</script>

<GenericShape
	bind:shape={image}
	shapeName="Image"
	{config}
	on:mouseover
	on:mouseout
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:mousedown
	on:mouse
	on:wheel
	on:click
	on:dblclick
	on:touchstart
	on:touchmove
	on:touched
	on:tap
	on:dbltap
	on:pointerdown
	on:pointermove
	on:pointerup
	on:pointercancel
	on:pointerover
	on:pointerenter
	on:pointerout
	on:pointerleave
	on:pointerclick
	on:pointerdblclick
	on:dragstart
	on:dragmove
	on:dragend
	on:transformstart
	on:transform
	on:transformend
/>
