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
{
    path: "/signin",
    name: "signin",
    component: () => import("../views/signin.vue"),
    },
{
    path: "/signup",
    name: "signup",
    component: () => import("../views/signup.vue"),
    },
]
const router = new VueRouter({
mode:'hash',
routes,
})
export default router;
