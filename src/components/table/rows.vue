<script setup>
const props = defineProps({
	data: Array
})

const emit = defineEmits(['selectRowHandler', 'isSelectedRowHandler'])

const selectRowHandler = (index) => {
	emit('selectRowHandler', index)
}

const isSelected = (index) => {
	emit('isSelectedRowHandler', index)
}
</script>

<template>
	<tbody>
		<slot></slot>
	</tbody>
</template>

<style lang="scss" scoped>
input[type='checkbox'] {
	cursor: pointer;
}
</style>
