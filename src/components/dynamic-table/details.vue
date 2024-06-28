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

<style>
.details-content {
	background: blue;
	padding: 20px;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 10;
}
</style>
