<template>
	<div class="col-md-8">
		<div class="card mb-3">
			<div class="card-body">
				<div v-for="(attr, index) in detailRowFields" :key="index">
					<hr v-if="index > 0" />

					<div class="row align-items-center">
						<div class="col-sm-3">
							<h6 class="mb-0">{{ attr.text }}</h6>
						</div>
						<div class="col-sm-9 text-secondary">
							<div :class="{ 'skeleton w-100 profile-job': loading }">
								{{ loading ? '' : getFieldValue(attr.field) }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<ul class="list-group list-group-flush">
			<li
				class="ps-0 pe-0 list-group-item d-flex justify-content-between align-items-center flex-wrap"
			>
				<h6 class="mb-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-globe mr-2 icon-inline"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="2" y1="12" x2="22" y2="12"></line>
						<path
							d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
						></path>
					</svg>
					Website
				</h6>
				<span
					class="text-secondary"
					:class="{ 'profile-job skeleton m-0': loading }"
				>
					{{ loading ? '' : user?.website_url }}
				</span>
			</li>
			<li
				class="ps-0 pe-0 list-group-item d-flex justify-content-between align-items-center flex-wrap"
			>
				<h6 class="mb-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-github mr-2 icon-inline"
					>
						<path
							d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
						></path>
					</svg>
					Github
				</h6>
				<span
					class="text-secondary"
					:class="{ 'profile-job skeleton m-0': loading }"
				>
					{{ loading ? '' : user?.github_url }}
				</span>
			</li>
			<li
				class="ps-0 pe-0 list-group-item d-flex justify-content-between align-items-center flex-wrap"
			>
				<h6 class="mb-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-twitter mr-2 icon-inline text-info"
					>
						<path
							d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
						></path>
					</svg>
					Twitter
				</h6>
				<span
					class="text-secondary"
					:class="{ 'profile-job skeleton m-0': loading }"
				>
					{{ loading ? '' : user?.twitter_url }}
				</span>
			</li>
			<li
				class="ps-0 pe-0 list-group-item d-flex justify-content-between align-items-center flex-wrap"
			>
				<h6 class="mb-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-instagram mr-2 icon-inline text-danger"
					>
						<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
						<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
						<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
					</svg>
					Instagram
				</h6>
				<span
					class="text-secondary"
					:class="{ 'profile-job skeleton m-0': loading }"
				>
					{{ loading ? '' : user?.instagram_url }}
				</span>
			</li>
			<li
				class="ps-0 pe-0 list-group-item d-flex justify-content-between align-items-center flex-wrap"
			>
				<h6 class="mb-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-facebook mr-2 icon-inline text-primary"
					>
						<path
							d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
						></path>
					</svg>
					Facebook
				</h6>
				<span
					class="text-secondary"
					:class="{ 'profile-job skeleton m-0': loading }"
				>
					{{ loading ? '' : user?.facebook_url }}
				</span>
			</li>
			<li
				class="ps-0 pe-0 list-group-item d-flex justify-content-between align-items-center flex-wrap"
			>
				<h6 class="mb-0">
					<svg
						viewBox="0 0 24 24"
						width="24"
						height="24"
						stroke="currentColor"
						stroke-width="2"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="css-i6dzq1"
					>
						<path
							d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
						></path>
						<rect x="2" y="9" width="4" height="12"></rect>
						<circle cx="4" cy="4" r="2"></circle>
					</svg>
					Linkedin
				</h6>
				<span
					class="text-secondary"
					:class="{ 'profile-job skeleton m-0': loading }"
				>
					{{ loading ? '' : user?.linkedin_url }}
				</span>
			</li>
			<li
				class="ps-0 pe-0 list-group-item d-flex justify-content-between align-items-center flex-wrap"
			>
				<h6 class="mb-0">
					<svg viewBox="0 0 24 24" fill="red" width="24" height="24">
						<use xlink:href="#pinterest"></use>
					</svg>
					Pinterest
				</h6>
				<span
					class="text-secondary"
					:class="{ 'profile-job skeleton m-0': loading }"
				>
					{{ loading ? '' : user?.pinterest_url }}
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'UserRightPanel',
	};
</script>

<script setup>
	import { formatDateTime } from '/src/libs/dateTimeHelpers.mjs';

	const props = defineProps({
		user: {
			type: Object,
			default: () => ({}),
		},
		loading: Boolean,
	});

	const detailRowFields = [
		{
			text: 'Email',
			field: 'email',
		},
		{
			text: 'Phone',
			field: 'phone_number',
		},
		{
			text: 'Location',
			field: 'location',
		},
		{
			text: 'Country',
			field: 'country',
		},
		{
			text: 'Gender',
			field: 'gender',
		},
		{
			text: 'Joined on',
			field: 'created_at',
		},
	];

	const getFieldValue = (field) => {
		const value = props.user?.[field];
		if (!value) {
			return '';
		}

		if (field === 'created_at') return formatDateTime(value);
		else return value;
	};
</script>
