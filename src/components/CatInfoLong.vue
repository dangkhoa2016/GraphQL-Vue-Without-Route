<template>
	<ul class="list-group list-group-flush">
		<li
			class="list-group-item d-flex justify-content-between align-items-center"
		>
			<span>
				<svg width="24" height="24"><use xlink:href="#photos"></use></svg>
				Photos
			</span>
			<span
				:class="
					loading
						? 'stats-count m-0 d-inline-block skeleton'
						: 'badge bg-primary rounded-pill'
				"
			>
				{{ loading ? '' : cat?.photos_count || 0 }}
			</span>
		</li>
		<li
			class="list-group-item d-flex justify-content-between align-items-center"
		>
			<span>
				<svg width="24" height="24"><use xlink:href="#coat-color"></use></svg>
				Coat color
			</span>
			<span
				:class="
					loading
						? 'stats-count m-0 d-inline-block skeleton'
						: 'badge bg-primary rounded-pill'
				"
			>
				{{ loading ? '' : cat?.coat_color || '-' }}
			</span>
		</li>
		<li
			class="list-group-item d-flex justify-content-between align-items-center"
		>
			<span>
				<svg width="24" height="24"><use xlink:href="#eye-color"></use></svg>
				Eye color
			</span>
			<span
				:class="
					loading
						? 'stats-count m-0 d-inline-block skeleton'
						: 'badge bg-primary rounded-pill'
				"
			>
				{{ loading ? '' : cat?.eye_color || '-' }}
			</span>
		</li>
		<li
			class="list-group-item d-flex justify-content-between align-items-center"
		>
			<span>
				<svg width="24" height="24"><use xlink:href="#origin"></use></svg>
				Origin
			</span>
			<span
				:class="
					loading
						? 'stats-count m-0 d-inline-block skeleton'
						: 'badge bg-primary rounded-pill'
				"
			>
				{{ loading ? '' : cat?.origin || '-' }}
			</span>
		</li>
		<li
			class="list-group-item d-flex justify-content-between align-items-center"
		>
			<span>
				<svg width="24" height="24"><use xlink:href="#weight"></use></svg>
				Weight
			</span>
			<span
				:class="
					loading
						? 'stats-count m-0 d-inline-block skeleton'
						: 'badge bg-primary rounded-pill'
				"
			>
				{{ loading ? '' : displayDecimal(cat?.weight, 'kg') || '-' }}
			</span>
		</li>
		<li
			class="list-group-item d-flex justify-content-between align-items-center"
		>
			<span>
				<svg width="24" height="24"><use xlink:href="#height"></use></svg>
				Height
			</span>
			<span
				:class="
					loading
						? 'stats-count m-0 d-inline-block skeleton'
						: 'badge bg-primary rounded-pill'
				"
			>
				{{ loading ? '' : displayDecimal(cat?.height, 'cm') || '-' }}
			</span>
		</li>
		<li
			class="list-group-item d-flex justify-content-between align-items-center"
		>
			<span>
				<svg width="24" height="24"><use xlink:href="#gender"></use></svg>
				Gender
			</span>
			<span
				:class="
					loading
						? 'stats-count m-0 d-inline-block skeleton'
						: 'badge bg-primary rounded-pill'
				"
			>
				{{ loading ? '' : cat?.gender || '-' }}
			</span>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'CatInfoLong',
	};
</script>

<script setup>
	defineProps({
		cat: {
			type: Object,
			default: () => ({}),
		},
		loading: {
			type: Boolean,
			default: false,
		},
	});

	const displayDecimal = (value, unit) => {
		if (!value) return 0;

		return `${value.toFixed(2)} ${unit}`;
	};
</script>
