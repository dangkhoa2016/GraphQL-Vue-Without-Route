<template>
	<div class="container">
		<ErrorLoadUsers
			v-if="loadUserError"
			:message="loadUserError"
			:show-reload-button="true"
			:load-details="true"
			@reload="reloadUser"
		/>

		<UserInfo
			:loading="loadingUser"
			:user="user"
			:show-toggle-follow="showToggleFollow"
			:is-admin="isAdmin"
		/>

		<SimpleTabs
			:disabled="loadingUser || (loadUserError && loadUserError.length > 0)"
			class="mt-4"
			:tabs="tabs"
		>
			<template #about-tab>
				<div class="mt-4 profile-bio" :class="{ skeleton: loadingUser }">
					<p v-for="(block, index) in bioBlocks" :key="index">
						{{ block }}
					</p>
				</div>
			</template>
			<template #cats-tab>
				<CatsByUser :user-id="user?.id" v-model="catPageIndex" />
			</template>
			<template #photos-tab>
				<PhotosByUser
					:user-id="user?.id"
					v-model="photoPageIndex"
					:is-admin="isAdmin"
				/>
			</template>
		</SimpleTabs>
	</div>
</template>

<script>
	export default {
		name: 'UserDetail',
	};
</script>

<script setup>
	import {
		watch,
		ref,
		onMounted,
		computed,
		onBeforeUnmount,
		inject,
	} from 'vue';

	import {
		useUserStore,
		fetchUser,
		getPendingLoadUserId,
		setLoadUserError,
	} from '/src/stores/usersStore.mjs';
	import { setResults as setCatsResults } from '/src/stores/catsStore.mjs';
	import { setResults as setPhotosResults } from '/src/stores/photosStore.mjs';

	import SimpleTabs from './SimpleTabs.vue';
	import CatsByUser from './CatsByUser.vue';
	import PhotosByUser from './PhotosByUser.vue';
	import UserInfo from './UserInfo.vue';
	import ErrorLoadUsers from './ErrorLoadUsers.vue';

	const catPageIndex = ref(1);
	const photoPageIndex = ref(1);
	const { user, loadingUser, loadUserError } = useUserStore();

	const emitter = inject('emitter');
	const authStore = inject('authStore');
	const { useAuthStore, logout } = authStore;
	const { isAdmin, authInfo } = useAuthStore();

	const timeoutRedirect = ref(null);

	const showToggleFollow = computed(() => {
		return authInfo.value?.user?.id !== user.value?.id;
	});

	const pendingLoadUserId = computed(() => getPendingLoadUserId());

	const bioBlocks = computed(() => {
		if (loadingUser.value) return [];

		return user.value?.bio ? user.value.bio.split(/\r?\n/) : [];
	});

	const tabs = [
		{ id: 'about-tab', label: 'About' },
		{ id: 'cats-tab', label: 'Cats' },
		{ id: 'photos-tab', label: 'Photos' },
	];

	const clearTimeoutRedirect = () => {
		if (timeoutRedirect.value) {
			clearTimeout(timeoutRedirect.value);
			timeoutRedirect.value = null;
		}
	};

	const reloadUser = () => {
		clearTimeoutRedirect();
		if (!pendingLoadUserId.value) return;

		fetchUser(
			pendingLoadUserId.value,
			`
      id, name, email, image, bio, followed, followers_count, photos_count,
      cats_count, status, created_at, likes_count, facebook_url, pinterest_url,
      twitter_url, instagram_url, linkedin_url, youtube_url, github_url,
      job_title, location, country, website_url, phone_number, gender
    `,
			authInfo.value?.token,
		);
	};

	onMounted(() => {
		setCatsResults([], 0, 0);
		setPhotosResults([], 0, 0);
		reloadUser();
	});

	onBeforeUnmount(() => {
		clearTimeoutRedirect();
	});

	watch(pendingLoadUserId, reloadUser);

	watch(
		() => loadUserError.value,
		(newVal /*, oldVal*/) => {
			if (
				newVal &&
				(newVal.includes('Session was expired') ||
					newVal.includes('Session was not found'))
			) {
				emitter.emit('toast', {
					title: 'Session Expired',
					message:
						'Please login again.<br>You will be redirected to login page in 10 seconds.',
				});
				timeoutRedirect.value = setTimeout(() => {
					setLoadUserError(null);
					logout();

					emitter.emit('route-transition', 'bounce');
					emitter.emit('show-page', 'Login');
				}, 10000);
			}
		},
	);
</script>
