# mySimpleAPI

The second part of a three part app: The API.

The three part app is designed to provide users a way to manage local events around town, or shindigs
as I call them.

- _The corresponding **app** is here: (https://github.com/jburer/mysampleapp)._
- _The corresponding **datastore** is here: (https://github.com/jburer/mysampleapi)._

## myPurpose

Designed to give me a "clean" system for explaining and applying security and
privacy principals, I created a simple app, API, and datastore where the
only security and privacy applied is that which is inherent in the frameworks, software,
and services that I'm using to build the system.

As I apply security and privacy, I will branch this code and explain what's being done.

For more info on this effort check out my blog: (http://jburer.wordpress.com)

_**PLEASE NOTE:** This is solely intended as a learning and education tool, and_
_in no way represents the full responsibilities needed for a production system. In fact_
_as designed it specifically omits certain "best practices" (e.g. input validation, test scripts, etc.) so that_
_they can be added later to demonstrate its benefit._

## myAPI

The `mysimpleAPI` API is an Express app and makes the `GET`, `POST`, `PUT` and `DELETE` methods available.

| Path            | HTTP Mehtod | Parameters                           | Response                | Purpose                               |
| --------------- | ----------- | ------------------------------------ | ----------------------- | ------------------------------------- |
| /shindigs       | GET         | \_page=_[number]_,\_limit=_[number]_ | {_JSON Document_}       | Returns data with optional pagination |
| /shindigs/id/   | GET         | _[id]_                               | {_JSON Document_}       | Returns data matching a specific ID   |
| /shindigs/count | GET         |                                      | { "count" : _[count]_ } | Returns count of records              |
| /shindigs       | POST        | {_JSON Document_}                    |                         | Adds a new document                   |
| /shindigs/id    | DELETE      | _[id]_                               |                         | Deletes a specified document          |
| /shindigs       | PUT         | _[id]_, {_JSON Document_}            |                         | Updates a specified document          |

It is accompanied by a `config.js` file where the `port` is defined, the
`URI` to the DBMS is established, and the target `database` and `collection` are named.

The API is exposed on port `:3100`.

## myArchitecture

This is pretty straightforward API setup that sits independently from the app and datastore.

![mySimpleAPI](/images/mySimpleAPI.gif)

It is designed to be run inside a Docker container.

## myDockerSetup

Clone the repository and move to the `mysimpleapi` directory.

    docker build -t *<whatever>*/mysimpleapi .
    docker run -d -p 8180:80 --name mysimpleapi _<whatever>_/mysimpleapi

This will make the app available on

    http://localhost:8180
