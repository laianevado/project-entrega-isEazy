<script setup>
import ModalMessages from '../components/ModalMessages.vue'
</script>

<script>
export default {
  components: { ModalMessages, },
  name: 'HomeView',
  props: {
  },
  data(){
    return{
      openModal: false,
    }
  },
}
</script>

<template>
  <div>
    <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" 
      title="Añadir nuevo comentario"
      @click="openModal=!openModal"
    >
      Añadir nuevo comentario
    </button>
    <modal-messages
      :openModal="openModal"
      @close="openModal=!openModal"
    />
  </div>
</template>