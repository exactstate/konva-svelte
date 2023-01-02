<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.EllipseConfig = {
		radiusX: 50,
		radiusY: 50
	};
	export let ellipse: Konva.Ellipse | undefined = undefined;
</script>

<GenericShape bind:shape={ellipse} shapeName="Ellipse" {config} />
