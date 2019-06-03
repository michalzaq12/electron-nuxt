<template>
	<div class="window">
		<app-header />
		<nuxt/>
	</div>
</template>


<script>
	import appHeader from '@/components/header'
	export default {
	    components: {appHeader}
	}
</script>

<style>
	body{
		margin: 0;
	}
</style>