<template>
	<Modal
		ref="modalRef"
		@ok="handleToggleStatus"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		:disable-hide="togglingStatus"
		:disable-ok="togglingStatus"
		:hide-ok="id && toggleStatusResult ? true : false"
	>
		<template v-slot:header>
			<h4 class="modal-title">Confirm {{ action }}</h4>
		</template>

		<p v-if="id && !toggleStatusResult">
			Are you sure you want to {{ action.toLowerCase() }} {{ type }} with ID:
			<strong>{{ id }}</strong>
			?
		</p>
		<p v-if="togglingStatus">Updating...</p>
		<div v-else-if="id && toggleStatusResult">
			Successfully {{ action.toLowerCase() }}d {{ type }} with ID:
			<strong>{{ id }}</strong>
		</div>
	</Modal>
</template>

<script>
	export default {
		name: 'ModalToggleStatus',
	};
</script>

<script setup>
	import { ref, onMounted, watch, onBeforeUnmount, inject } from 'vue';

	import {
		useToggleStatusesStore,
		toggleStatus,
		setErrorTogglingStatus,
		resetToggleStatusResult,
	} from '/src/stores/toggleStatusesStore.mjs';

	import Modal from './Modal.vue';

	const emitter = inject('emitter');
	const authStore = inject('authStore');
	const { useAuthStore, logout } = authStore;
	const { authInfo } = useAuthStore();

	const modalRef = ref(null);
	const type = ref('');
	const id = ref('');
	const action = ref('');
	const { toggleStatusResult, togglingStatus, errorTogglingStatus } =
		useToggleStatusesStore();
	const timeoutClose = ref(null);

	const timeoutRedirect = ref(null);

	const clearTimeoutRedirect = () => {
		if (timeoutRedirect.value) {
			clearTimeout(timeoutRedirect.value);
			timeoutRedirect.value = null;
		}
	};

	const hideModal = () => {
		modalRef.value.modal.hide();
		clearTimeoutRedirect();
	};

	const handleToggleStatus = () => {
		// console.log('handleToggleStatus');
		toggleStatus(
			type.value,
			id.value,
			action.value.toLowerCase() === 'enable',
			authInfo.value?.token,
		).catch((err) => {
			console.log('handleToggleStatus err', err);
		});
	};

	onMounted(() => {
		emitter.on('toggle-status', (data) => {
			// console.log('toggle-status', data);
			if (timeoutClose.value) {
				// console.log('clearTimeout', timeoutClose.value);
				clearTimeout(timeoutClose.value);
				timeoutClose.value = null;
			}

			type.value = data.type;
			id.value = data.id;
			action.value = data.action === 'enable' ? 'Enable' : 'Disable';
			resetToggleStatusResult();
			modalRef.value.modal.show();
		});
	});

	onBeforeUnmount(() => {
		emitter.off('toggle-status');
		clearTimeoutRedirect();
	});

	watch(toggleStatusResult, (val) => {
		if (val?.id) timeoutClose.value = setTimeout(hideModal, 5000);
	});

	watch(
		() => errorTogglingStatus.value,
		(newVal) => {
			if (newVal?.includes('Session was expired')) {
				emitter.emit('toast', {
					title: 'Session Expired',
					message:
						'Please login again.<br>You will be redirected to login page in 10 seconds.',
				});
				timeoutRedirect.value = setTimeout(() => {
					setErrorTogglingStatus(null);
					logout();

					emitter.emit('route-transition', 'bounce');
					emitter.emit('show-page', 'Login');
				}, 10000);
			}
		},
	);
</script>
