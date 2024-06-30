<script setup></script>

<template>
	<header class="container">
		<router-link class="link" to="/">Logo</router-link>
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
	height: $header-height;

	.link {
		padding-right: $spacing-8;
		color: $color-text-white;
	}
}
</style>
