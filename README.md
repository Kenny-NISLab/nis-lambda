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
    <a href = "https://slack.com/intl/ja-jp/"><img src="https://img.shields.io/badge/-Slack-4A154B.svg?logo=slack&style=flat" alt = "Slack">
    <br>
    <br>
    <a href = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/getStudents.yml"><img src = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/getStudents.yml/badge.svg">
    <a href = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/patchStudent.yml"><img src = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/patchStudent.yml/badge.svg">
    <br>
    <a href = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/scheduledDeletePastDate.yml"><img src = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/scheduledDeletePastDate.yml/badge.svg">
    <a href = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/scheduledLeaveStudents.yml"><img src = "https://github.com/Kenny-NISLab/nisroom-api/actions/workflows/scheduledLeaveStudents.yml/badge.svg">
</div>

# <p align="center">NISROOM API for Lambda</p>

## <p align="center">Contributors</p>

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

## Overview

NISLAB Room Monitor API for AWS Lambda

### Frontend

[![nisroom](https://img.shields.io/badge/GitHub-nisroom-orange)](https://github.com/Kenny-NISLab/nisroom)
[![nisplan](https://img.shields.io/badge/GitHub-nisplan-yellow)](https://github.com/Kenny-NISLab/nisplan)

## Architecture

![nisroom-architecture](https://user-images.githubusercontent.com/49851726/116494988-07617b80-a8dd-11eb-9c49-bb7cda1e2eb3.png)

## API Documentation

### API List

| No. | API Function No. | Type | API Name        | Overview               |
| --- | ---------------- | ---- | --------------- | ---------------------- |
| 0   | NISROOM-000      | API  | nisroom-api     | Production Environment |
| 1   | NISROOM-001      | API  | nisroom-api-dev | Test Environment       |

### Resource Types

#### students

---

| HTTP Method | Access URI   | Objective                         |
| ----------- | ------------ | --------------------------------- |
| GET         | /v1/students | Get all information about members |

- GET Data (JSON)

| Category | JSON Key | Type | Description |
| -------- | -------- | ---- | ----------- |
| None     |          |      |             |

- Response Data (JSON)

| Category                | JSON Key     | Type    | Description                             |
| ----------------------- | ------------ | ------- | --------------------------------------- |
| ID                      | id           | Value   | ID                                      |
| Image                   | avatar       | URL     | Image of Slack                          |
| First Name (En)         | e_first_name | String  | First Name in English                   |
| Last Name (En)          | e_last_name  | String  | Last Name in English                    |
| Grade                   | grade        | String  | Grade of member                         |
| Status of stay          | is_stay      | Boolean | Whether the member is in the Lab or not |
| First Name (Ja)         | j_first_name | String  | First Name in Japanese                  |
| Last Name (Ja)          | j_last_name  | String  | Last Name in Japanese                   |
| Student ID              | student_id   | Value   | Student ID                              |
| Scheduled date of visit | schedule     | Array   | Scheduled date of visit                 |

#### id

---

| HTTP Method | Access URI        | Objective                           |
| ----------- | ----------------- | ----------------------------------- |
| PATCH       | /v1/students/{id} | Update information about the member |

- PATCH Data (JSON)

| Category                | JSON Key | Type    | Description                                                                                                   |
| ----------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| Status of stay          | is_stay  | Boolean | Whether the member is in the Lab or not (true or false)                                                       |
| Scheduled date of visit | schedule | Array   | Scheduled date of visit ({YYYY-MM-DD, YYYY-MM-D'D', ...})<br>If the value is an empty array, it will be null. |

- Response Data (JSON)

| Category                | JSON Key | Type    | Description                                                       |
| ----------------------- | -------- | ------- | ----------------------------------------------------------------- |
| Status of stay          | is_stay  | Boolean | Whether the member is in the Lab or not (Same data as PATCH Data) |
| Scheduled date of visit | schedule | Array   | Scheduled date of visit (["YYYY-MM-DD", "YYYY-MM-D'D', ...])      |

## Database Design and Structure

### students Table

<table>
<thead>
<tr>
<th scope="col">Primary Key</th>
<th align="center" scope="col" rowspan="2" colspan="9">Attributes</th>
</tr>
<tr>
<th scope="col">Partition Key</th>
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

## Status Code

| Status Code     | Description                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200 OK          | Standard response for successful HTTP requests. The actual response will depend on the request method used.                                               |
| 403 Forbidden   | The request was a legal request, but the server is refusing to respond to it. Unlike a 401 Unauthorized response, authenticating will make no difference. |
| 502 Bad Gateway | The server was acting as a gateway or proxy and received an invalid response from the upstream server.                                                    |

---

## For Developers

### How To Use Repository

1. Fork and Clone
2. `git remote add upstream https://github.com/Kenny-NISLab/nisroom-api.git`
3. `git pull upstream develop`

### Setup

1. `npm install`

### Format before Commit

1. `npm run format`
