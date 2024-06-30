import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Search from '../components/table/search.vue'

describe('Search', () => {
	const createWrapper = (props = {}) => {
		return mount(Search, { props })
	}

	// basic HTML is rendered
	it('renders correctly', () => {
		const wrapper = createWrapper()
		expect(wrapper.find('form.search-box').exists()).toBe(true)
		expect(wrapper.find('input[type="text"]').exists()).toBe(true)
		expect(wrapper.find('button').exists()).toBe(true)
	})

	// update on input
	it('emits update:modelValue event on input', async () => {
		const wrapper = createWrapper()
		const input = wrapper.find('input[type="text"]')
		await input.setValue('test search')
		expect(wrapper.emitted('update:modelValue')).toBeTruthy()
		expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test search'])
	})

	// update on keypress.enter
	it('emits update:modelValue event on enter key press', async () => {
		const wrapper = createWrapper()
		const input = wrapper.find('input[type="text"]')
		await input.trigger('keydown.enter')
		expect(wrapper.emitted('update:modelValue')).toBeTruthy()
	})

	// dont' allow search when disabled prop tells us
	it('disables input when disabled prop is true', async () => {
		const wrapper = createWrapper({ disabled: true })
		const input = wrapper.find('input[type="text"]')
		expect(input.element.disabled).toBe(true)
	})

	// reset search test
	it('resets search on button click', async () => {
		const wrapper = createWrapper({ modelValue: 'initial value' })
		await wrapper.find('button').trigger('click')
		expect(wrapper.emitted('update:modelValue')).toBeTruthy()
		expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
	})

	it('disables reset button when modelValue is empty', async () => {
		const wrapper = createWrapper({ modelValue: '' })
		const button = wrapper.find('button')
		expect(button.element.disabled).toBe(true)
	})

	it('enables reset button when modelValue is not empty', async () => {
		const wrapper = createWrapper({ modelValue: 'some value' })
		const button = wrapper.find('button')
		expect(button.element.disabled).toBe(false)
	})
})
