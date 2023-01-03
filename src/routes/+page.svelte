<script lang="ts">
	import Stage from '$lib/Stage.svelte';
	import Layer from '$lib/Layer.svelte';
	import type Konva from 'konva';
	import Circle from '$lib/Circle.svelte';
	import Star from '$lib/Star.svelte';
	import Arc from '$lib/Arc.svelte';
	import Arrow from '$lib/Arrow.svelte';
	import Ellipse from '$lib/Ellipse.svelte';
	import Image from '$lib/Image.svelte';
	import Tag from '$lib/Tag.svelte';
	import Text from '$lib/Text.svelte';
	import Label from '$lib/Label.svelte';
	import Line from '$lib/Line.svelte';
	import Path from '$lib/Path.svelte';
	import Rect from '$lib/Rect.svelte';
	import RegularPolygon from '$lib/RegularPolygon.svelte';
	import Ring from '$lib/Ring.svelte';
	import Shape from '$lib/Shape.svelte';
	import Sprite from '$lib/Sprite.svelte';
	import TextPath from '$lib/TextPath.svelte';
	import Transformer from '$lib/Transformer.svelte';
	import Wedge from '$lib/Wedge.svelte';
	import GenericShape from '$lib/GenericShape.svelte';

	let stage: Konva.Stage;
	let transformer: Konva.Transformer;

	$: if (stage) {
		const ring = stage.findOne('#matt');
		transformer.attachTo(ring);
	}
</script>

<Stage
	bind:stage
	config={{
		width: 2000,
		height: 2000
	}}
>
	<Layer on:click={() => console.log('layer clicked')}>
		<Transformer bind:transformer />

		<GenericShape
			shapeName="Circle"
			config={{
				id: 'matt',
				fill: 'red',
				radius: 50,
				x: 100,
				y: 100,
				draggable: true
			}}
			on:mouseover={() => console.log('hey')}
			on:click={() => console.log('click')}
			on:dragstart={() => console.log('dragstart')}
			on:dragmove={() => console.log('dragmove')}
			on:dragend={() => console.log('dragend')}
		/>
	</Layer>
</Stage>
