import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css'

Vue.use(Buefy, {
  {{#unless_eq iconSet 'none'}} defaultIconPack: {{#if_eq iconSet 'fa5'}}'fa'{{/if_eq}}{{#if_eq iconSet 'mdi'}}'mdi'{{/if_eq}} {{/unless_eq}}
});
