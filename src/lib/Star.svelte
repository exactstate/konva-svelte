<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.StarConfig = {
		numPoints: 5,
		innerRadius: 40,
		outerRadius: 70
	};
	export let star: Konva.Star | undefined = undefined;
</script>

<GenericShape bind:shape={star} shapeName="Star" {config} />
