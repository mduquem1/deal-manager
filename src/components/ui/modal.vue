<template>
	<div class="modal__content">
		<header class="modal__header">
			<slot name="header">Default Header</slot>
		</header>
		<main class="modal__body">
			<slot name="body">Default Body Content</slot>
		</main>
		<footer class="modal__footer">
			<slot name="footer">
				<button class="modal__footer-button" @click="closeModal">X</button>
			</slot>
		</footer>
	</div>
</template>

<script setup>
const emits = defineEmits(['close'])

function closeModal() {
	emits('close', false)
}
</script>

<style lang="scss">
.modal {
	&__content {
		width: 50vw;
		height: calc(100% - $footer-height);
		background: #f0f4f8;
		padding: 20px;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 10;
		border-radius: $border-radius-4;
	}
	&__footer {
		&-button {
			color: $color-text-white;
			background-color: $primary-color !important;
		}
	}
}
</style>
