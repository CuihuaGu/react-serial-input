var path = require("path");

module.exports = {
  entry: path.join(__dirname, "examples/src/index.tsx"),
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  devServer: {
    contentBase: "./build"
  },
  module: {
    rules: [
      { test: /\.css$/, use: "css-loader" },
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader"
      },
      { test: /\.scss$/, use: "scss-loader" }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  externals: {
    react: "commonjs react"
  }
};
