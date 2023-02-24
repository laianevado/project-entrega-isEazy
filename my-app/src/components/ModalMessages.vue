<script setup>
import FileLayout from '../components/FileLayout.vue';
import {useMessageStore} from '../storages/messages'

import { XMarkIcon } from '@heroicons/vue/24/outline';
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid';
</script>

<script>
export default {
  name: 'modalMessages',
  components: { FileLayout, },
  props: {
    openModal: { type:Boolean, default:false },
  },
  data() {
    return {
      messageStore: useMessageStore(),
      typeTeacher: 'teacher',
      typeStudent: 'student',
      message: '',
      dataMessageDefault: [
        {
          file: {
            version: '1',
            date: '2022/10/20',
            time: '22:20',
            name: 'fichero numero 1 entrega incialmente', 
            extension: 'pdf', 
            sizeMB: '4.3',
            url: '',
          },
          messages: [
            {
              type: 'student',
              text: 'Mensaje Estudiante',
              date: '2022/10/29',
              time: '22:30'

            },
            {
              type: 'teacher',
              text: '¡Gran trabajo Silvia! Pero creo que deberías revisar el punto 3. Intenta añadir un poco más de texto y un apartado final de conclusiones personales.',
              date: '2022/10/21',
              time: '20:30'
            }
          ]
        },
        {
          file: {
            version: '2',
            date: '2022/11/30',
            time: '15:00',
            name: 'file-2', 
            extension: 'docx', 
            sizeMB: '5',
            url: '',
          },
          messages: [
            {
              type: 'student',
              text: 'Listo profe subido!!',
              date: '2022/11/30',
              time: '15:00'

            },
            {
              type: 'teacher',
              text: 'Te falta mandarme los cambios',
              date: '2022/11/30',
              time: '13:30'
            },
            {
              type: 'teacher',
              text: 'Perfecto, lo reviso y te doy feedback',
              date: '2022/11/30',
              time: '20:10'
            }
          ]
        },
        {
          file:{
            version: '3',
            date: '2022/12/01',
            time: '10:20',
            name: 'fichero numero 3 entrega tras feedback', 
            extension: 'pdf', 
            sizeMB: '5.3',
            url: '',
          },
          messages:[
            {
              type: 'teacher',
              text: 'Perfecto!',
              date: '2023/12/02',
              time: '13:30'
            },
            {
              type: 'student',
              text: 'Mesage estudiante 2n bloque',
              date: '2022/12/01',
              time: '10:30'

            },
            {
              type: 'teacher',
              text: 'Perfecto, gran trabajo.',
              date: '2022/12/02',
              time: '13:30'
            }
          ]
        }
      ],
    }
  },
  mounted(){
    this.scrollTop();
  },
  methods:{
    closeModal(event){
      this.$emit('close',event);
    },
    // Mensajes dynamicos añadidos por parte del estudiante, seran añadidos cuando el usuario le de a enviar
    // guardado en el messageStore
    addMessage(){
      if(this.message != ''){
        let nowDate = new Date();
        // Formatear hora
        let timeFormat = nowDate.toLocaleString(undefined,{hour: '2-digit', hour12: false, minute:'2-digit'}); 
        let newMessage = {
          type: this.typeStudent,
          text: this.message,
          date: this.formatDate(),
          time: timeFormat
        }
        this.messageStore.addNewMessages(newMessage)
        this.message = ''; // reset input message

        this.scrollTop();
      }
    },
    // Forzar posicion scroll
    scrollTop(){
      setTimeout(() => {
        let objDiv = document.getElementById("conainerSectionMessages");
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 1);
    },
    // Formato fechas (que se devuelve en los ficheros y mensajes)
    formatDate(value=''){
      let valueDate = value != '' ? new Date(value) : new Date();
        let split = valueDate.toLocaleString(undefined, {year: 'numeric', month: 'long', day: 'numeric'}).split(' de ');
        return split[0]+' '+ split[1].substr(0,3) +' '+ split[2];
    },
    
  },
  computed: {
    dataMessageOrder() {
      return this.messageStore.initializeData(this.dataMessageDefault,true)
    }
  },
  watch:{
    openModal(value){
      if(value){
        // formatear fechas de ficheros
        this.dataMessageDefault.forEach(element => {
          if(new Date(element.file.date).toString() !== 'Invalid Date'){
            element.file.date = this.formatDate(element.file.date)
          }
        });

        this.scrollTop();
      }else{
        this.message = ''; // Resetear input mensage tras cerrarse modal
      }
    }
  }
}
</script>

<template>

<div v-show="openModal" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div class="modal-container bg-white sm:my-8 sm:w-full sm:max-w-3xl rounded rounded-lg">
      <!-- Header -->
      <div class="w-full inline-flex items-center px-3 sm:px-6.5 border-b-2 border-b-black">
        <div class="text-center w-full">
          <p class="text-sm leading-6 text-gray-900 font-bold sm:justify-center">Comentarios</p>
        </div>
        <div>
          <button type="button" class="p-3 focus-visible:outline-offset-[-4px]"
            @click="$emit('close')" title="cerrar"
          >
            <XMarkIcon class="h-5 w-5 text-blue-500 hover:text-blue-400" aria-hidden="true" />
          </button>

        </div>
      </div>
      <!--Body-->
      <div id="conainerSectionMessages" 
        class="body-section px-4 pt-5 pb-4 sm:p-6 sm:pb-4" 
        style="overflow: scroll; max-height: 300px;"
      >
        <div v-for="(data,index) in dataMessageOrder" :key="index">
          
          <file-layout
            :fileData="data.file"
          />
          <div v-for="(message,indexMessage) in data.messages" :key="indexMessage" 
            class="my-5 grid container-messages" v-bind:class="{'lastMessage':data.messages.length-1 == indexMessage && messageStore.dataMessages.length-1 == index}"
          >
          <div class="group flex items-center" v-bind:class="{'flex-row-reverse':message.type==typeStudent}">
            <img class="shrink-0 h-12 w-12 rounded-full" :src="message.type==typeStudent ? 'https://tailwindcss.com/_next/static/media/madeline-campbell.a921c78c.jpg' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'" alt="">
            <div class="p-5 max-w-lg text-left" 
              v-bind:class="{'bg-blue-500 text-white mr-3':message.type==typeStudent,'bg-gray-100 text-gray-900 ml-3':message.type==typeTeacher}"
            >
              <div v-if="message.type==typeTeacher" class="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-gray-100"></div>
              <div v-else class="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-blue-500"></div>
              <span>{{message.text}}</span>
              <br>
              <span class="text-xs pt-1">
                {{formatDate(message.date)}} / {{message.time}}
              </span>
            </div>
          </div>
          </div>
        </div>
      </div>
      <!--Footer-->
      <div class="px-4 py-3 sm:px-6 sm:py-6 border-t-2">
        <div class="grid grid-cols-6 grid-flow-col gap-5">
          <div class="col-start-1 col-end-7">        
            <input v-model="message" 
              class="w-full p-2 rounded-full border-2 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
              type="text" 
            >
          </div>
          <div>
            <button class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white sm:mx-0 sm:h-10 sm:w-10 bg-blue-500 hover:bg-blue-400"
              @click="addMessage()" title="Enviar mensage"
            >
              <PaperAirplaneIcon class="h-6 w-6 text-with-600" aria-hidden="true"/>
          </button>
          </div>
        </div>
      </div>
    
    </div>
  </div>
</template>