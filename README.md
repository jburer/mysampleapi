# mySimpleAPI

The second part of my three part app: The API.

- _The corresponding **UI** is here: (https://github.com/jburer/mysimpleui)._
- _The corresponding **datastore** is here: (https://github.com/jburer/mysimpledb)._

## myPurpose

It's "concept" is to provide users a way to manage local events around town, or shindigs
as I call them. It provides CRUD capabilities to any user, and allows them to manage the data in the
datastore, through the API, from the UI.

Designed to give me a "clean" system for demonstrating Security and
Privacy principals, the only principals applied to the base is that which is inherent
in the frameworks, software, and services that I'm using to build the system.

As I work through the fundementals of Security and Privacy, I'll apply
them to this app, and create different branches to give you that "before
and after" feel.

For more info on this effort check out my blog: (http://jburer.wordpress.com)

_**PLEASE NOTE:** This is solely_
_intended as a learning and education tool, and in no way represents the_
_full responsibilities needed for a production system. In fact it is_
_specifically designed to omit security and privacy controls (e.g._
_authentication, input validation, logging, etc. - **all those things security and privacy folks care about**)_
_so that their benefits can be demonstrated._

## myAPI

The `mysimpleAPI` API is an Express app and makes the `GET`, `POST`, `PUT` and `DELETE` methods available.

| Path            | HTTP Mehtod | Parameters                           | Response                | Purpose                               |
| --------------- | ----------- | ------------------------------------ | ----------------------- | ------------------------------------- |
| /shindigs       | GET         | \_page=_[number]_,\_limit=_[number]_ | {_JSON Document_}       | Returns data with optional pagination |
| /shindigs/id/   | GET         | _[id]_                               | {_JSON Document_}       | Returns data matching a specific ID   |
| /shindigs/count | GET         |                                      | { "count" : _[count]_ } | Returns count of records              |
| /shindigs       | POST        | {_JSON Document_}                    | {"n":1,"ok":1}          | Adds a new document                   |
| /shindigs/id    | DELETE      | _[id]_                               | {"n":1,"ok":1}          | Deletes a specified document          |
| /shindigs       | PUT         | _[id]_, {_JSON Document_}            |                         | Updates a specified document          |

It is accompanied by a `config.js` file where the `port` is defined, the
`URI` to the DBMS is established, and the target `database` and `collection` are named.

_**PLEASE NOTE:** The `URI` is currently set to look for the Docker hostname defined in the datastore._

The API is exposed on port `:3100`.

## myArchitecture

This is pretty straightforward API that sits independently from the UI and datastore.

It is designed to be run inside a Docker container.

![mySimpleAPI](/images/mySimpleAPI.gif)

## myDockerSetup

Create the `mysimplenetwork` network. _**PLEASE NOTE:** All images in this app are pre-configured to use this network by design._
_Because `docker-compose.yml` expects this network, it is required to create it first before running docker compose._
_Creating the network first allows each image to be created independently, although you will want to start the database first_
_before running the API as the API immediately looks for the DB._

<pre>
    docker network create mysimplenetwork
</pre>

Clone the repository and move to the `mysimpleapi` directory.

<pre>
    docker compose up -d --build --remove-orphans
</pre>

This will make the API available at the following URI:

<pre>
    http://localhost:3100
</pre>
