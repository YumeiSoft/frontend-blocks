import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
		name:"index",
		path: "/",
		component: () => import("../views/Home.vue"),
	}
];

const router = new VueRouter({
	routes,
});

export default router;
