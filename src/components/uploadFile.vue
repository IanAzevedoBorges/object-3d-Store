<template>
  <div class="dropzone-container">
    <div
      class="custom-dropzone"
      @dragover.prevent
      @dragenter.prevent
      @drop="handleFileDrop"
    >
      <label class="custom-file-label">
        <input
          type="file"
          ref="fileInput"
          accept=".stl, .obj"
          style="display: none"
          @change="handleFileUpload"
        />
        <img
          src="./exportar.png"
          alt="Descrição da Imagem"
          class="image-upload"
        />
        <button
          @click="openFileInput"
          class="custom-button"
          style="font-family: 'Ebrima', sans-serif"
        >
          Upload STL/OBJ
        </button>
        <div class="text-bottom" style="font-family: 'Ebrima', sans-serif">
          or drop here
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

export default {
  data() {
    return {
      selectedFile: null,
      modelVolume: null,
      filamentLength: null,
    };
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];

      if (file) {
        const fileType = file.name.split(".").pop().toLowerCase();

        if (fileType !== "stl" && fileType !== "obj") {
          alert("Por favor, selecione um arquivo no formato STL ou OBJ.");
        } else {
          this.processUploadedFile(file);
        }
      }
    },
    handleFileDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      const fileType = file.name.split(".").pop().toLowerCase();

      if (fileType !== "stl" && fileType !== "obj") {
        alert("Por favor, selecione um arquivo no formato STL ou OBJ.");
      } else {
        this.processUploadedFile(file);
      }
    },
    processUploadedFile(file) {
      if (file) {
        this.selectedFile = file;

        const loader = new STLLoader();
        loader.load(URL.createObjectURL(file), (geometry) => {
          const volume = this.calculateModelVolume(geometry);
          this.modelVolume = volume;

          // Calcular o comprimento do filamento necessário
          this.calculateFilamentLength(volume);
        });
      }
    },
    calculateFilamentLength(modelVolume) {
      // Taxa de extrusão da impressora em mm³/s

      // Densidade do PLA da Sunlu em g/cm³
      const filamentDensity = 1.27;

      // Percentagem de preenchimento (infill) em decimal (10% = 0.1)
      const infillPercentage = 0.1;

      // Calcula o volume de filamento necessário para o preenchimento (infill)
      const infillVolume = modelVolume * infillPercentage;

      // Calcula o comprimento do filamento necessário em metros
      const filamentLength = infillVolume / (filamentDensity * 1000); // Convertendo cm³ para mm³

      this.filamentLength = filamentLength;
    },
    calculateModelVolume(geometry) {
      // Calcular o volume do modelo usando o objeto geometry
      const bbox = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
      const size = bbox.getSize(new THREE.Vector3());
      const volume = size.x * size.y * size.z;

      return volume;
    },
  },
};
</script>

<style scoped>
.dropzone-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Centraliza verticalmente na tela */
}

.custom-dropzone {
  border: none;
  padding: 150px;
  text-align: center; /* Centraliza o conteúdo horizontalmente */
  cursor: default;
  background-color: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.text-bottom {
  font-weight: bold;
  font-size: 24px;
  color: #54616c;
  margin-bottom: -90px;
}

.custom-button {
  background-color: #ff9600;
  color: #fff;
  padding: 7px 25px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
  font-weight: bold;
  font-size: 24px;
  margin-top: 50px; /* Centraliza horizontalmente o botão e adiciona um espaço entre a imagem e o botão */
}

.custom-button:hover {
  background-color: #e28400;
}

/* Adicione estilos para a imagem se necessário */
.image-upload {
  display: block; /* Para que a imagem fique em uma linha separada */
  margin: 0 auto; /* Centraliza horizontalmente a imagem */
  margin-top: -90px;
  margin-left: 70px;
  margin-right: 70px;
}
</style>
