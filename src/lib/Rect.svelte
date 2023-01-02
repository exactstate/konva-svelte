<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.RectConfig = {};
	export let rect: Konva.Rect | undefined = undefined;
</script>

<GenericShape bind:shape={rect} shapeName="Rect" {config} />
