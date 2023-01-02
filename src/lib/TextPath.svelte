<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.TextPathConfig = {};
	export let textPath: Konva.TextPath | undefined = undefined;
</script>

<GenericShape bind:shape={textPath} shapeName="TextPath" {config} />
