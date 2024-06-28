import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.vue'
import Deals from '../pages/deals.vue'

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/deals', name: 'deals', component: Deals }
]

const router = createRouter({
	routes,
	history: createWebHistory()
})

export default router
