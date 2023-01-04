<script lang="ts">
	import { Layer, Stage, Star, Text } from '$lib';
	import type Konva from 'konva';
	import { hasContext, onMount } from 'svelte';

	type StarConfig = {
		id: string;
		x: number;
		y: number;
		rotation: number;
		isDragging: boolean;
	};

	function generateShapes() {
		return [...Array(10)].map((_, i) => ({
			id: i.toString(),
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			rotation: Math.random() * 180,
			isDragging: false
		}));
	}

	let stars: StarConfig[] = [];
	let windowHeight: number = 0;
	let windowWidth: number = 0;

	let stage: Konva.Stage;

	onMount(() => {
		stars = generateShapes();
		windowHeight = window.innerHeight;
		windowWidth = window.innerWidth;

		console.log(stage);
	});
</script>

<Stage
	bind:stage
	config={{
		width: windowWidth,
		height: windowHeight
	}}
>
	<Layer>
		<Text content="Click a star and drag" />
		{#each stars as star (star.id)}
			<Star
				config={{
					id: star.id,
					name: star.id,
					x: star.x,
					y: star.y,
					numPoints: 5,
					innerRadius: 20,
					outerRadius: 40,
					fill: 'green',
					opacity: 0.8,
					draggable: true,
					rotation: star.rotation,
					shadowColor: 'black',
					shadowBlur: 10,
					shadowOpacity: 0.6,
					shadowOffsetX: star.isDragging ? 10 : 5,
					shadowOffsetY: star.isDragging ? 10 : 5,
					scaleX: star.isDragging ? 1.2 : 1,
					scaleY: star.isDragging ? 1.2 : 1
				}}
				on:dragstart={() => {
					star.isDragging = true;
				}}
				on:dragend={() => {
					star.isDragging = false;
				}}
			/>
		{/each}
	</Layer>
</Stage>
