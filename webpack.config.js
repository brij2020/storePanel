
const path = require("path");
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { inspect } = require('node:util');
module.exports = (args) => {
    return {
            mode:'production',
            entry: "./src/index.js",
            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "build"),
                filename: "bundled.js"
            },
            devServer: {
                open: true,
                port: 3000, 
                historyApiFallback:true,
            },
	        module: {
                rules: [
                 {
                    test: /\.jpe?g|png$/,
                    exclude: /node_modules/,
                    use: ["url-loader", "file-loader"]
                },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    },
                     {
                        test: /.s?css$/,
                        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                      },
                ],
                 
                },
                optimization: {
                        minimizer: [
                          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
                          // `...`,
                          new CssMinimizerPlugin(),
                        ],
                      },
            

            plugins: [
              new HtmlWebPackPlugin({
                 template: path.resolve( __dirname, 'public/index.html' ),
                 filename: 'index.html'
              }),
              new BundleAnalyzerPlugin({
                 analyzerMode: 'disabled',
                generateStatsFile: true,
                statsOptions: { source: false }
              }),
              new MiniCssExtractPlugin()
            ]
        }
};

