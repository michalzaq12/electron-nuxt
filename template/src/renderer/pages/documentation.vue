<template>
    <div class="documentation__view">
        <div v-show="isLoading" class="loader"></div>
        <webview v-show="!isLoading" ref="webview" src="https://github.com/michalzaq12/electron-nuxt/blob/master/README.md" plugins></webview>
    </div>
</template>

<script>
    export default {
        name: "documentation",
        data(){
            return {
                isLoading: true
            }
        },
        mounted() {
            const webview = this.$refs.webview;
            webview.addEventListener('dom-ready', () => {
                this.isLoading = false;
            }, {once: true});
        }
    }
</script>

<style scoped>
    .documentation__view{
        height: calc(100vh - 80px);
    }

    .documentation__view webview{
        height: 100%;
    }

    .loader {
        position: absolute;
        left: calc(50vw - 50px);
        top: calc(50vh - 50px);
        border: 16px solid #f3f3f3;
        border-top: 16px solid #023037;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        animation: spin 2s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>