<script lang="ts">
	import { onMount, setContext, getContext, onDestroy } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Konva from 'konva';
	import type { LabelConfig } from 'konva/lib/shapes/Label';
	import { createEventDispatcher } from 'svelte';
	import { addEventDispatchers, addReactiveConfig } from './utils';

	// Events
	const dispatch = createEventDispatcher();

	// Props
	export let config: LabelConfig = {};
	export let label: Konva.Label | undefined = undefined;
	let prevConfig: LabelConfig;

	// Parent Container
	const parentContainerStore = getContext('containerStore') as Writable<
		Konva.Layer | Konva.Group | Konva.Label | undefined
	>;
	const unsubscribe = parentContainerStore.subscribe((container) => {
		if (container && label) {
			container.add(label);
		}
	});

	// Store & Context
	const containerStore = writable<Konva.Group | Konva.Layer | Konva.Label | undefined>(undefined);
	setContext('containerStore', containerStore);

	onMount(() => {
		label = new Konva.Label(config);

		addEventDispatchers(dispatch, label);

		containerStore.set(label);
	});

	onDestroy(() => {
		unsubscribe();
		if (label) {
			label.destroy();
		}
	});

	// Reactive Config
	$: {
		if (label) {
			addReactiveConfig(config, prevConfig, label);
			prevConfig = config;
		}
	}
</script>

<slot />
