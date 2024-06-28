<script setup>
const props = defineProps({
	modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const submitHandler = (event) => {
	event.preventDefault()
	emit('update:modelValue', event.target.value)
}
</script>

<template>
	<form id="search-box" class="search-box">
		<input
			class="input"
			type="text"
			:value="modelValue"
			@input="submitHandler"
			@keydown.enter="submitHandler"
		/>
		<button type="submit">Search</button>
	</form>
</template>

<style lang="scss" scoped>
.search-box {
	.input {
		margin-left: $spacing-16;
		margin-bottom: $spacing-8;
		padding: $spacing-8 $spacing-16;
		min-width: 320px;
	}
}
</style>
