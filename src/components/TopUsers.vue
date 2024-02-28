<template>
	<div class="bg-light py-5">
		<div class="container">
			<div class="row mb-4">
				<h2 class="display-4 border-bottom font-weight-light">
					Adventurous Catographer
				</h2>
				<p class="font-italic text-muted">
					Meet our top cat aficionados, a community of passionate individuals
					who lead the way in sharing their love for feline friends
				</p>
			</div>

			<div class="row row-cols-xl-5 justify-content-center">
				<div v-if="loadUsersError" class="w-100">
					<ErrorLoadUsers
						:message="loadUsersError"
						:show-reload-button="true"
						@reload="fetchTopUsers(userFields)"
					/>
				</div>
				<UserBlock2
					v-for="user in usersData"
					:user="user"
					:key="user.id"
					:loading="loadingUsers"
					:is-admin="isAdmin"
				/>
				<!-- <UsersBlock :data="usersData" :style1='false' style3 :loading='loadingUsers' /> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TopUsers',
	};
</script>

<script setup>
	import { onMounted, computed, watch, inject } from 'vue';

	import { fetchUserFields, getField } from '/src/stores/graphQLStore.mjs';
	import { useHomeStore, fetchTopUsers } from '/src/stores/homeStore.mjs';

	import UserBlock2 from './UserBlock2.vue';
	import ErrorLoadUsers from './ErrorLoadUsers.vue';
	// import UsersBlock from './UsersBlock.vue';

	const userFields = computed(() => getField('users'));
	const { users, loadingUsers, loadUsersError } = useHomeStore();
	const topUsers = 15;

	const authStore = inject('authStore');
	const { useAuthStore } = authStore;
	const { isAdmin, authInfo } = useAuthStore();

	const usersData = computed(() => {
		if (loadingUsers.value) return Array(5).fill({});

		return users.value || [];
	});

	onMounted(() => {
		if (users.value?.length) return;

		if (userFields.value)
			fetchTopUsers(userFields.value, topUsers, authInfo.value?.token);
		else fetchUserFields();
	});

	watch(userFields, (val) => {
		if (val.length) fetchTopUsers(val, topUsers, authInfo.value?.token);
	});
</script>
