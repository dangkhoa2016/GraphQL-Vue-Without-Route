<template>
	<header class="">
		<!-- Fixed navbar -->
		<nav
			id="header-nav"
			class="hide-to-top navbar navbar-expand-md navbar-light fixed-top bg-light"
		>
			<div class="container">
				<a
					class="navbar-brand"
					href="#"
					@click.prevent="handleLinkClick('MainPage')"
				>
					{{ appName }}
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarCollapse"
					aria-controls="navbarCollapse"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarCollapse">
					<ul class="navbar-nav me-auto mb-2 mb-md-0">
						<li
							v-for="(link, index) in navLinks"
							:key="index"
							:class="{ 'nav-item': true, dropdown: link.dropdown }"
						>
							<template v-if="link.dropdown">
								<a
									class="nav-link dropdown-toggle"
									:disabled="link.disabled"
									:class="{
										'text-primary': link.active,
										disabled: link.disabled,
									}"
									href="#"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{{ link.text }}
								</a>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
									<li
										v-for="(subLink, subIndex) in link.subLinks"
										:key="subIndex"
									>
										<a
											class="dropdown-item"
											:class="{
												active: subLink.active,
												disabled: subLink.disabled,
											}"
											@click.prevent="handleLinkClick(subLink.event)"
											:href="subLink.href"
										>
											{{ subLink.text }}
										</a>
									</li>
								</ul>
							</template>
							<a
								v-else
								class="nav-link"
								:class="{
									'text-primary': link.active,
									disabled: link.disabled,
								}"
								@click.prevent="handleLinkClick(link.event)"
								:href="link.href"
							>
								{{ link.text }}
							</a>
						</li>
					</ul>

					<div class="ms-auto d-flex align-items-center">
						<template v-if="isAuthenticated">
							<a
								title="go to your profile"
								href="#"
								@click.prevent="showProfile"
							>
								<strong>{{ authInfo?.user?.name }}</strong>
							</a>
							<a
								class="ms-2 btn btn-outline-danger"
								href="#"
								@click.prevent="logout"
							>
								Sign out
							</a>
						</template>
						<a
							v-else
							class="btn btn-outline-success"
							href="#"
							@click.prevent="handleLinkClick('Login')"
						>
							Sign in
						</a>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
	export default {
		name: 'AppHeader',
	};
</script>

<script setup>
	import { ref, onMounted, onBeforeUnmount, inject } from 'vue';

	import { setPendingLoadUserId } from '/src/stores/usersStore.mjs';

	defineProps({
		appName: {
			type: String,
			required: false,
			default: '',
		},
	});

	const emitter = inject('emitter');
	const authStore = inject('authStore');
	const { useAuthStore, logout } = authStore;
	const { isAuthenticated, authInfo } = useAuthStore();

	const navLinks = ref([
		{ text: 'Home', event: 'MainPage', href: '#' },
		{ text: 'Cats', event: 'CatsList', href: '#' },
		{ text: 'Users', event: 'UsersList', href: '#' },
		{
			text: 'Helps',
			dropdown: true,
			subLinks: [
				{ text: 'FAQs', event: 'FAQs', href: '#' },
				{ text: 'About', event: 'About', href: '#' },
				{ text: 'Contact', event: 'Contact', href: '#' },
			],
		},
		// { text: 'Disabled', disabled: true },
	]);

	const currentComponent = ref('');

	const setTransition = () => {
		emitter.emit('route-transition', 'bounce');
	};

	const showProfile = () => {
		setPendingLoadUserId(authInfo.value?.user?.id);
		emitter.emit('route-transition', 'bounce');
		emitter.emit('show-page', 'UserProfile');
	};

	const handleLinkClick = (page) => {
		currentComponent.value = page;
		setTransition();
		emitter.emit('show-page', page);
	};

	const setActiveLink = (pageName) => {
		navLinks.value.forEach((link) => {
			if (link.event === pageName) {
				link.active = true;
			} else {
				const active = link.subLinks
					?.map((subLink) => {
						subLink.active = subLink.event === pageName;
						return subLink.active;
					})
					.some(Boolean);

				setTimeout(
					() => {
						link.active = active ?? false;
					},
					active ? 100 : 0,
				);
			}
		});
	};

	const handleShowComponent = (component) => {
		if (component === 'CatDetail') component = 'CatsList';
		else if (component === 'UserDetail') component = 'UsersList';
		setActiveLink(component);
	};

	const toggleNav = (action) => {
		document.getElementById('header-nav').classList[action]('slide-from-top');
	};

	onMounted(() => {
		emitter.on('show-page', handleShowComponent);

		setTimeout(() => {
			toggleNav('add');
		}, 300);
	});

	onBeforeUnmount(() => {
		emitter.off('show-page', handleShowComponent);
	});
</script>
