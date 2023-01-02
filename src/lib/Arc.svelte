<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.ArcConfig = {
		innerRadius: 40,
		outerRadius: 70,
		angle: 60
	};
	export let arc: Konva.Arc | undefined = undefined;
</script>

<GenericShape bind:shape={arc} shapeName="Arc" {config} />
