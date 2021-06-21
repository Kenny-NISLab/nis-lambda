<div align = "center"><a href = "https://github.com/Kenny-NISLab/nisroom"><img width = "100" src = "https://user-images.githubusercontent.com/52265901/118224676-a03bed80-b4be-11eb-9b25-4494a25a746b.png"></a>&emsp;<a href = "https://github.com/Kenny-NISLab/nisplan"><img width = "100" src = "https://user-images.githubusercontent.com/52265901/118224811-d5e0d680-b4be-11eb-8ab5-cb137c8fabe4.png"></div>

<div align = "center">
    <br>
    <a href = "https://github.com/Kenny-NISLab/nisroom-api/network/members"><img src = "https://img.shields.io/github/forks/Kenny-NISLab/nisroom-api?style=social" alt = "Forks"></a>
    <a href = ""><img src = "https://img.shields.io/github/stars/Kenny-NISLab/nisroom-api?style=social" alt = "Stars">
    <a href = "https://github.com/Kenny-NISLab/nisroom-api/blob/main/LICENSE"><img src = "https://img.shields.io/github/license/Kenny-NISLab/nisroom-api" alt = "LISENCE"></a>
    <a href = "https://github.com/Kenny-NISLab/nisroom-api/graphs/commit-activity"><img src = "https://img.shields.io/github/last-commit/Kenny-NISLab/nisroom-api" alt = "commit"></a>
    <br>
    <a href = "https://aws.amazon.com/jp/"><img src="https://img.shields.io/badge/-Amazon%20AWS-232F3E.svg?logo=amazon-aws&style=flat" alt="aws"></a>
    <a href = "https://nodejs.org/ja/about/"><img src="https://img.shields.io/badge/-Node.js-339933.svg?logo=node.js&style=flat" alt="nodejs"></a>
    <a href = "https://github.com/Kenny-NISLab/nisroom-api"><img src="https://img.shields.io/badge/-GitHub-181717.svg?logo=github&style=flat" alt = "GitHub"></a>
    <a href = "https://slack.com/intl/ja-jp/"><img src="https://img.shields.io/badge/-Slack-4A154B.svg?logo=slack&style=flat" alt = "Slack"></a>
    <br>
    <br>
    <a href = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/getStudents.yml"><img src = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/getStudents.yml/badge.svg"></a>
    <a href = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/patchStudent.yml"><img src = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/patchStudent.yml/badge.svg"></a>
    <br>
    <a href = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/scheduledDeletePastDate.yml"><img src = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/scheduledDeletePastDate.yml/badge.svg"></a>
    <a href = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/scheduledLeaveStudents.yml"><img src = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/scheduledLeaveStudents.yml/badge.svg"></a>
</div>

# <p align="center">NISROOM API for Lambda</p>

## <p align="center">編集者</p>

<div align="center">
<a href = "https://github.com/Kenny-NISLab/nisroom-api/graphs/contributors"><img src = "https://img.shields.io/github/contributors/Kenny-NISLab/nisroom-api" alt = "Contributors"></a>
</div>

<div align="center">
<a href="https://github.com/kogepanh"><img src="https://avatars.githubusercontent.com/u/49851726?v=4" alt="kogepanh" height="120px"></a>
<a href="https://github.com/tayoon"><img src="https://avatars.githubusercontent.com/u/52265901?v=4" alt="tayoon" height="120px"></a>
<a href="https://github.com/RSugimoto2017"><img src="https://avatars.githubusercontent.com/u/81292583?v=4" alt="RSugimoto2017" height="120px"></a>
<a href="https://github.com/cotaroo"><img src="https://avatars.githubusercontent.com/u/46442631?v=4" alt="cotaroo" height="120px"></a>
<a href="https://github.com/uzumal"><img src="https://avatars.githubusercontent.com/u/52265875?v=4" alt="uzumal" height="120px"></a>
<a href="https://github.com/SioCon"><img src="https://avatars.githubusercontent.com/u/82917550?v=4" alt="SioCon" height="120px"></a>
</div>

---

## 概要

AWS Lambda を用いた NISLAB ルームモニター API です

### フロントエンド

