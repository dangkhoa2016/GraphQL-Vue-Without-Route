<template>
	<div :class="wrapperClass">
		<figure
			class="d-flex flex-column rounded alert shadow-sm h-100"
			:class="itemBgClass"
		>
			<a
				data-cropped="true"
				@click.prevent="(ev) => emits('show', ev)"
				:data-pswp-width="image.width"
				:data-pswp-height="image.height"
				:href="image.largeURL"
				class="d-flex"
				rel="noopener noreferrer"
				target="_blank"
			>
				<img
					:src="image.thumbnailURL"
					:alt="image.title"
					class="w-100 card-img-top"
				/>
			</a>
			<div v-if="showDisabled" :class="disabledClass">Disabled</div>

			<PhotoStats
				v-if="showStats"
				:image="image"
				:ref="(el) => emits('add-photo-stats', el)"
				:show-like="!isOwner"
			/>

			<figcaption class="mt-3 card-img-bottom">
				<h2 class="h5 font-weight-bold mb-2 font-italic" :title="image.title">
					{{ image.title }}
				</h2>
				<p
					class="mb-0 text-small text-muted font-italic crop-text-2"
					:title="image.description"
				>
					{{ image.description }}
				</p>
			</figcaption>

			<div v-if="isAdmin" class="d-flex justify-content-center mt-auto">
				<ToggleStatus
					:status="image.status"
					:model-id="image.id"
					model-type="Photo"
				/>
			</div>
		</figure>
	</div>
</template>

<script>
	export default {
		name: 'PhotoBlock',
	};
</script>

<script setup>
	import { computed } from 'vue';

	import { disabledClasses } from '/src/libs/helpers.mjs';

	import ToggleStatus from './ToggleStatus.vue';
	import PhotoStats from './PhotoStats.vue';

	const props = defineProps({
		showStats: {
			type: Boolean,
			default: false,
		},
		itemBgClass: {
			type: String,
			default: '',
		},
		image: {
			type: Object,
			required: true,
			default: () => ({}),
		},
		wrapperClass: {
			type: String,
			default: 'col-xl-3 col-lg-4 col-md-6',
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		currentUserId: {
			type: [String, Number],
			default: null,
		},
	});

	const emits = defineEmits(['show', 'add-photo-stats']);

	const { Photo: disabledClass } = disabledClasses;

	const isOwner = computed(() => {
		return props.image?.user_id?.toString() === props.currentUserId?.toString();
	});

	const showDisabled = computed(() => {
		let result = false;
		if (isOwner.value || props.isAdmin) result = props.image?.status === false;
		return result;
	});
</script>
