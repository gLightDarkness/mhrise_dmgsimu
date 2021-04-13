# ベースは14系最新とする
FROM node:14

# 開発環境
ENV NODE_ENV=development

# 作業ディレクトリ
WORKDIR /usr/src/app

# package.jsonを配置
COPY package*.json ./

# 必要なパッケージをインストール
RUN npm install

# 各種設定ファイルを配置
COPY .babelrc ./
COPY .eslintrc.json ./
COPY webpack.config.js ./

CMD ["npm", "start"]