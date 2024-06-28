<script setup>
import extractKeys from '../../utils/extractKeysFromObject.js'

const props = defineProps({
	tableHeaders: Array,
	sortOrder: String
})

const selectCol = (colIndex) => {
	// const colKeys = () => extractKeys(props.data[colIndex])
}
</script>

<template>
	<div class="header" v-for="col in tableHeaders" @click="selectCol()">
		{{ col.text }}{{ props.sortOrder === 'asc' ? 'up' : 'down' }}
	</div>
</template>

<style lang="scss" scoped>
.header {
	cursor: pointer;
}
</style>
