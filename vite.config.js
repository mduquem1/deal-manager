import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	// scss config
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "./src/assets/styles/variables.scss";'
			}
		}
	},
	test: {
		globals: true,
		environment: 'jsdom'
	}
})
