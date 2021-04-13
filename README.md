# mhrise_dmgsimu
damage simulater web app of monster hunter rise.

# 概要
「モンスターハンターライズ」のダメージ計算ツールです。

# 環境構築方法

## 必要環境

* OS: Dockerが動けばOK
* 依存ツール
    * git
    * docker
    * docker-compose

※パッケージを編集したりアプリをデプロイする場合はホストマシンに node.js が必要になります。必ずnode.js14系を使用してください。

## 使用している技術など

* Git
* Docker
* JavaScript
    * ES6
* Node.js
* React.js
* HTML5
* CSS

## 手順

1. Gitから本ソースをCloneします。

```
$ git clone https://github.com/gLightDarkness/mhrise_dmgsimu.git
```

2. docker-composeでdockerイメージを作成し、コンテナを起動します。

```
$ pwd
$ # hogehoge/mhrise_dmgsimu
$ docker-compose up -d
```

3. ウェブブラウザで8080番ポートにアクセスし、画面が表示されれば環境構築完了です。
