<template>
	<div class="container">
		<h1>Guardians of Whiskered Companions</h1>
		<h2>An Enclave of Cat Devotees</h2>

		<transition name="fade-slide-up" appear :duration="600">
			<div v-if="showParagraphs" class="">
				<p>
					Welcome to our esteemed enclave, where the mantle of responsibility
					transforms into a badge of honor - 'Guardians of Whiskered
					Companions.' Here, we celebrate the profound connection between feline
					enthusiasts and their beloved companions, recognizing the role of each
					guardian as a custodian of joy, comfort, and unwavering camaraderie.
				</p>
				<p>
					In this dedicated space, we go beyond the mere listing of cat owners
					to delve into the rich tapestry of stories that bind these guardians
					with their whiskered charges. Each guardian, like a sentinel, takes on
					the responsibility of fostering an environment where their feline
					friends thrive and flourish. It's not just about possession; it's
					about mutual respect, understanding, and the symbiotic relationship
					that defines the extraordinary bond between a guardian and their
					whiskered ward.
				</p>
				<p>
					Our enclave is a sanctuary for those who understand that being a
					guardian goes beyond providing food and shelter. It's a commitment to
					the holistic well-being of these enigmatic creatures – from the tender
					moments of play to the silent solace of a shared space. We explore the
					unique narratives that unfold in every household, narrating tales of
					companionship, resilience, and the profound impact that these
					whiskered beings have on the lives of their guardians.
				</p>
				<p>
					Navigate through our enclave to discover articles, tips, and
					heartwarming anecdotes that illuminate the journey of being a
					guardian. Whether you're a seasoned cat enthusiast or a newcomer to
					the realm of whiskered companions, our enclave is a haven where
					experiences are shared, knowledge is exchanged, and the collective
					love for feline friends is celebrated.
				</p>
				<p>
					Join us in honoring the Guardians of Whiskered Companions - a
					community that transcends the label of ownership and embraces the
					essence of stewardship. In this enclave, every guardian is a sentinel,
					standing steadfast in their commitment to ensuring the well-being and
					happiness of their feline charges. Together, let's revel in the joy of
					being entrusted with the care of these enchanting creatures, forging
					connections that endure and celebrating the unique privilege of being
					a Guardian of Whiskered Companions.
				</p>
			</div>
		</transition>

		<transition name="just-fade" mode="out-in">
			<UsersLoading v-if="loadingUsers" />
			<div v-else-if="loadUsersError">
				<ErrorLoadUsers
					:message="loadUsersError"
					:show-reload-button="true"
					@reload="handlePageChange"
				/>
			</div>
			<div v-else class="mt-4" id="users-list">
				<UsersBlock :data="users" :style1="false" style3 :is-admin="isAdmin" />
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
		name: 'UsersList',
	};
</script>

<script setup>
	import { watch, ref, onMounted, onBeforeMount, inject } from 'vue';

	import {
		useUserStore,
		fetchUsers,
		setResults,
		setLoadUsersError,
	} from '/src/stores/usersStore.mjs';

	import UsersBlock from '/src/components/UsersBlock.vue';
	import Pagination from '/src/components/Pagination.vue';
	import UsersLoading from '/src/components/UsersLoading.vue';
	import ErrorLoadUsers from '/src/components/ErrorLoadUsers.vue';

	const authStore = inject('authStore');
	const { useAuthStore } = authStore;
	const { isAdmin, authInfo } = useAuthStore();

	const showParagraphs = ref(false);

	const itemsPerPage = 12;
	const pageIndex = ref(1);
	const {
		users,
		loadingUsers,
		totalItems = 0,
		/*totalPages = 0, */ loadUsersError,
	} = useUserStore();

	const scrollToTop = () => {
		const el = document.getElementById('users-list');
		if (!el) return;

		window.scrollTo(0, el.offsetTop - 150);
	};

	const handlePageChange = () => {
		fetchUsers(
			`id, name, email, image, followed, country, status, created_at,
      likes_count, cats_count, photos_count, followers_count`,
			authInfo.value?.token,
			'users',
			pageIndex.value,
			itemsPerPage,
		);
	};

	onBeforeMount(() => {
		setResults(null, 0, 0);
		setLoadUsersError(null);
	});

	onMounted(() => {
		setTimeout(() => {
			showParagraphs.value = true;
		}, 100);

		setTimeout(handlePageChange, 500);
	});

	watch(pageIndex, () => {
		scrollToTop();
		setTimeout(handlePageChange, 600);
	});
</script>
