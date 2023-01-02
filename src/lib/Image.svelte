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

<GenericShape bind:shape={image} shapeName="Image" {config} />
