import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import ProblemSet from '../views/ProblemSet'
import Problem from "../views/Problem";
import User from "../views/User";
import LogoSetting from "../views/me/LogoSetting";
import Favorite from "../views/me/Favorite";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: to => {
            let redirectpath = sessionStorage.getItem("pathBeforeLogin")
            sessionStorage.removeItem("pathBeforeLogin");
            return redirectpath == "/" ? null : redirectpath;
        },
        component: Home
    },
    {//题目列表，跳转到all
        path: '/problemset',//重定向到所有
        redirect: "/problemset/all"
    },
    {//题目列表
        path: '/problemset/:category',
        name: 'ProblemSet',
        component: ProblemSet
    },
    {//题目
        path: '/problem/:problemid',
        name: 'Problem',
        component: Problem
    },
    {//admin
        path: '/u/:username/',
        name: 'User',
        component: User,
        children: [
            {
                path: 'logosetting',
                component: LogoSetting
            },
            {
                path: 'favorite',
                component: Favorite
            },
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
