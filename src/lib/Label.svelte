<script lang="ts">
	import { onMount, setContext, getContext, onDestroy, createEventDispatcher } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Konva from 'konva';
	import type { LabelConfig } from 'konva/lib/shapes/Label';
	import { addEventDispatchers, addReactiveConfig } from './utils';
	import errors from './errors';

	// Events
	const dispatch = createEventDispatcher();

	// Props
	export let config: LabelConfig = {};
	export let label: Konva.Label | undefined = undefined;
	let prevConfig: LabelConfig;

	// Parent Container State
	const parentContainerStore = getContext('containerStore') as Writable<
		Konva.Layer | Konva.Group | Konva.Label | undefined
	>;

	if (!parentContainerStore) {
		throw new Error(errors.NO_STAGE);
	}

	const unsubscribeFromParentContainerStore = parentContainerStore.subscribe((container) => {
		if (container && label) {
			container.add(label);
		}
	});

	// Container State
	const containerStore = writable<Konva.Group | Konva.Layer | Konva.Label | undefined>(undefined);
	setContext('containerStore', containerStore);

	// Lifecycle

	onMount(() => {
		label = new Konva.Label(config);

		addEventDispatchers(dispatch, label);

		containerStore.set(label);
	});

	onDestroy(() => {
		unsubscribeFromParentContainerStore();
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
