<template>
    <div>
        <span>HOME22</span>
        <img src="~assets/electron-nuxt.png"/>
        <span>{{externalContent}}</span>
    </div>
</template>


<script>
    import fs from 'fs';
    import path from 'path';

    export default {
        data(){
            return{
                externalContent: ''
            }
        },
        mounted() {
            this.externalContent = fs.readFileSync(path.join(__resources, 'robots.txt'));
        }
    }
</script>