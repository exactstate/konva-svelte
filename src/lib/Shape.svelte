<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.ShapeConfig = {};
	export let shape: Konva.Shape | undefined = undefined;
</script>

<GenericShape bind:shape shapeName="Shape" {config} />
