<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.PathConfig = {};
	export let path: Konva.Path | undefined = undefined;
</script>

<GenericShape bind:shape={path} shapeName="Path" {config} />
