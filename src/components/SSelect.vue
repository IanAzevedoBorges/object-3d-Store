<template>
  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-md">
      <q-select
        filled
        v-model="model"
        :options="options"
        options-cover
        stack-label
        label="Standard"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      model: ref(null),
      options: ["Analisar minha peça para impressão (5 €)", "Não Analizar"],
    };
  },
};
</script>
