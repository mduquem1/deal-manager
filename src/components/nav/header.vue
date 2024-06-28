<script setup></script>

<template>
	<header class="container">
		<div>Logo</div>
		<nav class="nav-container">
			<router-link class="link" to="/">Home</router-link>
			<router-link class="link" to="/deals">Deals</router-link>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: space-between;
	padding: $spacing-8 $spacing-32;
	color: $color-text-white;
	background-color: $primary-color;

	.nav-container {
		.link {
			padding-right: $spacing-8;
		}
	}
}
</style>
