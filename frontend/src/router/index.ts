import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Info from "@/views/Info.vue";
import About from "@/views/About.vue";
import CoOp from "@/views/CoOp.vue";
import Help from "@/views/Help.vue";
import Settings from "@/views/Settings.vue";
import Thanks from "@/views/Thanks.vue";

import HelpNormal from "@/views/HelpNormal.vue";
import HelpImportant from "@/views/HelpImportant.vue";

import SettingsGeneral from "@/views/SettingsGeneral.vue";
import SettingsNormal from "@/views/SettingsNormal.vue";
import SettingsImportant from "@/views/SettingsImportant.vue";

import IconStyles from "@/views/IconStyles.vue";
import EditItem from "@/views/EditItem.vue";

import Reports from "@/views/Reports.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/info",
    meta: { title: "Info" },
    component: Info,
    children: [
      {
        path: "",
        redirect: "about",
      },
      {
        path: "about",
        meta: { title: "About" },
        component: About,
      },
      {
        path: "help",
        meta: { title: "Help" },
        component: Help,
        children: [
          {
            path: "",
            redirect: "normal",
          },
          {
            path: "normal",
            meta: { title: "Help (Normal)" },
            component: HelpNormal,
          },
          {
            path: "important",
            meta: { title: "Help (Important Checks Mode)" },
            component: HelpImportant,
          },
        ],
      },
      {
        path: "thanks",
        meta: { title: "Thanks" },
        component: Thanks,
      },
    ],
  },
  {
    path: "/co-op",
    meta: { title: "Co-Op" },
    component: CoOp,
  },
  {
    path: "/settings",
    meta: { title: "Settings" },
    component: Settings,
    children: [
      {
        path: "",
        redirect: "general",
      },
      {
        path: "general",
        meta: { title: "General Settings" },
        component: SettingsGeneral,
      },
      {
        path: "icons",
        meta: { title: "Icon Styles Settings" },
        component: IconStyles,
      },
      {
        path: "normal",
        meta: { title: "Normal Settings" },
        component: SettingsNormal,
      },
      {
        path: "important",
        meta: { title: "Important Checks Mode Settings" },
        component: SettingsImportant,
      },
    ],
  },
  {
    path: "/item/:file",
    meta: { title: "Edit Item" },
    component: EditItem,
  },
  {
    path: "/reports",
    meta: { title: "Select Report Found" },
    component: Reports,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
