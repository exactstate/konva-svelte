<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.ArrowConfig = {
		points: [20, 20, 100, 100]
	};
	export let arrow: Konva.Arrow | undefined = undefined;
</script>

<GenericShape bind:shape={arrow} shapeName="Arrow" {config} />
