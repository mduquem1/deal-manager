<template>
	<div class="details-content">
		<header class="details-header">
			<slot name="header">Default Header</slot>
		</header>
		<main class="details-body">
			<slot name="body">Default Body Content</slot>
		</main>
		<footer class="details-footer">
			<slot name="footer">
				<button @click="closeDetails">Close</button>
			</slot>
		</footer>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const emits = defineEmits(['close'])

function closeDetails() {
	emits('close', false)
}
</script>

<style lang="scss">
.details-content {
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
</style>
