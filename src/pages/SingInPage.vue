<template>
  <div class="login-container">
    <div class="login-box">
      <h2>{{ isRegistering ? "Registrar" : "Login" }}</h2>
      <form @submit.prevent="isRegistering ? registerUser() : login()">
        <div class="form-group">
          <label for="username">Nome de Usuário:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" />
          <p v-if="isRegistering && passwordFeedback">{{ passwordFeedback }}</p>
        </div>
        <button class="login-button" type="submit">
          {{ isRegistering ? "Cadastrar" : "Entrar" }}
        </button>
        <br /><br />
      </form>
      <button @click="toggleRegisterMode">
        {{
          isRegistering
            ? "Já possui uma conta? Faça login"
            : "Ainda não possui uma conta? Registre-se"
        }}
      </button>
    </div>
  </div>
</template>

<script>
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

export default {
  data() {
    return {
      isRegistering: false,
      username: "",
      password: "",
      passwordFeedback: null,
    };
  },
  methods: {
    async registerUser() {
      if (this.isWeakPassword()) {
        this.passwordFeedback = "A senha deve conter pelo menos 8 caracteres.";
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.username,
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
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.username,
          this.password
        );
        // Autenticação bem-sucedida
        const user = userCredential.user;
        console.log("Usuário autenticado:", user);
        // Redirecionar para a página protegida
        this.$router.push("/pagina-protegida");
      } catch (error) {
        console.error("Erro na autenticação:", error);
        // Autenticação falhou, exiba uma mensagem de erro.
        alert("Usuário ou senha incorretos.");
      }
    },
    toggleRegisterMode() {
      this.isRegistering = !this.isRegistering;
    },
    isWeakPassword() {
      // Adicione suas próprias verificações de senha aqui
      // Neste exemplo, estamos verificando se a senha tem pelo menos 8 caracteres
      return this.password.length < 8;
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-box {
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  width: 500px; /* Largura personalizada */
  /* Adicione outras propriedades de estilo, conforme necessário */
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  background-color: #ff9600;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #e28400;
}
</style>
