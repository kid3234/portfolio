// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      PUBLICKEY: process.env.PUBLICKEY,
      TEMPLATEID: process.env.TEMPLATEID,
      SERVICEID: process.env.SERVICEID,
    },
  },
});
