const path = require("path");   
const HtmlWebpackPlugin = require("html-webpack-plugin");
const _ = require("lodash");

module.exports = {
    entry: {    
        index: "./src/js/script.js"
    },  
    output: {   
        path: path.resolve(__dirname, "dist"),  
        filename: "bundle.js"   
    }, 
    module: {rules: [
        {            
            test: /\.css$/i,     
            use: ["style-loader", "css-loader"]
        }
    ]}, 
    plugins: [
        new HtmlWebpackPlugin({
            title: "Applicazione webpack",      
            template: "./src/html/index.html"        
        })
    ],
    devServer: {
        port: "5000",
        open: true,
        static: path.resolve(__dirname, "dist")     
    },
    mode: "production"    
}
