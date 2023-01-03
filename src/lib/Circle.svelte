<script lang="ts">
	import type Konva from 'konva';
	import GenericShape from './GenericShape.svelte';

	export let config: Konva.CircleConfig = {};
	export let circle: Konva.Circle | undefined = undefined;
</script>

<GenericShape
	bind:shape={circle}
	shapeName="Circle"
	{config}
	on:mouseover
	on:mouseout
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:mousedown
	on:mouse
	on:wheel
	on:click
	on:dblclick
	on:touchstart
	on:touchmove
	on:touched
	on:tap
	on:dbltap
	on:pointerdown
	on:pointermove
	on:pointerup
	on:pointercancel
	on:pointerover
	on:pointerenter
	on:pointerout
	on:pointerleave
	on:pointerclick
	on:pointerdblclick
	on:dragstart
	on:dragmove
	on:dragend
	on:transformstart
	on:transform
	on:transformend
/>
