import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

const Info = () => import("@/views/info/Info.vue");
const About = () => import("@/views/info/About.vue");
const Help = () => import("@/views/info/Help.vue");
const HelpNormal = () => import("@/views/info/HelpNormal.vue");
const HelpImportant = () => import("@/views/info/HelpImportant.vue");
const Thanks = () => import("@/views/info/Thanks.vue");
const Changelog = () => import("@/views/info/Changelog.vue");

const CoOp = () => import("@/views/CoOp.vue");

const Settings = () => import("@/views/settings/Settings.vue");
const SettingsGeneral = () => import("@/views/settings/SettingsGeneral.vue");
const SettingsNormal = () => import("@/views/settings/SettingsNormal.vue");
const SettingsImportant = () => import("@/views/settings/SettingsImportant.vue");
const SettingsKh1 = () => import("@/views/settings/SettingsKh1.vue");

const IconStyles = () => import("@/views/settings/IconStyles.vue");
const EditItem = () => import("@/views/EditItem.vue");

const Remote = () => import("@/views/Remote.vue");

import Reports from "@/views/Reports.vue";
import ItemPopup from "@/views/ItemPopup.vue";

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
      {
        path: "changelog",
        meta: { title: "Changelog" },
        component: Changelog,
      },
    ],
  },
  {
    path: "/changelog",
    meta: { title: "Changelog" },
    component: Changelog,
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
      {
        path: "kh1",
        meta: { title: "KH1 Settings" },
        component: SettingsKh1,
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
  {
    path: "/item_popup/:item(.+)",
    meta: { title: "Select Item" },
    component: ItemPopup,
  },
  {
    path: "/remote/:game/:room",
    name: "remote",
    meta: { title: "Remote View", full: true },
    component: Remote,
  },
  {
    path: "/(.+)",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
