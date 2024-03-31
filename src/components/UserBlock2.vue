<template>
	<div class="col-lg-3 col-md-4 col-sm-6 mb-5">
		<div class="profile-wrapper2 bg-white d-flex overflow-hidden">
			<div
				class="profile text-center justify-content-between d-flex flex-grow-1 flex-column"
			>
				<div class="image position-relative mx-auto mt-4">
					<a
						href="#"
						@click.prevent="openDetail"
						:title="`View ${user?.name}'s profile`"
					>
						<div
							class="circle-1 border-1 rounded-circle position-absolute"
						></div>
						<div
							class="circle-2 border-1 rounded-circle position-absolute"
						></div>
						<img
							:src="avatarUrl"
							class="rounded-circle skeleton-img img-fluid"
							:alt="user?.name"
							@load="onImageLoaded($event.target)"
						/>
					</a>
				</div>

				<div class="mt-3">
					<h6 class="name" :class="{ 'skeleton mx-3': loading }">
						{{ loading ? '' : user?.name }}
					</h6>
					<div class="job" :class="{ 'skeleton mx-3': loading }">
						{{ loading ? '' : user?.job_title }}
					</div>
					<span
						class="d-inline-block mt-2 rounded"
						:class="
							loading ? 'skeleton mx-3' : 'bg-secondary fs-6 px-2 text-white'
						"
					>
						{{ loading ? '' : user?.country }}
					</span>
				</div>

				<div
					class="btn-actions row-gap-1 column-gap-2 d-flex flex-column mt-3 justify-content-between mx-3 mb-3 align-items-center"
				>
					<ToggleFollowUser :user="user" :loading="loading" />
					<button
						class="btn btn-sm"
						:class="{ skeleton: loading }"
						:disabled="loading"
						@click.prevent="openPreview"
					>
						{{ loading ? 'Loading...' : 'Preview' }}
					</button>
				</div>
				<div v-if="isAdmin" class="d-flex justify-content-center mb-3">
					<ToggleStatus
						:status="user?.status"
						:loading="loading"
						:model-id="user?.id"
						model-type="User"
					/>
				</div>
			</div>

			<div class="stats d-flex text-center flex-column">
				<div
					class="box px-3 flex-fill d-flex flex-column justify-content-center"
				>
					<span class="value" :class="{ 'stats-count skeleton': loading }">
						{{ loading ? '' : user?.cats_count || 0 }}
					</span>
					<span class="parameter">Cats</span>
				</div>
				<div
					class="box px-3 flex-fill d-flex flex-column justify-content-center"
				>
					<span class="value" :class="{ 'stats-count skeleton': loading }">
						{{ loading ? '' : user?.likes_count || 0 }}
					</span>
					<span class="parameter">Likes</span>
				</div>
				<div
					class="box px-3 flex-fill d-flex flex-column justify-content-center"
				>
					<span class="value" :class="{ 'stats-count skeleton': loading }">
						{{ loading ? '' : user?.followers_count || 0 }}
					</span>
					<span class="parameter">Followers</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserBlock2',
	};
</script>

<script setup>
	import { computed, inject } from 'vue';

	import { setPendingLoadUserId } from '/src/stores/usersStore.mjs';
	import { defaultImage } from '/src/libs/userHelpers.mjs';

	import ToggleStatus from './ToggleStatus.vue';
	import ToggleFollowUser from './ToggleFollowUser.vue';

	const props = defineProps({
		user: {
			type: Object,
			default: () => ({}),
		},
		loading: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	});

	const emitter = inject('emitter');

	const avatarUrl = computed(() => {
		return props.user?.image || defaultImage;
	});

	const openPreview = () => {
		emitter.emit('show-user-preview', props.user?.id);
	};

	const onImageLoaded = (img) => {
		if (img.src === defaultImage) return;

		img.classList.remove('skeleton-img');
	};

	const openDetail = () => {
		if (props.loading) return;

		emitter.emit('route-transition', 'just-fade');

		setPendingLoadUserId(props.user.id);

		emitter.emit('show-page', 'ViewUser');
	};
</script>
