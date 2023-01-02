<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.TagConfig = {};
	export let tag: Konva.Tag | undefined = undefined;
</script>

<GenericShape bind:shape={tag} shapeName="Tag" {config} />
