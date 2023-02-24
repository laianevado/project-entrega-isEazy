import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMessageStore = defineStore({
  id: 'message',
  state: () => ({
    dataMessages: []
  }),

  actions: {
    // Añadir mensages seran incluidos en el ultimo "bloque" de entrega.
    addNewMessages(newItem: object) {
        let lastIndex = Object.keys(this.dataMessages).length-1;
        this.dataMessages[lastIndex].messages.push(newItem);
    },
    // Devolver mensages por defecto, definiendo como parametro order para indicar si queremos que ordene los datos
    initializeData(data: [], order: boolean){
        this.dataMessages = data;
        return order ? this.orderByAsc() : this.dataMessages;
    },
    // Ordenar los mensajes de estudiante y professor
    orderByAsc(){
        this.dataMessages.forEach((element,index) => {
            this.dataMessages[index].messages = element.messages.sort(function(a,b){
                return new Date(a.date+' '+a.time) - new Date(b.date+' '+b.time);
            });
        });
        return this.dataMessages;
    },
  },
});

