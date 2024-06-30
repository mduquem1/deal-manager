import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TableHeader from '../components/table/headers.vue'
import { SORT_ORDER } from '../constants/index'

describe('TableHeader', () => {
	const defaultProps = {
		tableHeaders: [
			{ text: 'Name', value: 'name' },
			{ text: 'Age', value: 'age' }
		],
		sortOrder: SORT_ORDER.ASC,
		sortBy: 'name',
		allRowsSelected: false,
		selectCol: vi.fn()
	}

	it('renders correctly', () => {
		const wrapper = mount(TableHeader, { props: defaultProps })
		expect(wrapper.find('thead').exists()).toBe(true)
		expect(wrapper.findAll('th')).toHaveLength(3)
	})

	// emits
	it('emits toggleSelectAllHandler when checkbox is clicked', async () => {
		const wrapper = mount(TableHeader, { props: defaultProps })
		await wrapper.find('input[type="checkbox"]').trigger('change')
		expect(wrapper.emitted('toggleSelectAllHandler')).toBeTruthy()
	})

	it('emits selectColHandler with correct index when header is clicked', async () => {
		const wrapper = mount(TableHeader, { props: defaultProps })
		await wrapper.findAll('th').at(1).trigger('click')
		expect(wrapper.emitted('selectColHandler')).toBeTruthy()
		expect(wrapper.emitted('selectColHandler')[0]).toEqual([0])
	})

	// sort icon is visible with default "non-rotate" for asc
	it('displays sort indicator for the sorted column', () => {
		const wrapper = mount(TableHeader, { props: defaultProps })
		expect(wrapper.find('.sort-indicator').exists()).toBe(true)
		expect(wrapper.find('.sort-indicator').classes()).not.toContain('rotate')
	})

	// sort icon is not visible with "rotate" css class
	it('rotates sort indicator for the sorted column', () => {
		const props = { ...defaultProps, sortOrder: SORT_ORDER.DESC }
		const wrapper = mount(TableHeader, { props })
		expect(wrapper.find('.sort-indicator').classes()).toContain('rotate')
	})

	// all rows checkbox
	it('checkbox is checked when allRowsSelected is true', () => {
		const props = { ...defaultProps, allRowsSelected: true }
		const wrapper = mount(TableHeader, { props })
		expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(true)
	})
})
