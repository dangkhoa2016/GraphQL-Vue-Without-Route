<template>
	<SimpleGallery
		:gallery-id="`${galleryId}-gallery`"
		:show-stats="true"
		:images="images"
		figure-class="p-2"
		wrapper-class="col"
		:is-admin="isAdmin"
		:main-class="`${mainClass} justify-content-center`"
		:current-user-id="currentUserId"
	/>
</template>

<script>
	export default {
		name: 'PhotosBlock',
	};
</script>

<script setup>
	import { computed } from 'vue';

	import SimpleGallery from './SimpleGallery.vue';

	const props = defineProps({
		data: {
			type: [null, Array],
			required: false,
			default: () => [],
		},
		galleryId: {
			type: String,
			required: false,
			default: '',
		},
		mainClass: {
			type: String,
			required: false,
			default: '',
		},
		isAdmin: {
			type: Boolean,
			required: false,
			default: false,
		},
		currentUserId: {
			type: [String, Number],
			default: null,
		},
	});

	const images = computed(() => {
		return props.data?.map((photo) => {
			return {
				id: photo.id,
				status: photo.status,
				largeURL: photo.url,
				thumbnailURL: photo.url,
				title: photo.title,
				description: photo.description,
				likes_count: photo.likes_count,
				created_at: photo.created_at,
				user_id: photo.owner?.id,
			};
		});
	});
</script>
