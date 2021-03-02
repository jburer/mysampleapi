# mySimpleAPI

The second part of my three part app: The API.

My three part app is designed to provide users a way to manage local events around town, or shindigs
as I call them. It provides CRUD capabilities to any user, and allows them to manage the data in the
datastore, through the API, from the UI.

- _The corresponding **app** is here: (https://github.com/jburer/mysimpleapp)._
- _The corresponding **datastore** is here: (https://github.com/jburer/mysimpledb)._

## myPurpose

Designed to give me a "clean" system for explaining and applying security and
privacy principals, I created a simple app, API, and datastore where the
only security and privacy applied is that which is inherent in the frameworks, software,
and services that I'm using to build the system.

As I apply security and privacy, I will branch this code and explain what's being done.

For more info on this effort check out my blog: (http://jburer.wordpress.com)

_**PLEASE NOTE:** This is solely intended as a learning and education tool, and_
_in no way represents the full responsibilities needed for a production system. In fact_
_as designed it specifically omits certain "best practices" (e.g. input validation, test scripts, logging - all_
_those things security and privacy folks care about) so that_
_they can be added later to demonstrate its benefit._

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

This is pretty straightforward API setup that sits independently from the app and datastore.

It is designed to be run inside a Docker container.

![mySimpleAPI](/images/mySimpleAPI.gif)

## myDockerSetup

Create the `mysimplenetwork` network. _**PLEASE NOTE:** All images in this app are pre-configured to use this network by design._
_Creating the network first allows each image to be created independently, although you will want to start the database first_
_if you are going to use this configuration as this image immediately connects to the db._

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
