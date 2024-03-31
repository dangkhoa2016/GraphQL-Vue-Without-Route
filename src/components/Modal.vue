<template>
	<Teleport to="#modals">
		<div
			:id="computedId"
			ref="modalRef"
			class="modal"
			:class="modalClasses"
			role="dialog"
			:aria-labelledby="`${computedId}-label`"
			:aria-describedby="`${computedId}-body`"
			tabindex="-1"
			v-bind="$attrs"
		>
			<div class="modal-dialog" :class="modalDialogClasses">
				<div class="modal-content" :class="contentClass">
					<div
						v-if="!hideHeaderBoolean"
						class="modal-header"
						:class="headerClasses"
					>
						<slot name="header">
							<h1
								:id="`${computedId}-label`"
								class="modal-title fs-5"
								:class="titleClasses"
							>
								<slot name="title">
									{{ title }}
								</slot>
							</h1>
							<button
								type="button"
								class="btn-close"
								title="Close"
								:disabled="disableHide"
								@click="cancelHandle"
								aria-label="Close"
							></button>
						</slot>
					</div>
					<div
						:id="`${computedId}-body`"
						class="modal-body"
						:class="bodyClasses"
					>
						<slot />
					</div>
					<div
						v-if="!hideFooterBoolean"
						class="modal-footer"
						:class="footerClasses"
					>
						<slot name="footer">
							<slot name="cancel">
								<button
									v-if="!hideCancel"
									type="button"
									class="btn"
									:class="cancelBtnClass"
									:disabled="disableHide"
									@click="cancelHandle"
								>
									{{ cancelTitle }}
								</button>
							</slot>
							<slot name="ok">
								<button
									v-if="!hideOk"
									type="button"
									class="btn"
									:class="okBtnClass"
									:disabled="disableOk"
									@click="okHandle"
								>
									{{ okTitle }}
								</button>
							</slot>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script>
	import { Modal } from 'bootstrap';

	const validateColor = (color) => {
		return [
			'',
			'danger',
			'success',
			'primary',
			'warning',
			'info',
			'light',
			'dark',
		].includes(color);
	};

	export default {
		props: {
			title: {
				type: String,
				default: 'Title',
			},
			okTitle: {
				type: String,
				default: 'Save',
			},
			cancelTitle: {
				type: String,
				default: 'Close',
			},
			hideCancel: {
				type: Boolean,
				default: false,
			},
			hideOk: {
				type: Boolean,
				default: false,
			},
			disableHide: {
				type: Boolean,
				default: false,
			},
			disableOk: {
				type: Boolean,
				default: false,
			},
			hideHeaderBoolean: {
				type: Boolean,
				default: false,
			},
			hideFooterBoolean: {
				type: Boolean,
				default: false,
			},
			fade: {
				type: Boolean,
				default: true,
			},
			modalDialogFullscreen: {
				type: Boolean,
				default: false,
			},
			modalDialogCentered: {
				type: Boolean,
				default: false,
			},
			modalDialogScrollable: {
				type: Boolean,
				default: false,
			},
			modalClass: {
				type: String,
				default: 'fade',
			},
			dialogClass: {
				type: String,
				default: '',
			},
			bodyClass: {
				type: String,
				default: '',
			},
			headerClass: {
				type: String,
				default: '',
			},
			footerClass: {
				type: String,
				default: '',
			},
			modalDialogSize: {
				type: String,
				default: 'md',
				validator: (prop) =>
					['', 'sm', 'md', 'lg', 'xl', 'fullscreen'].includes(prop),
			},
			bodyBgVariant: {
				type: String,
				default: '',
				validator: validateColor,
			},
			bodyTextVariant: {
				type: String,
				default: '',
				validator: validateColor,
			},
			bodyBorderVariant: {
				type: String,
				default: '',
				validator: validateColor,
			},
			headerBgVariant: {
				type: String,
				default: '',
				validator: validateColor,
			},
			headerTextVariant: {
				type: String,
				default: '',
				validator: validateColor,
			},
			headerBorderVariant: {
				type: String,
				default: '',
				validator: validateColor,
			},
			footerBgVariant: {
				type: String,
				default: '',
				validator: validateColor,
			},
			footerTextVariant: {
				type: String,
				default: '',
				validator: validateColor,
			},
			footerBorderVariant: {
				type: String,
				default: '',
				validator: validateColor,
			},
			titleClass: {
				type: String,
				default: '',
			},
			cancelBtnClass: {
				type: String,
				default: 'btn-secondary',
			},
			okBtnClass: {
				type: String,
				default: 'btn-primary',
			},
			contentClass: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				modal: null,
			};
		},
		computed: {
			computedId() {
				return `__KSID__${Math.random().toString().slice(2, 8)}___KS_`;
			},
			modalClasses() {
				return [
					this.modalClass,
					{
						fade: this.fade,
					},
				];
			},
			modalDialogClasses() {
				return [
					this.dialogClass,
					{
						'modal-fullscreen': this.modalDialogFullscreen,
						[`modal-fullscreen-${this.modalDialogSize}-down`]:
							this.modalDialogFullscreen && this.modalDialogSize !== undefined,
						[`modal-${this.modalDialogSize}`]:
							this.modalDialogSize !== undefined,
						'modal-dialog-centered': this.modalDialogCentered,
						'modal-dialog-scrollable': this.modalDialogScrollable,
					},
				];
			},
			bodyClasses() {
				return [
					this.bodyClass,
					{
						[`bg-${this.bodyBgVariant}`]: this.bodyBgVariant !== undefined,
						[`border-${this.bodyBorderVariant}`]:
							this.bodyBorderVariant !== undefined,
						[`text-${this.bodyTextVariant}`]:
							this.bodyTextVariant !== undefined,
					},
				];
			},
			headerClasses() {
				return [
					this.headerClass,
					{
						[`bg-${this.headerBgVariant}`]: this.headerBgVariant !== undefined,
						[`border-${this.headerBorderVariant}`]:
							this.headerBorderVariant !== undefined,
						[`text-${this.headerTextVariant}`]:
							this.headerTextVariant !== undefined,
					},
				];
			},
			footerClasses() {
				return [
					this.footerClass,
					{
						[`bg-${this.footerBgVariant}`]: this.footerBgVariant !== undefined,
						[`border-${this.footerBorderVariant}`]:
							this.footerBorderVariant !== undefined,
						[`text-${this.footerTextVariant}`]:
							this.footerTextVariant !== undefined,
					},
				];
			},
			titleClasses() {
				return [
					this.titleClass,
					{
						// ['visually-hidden']: titleSrOnlyBoolean.value,
					},
				];
			},
		},
		watch: {},
		emits: ['ok'],
		methods: {
			onShow() {
				// Handle show event
			},
			onHide() {
				// Handle hide event
			},
			hideModal() {
				if (this.modal) this.modal.hide();
			},
			cancelHandle() {
				if (this.disableHide) return;
				this.hideModal();
			},
			okHandle() {
				this.$emit('ok');
			},
		},
		mounted() {
			const modalRef = this.$refs.modalRef;
			// console.log('modalRef', modalRef);
			this.modal = new Modal(modalRef);
			modalRef.addEventListener('show.bs.modal', this.onShow);
			modalRef.addEventListener('hide.bs.modal', this.onHide);
		},
		beforeUnmount() {
			const modalRef = this.$refs.modalRef;
			modalRef.removeEventListener('show.bs.modal', this.onShow);
			modalRef.removeEventListener('hide.bs.modal', this.onHide);
		},
		expose: ['modal'],
		name: 'Modal',
	};
</script>
