<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.TextConfig = {};
	export let text: Konva.Text | undefined = undefined;
</script>

<GenericShape bind:shape={text} shapeName="Text" {config} />
