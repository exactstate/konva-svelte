<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Konva from 'konva';
	import type { StageConfig } from 'konva/lib/Stage';

	// Props
	export let config: Omit<StageConfig, 'container'> = {};
	export let stage: Konva.Stage | undefined = undefined;

	// Store & Context
	export const stageStore = writable<Konva.Stage | undefined>(undefined);
	setContext('stageStore', stageStore);

	onMount(() => {
		stage = new Konva.Stage({
			container: 'container',
			...config
		});
		stageStore.set(stage);
	});
</script>

<div id="container" />
<slot />
