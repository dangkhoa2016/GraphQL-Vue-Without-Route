<template>
	<div class="container">
		<h1>Purr-fect Companions: Explore Our Feline Friends</h1>

		<transition name="fade-slide-up" appear :duration="600">
			<div v-if="showParagraphs" class="">
				<p>
					Welcome to our enchanting realm of feline wonder - a curated
					collection that goes beyond a mere list and invites you on a
					delightful journey into the world of our purr-fect companions.
					Discover the unique charm and charisma of each cat, as we present a
					comprehensive exploration of these endearing creatures. Our extensive
					compilation offers a rich tapestry of information, showcasing not just
					names but stories, traits, and the special qualities that make each
					cat a beloved member of the family.
				</p>
				<p>
					Immerse yourself in the playful antics of kittens, marvel at the grace
					of sophisticated adults, and learn about the diverse breeds that grace
					our homes with their presence. From the mischievous Siamese to the
					majestic Maine Coon, each entry is a window into the distinct
					personalities and characteristics that define these wonderful
					creatures. We believe in celebrating the essence of feline
					companionship, going beyond a mere inventory to create an engaging
					narrative that resonates with cat lovers and enthusiasts alike.
				</p>
				<p>
					Our commitment to providing a comprehensive experience extends beyond
					the surface, delving into health tips, grooming advice, and
					heartwarming anecdotes that capture the true spirit of our furry
					friends. Navigate through our collection with the assurance that you
					are entering a world where each cat is not just a name on a list but a
					cherished individual with a unique story waiting to be discovered.
				</p>
				<p>
					Join us on this journey, where 'Purr-fect Companions: Explore Our
					Feline Friends' becomes more than a slogan—it's an invitation to
					embrace the magic, mystery, and unbridled joy that cats bring into our
					lives. Let's embark on a whimsical adventure together, celebrating the
					extraordinary world of our beloved feline companions.
				</p>
			</div>
		</transition>

		<div id="cats-list">
			<transition name="just-fade" mode="out-in">
				<CatLoader v-if="loadingCats" />
				<div v-else-if="loadCatsError">
					<ErrorLoadCats
						:message="loadCatsError"
						:show-reload-button="true"
						@reload="handlePageChange"
					/>
				</div>
				<div v-else class="mt-3">
					<CatsBlock
						:data="cats"
						:is-admin="isAdmin"
						:is-show-at-profile="true"
						:current-user-id="authInfo.user?.id"
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
	</div>
</template>

<script>
	export default {
		name: 'CatsList',
	};
</script>

<script setup>
	import {
		ref,
		onMounted,
		watch,
		computed,
		onBeforeMount,
		onBeforeUnmount,
		inject,
	} from 'vue';

	import {
		useCatStore,
		fetchCats,
		setResults,
		setLoadCatsError,
	} from '/src/stores/catsStore.mjs';

	import CatsBlock from '/src/components/CatsBlock.vue';
	import Pagination from '/src/components/Pagination.vue';
	import ErrorLoadCats from '/src/components/ErrorLoadCats.vue';
	import CatLoader from '/src/components/CatLoader.vue';

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

	const showParagraphs = ref(false);

	const timeoutRedirect = ref(null);

	const fetchOptions = computed(() => {
		return {
			mainField: 'cats',
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

	const handlePageChange = () => {
		clearTimeoutRedirect();

		fetchCats(
			`id, name, image, description,
    coat_color, eye_color, breed, origin,
    weight, height, user_id, status, gender,
    created_at, birthday, owner { name }, likes_count, photos_count`,
			authInfo.value.token,
			fetchOptions.value,
		);
	};

	const scrollToTop = () => {
		const el = document.getElementById('cats-list');
		if (!el) return;

		window.scrollTo(0, el.offsetTop - 150);
	};

	onBeforeMount(() => {
		setResults(null, 0, 0);
		setLoadCatsError(null);
	});

	onBeforeUnmount(() => {
		clearTimeoutRedirect();
	});

	onMounted(() => {
		if (!isAuthenticated.value) {
			emitter.emit('toast', {
				title: 'Notice',
				message: 'Please login to see users cats.',
			});
			emitter.emit('route-transition', 'bounce');
			emitter.emit('show-page', 'Login');
			return;
		}

		setTimeout(() => {
			showParagraphs.value = true;
		}, 100);

		setTimeout(handlePageChange, 500);
	});

	watch(
		() => loadCatsError.value,
		(newVal /*, oldVal*/) => {
			if (newVal?.includes('Session was expired')) {
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

	watch(pageIndex, () => {
		scrollToTop();
		setTimeout(handlePageChange, 600);
	});
</script>
