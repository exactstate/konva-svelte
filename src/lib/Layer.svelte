<script lang="ts">
	import { onMount, setContext, getContext, onDestroy, createEventDispatcher } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Konva from 'konva';
	import type { LayerConfig } from 'konva/lib/Layer';
	import { addEventDispatchers, addReactiveConfig } from './utils';

	// Events
	const dispatch = createEventDispatcher();

	// Props
	export let config: LayerConfig = {};
	export let layer: Konva.Layer | undefined = undefined;

	// State
	let prevConfig: LayerConfig;
	const containerStore = writable<Konva.Group | Konva.Layer | undefined>(undefined);
	setContext('containerStore', containerStore);

	// Stage State
	const stageStore = getContext('stageStore') as Writable<Konva.Stage | undefined>;

	if (!stageStore) {
		throw new Error(
			'No Stage parent found. Make sure you have a <Stage> component as an ancestor of this component.'
		);
	}

	const unsubscribeFromStageStore = stageStore.subscribe((stage) => {
		if (stage && layer) {
			stage.add(layer);
		}
	});

	// Lifecycle

	onMount(() => {
		layer = new Konva.Layer(config);
		addEventDispatchers(dispatch, layer);
		containerStore.set(layer);
	});

	onDestroy(() => {
		unsubscribeFromStageStore();
		if (layer) {
			layer.destroy();
		}
	});

	// Reactive Config
	$: {
		if (layer) {
			addReactiveConfig(config, prevConfig, layer);
			prevConfig = config;
		}
	}
</script>

<slot />
