<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.RingConfig = {
		innerRadius: 50,
		outerRadius: 100
	};
	export let ring: Konva.Ring | undefined = undefined;
</script>

<GenericShape bind:shape={ring} shapeName="Ring" {config} />
