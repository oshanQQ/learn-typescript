# TweetAppプロジェクトについて

TweetAppプロジェクトはいくつかの基本的な機能を備えたソーシャルメディアアプリです。
このドキュメントでは、TweetAppプロジェクトの仕様と設計の全体像について説明します。

## 仕様

ここでは、TweetAppプロジェクトの各タスクのベースとなる機能について説明します。
ここを読めば、全体の仕様を把握することができます。

順番に確認していきましょう。

### ページ構成と機能一覧

TweetAppプロジェクトは大きく下記の3つのコンポーネントからできています。

- ユーザー機能
- 投稿機能
- いいね機能

![tweet app](https://user-images.githubusercontent.com/26600620/138832374-c37c9628-36f7-40d0-a58b-4e4af6591ce9.png)

それぞれのページと機能について、ルーティングURLと合わせて確認しましょう。

- ユーザーコンポーネント
  - `GET /users` ユーザー一覧ページ
  - `GET /users/{userId}`: ユーザー詳細ページ
  - `GET /users/{userId}/edit`: ユーザー編集ページ
  - `GET /users/{userId}/likes`: ユーザーいいねページ
  - `POST /users/create`: ユーザー作成機能
  - `POST /users/{userId}/update`: ユーザー更新機能
- 投稿コンポーネント
  - `GET /posts` 投稿一覧ページ
  - `GET /posts/new` 投稿作成ページ
  - `GET /posts/{postId}`: 投稿詳細ページ
  - `GET /posts/{postId}/edit`: 投稿編集ページ
  - `POST /posts/create`: 投稿作成機能
  - `POST /posts/{postId}/update`:投稿更新機能
  - `POST /posts/{postId}/destroy`:投稿削除機能
- いいねコンポーネント
  - `POST /likes/{postId}/create`:いいね作成
  - `POST /likes/{postId}/destroy`:いいね削除
- 認証
  - `GET /signup`: ユーザー作成ページ
  - `GET /signin`: ユーザーログインページ
  - `POST /signin`: ログイン機能
  - `POST /signout`: ログアウト機能
- その他
  - `GET /`: ランディングページ
  - `GET /about`: Aboutページ

`GET`や`POST`はHTTPリクエストメソッドです。
ここから、主なリソースは`users`と`posts`であることがわかります。
また、大枠のコンポーネントには含めませんでしたが、ユーザー作成（`/signup`）を含む認証機能もルート直下に切り出されています。

ページ構成をまとめた図です。

![ページ構成](https://user-images.githubusercontent.com/26600620/138818272-d4f8980a-7d73-46b1-9f82-5fde9d4916ff.png)

## 設計方針とフォルダ構成について

ここでは、TweetAppプロジェクトの実装に関する設計方針とフォルダ構成について説明します。
ここを読めば、全体の設計とフォルダ構成を把握することができます。

### 使用技術

TweetAppプロジェクトで使用する技術は下記の通りです。

- メイン言語
  - Node.js / TypeScript
- package 管理
  - npm
- Web フレームワーク
  - Express
- template エンジン
  - EJS
- データベース(RDB)
  - SQLite3
- テスト
  - Jest
  - Puppeteer
- コード整形
  - ESLint
  - Prettier

### フォルダ構成一覧

TweetAppプロジェクトのフォルダ構成です。

- `root/`
  - `__tests__/`
    - プロジェクトのテストファイルです。各ページや機能を自動テストしています。タスクをクリアするには全てのテストを通す必要があります。
  - `public/`
    - 静的なファイル置き場です。CSSファイルや画像ファイルが置かれています。ユーザーのプロフィール画像もここに保存されます。
  - `src/`
    - プロジェクトのメインフォルダです。主にこのフォルダに実装していきます。
    - `db/`
      - データベースに関するフォルダです。DBのコネクション処理やデフォルトデータが置いてあります。
    - `lib/`
      - 各処理をまとめて切り出されたモジュールが入っています。例としてパスワードのハッシュ化や環境を判定する処理が置かれています。
    - `loaders/`
      - アプリケーション起動時に読み込むセットアップ処理が置かれています。DBの初期化やexpressのルーティング読み込みなどもここで行っています。
    - `middlewares/`
      - 各routesの前に行いたい共通の処理などをまとめるフォルダ。認証チェックや画像アップロードのmiddlewareが置かれている。
    - `models/`
      - オブジェクトごとのデータベースアクセスを行うフォルダ。オブジェクトをデータベースに格納したり、データベースから取り出したデータをオブジェクトにして返す役割を行う。
    - `routes/`
      - クライアントからのHTTPリクエストを処理するフォルダ。リソースごとに階層がまとまっている。modelsやviewsと連携してリクエストからページ表示までを実行する。
    - `views/`
      - UIを管理するフォルダです。リソースごとに階層がまとめられており、CSSなどの読み込みやheaderなどの全ページ共通のUIは`layout.ejs`に定義されています。
    - `app.ts`
      - loader関数を読み込んでアプリケーションのセットアップをするファイルです。
    - `server.ts`
      - サーバ起動のエントリファイル
  - `README.md`
    - このファイルです。プロジェクト全体の仕様についてまとめています。

基本的には`src/`フォルダに実装していくことになります。MVCに近い形で実装しているので、`routes`や`models`、`views`を中心にコードリーディングすると良いでしょう。

![MVCイメージ](https://user-images.githubusercontent.com/26600620/138834294-aa9c9e12-3a4d-4e6f-8a9a-50960dcaa1c9.png)

MVCアーキテクチャではモデルが入力のバリデーションを行うことあるのですが、TweetAppプロジェクトでは`middlewares`がその役割を担っています。

### データベース構成

TweetAppプロジェクトで使っているRDBのテーブル構成について紹介します。
テーブル構成は下記のようになっています。

- `tables`
  - `users`: ユーザーテーブル
    - `id`: ID
    - `name`: 名前
    - `email`: Email アドレス
    - `password`: 暗号化されたパスワード
    - `image_name`: 画像ファイルのパス
    - `created_at`: 作成日時
    - `updated_at`: 更新日時
  - `posts`: 投稿テーブル
    - `id`: ID
    - `content`: 投稿本文
    - `user_id`: 投稿ユーザの ID
    - `created_at`: 作成日時（投稿日時）
    - `updated_at`: 更新日時
  - `likes`: いいねテーブル
    - `user_id`: いいねしたユーザの ID
    - `post_id`: いいねされた投稿の ID
    - `created_at`: 作成日時

それぞれのテーブルの関係図は下図のようになっています。

![ER図イメージ](https://user-images.githubusercontent.com/26600620/154948932-8a2ba79d-9ee9-4f54-8c2a-f3e70bd4587c.png)

### 認証について

認証機能のコードを理解しやすくするために、認証に関する機能の紹介をします。

ログインのセッションは `cookie-session` ライブラリを利用しています。ライブラリの読み込みは `loaders/express.ts` で行っています。

セッションを管理する主なコードは `middlewares/authentication.ts` にあります。`Authentication` クラスはプロパティにセッション情報を持ち、ログインやログアウトのメソッドを実装しています。
`loaders/express.ts` の中で `authenticationMiddleware` ミドルウェア関数を設定することで、リクエストの度に `Authentication` クラスが初期化されます。

`middlewares/authentication.ts` には、他にも認証チェックのミドルウェア関数が用意されています。未ログインの状態でアクセスしたときに、ログインページへリダイレクトする機能や、ログイン済みであることを知らせる機能があります。ログインが必要な多くのページのルーティングのミドルウェアで利用されています。

`middlewares/authentication.ts` と似たミドルウェアに `middlewares/current_user.ts` があります。この中には、ログインしているユーザー情報をビューに渡したり、ログインユーザーの権限をチェックしたりするミドルウェア関数が用意されています。
