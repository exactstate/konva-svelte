<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.RegularPolygonConfig = {
		sides: 3,
		radius: 50
	};
	export let regularPolygon: Konva.RegularPolygon | undefined = undefined;
</script>

<GenericShape bind:shape={regularPolygon} shapeName="RegularPolygon" {config} />
