<template>
    <div class="e-nuxt-container">
        <b-button type="primary">
            asd
        </b-button>
        <b-icon icon="home"></b-icon>
        <!--ONLY FOR TEST PURPOSE-->
            <span id="external-resource">\{{externalContent}}</span>
            <img id="absolute-path-with-resources-const" :src="`file:///${__resources}/electron-nuxt.png`"/>
        <!-- \END -->
        <div class="e-nuxt-content">
            <div class="e-nuxt-logo">
                <img style="max-width: 100%;" src="~assets/electron-nuxt.png"/>
            </div>
            <div class="e-nuxt-system-info">
                <system-information></system-information>
            </div>
        </div>
        <div class="e-nuxt-links">
            <div class="e-nuxt-button" @click="openURL('https://github.com/michalzaq12/electron-nuxt')">
                Github
            </div>
            <div class="e-nuxt-button" @click="openURL('https://nuxtjs.org/guide')">
                Nuxt.js
            </div>
            <div class="e-nuxt-button" @click="openURL('https://electronjs.org/docs')">
                Electron.js
            </div>
        </div>
    </div>
</template>


<script>
    import fs from 'fs';
    import path from 'path';
    import {remote} from 'electron';
    import SystemInformation from '@/components/SystemInformation';

    export default {
        components: {
          SystemInformation
        },
        data(){
            return{
                externalContent: ''
            }
        },
        methods: {
            openURL(url){
                remote.shell.openExternal(url);
            }
        },
        mounted() {
            this.externalContent = fs.readFileSync(path.join(__resources, 'external-file.txt'));
        }
    }
</script>


<style>
    .e-nuxt-container {
        min-height: calc(100vh - 50px);
        background: linear-gradient(to right, #ece9e6, #ffffff);
        font-family: Helvetica, sans-serif;
    }

    .e-nuxt-content {
        display: flex;
        justify-content: space-around;
        padding-top: 100px;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .e-nuxt-logo{
        width: 400px;
    }

    .e-nuxt-system-info {
        padding: 20px;
        border-top: 1px solid #397c6d;
        border-bottom: 1px solid #397c6d;;
    }


    .e-nuxt-links {
        padding: 100px 0;
        display: flex;
        justify-content: center;
    }


    .e-nuxt-button {
        color: #364758;
        padding: 5px 20px;
        border: 1px solid #397c6d;
        margin: 0 20px;
        border-radius: 15px;
        font-size: 1rem;
    }

    .e-nuxt-button:hover{
        cursor: pointer;
        color: white;
        background-color: #397c6d;
    }
</style>