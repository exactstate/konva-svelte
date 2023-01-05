<script lang="ts">
	import { Layer, Stage, Rect, Text, Transformer } from '$lib';
	import type Konva from 'konva';
	import { onMount } from 'svelte';

	type StarConfig = {
		id: string;
		x: number;
		y: number;
		rotation: number;
		isDragging: boolean;
		color: string;
		selected: boolean;
	};

	function generateShapes() {
		return [...Array(10)].map((_, i) => ({
			id: i.toString(),
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			rotation: Math.random() * 180,
			color: '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6),
			isDragging: false,
			selected: false
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

	let transformer: Konva.Transformer;
</script>

<Stage
	bind:stage
	config={{
		width: windowWidth,
		height: windowHeight
	}}
	on:click={(e) => {
		if (e.detail.target === stage) {
			stars.forEach((star) => (star.selected = false));
			transformer.nodes([]);
		}
	}}
>
	<Layer>
		<Transformer
			bind:transformer
			config={{
				rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 315, 360]
			}}
		/>

		<Text content="Click a star and drag" />
		{#each stars as star (star.id)}
			<Rect
				config={{
					id: star.id,
					name: star.id,
					width: 50,
					height: 50,
					x: star.x,
					y: star.y,
					fill: star.color,
					opacity: 0.8,
					draggable: star.selected,
					rotation: star.rotation
				}}
				on:click={(e) => {
					console.log(e.detail.target);
				}}
				on:dblclick={(e) => {
					// Unslect all other stars
					stars.forEach((s) => (s.selected = false));

					transformer.nodes([e.detail.target]);
					star.selected = true;
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
