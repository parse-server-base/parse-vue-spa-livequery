# parse-vue-spa-livequery
This is a parse-server  project, with default config for `dashboard`, `graphQL` and `vue`(SPA not nuxt). Helping you to setup everything within a minute. 


## vue-spa 
`http://localhost:8081/#/secret` (dev) or `http://localhost:1337/#/secret` (prod)
![image](https://user-images.githubusercontent.com/5538753/71544536-bde8df80-29bb-11ea-8fd7-cd05f94e2042.png)

## parse dashboard
http://localhost:1337/dashboard/login
![image](https://user-images.githubusercontent.com/5538753/73072279-c1568480-3eef-11ea-9508-2778fe85e298.png)


## parse graphql playground
http://localhost:1337/playground/
![image](https://user-images.githubusercontent.com/5538753/73072321-d29f9100-3eef-11ea-92bd-6521ad328102.png)


## 1.1 Project setup
```
yarn 
```
## 1.2 Config Setup

setup your env

```shell
#  parse-server 
echo "set DATABASE_URI"
export DATABASE_URI="mongodb://username:password@something.mlab.com:45380/something"
echo "set APP_ID"
export APP_ID="YOUTUB_APPLICATION_ID"
echo "set MASTER_KEY"
export MASTER_KEY="YOUTUB_MASTER_KEY"

#  s3-config for file upload
echo "set S3_ACCESS_KEY"
export S3_ACCESS_KEY="YOU_S3_ACCESS_KEY"
echo "set S3_SECRET_KEY"
export S3_SECRET_KEY="YOU_S3_SECRET_KEY"
echo "set S3_REGION"
export S3_REGION="ap-northeast-1"
echo "set S3_BUCKET"
export S3_BUCKET="bucketn-ame"

#  dashboard setup
echo "set PARSE_DASHBOARD_APP_ID"
export PARSE_DASHBOARD_APP_ID=$APP_ID
echo "set PARSE_DASHBOARD_MASTER_KEY"
export PARSE_DASHBOARD_MASTER_KEY=$MASTER_KEY
echo "set PARSE_DASHBOARD_SERVER_URL"
export PARSE_DASHBOARD_SERVER_URL="http://localhost:1337/parse"
echo "set PARSE_DASHBOARD_APP_NAME"
export PARSE_DASHBOARD_APP_NAME="MyApp"
echo "set PARSE_DASHBOARD_USER_ID"
export PARSE_DASHBOARD_USER_ID="yourDashboardUsername"
echo "set PARSE_DASHBOARD_USER_PASSWORD"
export PARSE_DASHBOARD_USER_PASSWORD="yourPASSWORD"

```


### 2.1 run in dev
```
yarn dev
```

### 2.2 run in prod
```
yarn server:prod
```


### 3.1 Routing
The routing logic, the often seen types are `requiredPublic`, `requiredLogin` and `requiredLogout`. And config the type on each `route item`, inside `meta: {permission}`



### 4 Config

#### 4.1 Server
It is needed to start a second http server with different port, as the code in `./server/configs/livequery.js`

and require it on `./server/index.js`
```js

const express = require('express');
const app = express();

//...

require('./configs/livequery').init(app)

//...

app.listen(port, function() {
  console.log(`parse-server-example running on port: http://${HOST_URL}:${port}.`);
});
```


#### 4.1 Client
adding livequery when initing parse client `./src/lib/parse`
```js
Parse.liveQueryServerURL = 'ws://localhost:2337/';
```

and subscribe it on vue components `./src/views/Secret`

```js
    initLivequery: async function() {
      const query = new Parse.Query('Chatrooms')
      this.livequerySubscription = await query.subscribe()
      this.livequerySubscription.on('open', () => {
        console.log('this.livequerySubscription opened');
      });
      this.livequerySubscription.on('create', (cRoom) => {
        this.msgList.unshift(cRoom.toJSON());
      });
      this.livequerySubscription.on('enter', (cRoom) => {
        console.log(cRoom.get('msg'), ' enter'); // This should output Mengyan
      });
      this.livequerySubscription.on('update', (cRoom) => {
        console.log(cRoom.get('msg'), 'update'); // This should output 100
      })
    },
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Reference:
 - https://github.com/wahengchang/parse-vue-auth-router
 - https://github.com/parse-server-base/parse-vue-spa-server