const path = require('path');
const { getDefaultConfig } = require("metro-config");

// const transformer = (process.cwd().substr(-8) === "bubl-app") ? "./babel/transformer.js" : "./node_modules/@dex/bubl-app/babel/transformer.js";
const transformer = "./babel/transformer.js";

module.exports = (async () => {

    const {
        resolver: { sourceExts }
    } = await getDefaultConfig();

    return {
        transformer: {
            // assetPlugins: ['expo-asset/tools/hashAssetFiles'],
            babelTransformerPath: require.resolve('react-native-css-transformer'),
        },
        resolver: {
            // assetExts: assetExts.filter(ext => ext !== "svg"),
            sourceExts: [...sourceExts, "scss", "sass"],
            // extraNodeModules: new Proxy({}, {
            //     get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
            // })
        }
    };
})();