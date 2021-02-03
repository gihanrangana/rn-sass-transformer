const path = require('path');
const { getDefaultConfig } = require("metro-config");

// const transformer = (process.cwd().substr(-8) === "bubl-app") ? "./babel/transformer.js" : "./node_modules/@dex/bubl-app/babel/transformer.js";
const transformer = "./babel/transformer.js";

module.exports = (async () => {

    const {
        resolver: { sourceExts, assetExts }
    } = await getDefaultConfig();

    return {
        transformer: {
            assetPlugins: ['expo-asset/tools/hashAssetFiles'],
            babelTransformerPath: require.resolve(transformer),
        },
        resolver: {
            assetExts: assetExts.filter(ext => ext !== "svg"),
            sourceExts: ['expo.ts', 'expo.tsx', 'expo.js', 'expo.jsx', ...sourceExts, "scss", "sass"],
            extraNodeModules: new Proxy({}, {
                get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
            })
        }
    };
})();