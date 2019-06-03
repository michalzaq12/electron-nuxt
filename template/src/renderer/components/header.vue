<template>
    <header class="main-header">
        <nav>
            <div><nuxt-link to="/" exact>Home</nuxt-link></div>
            <div><nuxt-link to="/topics">Topics</nuxt-link></div>
            <div><nuxt-link to="/counter">Counter</nuxt-link></div>
            <div><nuxt-link to="/documentation">Documentation</nuxt-link></div>
        </nav>
    </header>
</template>


<script>
    export default {

    }
</script>

<style scoped>
    .main-header {
        height: 80px;
        display: flex;
        background-color: rgba(95, 158, 160, 0.9);
    }

    nav{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    nav div{
        height: 100%;
        margin: 0 20px;
        display: flex;
        align-items: center;
    }

    a {
        font-family: Helvetica, sans-serif;
        color: white;
        font-size: 1.2rem;
        font-weight: 100;
        text-decoration: none;
        text-transform: uppercase;
    }

    a:hover{
        text-decoration: underline;
    }
</style>