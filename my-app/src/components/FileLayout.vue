<script setup>
import { CloudArrowDownIcon } from '@heroicons/vue/24/solid';

</script>

<script>
export default {
    name: 'fileLayout',
    props: {
        fileData: { type:Object }
    }
}
</script>
<template>
    <div class="grid grid-cols-6 grid-flow-col gap-5 items-center flex border-y-2" v-if="fileData!=undefined">
        <div class="col-start-1 col-end-7 m-5">        
            <p class="font-bold">
                VERSIÓN {{fileData.version}}
            </p>
            <a class="text-blue-500 font-bold hover:text-blue-400 cursor-pointer"
                :href="fileData.url" 
                :title="'Descargar '+fileData.name+'.'+fileData.extension"
            >
                {{fileData.name}}.{{fileData.extension}}
            </a>
            <p>
                <span class="uppercase">
                    Documento / {{fileData.extension}} ({{fileData.sizeMB}} mb) 
                </span>
                <span>
                    {{fileData.date}} / {{fileData.time}}
                </span>
            </p>
        </div>
        <a class="mt-5 text-blue-500 font-bold hover:text-blue-400 cursor-pointer"
            :href="fileData.url" 
            :title="'Descargar '+fileData.name+'.'+fileData.extension"
        >
            <CloudArrowDownIcon class="h-7 w-7 text-with-600 text-blue-500" aria-hidden="true"/>
        </a>
    </div>
</template>
