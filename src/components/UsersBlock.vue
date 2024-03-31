<template>
	<div v-if="style3" class="row justify-content-center">
		<UserBlock3
			v-for="user in data"
			:is-admin="isAdmin"
			:user="user"
			:key="user.id"
			:loading="loading"
		/>
		<!-- <UserBlock4 v-else-if='style4' v-for="user in data" :user="user" :key="user.id" />
    <UserBlock5 v-else-if='style5' v-for="user in data" :user="user" :key="user.id" /> -->
	</div>
</template>

<script>
	export default {
		name: 'UsersBlock',
	};
</script>

<script setup>
	import UserBlock3 from './UserBlock3.vue';
	// import UserBlock4 from './UserBlock4.vue';
	// import UserBlock5 from './UserBlock5.vue';

	defineProps({
		data: {
			type: [null, Array],
			required: false,
			default: () => [],
		},
		loading: {
			type: Boolean,
			default: false,
		},
		// style1: {
		//   type: Boolean,
		//   default: true,
		// },
		// style2: {
		//   type: Boolean,
		//   default: false,
		// },
		style3: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		// style4: {
		//   type: Boolean,
		//   default: false,
		// },
		// style5: {
		//   type: Boolean,
		//   default: false,
		// },
	});
</script>
