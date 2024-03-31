<template>
	<div class="alert text-center alert-warning" role="alert">
		<h4>
			<svg
				class="bi feature-icon flex-shrink-0 me-2"
				role="img"
				aria-label="Error:"
			>
				<use xlink:href="#error-load" />
			</svg>
			Error while loading photos
		</h4>
		<div class="mw-75 mb-3 mw-md-50 mx-auto">
			<img :src="imageFile" class="mw-50" />
		</div>
		<p>
			<slot>
				{{ message }}
			</slot>
		</p>
		<div v-if="showReloadButton">
			<button
				class="btn btn-outline-secondary btn-sm"
				@click="emits('reload')"
				title="Click to reload again"
			>
				<svg class="bi cat-stats" role="img" aria-label="Reload">
					<use xlink:href="#reload" />
				</svg>
				Reload
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ErrorLoadPhotos',
	};
</script>

<script setup>
	import { ref, onMounted } from 'vue';

	const errorPhoto1 = '/src/assets/images/error-photos1.png';
	const errorPhoto2 = '/src/assets/images/error-photos2.png';

	defineProps({
		message: {
			type: String,
			required: true,
			default: 'Something went wrong!',
		},
		showReloadButton: {
			type: Boolean,
			default: false,
		},
	});

	const emits = defineEmits(['reload']);

	const imageFiles = [errorPhoto1, errorPhoto2];
	const imageFile = ref(null);

	onMounted(() => {
		imageFile.value = imageFiles[Math.floor(Math.random() * imageFiles.length)];
	});
</script>
