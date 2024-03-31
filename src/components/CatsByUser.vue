<template>
	<div class="mt-4" :id="`cats-by-user-${userId}`">
		<img
			v-if="!isAuthenticated"
			src="/src/assets/images/must-login-to-view-cats.png"
			class="d-flex mx-auto h-auto mw-sm-75 mw-md-50"
		/>
		<transition v-else :name="noCats ? '' : 'just-fade'" mode="out-in">
			<CatLoader v-if="loadingCats" />
			<div v-else-if="loadCatsError">
				<ErrorLoadCats
					:message="loadCatsError"
					:show-reload-button="true"
					@reload="handlePageChange"
				/>
			</div>
			<p v-else-if="noCats">No cats found.</p>
			<div v-else class="">
				<CatsBlock
					:data="cats"
					:current-user-id="authInfo.user?.id"
					:is-admin="isAdmin"
				/>
				<Pagination
					v-if="totalItems"
					v-model="pageIndex"
					:total-items="totalItems"
					:items-per-page="itemsPerPage"
				/>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'CatsByUser',
	};
</script>

<script setup>
	import {
		ref,
		onMounted,
		watch,
		computed,
		onBeforeUnmount,
		inject,
	} from 'vue';

	import {
		useCatStore,
		fetchCatsByUser,
		setLoadCatsError,
	} from '/src/stores/catsStore.mjs';

	import CatsBlock from './CatsBlock.vue';
	import Pagination from './Pagination.vue';
	import ErrorLoadCats from './ErrorLoadCats.vue';
	import CatLoader from './CatLoader.vue';

	const props = defineProps({
		userId: {
			type: [Number, String],
			required: false,
			default: null,
		},
		modelValue: {
			type: Number,
			required: false,
			default: 1,
		},
	});

	const emits = defineEmits(['update:modelValue']);

	const emitter = inject('emitter');
	const authStore = inject('authStore');
	const { useAuthStore, logout } = authStore;
	const { isAuthenticated, authInfo, isAdmin } = useAuthStore();

	const itemsPerPage = 8;
	const pageIndex = ref(1);
	const {
		cats,
		loadingCats,
		totalItems = 0,
		/*totalPages = 0, */ loadCatsError,
	} = useCatStore();
	const loaded = ref(false);
	const noCats = computed(
		() => loaded.value && !(cats.value && cats.value.length > 0),
	);

	const timeoutRedirect = ref(null);

	const fetchOptions = computed(() => {
		return {
			mainField: 'catsByUserId',
			pageIndex: pageIndex.value,
			itemsPerPage,
		};
	});

	const clearTimeoutRedirect = () => {
		if (timeoutRedirect.value) {
			clearTimeout(timeoutRedirect.value);
			timeoutRedirect.value = null;
		}
	};

	const scrollToTop = () => {
		const el = document.getElementById(`cats-by-user-${props.userId}`);
		if (!el) return;

		window.scrollTo(0, el.offsetTop - 150);
	};

	const handlePageChange = () => {
		clearTimeoutRedirect();

		fetchCatsByUser(
			props.userId,
			'id, name, image, user_id, likes_count, birthday, status, updated_at, created_at, photos_count',
			authInfo.value.token,
			fetchOptions.value,
		);

		loaded.value = true;
	};

	onMounted(() => {
		if (!isAuthenticated.value) {
			emitter.emit('toast', {
				title: 'Notice',
				message: 'Please login to see user cats.',
			});
		} else if (props.userId) {
			pageIndex.value = props.modelValue ?? 1;
			if (!cats.value || cats.value.length === 0) handlePageChange();
		}
	});

	onBeforeUnmount(() => {
		clearTimeoutRedirect();
	});

	watch(
		() => loadCatsError.value,
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
					setLoadCatsError(null);
					logout();

					emitter.emit('route-transition', 'bounce');
					emitter.emit('show-page', 'Login');
				}, 10000);
			}
		},
	);

	watch(pageIndex, (newVal) => {
		if (newVal === props.modelValue) return;

		emits('update:modelValue', newVal);

		scrollToTop();
		setTimeout(handlePageChange, 600);
	});
</script>
