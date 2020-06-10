<template>
  <div class="home">
    <h2>
      LISTA DE CLIENTES
    </h2>
    <div
      class="clientes"
      v-for="(cliente, index) in clientes"
      :key="cliente.id"
    >
      <p>ID: {{ cliente.id }}</p>
      <p>NOMBRE: {{ cliente.nombre }}</p>
      <p>APELLIDO: {{ cliente.apellido }}</p>
      <p>CIUDAD: {{ cliente.ciudad }}</p>
      <p>EMPRESA: {{ cliente.empresa }}</p>
      <button @click="deleteClients(index)">
        BORRAR
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      clientes: [],
    };
  },
  methods: {
    getClients() {
      var self = this;
      axios
        .get("http://localhost:3050/clientes")
        .then(function(response) {
          console.log(response);
          self.clientes = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteClients(index) {
      this.id = this.clientes[index].id;

      axios
        .delete("http://localhost:3050/clientes/del/" + this.id, {
          id: this.id,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getClients();
  },
};
</script>
