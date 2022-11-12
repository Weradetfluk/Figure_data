import { createWebHistory, createRouter } from "vue-router";
import figure_list_component from "@/components/figure_list.vue";
import figure_add_component from "@/components/add_figure.vue";
import figure_update_component from "@/components/update_figure.vue";


const routes = [
  {
    path: "/home",
    name: "figure_list_component",
    component: figure_list_component,
  },
  {
    path: "/add_data",
    name: "figure_add_component",
    component: figure_add_component,
  },
  {
    path: "/update_data",
    name: "figure_update_component",
    component: figure_update_component,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;