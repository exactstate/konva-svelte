<script lang="ts">
	import { onMount, getContext, onDestroy, createEventDispatcher } from 'svelte';
	import Konva from 'konva';
	import { get, type Writable } from 'svelte/store';
	import addEventDispatchers from './events';

	// Events
	const dispatch = createEventDispatcher();

	// Props
	export let shapeName:
		| 'Circle'
		| 'Ellipse'
		| 'Star'
		| 'Rect'
		| 'Arc'
		| 'Arrow'
		| 'Image'
		| 'Tag'
		| 'Text'
		| 'Line'
		| 'Path'
		| 'RegularPolygon'
		| 'Ring'
		| 'Shape'
		| 'Sprite'
		| 'TextPath'
		| 'Wedge';
	export let config: Konva.ShapeConfig = {};
	let prevConfig: Konva.ShapeConfig;
	export let shape: Konva.Shape | undefined = undefined;

	// Handlers
	function addShapeToLayer(layer: Konva.Layer | Konva.Container | undefined) {
		if (layer && shape) {
			layer.add(shape);
		}
	}

	// Layer
	const containerStore = getContext('containerStore') as Writable<
		Konva.Layer | Konva.Container | undefined
	>;
	const unsubscribe = containerStore.subscribe(addShapeToLayer);

	onMount(() => {
		if (shapeName === 'Shape') {
			shape = new Konva.Shape(config);
		} else {
			shape = new Konva[shapeName](config);
		}

		addShapeToLayer(get(containerStore));

		// Add events
		addEventDispatchers(dispatch, shape);
	});

	onDestroy(() => {
		unsubscribe();
		if (shape) {
			shape.destroy();
		}
	});

	// Reactive Config
	$: if (shape) {
		if (prevConfig) {
			// Compare prevConfig and config
			// and update shape accordingly
			const prevConfigKeys = Object.keys(prevConfig);
			const configKeys = Object.keys(config);

			// Loop over each new config
			for (let i = 0; i < configKeys.length; i++) {
				const key = configKeys[i];
				const value = config[key];

				// If the key is not in the previous config
				// or the value has changed
				if (!prevConfigKeys.includes(key) || prevConfig[key] !== value) {
					// Update the shape
					shape.setAttr(key, value);
				}
			}
		}

		prevConfig = config;
	}
</script>

<slot />
