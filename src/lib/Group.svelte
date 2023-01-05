<script lang="ts">
	import { onMount, setContext, getContext, onDestroy, createEventDispatcher } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Konva from 'konva';
	import type { GroupConfig } from 'konva/lib/Group';
	import { addEventDispatchers, addReactiveConfig } from './utils';
	import errors from './errors';

	// Events
	const dispatch = createEventDispatcher();

	// Props
	export let config: GroupConfig = {};
	export let group: Konva.Group | undefined = undefined;
	let prevConfig: GroupConfig;

	// Parent State
	const parentContainerStore = getContext('containerStore') as Writable<
		Konva.Layer | Konva.Group | Konva.Label | undefined
	>;

	if (!parentContainerStore) {
		throw new Error(errors.NO_PARENT_CONTAINER);
	}

	const unsubscribeFromParentContainerStore = parentContainerStore.subscribe((container) => {
		if (container && group) {
			container.add(group);
		}
	});

	// Container State
	const containerStore = writable<Konva.Group | Konva.Layer | Konva.Label | undefined>(undefined);
	setContext('containerStore', containerStore);

	onMount(() => {
		group = new Konva.Group(config);
		addEventDispatchers(dispatch, group);
		containerStore.set(group);
	});

	onDestroy(() => {
		unsubscribeFromParentContainerStore();
		if (group) {
			group.destroy();
		}
	});

	// Reactive Config
	$: {
		if (group) {
			addReactiveConfig(config, prevConfig, group);
			prevConfig = config;
		}
	}
</script>

<slot />
