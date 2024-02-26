<template>
	<div class="mt-3">
		<div class="row text-center mx-0">
			<div
				class="col-4 py-3 rounded-start text-white"
				style="background: var(--bs-purple)"
				:class="{ skeleton: loading }"
			>
				<h6 class="stats-count">
					{{ loading ? '' : user?.cats_count || 0 }}
				</h6>
				<div>Cats</div>
			</div>
			<div
				class="col-4 py-3 text-white"
				:class="loading ? 'skeleton' : 'bg-success'"
			>
				<h6 class="stats-count">
					{{ loading ? '' : user?.followers_count || 0 }}
				</h6>
				<div>Followers</div>
			</div>
			<div
				class="col-4 py-3 rounded-end text-white"
				style="background: var(--bs-purple)"
				:class="{ skeleton: loading }"
			>
				<h6 class="stats-count">
					{{ loading ? '' : user?.likes_count || 0 }}
				</h6>
				<div>Likes</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserSummaryStats',
	};
</script>

<script setup>
	defineProps({
		user: {
			type: Object,
			default: () => ({}),
		},
		loading: {
			type: Boolean,
			default: false,
		},
	});
</script>
