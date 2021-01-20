import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import About from "@/views/About.vue";
import CoOp from "@/views/CoOp.vue";
import Help from "@/views/Help.vue";
import Settings from "@/views/Settings.vue";
import Thanks from "@/views/Thanks.vue";

import HelpNormal from "@/views/HelpNormal.vue";
import HelpImportant from "@/views/HelpImportant.vue";

import IconStyles from "@/views/IconStyles.vue";
import EditItem from "@/views/EditItem.vue";

import Reports from "@/views/Reports.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/about",
    name: "About",
    meta: { title: "About" },
    component: About,
  },
  {
    path: "/help",
    name: "Help",
    meta: { title: "Help" },
    component: Help,
    children: [
      {
        path: "",
        redirect: "normal",
      },
      {
        path: "normal",
        component: HelpNormal,
      },
      {
        path: "important",
        component: HelpImportant,
      },
    ],
  },
  {
    path: "/co-op",
    name: "CoOp",
    meta: { title: "Co-Op" },
    component: CoOp,
  },
  {
    path: "/settings/icons",
    name: "Icon Styles",
    meta: { title: "Icon Styles" },
    component: IconStyles,
  },
  {
    path: "/settings",
    name: "Settings",
    meta: { title: "Settings" },
    component: Settings,
  },
  {
    path: "/thanks",
    name: "Thanks",
    meta: { title: "Thanks" },
    component: Thanks,
  },
  {
    path: "/item/:file",
    name: "EditItem",
    meta: { title: "Edit Item" },
    component: EditItem,
  },
  {
    path: "/reports",
    name: "Reports",
    meta: { title: "Select Report Found" },
    component: Reports,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
