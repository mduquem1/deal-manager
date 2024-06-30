<script setup>
import { Container } from '../components/ui/index.vue'
</script>

<template>
	<section class="section">
		<Container class="container">
			<h1>Deal Manager v0.0.1</h1>
			<h2>Browse and export the latest deals, updated to the minute</h2>

			<div class="cta">
				<h3>To go to Deal Manager please visit the Deals page</h3>
				<router-link class="cta__link" to="/deals">Go to Available deals</router-link>
			</div>
		</Container>
	</section>
</template>

<style lang="scss" scoped>
.section {
	min-height: calc(100vh - $footer-height - $header-height);

	.container {
		max-width: 668px;
	}

	.cta {
		border: $spacing-1 solid $color-surface-100;
		border-radius: $border-radius-4;
		padding: $spacing-8 $spacing-16;

		&__link {
			display: block;
			color: $color-text-white;
			background-color: $primary-color;
			padding: $spacing-8 $spacing-16;
			margin: $spacing-16 0;
		}
	}
}
</style>
