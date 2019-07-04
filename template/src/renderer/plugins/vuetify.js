import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';


Vue.use(Vuetify, {
    {{#unless_eq iconSet 'none'}} iconfont: {{#if_eq iconSet 'fa5'}}'fa'{{/if_eq}}{{#if_eq iconSet 'mdi'}}'mdi'{{/if_eq}} {{/unless_eq}}
});