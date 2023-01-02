<script lang="ts">
	import type Konva from 'konva';
	import { onMount } from 'svelte';
	import GenericShape from './GenericShape.svelte';

	export let config: Omit<Konva.SpriteConfig, 'image'> = {};
	export let sprite: Konva.Sprite | undefined = undefined;

	export let src: string = '';

	onMount(() => {
		config.image = new Image();
		config.image.src = src;

		if (sprite) {
			sprite.image(config.image);
		}
	});
</script>

<GenericShape bind:shape={sprite} shapeName="Sprite" {config} />
