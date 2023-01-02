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
	<Layer>
		<Transformer bind:transformer />

		<Wedge
			config={{
				x: 900,
				y: 100,
				angle: 60,
				radius: 70,
				fill: 'red'
			}}
		/>

		<TextPath
			config={{
				x: 800,
				y: 100,
				text: 'Hello world',
				fontSize: 30,
				fontFamily: 'Calibri',
				fill: 'green',
				data: 'M 0 0 C 100 100 200 100 300 0'
			}}
		/>

		<Sprite
			src="https://konvajs.org/assets/yoda.jpg"
			config={{
				x: 400,
				y: 200,
				animation: 'standing',
				animations: {
					standing: [
						0, 0, 49, 109, 52, 0, 49, 109, 105, 0, 49, 109, 158, 0, 49, 109, 211, 0, 49, 109, 264,
						0, 49, 109, 317, 0, 49, 109, 370, 0, 49, 109, 423, 0, 49, 109, 476, 0, 49, 109, 529, 0,
						49, 109, 582, 0, 49, 109, 635, 0, 49, 109, 688, 0, 49, 109, 741, 0, 49, 109, 794, 0, 49,
						109, 847, 0, 49, 109, 900, 0, 49, 109, 953, 0, 49, 109, 1006, 0, 49, 109, 1059, 0, 49,
						109, 1112, 0, 49, 109, 1165, 0, 49, 109, 1218, 0, 49, 109, 1271, 0, 49, 109, 1324, 0,
						49, 109, 1377, 0, 49, 109, 1430, 0, 49, 109, 1483, 0, 49, 109, 1536, 0, 49, 109, 1589,
						0, 49, 109, 1642, 0, 49, 109, 1695, 0, 49, 109, 1748, 0, 49, 109, 1801, 0, 49, 109,
						1854, 0, 49, 109, 1907, 0, 49, 109
					]
				},
				frameRate: 24,
				frameIndex: 0
			}}
		/>

		<Shape
			config={{
				x: 800,
				y: 200,
				fill: 'purple',
				stroke: 'black',
				strokeWidth: 4,
				sceneFunc: (context, shape) => {
					context.beginPath();
					context.moveTo(200, 50);
					context.lineTo(420, 80);
					context.quadraticCurveTo(300, 100, 260, 170);
					context.closePath();
					// Konva specific method
					context.fillStrokeShape(shape);
				}
			}}
		/>

		<Ring
			config={{
				id: 'matt',
				draggable: true,
				x: 200,
				y: 200,
				innerRadius: 50,
				outerRadius: 100,
				fill: 'red',
				stroke: 'black',
				strokeWidth: 4,
				shadowColor: 'black',
				shadowBlur: 10,
				shadowOffset: { x: 10, y: 10 },
				shadowOpacity: 0.5
			}}
		/>

		<RegularPolygon
			config={{
				x: 200,
				y: 400,
				sides: 5,
				radius: 70,
				fill: 'red',
				stroke: 'black',
				strokeWidth: 4,
				shadowColor: 'black',
				shadowBlur: 10,
				shadowOffset: { x: 10, y: 10 },
				shadowOpacity: 0.5
			}}
		/>

		<Rect
			config={{
				x: 100,
				y: 100,
				width: 100,
				height: 100,
				fill: 'blue',
				stroke: 'black',
				strokeWidth: 4,
				shadowColor: 'black',
				shadowBlur: 10,
				shadowOffset: { x: 10, y: 10 },
				shadowOpacity: 0.5
			}}
		/>

		<Path
			config={{
				x: 500,
				data: 'M 73 70 C 340 23 450 60 500 20',
				stroke: 'red',
				strokeWidth: 5,
				lineCap: 'round',
				lineJoin: 'round'
			}}
		/>

		<Line
			config={{
				points: [73, 70, 340, 23, 450, 60, 500, 20],
				stroke: 'red',
				strokeWidth: 5,
				lineCap: 'round',
				lineJoin: 'round'
			}}
		/>

		<Label
			config={{
				x: 400,
				y: 100,
				opacity: 0.75
			}}
		>
			<Tag
				config={{
					fill: 'black',
					pointerDirection: 'down',
					pointerWidth: 10,
					pointerHeight: 10,
					lineJoin: 'round',
					shadowColor: 'black',
					shadowBlur: 10,
					shadowOffset: { x: 10, y: 10 },
					shadowOpacity: 0.5
				}}
			/>
			<Text
				config={{
					text: 'Hello World',
					fontSize: 30,
					fontFamily: 'Calibri',
					fill: 'white'
				}}
			/>
		</Label>

		<Circle
			config={{
				x: 100,
				y: 100,
				radius: 50,
				fill: 'red',
				stroke: 'black',
				strokeWidth: 4
			}}
		/>
		<Star
			config={{
				x: 100,
				y: 300,
				fill: 'green',
				stroke: 'black',
				strokeWidth: 4,
				numPoints: 5,
				innerRadius: 40,
				outerRadius: 70
			}}
		/>
		<Arc
			config={{
				x: 200,
				y: 130,
				angle: 60,
				fill: 'green',
				stroke: 'black',
				strokeWidth: 4,
				numPoints: 5,
				innerRadius: 40,
				outerRadius: 70
			}}
		/>
		<Arrow
			config={{
				x: 300,
				y: 100,
				points: [20, 20, 100, 100],
				stroke: 'black',
				strokeWidth: 10,
				numPoints: 5
			}}
		/>
		<Ellipse
			config={{
				x: 300,
				y: 300,
				radiusX: 50,
				radiusY: 50,
				fill: 'green',
				stroke: 'black',
				strokeWidth: 4
			}}
		/>
		<Image
			src="https://cdn.discordapp.com/attachments/989739585158389760/1059573522827059240/ThePencilwriter_green_large_pipes_and_lianas_inside_room_isomet_e292c28f-f683-4b1b-8ba9-1be2dead1285.png"
			config={{
				x: 400,
				y: 400,
				width: 1000,
				height: 1000
			}}
		/>
	</Layer>
</Stage>
