<template>
	<div class="main-tabs">
		<ul class="nav nav-tabs" role="tablist">
			<li
				v-for="(tab, index) in tabs"
				:key="index"
				class="nav-item"
				role="presentation"
			>
				<button
					role="tab"
					:aria-controls="tab.id"
					:aria-selected="activeTab === tab.id"
					class="nav-link"
					data-bs-toggle="tab"
					:disabled="disabled"
					:class="{ active: activeTab === index }"
					@click="changeTab(index)"
				>
					{{ tab.label }}
				</button>
			</li>
		</ul>

		<div class="pt-3">
			<transition :duration="600" name="fade-slide-up" mode="out-in">
				<slot :name="tabs[activeTab].id"></slot>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SimpleTabs',
	};
</script>

<script setup>
	import { ref } from 'vue';

	// Define props
	defineProps({
		tabs: {
			type: Array,
			required: true,
			default: () => [],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	});

	// Define emits
	const emits = defineEmits(['tab-change']);

	// Reactive data
	const activeTab = ref(0);

	// Methods
	const changeTab = (index) => {
		activeTab.value = index;
		emits('tab-change', index);
	};
</script>
