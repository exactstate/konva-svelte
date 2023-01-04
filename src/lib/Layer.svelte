<script lang="ts">
	import { onMount, setContext, getContext, onDestroy } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';
	import Konva from 'konva';
	import type { LayerConfig } from 'konva/lib/Layer';
	import { createEventDispatcher } from 'svelte';
	import addEventDispatchers from './events';

	// Events
	const dispatch = createEventDispatcher();

	// Props
	export let config: LayerConfig = {};
	export let layer: Konva.Layer | undefined = undefined;

	// Store & Context
	const containerStore = writable<Konva.Group | Konva.Layer | undefined>(undefined);
	setContext('containerStore', containerStore);

	// Stage
	const stageStore = getContext('stageStore') as Writable<Konva.Stage | undefined>;
	const unsubscribe = stageStore.subscribe((stage) => {
		if (stage && layer) {
			stage.add(layer);
		}
	});

	onMount(() => {
		layer = new Konva.Layer(config);

		addEventDispatchers(dispatch, layer);

		containerStore.set(layer);
	});

	onDestroy(() => {
		unsubscribe();
		if (layer) {
			layer.destroy();
		}
	});

	// Reactive config
	$: if (layer) {
		layer.setAttrs(config);
	}
</script>

<slot />
