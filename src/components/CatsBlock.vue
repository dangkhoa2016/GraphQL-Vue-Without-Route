<template>
	<div class="row justify-content-center">
		<CatBlock
			v-for="cat in data"
			:cat="cat"
			:current-user-id="currentUserId"
			:key="cat.id"
			:is-show-at-profile="isShowAtProfile"
			:is-admin="isAdmin"
		/>
	</div>
</template>

<script>
	export default {
		name: 'CatsBlock',
	};
</script>

<script setup>
	import CatBlock from './CatBlock.vue';

	defineProps({
		data: {
			type: [null, Array],
			required: false,
			default: () => [],
		},
		isShowAtProfile: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		currentUserId: {
			type: [Number, String],
			required: false,
			default: null,
		},
	});
</script>
