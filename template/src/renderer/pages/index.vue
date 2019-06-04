<template>
    <div>
        <span>HOME</span>
        <img src="~assets/nuxt.jpg"/>
        <span>{{url}}</span>
    </div>
</template>


<script>
    import fs from 'fs';
    import path from 'path';
    const content = fs.readFileSync(path.join(__resources, 'robots.txt'));
    export default {
        data(){
            return{
                url: content
            }
        }
    }
</script>