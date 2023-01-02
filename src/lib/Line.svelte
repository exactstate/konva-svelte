<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.LineConfig = {};
	export let line: Konva.Line | undefined = undefined;
</script>

<GenericShape bind:shape={line} shapeName="Line" {config} />
