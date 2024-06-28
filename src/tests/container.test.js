import { mount } from '@vue/test-utils'
import { Container } from '../components/ui/index.vue'

describe('container.vue', () => {
	it('displays 1 child element', () => {
		const wrapper = mount(Container, {
			slots: { default: `<h1>Hello world</h1>` }
		})

		console.log('wrapper', wrapper.html())

		expect(wrapper.html()).toContain('Hello world')
	})

	it('', () => {
		const wrapper = mount(Container, {
			slots: {
				default: ['<p>First Paragraph</p>', '<div>Second Element</div>']
			}
		})
		expect(wrapper.html()).toContain('<p>First Paragraph</p>')
		expect(wrapper.html()).toContain('<div>Second Element</div>')
	})
})
