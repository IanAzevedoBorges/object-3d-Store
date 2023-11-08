<template>
  <div>
    <h2>Registrar</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase"; // Verifique o caminho correto para o seu arquivo firebase.js

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        // Registro bem-sucedido
        const user = userCredential.user;
        console.log("Usuário registrado:", user);
        // Redirecionar o usuário para a página de perfil ou outra página desejada
      } catch (error) {
        console.error("Erro no registro:", error);
      }
    },
  },
};
</script>
