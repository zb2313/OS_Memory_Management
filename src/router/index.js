import Vue from 'vue'
import VueRouter from 'vue-router'
import dynamicAllocation from "@/components/dynamicAllocation"
import pageRequest from "@/components/pageRequest";
Vue.use(VueRouter)

const routes = [
  {
        path: '/pageRequest',
        name: "pageRequest",
        component: pageRequest
     }, {
        path: '/dynamicAllocation',
        name: "dynamicAllocation",
        component: dynamicAllocation
    }]


const router = new VueRouter({
    routes,
    mode: 'hash'
})

export default router
