<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.WedgeConfig = {
		angle: 60,
		radius: 70
	};
	export let wedge: Konva.Wedge | undefined = undefined;
</script>

<GenericShape bind:shape={wedge} shapeName="Wedge" {config} />
