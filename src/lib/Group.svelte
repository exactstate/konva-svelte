<script lang="ts">
	import { onMount, setContext, getContext, onDestroy } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Konva from 'konva';
	import type { GroupConfig } from 'konva/lib/Group';

	// Props
	export let config: GroupConfig = {};
	export let group: Konva.Group | undefined = undefined;

	// Parent Container
	const parentContainerStore = getContext('containerStore') as Writable<
		Konva.Layer | Konva.Group | Konva.Label | undefined
	>;
	const unsubscribe = parentContainerStore.subscribe((container) => {
		if (container && group) {
			container.add(group);
		}
	});

	// Store & Context
	const containerStore = writable<Konva.Group | Konva.Layer | Konva.Label | undefined>(undefined);
	setContext('containerStore', containerStore);

	onMount(() => {
		group = new Konva.Group(config);
		containerStore.set(group);
	});

	onDestroy(() => {
		unsubscribe();
		if (group) {
			group.destroy();
		}
	});
</script>

<slot />