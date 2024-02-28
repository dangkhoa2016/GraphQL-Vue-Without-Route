<template>
	<button
		v-if="isLiked(type, image.id)"
		title="Unlike this photo"
		class="btn btn-sm ms-2 d-flex btn-outline-danger btn-unlike-photo"
		:disabled="!authInfo?.token || isUnliking(type, image.id)"
		@click.prevent="toggleUnlikePhoto"
	>
		<svg class="like-icon position-relative">
			<use xlink:href="#likes"></use>
		</svg>
	</button>
	<button
		v-else
		class="btn btn-sm ms-2 d-flex btn-outline-warning btn-like-photo"
		title="Like this photo"
		:disabled="!authInfo?.token || isLiking(type, image.id)"
		@click.prevent="toggleLikePhoto"
	>
		<svg class="like-icon position-relative">
			<use xlink:href="#likes"></use>
		</svg>
	</button>
</template>

<script>
	export default {
		name: 'ToggleLikePhoto',
	};
</script>

<script setup>
	import { inject } from 'vue';

	import {
		isLiked,
		isLiking,
		isUnliking,
		toggleLike,
		toggleUnlike,
	} from '/src/stores/toggleLikesStore.mjs';

	const props = defineProps({
		image: {
			type: Object,
			required: true,
			default: () => ({}),
		},
	});

	const graphqlFields =
		'id, title, url, status, likes_count, cat_id, owner { id, name, likes_count }';

	const type = 'Photo';

	const emitter = inject('emitter');
	const authStore = inject('authStore');
	const { useAuthStore } = authStore;
	const { authInfo } = useAuthStore();

	const toggleLikePhoto = () => {
		toggleLike(
			type,
			props.image?.id,
			authInfo.value?.token,
			graphqlFields,
		).catch((err) => {
			/*
      if (err.name === 'MaxUnlikeRequestReached' || err.name === 'MaxLikeRequestReached') {
        emitter.emit('toast', { title: 'Notice', message: err.message });
        return;
      }
      */

			// console.log('toggleLikePhoto err', err);
			emitter.emit('toast', { title: 'Notice', message: err.message });
		});
	};

	const toggleUnlikePhoto = () => {
		toggleUnlike(
			type,
			props.image?.id,
			authInfo.value?.token,
			graphqlFields,
		).catch((err) => {
			/*
      if (err.name === 'MaxUnlikeRequestReached' || err.name === 'MaxLikeRequestReached') {
        emitter.emit('toast', { title: 'Notice', message: err.message });
        return;
      }
      */

			// console.log('toggleUnlikePhoto err', err);
			emitter.emit('toast', { title: 'Notice', message: err.message });
		});
	};
</script>
