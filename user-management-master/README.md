# Management UI

* For UI everything is under `/app/` folder, so go to `/app/` folder.

## .env.example

* copy `.env.example` to `.env`.
```
MODE=development
PORT=9000
HOST=
BASE_URL=
PROXY_URL=
PANDIO_PROXY_URL=

AUTH0_NAMESPACE=
```
* `MODE`: This will indicate application state.
* `PORT`: Do use 9000, because in auth0 set 9000 fixed, if you change it login, logout not work.
* `HOST`: Do not change as well for development, make sure you have set it in you host file(Linux), or gas make(mac).
* `BASE_URL`: We are not using it anywhere right now.
* `PROXY_URL`: It's staging API url.

## Build Setup

* Go to `/app/` folder. 

* copy `.env.example` to `.env`. (skip if already done)

```bash
$ cp .env.example .env
```

* run following commands

``` bash
# install dependencies (skip if already done)
$ npm install 

# build for production and launch server
$ npm run build

# run the application
$ npm start
```

## Development

* Go to `/app/` folder.

* copy `.env.example` to `.env`. (skip if already done)

```bash
$ cp .env.example .env
```

* run following commands

``` bash
# install dependencies (skip if already done)
$ npm install 

# run application
$ npm run dev
```

## Data

* Data: Go to `/app/data` folder, this folder should contain common static data used in project.
* Test Data: Go to `/app/data/test-data` folder, this folder includes data used for test cases. 
* Test Modules: Go to `/app/data/test-data/test-modules.js` file, this file have modules which are used for writing test cases. Right now this only includes basic modules, rest you can include it according to its usage. You can import in test files which are needed.

## Store

This directory contains your Vuex Store files.
Vuex Store option is implemented in the Nuxt.js framework.

Creating a file in this directory automatically activates the option in the framework.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/vuex-store).

* Go to `/app/store` folder, this folder includes,

    * `/app/store/actions.js`: This folder includes all the requests of project.
    * `/app/store/getters.js`: Vuex allows us to define "getters" in the store. You can think of them as computed properties for stores.
    * `/app/store/mutations.js`: Vuex mutations are very similar to events: each mutation has a string type and a handler. The handler function is where we perform actual state modifications, and it will receive the state as the first argument.
    *  `/app/store/state.js`: This file includes all the variable of the project.

## Test

This directory includes the test cases. 

More information to write test cases you can visit this [documentation](https://vue-test-utils.vuejs.org)

## Basic Configuration

* `Javascript Style Guide`: Please refer [guide](https://github.com/airbnb/javascript)

* `NuxtJs Guide`: Please refer [guide](https://nuxtjs.org/docs/2.x/get-started/installation)