[![nisroom](https://img.shields.io/badge/GitHub-nisroom-orange)](https://github.com/Kenny-NISLab/nisroom)
[![nisplan](https://img.shields.io/badge/GitHub-nisplan-yellow)](https://github.com/Kenny-NISLab/nisplan)

## アーキテクチャ

![nisroom-architecture](https://user-images.githubusercontent.com/49851726/116494988-07617b80-a8dd-11eb-9c49-bb7cda1e2eb3.png)

## API 仕様書

## API リスト

| No. | API 機能 No. | 型  | API 名          | 概要       |
| --- | ------------ | --- | --------------- | ---------- |
| 0   | NISROOM-000  | API | nisroom-api     | 製品版環境 |
| 1   | NISROOM-001  | API | nisroom-api-dev | テスト環境 |

### リソース 型名

#### students

---

| HTTP メソッド | アクセス URI | 目的                         |
| ------------- | ------------ | ---------------------------- |
| GET           | /v1/students | メンバーに関する全情報を取得 |

- GET Data (JSON)

| カテゴリー | JSON キー | 型  | 概要 |
| ---------- | --------- | --- | ---- |
| None       |           |     |      |

- Response Data (JSON)

| カテゴリー              | JSON キー    | 型      | 概要                     |
| ----------------------- | ------------ | ------- | ------------------------ |
| ID                      | id           | Value   | ID                       |
| Image                   | avatar       | URL     | Slack のアイコン         |
| First Name (En)         | e_first_name | String  | 名前（英語）             |
| Last Name (En)          | e_last_name  | String  | 苗字（英語）             |
| Grade                   | grade        | String  | メンバーの学年           |
| Status of stay          | is_stay      | Boolean | メンバーの研究室在室情報 |
| First Name (Ja)         | j_first_name | String  | 名前                     |
| Last Name (Ja)          | j_last_name  | String  | 苗字                     |
| Student ID              | student_id   | Value   | 学生 ID                  |
| Scheduled date of visit | schedule     | Array   | 来室スケジュール         |

#### id

---

| HTTP メソッド | アクセス URI      | 目的                       |
| ------------- | ----------------- | -------------------------- |
| PATCH         | /v1/students/{id} | メンバーに関する情報の更新 |

- PATCH Data (JSON)

| カテゴリー              | JSON キー | 型      | 概要                                                                                        |
| ----------------------- | --------- | ------- | ------------------------------------------------------------------------------------------- |
| Status of stay          | is_stay   | Boolean | メンバーの研究室在室情報                                                                    |
| Scheduled date of visit | schedule  | Array   | 来室予定日({YYYY-MM-DD, YYYY-MM-D'D', ...})<br>もし値が空の配列だった場合 null を返します。 |

- Response Data (JSON)

| カテゴリー              | JSON キー | 型      | 概要                                            |
| ----------------------- | --------- | ------- | ----------------------------------------------- |
| Status of stay          | is_stay   | Boolean | メンバーの研究室在室情報                        |
| Scheduled date of visit | schedule  | Array   | 来室予定日 (["YYYY-MM-DD", "YYYY-MM-D'D', ...]) |

## データベースデザインと構造

### students テーブル

<table>
<thead>
<tr>
<th scope="col">プライマリキー</th>
<th align="center" scope="col" rowspan="2" colspan="9">属性</th>
</tr>
<tr>
<th scope="col">パーティションキー</th>
</tr>
<tr>
<th align="center" scope="col">id</th>
<th align="center" scope="col">avater</th>
<th align="center" scope="col">e_first_name</th>
<th align="center" scope="col">e_last_name</th>
<th align="center" scope="col">grade</th>
<th align="center" scope="col">is_stay</th>
<th align="center" scope="col">j_first_name</th>
<th align="center" scope="col">j_last_name</th>
<th align="center" scope="col">student_id</th>
<th align="center" scope="col">schedule</th>
</tr>
</thread>
<tbody>
<tr>
<th align="center">{Integer}</th>
<th align="center">{String}</th>
<th align="center">{String}</th>
<th align="center">{String}</th>
<th align="center">{Integer}</th>
<th align="center">{Boolean}</th>
<th align="center">{String}</th>
<th align="center">{String}</th>
<th align="center">{Integer}</th>
<th align="center">{StringSet}</th>
</tr>
</tbody>
</table>

## ステータスコード

| ステータスコード | 概要                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 200 OK           | HTTP リクエストが成功した場合の標準的なレスポンスです。実際のレスポンスは、使用したリクエストメソッドによって異なります。                 |
| 403 Forbidden    | リクエストは合法的なものでしたが、サーバーがその応答を拒否しています。401 Unauthorized レスポンスとは異なり、認証しても違いはありません。 |
| 502 Bad Gateway  | サーバーがゲートウェイまたはプロキシとして動作しており、上流のサーバーから無効な応答を受信しました。                                      |

---

## 開発者向け

### リポジトリの使い方

1. フォークとクローン
2. `git remote add upstream https://github.com/Kenny-NISLab/nisroom-api.git`
3. `git pull upstream develop`

### セットアップ

1. `npm install`

### コミットする前のフォーマット

1. `npm run format`
