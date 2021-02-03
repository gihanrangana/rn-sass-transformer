const sassTransformer = require("react-native-sass-transformer");
const postCSSTransformer = require("react-native-postcss-transformer");
const upstreamTransformer = require("metro-react-native-babel-transformer");

const path = require("path");

const appTheme = (path.resolve(__dirname,'/src/styles/Global.scss')).replace(/\\/g, "/");

let prefix = ``;

prefix += `@import "${appTheme}"; \n\n `;

module.exports.transform = async function ({ src, filename, options }) {

    if (filename.endsWith(".scss") || filename.endsWith(".sass")) {

        src = prefix + src;

        // rem to px
        // 1 rem = 8px (same as bubl-web mobile)

        src = src.replace(/([0-9]+)rem/gi, (value) => {

            return ((parseFloat(value) || 0) * 8) || 0;

        });

        // return sassTransformer.transform({ src, filename, options: options });
        return sassTransformer
            .renderToCSS({ src, filename, options })
            .then(css =>
                postCSSTransformer.transform({ src: css, filename, options })
            );

    } else {

        return upstreamTransformer.transform({ src, filename, options });

    }

}