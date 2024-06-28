<script setup>
import { Header, Footer } from './components/nav/index.vue'
</script>

<template>
	<Header />
	<main>
		<router-view />
	</main>
	<Footer />
</template>

<style lang="scss" scoped>
main {
	min-width: 100vw;
}
</style>
