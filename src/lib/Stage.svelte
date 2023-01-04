<script lang="ts">
	import { createEventDispatcher, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Konva from 'konva';
	import type { StageConfig } from 'konva/lib/Stage';
	import { addEventDispatchers, addReactiveConfig } from './utils';

	// Events
	const dispatch = createEventDispatcher();

	// Props
	export let config: Omit<StageConfig, 'container'> = {};
	export let stage: Konva.Stage | undefined = undefined;
	let prevConfig: Omit<StageConfig, 'container'>;

	// Store & Context
	export const stageStore = writable<Konva.Stage | undefined>(undefined);
	setContext('stageStore', stageStore);

	onMount(() => {
		stage = new Konva.Stage({
			container: 'container',
			...config
		});

		addEventDispatchers(dispatch, stage);

		stageStore.set(stage);
	});

	// Reactive Config
	$: {
		if (stage) {
			addReactiveConfig(
				{
					container: 'container',
					...config
				},
				{
					container: 'container',
					...prevConfig
				},
				stage
			);
			prevConfig = config;
		}
	}
</script>

<div id="container" />
<slot />
