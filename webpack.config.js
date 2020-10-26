var path = require('path');

module.exports = {
    entry: './src/index.js',   //** inserir arquivo e entrada
    output: {
        path: path.resolve(__dirname, 'public'),  // ** inserir aonde ficará o bundle.js
        filename: 'bundle.js'
    },
    module: {
        rules: [
        {
            test: /\.m?js$/,                         //vai passar todos os arquivos .JS pelo babel 
            exclude: /(node_modules)/,              //menos os no interior da pasta node_modules
            use: {
                loader: 'babel-loader',                 //nome dado para inserir um programa dentro de outro
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']      //configuração que transpila um codigo JS moderno em codigo JS antigo && o JSX para JS normal
                }
            }
        }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: "/",
        compress: true,
        port: 9000,
        historyApiFallback: true,
      },
      mode: process.env.NODE_ENV === "production" ? "production" : "development",  //sair erros mais semanticos no console
      devtool: "source-map"
};