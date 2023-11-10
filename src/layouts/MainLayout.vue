<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header-style"> </q-header>

    <q-page-container :style="{ transition: 'none' }">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  // ... (outras entradas de links)
];

export default defineComponent({
  name: "MainLayout",

  components: {
    // EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(true);

    return {
      //EssentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped>
.header-style {
  box-shadow: none;
  border-bottom: 1px solid whitesmoke;
}

.q-row {
  display: flex;
  align-items: center; /* Centralizar verticalmente */
  height: 100%; /* Garantir que a linha ocupe toda a altura do cabeçalho */
}

.q-col {
  display: flex;
  align-items: flex-start; /* Alinhar à esquerda */
  justify-content: center; /* Centralizar horizontalmente */
  height: 100%; /* Garantir que a coluna ocupe toda a altura do cabeçalho */
}

.button-signin {
  background-color: #ffc720;
  border: none;
  border-radius: 100px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.small-button {
  background: transparent;
  border: none;
  color: #53616c;
  font-weight: bold;
  cursor: pointer;
  font-size: 10pt;
  outline: none;
}

.button-signin:hover {
  background-color: #eeb200;
}
</style>
