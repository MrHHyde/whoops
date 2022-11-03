const args = require("yargs").argv;
const extend = require("extend");

const paths = require("./paths");

const env = args.env || "dev";

const config = {
    paths: paths,
};

const environments = {
    dev: {
        uglify: false,
    },
    prod: {
        uglify: true,
    },
};

// extend config with environments specific
extend(config, environments[env]);

module.exports = config;
