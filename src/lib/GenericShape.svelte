<script lang="ts">
	import { onMount, getContext, onDestroy } from 'svelte';
	import Konva from 'konva';
	import type { Writable } from 'svelte/store';

	// Props
	export let shapeName:
		| 'Circle'
		| 'Ellipse'
		| 'Star'
		| 'Rect'
		| 'Arc'
		| 'Arrow'
		| 'Image'
		| 'Tag'
		| 'Text'
		| 'Line'
		| 'Path'
		| 'RegularPolygon'
		| 'Ring'
		| 'Shape'
		| 'Sprite'
		| 'TextPath'
		| 'Wedge';
	export let config: any = {};
	export let shape: Konva.Shape | undefined = undefined;

	// Layer
	const containerStore = getContext('containerStore') as Writable<
		Konva.Layer | Konva.Container | undefined
	>;
	const unsubscribe = containerStore.subscribe((layer) => {
		if (layer && shape) {
			layer.add(shape);
		}
	});

	onMount(() => {
		if (shapeName === 'Shape') {
			shape = new Konva.Shape(config);
		} else {
			shape = new Konva[shapeName](config);
		}
	});

	onDestroy(() => {
		unsubscribe();
		if (shape) {
			shape.destroy();
		}
	});
</script>

<slot />
