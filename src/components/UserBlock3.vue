<template>
	<div class="col-lg-3 col-md-4 col-sm-6 mb-5">
		<div class="profile-wrapper3 p-2 position-relative">
			<div v-if="showDisabled" :class="disabledClass">Disabled</div>

			<div class="profile text-center">
				<a
					href="#"
					class="d-inline-block position-relative"
					@click.prevent="openDetail"
					:title="`View ${user?.name}'s profile`"
				>
					<div v-if="isProUser(user)" class="check position-absolute">
						<svg class=""><use xlink:href="#check2"></use></svg>
					</div>
					<img
						:src="avatarUrl"
						width="150"
						class="d-flex thumbnail mx-auto mb-2 rounded-circle skeleton-img"
						:alt="user?.name"
						@load="onImageLoaded($event.target)"
					/>
				</a>
				<h3 class="name text-center">{{ user?.name }}</h3>
				<p class="title mb-2 text-center text-uppercase">
					{{ user?.job_title }}
				</p>
				<p class="description text-center">{{ user?.country }}</p>
				<div
					class="gap-2 btn-actions d-flex flex-sm-column align-items-center justify-content-between"
				>
					<ToggleFollowUser :user="user" :loading="loading" />
					<button
						class="btn btn-sm"
						:class="{ skeleton: loading }"
						style="background: var(--bs-secondary)"
						:disabled="loading"
						@click.prevent="openPreview"
					>
						{{ loading ? 'Loading...' : 'Preview' }}
					</button>
				</div>
				<div v-if="isAdmin" class="d-flex justify-content-center my-3">
					<ToggleStatus
						:status="user?.status"
						:loading="loading"
						:model-id="user?.id"
						model-type="User"
					/>
				</div>
			</div>

			<div class="social-icons pt-2">
				<div class="d-flex align-items-center flex-column">
					<h4 :class="{ skeleton: loading }">
						{{ loading ? '' : user?.followers_count || 0 }}
					</h4>
					<p class="mb-0">Followers</p>
				</div>

				<div class="d-flex align-items-center flex-column">
					<h4 :class="{ skeleton: loading }">
						{{ loading ? '' : user?.likes_count || 0 }}
					</h4>
					<p class="mb-0">Likes</p>
				</div>

				<div class="d-flex align-items-center flex-column">
					<h4 :class="{ skeleton: loading }">
						{{ loading ? '' : user?.cats_count || 0 }}
					</h4>
					<p class="mb-0">Cats</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed, inject } from 'vue';

	import { isProUser, defaultImage } from '/src/libs/userHelpers.mjs';
	import { disabledClasses } from '/src/libs/helpers.mjs';

	import { setPendingLoadUserId } from '/src/stores/usersStore.mjs';

	import ToggleFollowUser from './ToggleFollowUser.vue';
	import ToggleStatus from './ToggleStatus.vue';

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

	const { User3: disabledClass } = disabledClasses;

	const showDisabled = computed(() => {
		let result = false;
		if (props.isAdmin) result = props.user?.status === false;
		return result;
	});

	const avatarUrl = computed(() => {
		return props.user?.image || defaultImage;
	});

	const openPreview = () => {
		// console.log('openPreview', props.user?.id);
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
