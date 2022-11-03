const nodeModulesPath = "./node_modules"
const resourcesPath = "./src/Whoops/Resources"
const distPath = resourcesPath + "/dist"

module.exports = {
    scripts: {
        whoops: [resourcesPath + "/js/whoops.base.js"],
    },
    style: {
        whoops: [resourcesPath + "/css/*.*.scss"],
    },
    assets: {
        clipboard: {
            js: [nodeModulesPath + "/clipboard/dist/clipboard.min.js"]
        },
        prismjs: {
            css: [
                nodeModulesPath + "/prismjs/themes/prism.min.css",
                nodeModulesPath + "/prismjs/themes/prism-tomorrow.min.css",
                nodeModulesPath + "/prismjs/plugins/line-highlight/*.min.css",
                nodeModulesPath + "/prismjs/plugins/line-numbers/*.min.css",
            ],
            js: [
                nodeModulesPath + "/prismjs/components/prism-core.min.js",
                nodeModulesPath + "/prismjs/components/prism-markup.min.js",
                nodeModulesPath + "/prismjs/components/prism-markup-templating.min.js",
                nodeModulesPath + "/prismjs/components/prism-php.min.js",
                nodeModulesPath + "/prismjs/plugins/line-highlight/*.min.js",
                nodeModulesPath + "/prismjs/plugins/line-numbers/*.min.js",
            ],
        },
        zepto: {
            js: [nodeModulesPath + "/zepto/dist/zepto.min.js"],
        },
    },
    dest: {
        css: distPath + "/css/",
        js: distPath + "/js/",
    },
}
