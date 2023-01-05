<script lang="ts">
	import { createEventDispatcher, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Konva from 'konva';
	import type { StageConfig } from 'konva/lib/Stage';
	import { addEventDispatchers, addReactiveConfig } from './utils';

	// Konva object config. Omit 'container' as we handle binding to this ourselves (see HTML of this component)
	export let config: Omit<StageConfig, 'container'> = {};
	// Reference to underlying Konva object
	export let stage: Konva.Stage | undefined = undefined;
	export let responsive: boolean = false;

	// Store previous config to compare against config changes
	let prevConfig: Omit<StageConfig, 'container'>;
	// Stage store, used to access the stage from other components via Context.
	// This is a store so that we can update it when the stage is created, or if we need/want to swap out the stage
	export const stageStore = writable<Konva.Stage | undefined>(undefined);
	// Set stage store in context so that other components can access it
	setContext('stageStore', stageStore);

	// Reactive Config
	$: {
		if (stage) {
			// Update stage config. addReactiveConfig is a helper function that compares the previous config to the new config
			// and only updates attributes that have changed
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

			// Update previous config
			prevConfig = config;
		}
	}

	// Events
	const dispatch = createEventDispatcher();

	// Create stage on mount. Konva is a browser-only library, so we can't create the stage on the server
	onMount(() => {
		stage = new Konva.Stage({
			container: 'container',
			...config
		});

		// Bind all Konva event listeners to our stage
		addEventDispatchers(dispatch, stage);

		// Update store (context)
		stageStore.set(stage);

		// If responsive, update stage size on window resize
		if (responsive) {
			resizeStageToWindow();
			window.addEventListener('resize', resizeStageToWindow);
		}
	});

	function resizeStageToWindow() {
		stage?.width(window.innerWidth);
		stage?.height(window.innerHeight);
	}
</script>

<div id="container" />
<slot />
