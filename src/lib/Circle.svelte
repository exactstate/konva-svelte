<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.CircleConfig = {};
	export let circle: Konva.Circle | undefined = undefined;
</script>

<GenericShape bind:shape={circle} shapeName="Circle" {config} />
