<script setup>
const props = defineProps({
	modelValue: String,
	disabled: {
		type: Boolean,
		required: false,
		default: false
	}
})
const emit = defineEmits(['update:modelValue'])

const submitHandler = (event) => {
	event.preventDefault()
	emit('update:modelValue', event.target.value)
}

const reset = (event) => {
	event.preventDefault()
	emit('update:modelValue', '')
}
</script>

<template>
	<form id="search-box" class="search-box">
		<input
			class="input"
			type="text"
			placeholder="Search for deals"
			:disabled="disabled"
			:value="modelValue"
			@input="submitHandler"
			@keydown.enter="submitHandler"
		/>
		<button @click="reset" :disabled="!modelValue">X</button>
	</form>
</template>

<style lang="scss" scoped>
.search-box {
	.input {
		margin: 0 $spacing-16 $spacing-8 0;
		padding: $spacing-8 $spacing-16;
		border-radius: $border-radius-4;
		box-shadow: inset $spacing-1 $spacing-1 $spacing-4 rgba(0, 0, 0, 0.2);
		min-height: $spacing-24;

		@media (min-width: $breakpoint-medium) {
			min-width: 320px;
		}
	}
	button {
		margin-right: $spacing-8;
	}
	button,
	.input {
		border: none;
	}
}
</style>
