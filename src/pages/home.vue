<script setup>
import { Container } from '../components/ui/index.vue'
</script>

<template>
	<section class="container">
		<Container>
			<h1>Deal Manager v0.0.1</h1>

			<div class="cta">
				<router-link to="/deals">Go to Available deals</router-link>
			</div>
		</Container>
	</section>
</template>

<style lang="scss" scoped>
.container {
	min-height: 100%;
}
</style>
