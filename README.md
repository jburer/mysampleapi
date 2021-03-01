# mySimpleAPI

The second part of a three part app: The API.

- _The corresponding **app** is here: (https://github.com/jburer/mysampleapp)._
- _The corresponding **datastore** is here: (https://github.com/jburer/mysampleapi)._

## myPurpose

Designed to give me a "clean" system for explaining and applying security and
privacy principals, I created a simple app, API, and datastore where the
only security and privacy applied is that which is inherent in the frameworks, software,
and services that I'm using to build the system.

As I apply security and privacy, I will branch this code and explain what's being done.

For more info on this effort check out my blog: (http://jburer.wordpress.com)

_**PLEASE NOTE:** This is solely intended for serving as learning and education tool, and_
_in no way represents the full responsibilities needed for a production system._

## myAPI

The `mysimpleAPI` API is an Express app and makes the `GET`, `POST`, `PUT` and `DELETE` methods available.

| Path            | HTTP Mehtod | Parameters       | Response        | Purpose |
| --------------- | ----------- | ---------------- | --------------- | ------- |
| /shindigs       | GET         | \_page=,\_limit= | with Pagination |
| /shindigs/id/   | GET         | [id]             |
| /shindigs/count | GET         |                  |
| /shindigs       | POST        |                  |
| /shindigs/id    | DELETE      | by ID            |
| /shindigs       | PUT         | by ID            |

It is accompanied by a `config.js` file where the `port` is defined, the
`URI` to the DBMS is established, and the target `database` and `collection` are named.

The API is exposed on port `:3100`.

## myArchitecture

This is pretty straightforward API setup that sits independently from the app and datastore.

![mySimpleAPI](/images/mySimpleAPI.gif)

It is designed to be run inside a Docker container.

## myDockerSetup

Clone the repository and move to the `mysimpledb` directory.

```
docker-compose up -d
```

This will make the datastore available at the following URI:

```
mongodb://localhost:27017
```
