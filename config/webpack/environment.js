const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const lodash = require('lodash')

const scssLoader = environment.loaders.get('sass')
scssLoader.use.unshift({ loader: 'vue-style-loader' })
scssLoader.test = /\.scss$/

const scssLoaderOptions = lodash.find(scssLoader.use, { 'loader': 'sass-loader' })
scssLoaderOptions.options.implementation = require('sass')
scssLoaderOptions.options.fiber = require('fibers')
scssLoaderOptions.options.indentedSyntax = false

const sassLoader = lodash.cloneDeep(scssLoader)
sassLoader.test = /\.sass$/

const sassLoaderOptions = lodash.find(sassLoader.use, { 'loader': 'sass-loader' })
scssLoaderOptions.options.implementation = require('sass')
scssLoaderOptions.options.fiber = require('fibers')
sassLoaderOptions.options.indentedSyntax = true

environment.loaders.delete('sass')

environment.loaders.append('sass', sassLoader)
environment.loaders.append('scss', scssLoader)

environment.plugins.prepend('VuetifyLoader', new VuetifyLoaderPlugin())
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
module.exports = environment
