/* globals INCLUDE_RESOURCES_PATH */
import Vue from 'vue'

/**
 * Set `__resources` path to resources files in renderer process
 */
global.__resources = undefined // eslint-disable-line no-underscore-dangle
// noinspection BadExpressionStatementJS
INCLUDE_RESOURCES_PATH // eslint-disable-line no-unused-expressions
if (__resources === undefined) console.error('[Renderer-process]: Resources path is undefined')

Vue.prototype.__resources = __resources
