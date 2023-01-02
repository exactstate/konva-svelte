<script lang="ts">
	import { onMount, getContext, onDestroy } from 'svelte';
	import Konva from 'konva';
	import type { Writable } from 'svelte/store';
	import type { TransformerConfig } from 'konva/lib/shapes/Transformer';

	// Props
	export let config: TransformerConfig = {};
	export let transformer: Konva.Transformer | undefined = undefined;

	// Layer
	const containerStore = getContext('containerStore') as Writable<
		Konva.Layer | Konva.Container | undefined
	>;

	if (containerStore === undefined) {
		throw new Error('Transformer must be a child of a Layer or Group');
	}

	const unsubscribe = containerStore.subscribe((layer) => {
		if (layer && transformer) {
			layer.add(transformer);
		}
	});

	onMount(() => {
		transformer = new Konva.Transformer(config);
	});

	onDestroy(() => {
		unsubscribe();
		if (transformer) {
			transformer.destroy();
		}
	});
</script>

<slot />
