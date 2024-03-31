<template>
	<div class="container">
		<h2 class="pb-2 border-bottom">FAQs</h2>

		<div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
			<div class="col" v-for="(card, index) in arrCards" :key="index">
				<div
					class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
					:style="`background-image: url('${card.backgroundImage}');`"
				>
					<div
						class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1"
					>
						<h2 class="pt-5 mt-5 mb-4 fs-2 lh-1 fw-bold" :title="card.title">
							{{ card.title }}
						</h2>
						<ul class="d-flex list-unstyled mt-auto">
							<li class="me-auto">
								<img
									:src="card.avatar"
									:alt="card.title"
									width="32"
									height="32"
									class="rounded-circle border border-white"
								/>
							</li>
							<li class="d-flex align-items-center me-3">
								<svg class="bi me-2" width="1em" height="1em">
									<use xlink:href="#geo-fill"></use>
								</svg>
								<small>{{ card.location }}</small>
							</li>
							<li class="d-flex align-items-center">
								<svg class="bi me-2" width="1em" height="1em">
									<use xlink:href="#calendar3"></use>
								</svg>
								<small>{{ card.daysAgo }}</small>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'FAQs',
	};
</script>

<script setup>
	const arrCards = [
		{
			backgroundImage:
				'https://getbootstrap.com/docs/5.1/examples/features/unsplash-photo-1.jpg',
			title: 'Short title, long jacket',
			avatar: 'https://github.com/twbs.png',
			location: 'Earth',
			daysAgo: '3d',
		},
		{
			backgroundImage:
				'https://getbootstrap.com/docs/5.1/examples/features/unsplash-photo-2.jpg',
			title: 'Much longer title that wraps to multiple lines',
			avatar: 'https://github.com/twbs.png',
			location: 'Pakistan',
			daysAgo: '4d',
		},
		{
			backgroundImage:
				'https://getbootstrap.com/docs/5.1/examples/features/unsplash-photo-3.jpg',
			title: 'Another longer title belongs here',
			avatar: 'https://github.com/twbs.png',
			location: 'California',
			daysAgo: '5d',
		},
	];
</script>
