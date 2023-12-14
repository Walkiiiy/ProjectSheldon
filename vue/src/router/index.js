import VueRouter from 'vue-router';
const routes = [
{
path: "/",
name: "home",
component: () => import("../views/home.vue"),
},
{
    path: "/write",
    name: "write",
    component: () => import("../views/write.vue"),
    },
{
    path: "/community",
    name: "community",
    component: () => import("../views/community.vue"),
    },
]
const router = new VueRouter({
mode:'hash',
routes,
})
export default router;
