# binus-comserv

init db

```
docker run -d --name mongo6 -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin mongo:6
```

init node

```
npm init -y
```

init file

```
touch index.js
```

install package

```
npm install -S express mongoose
```

install dependency

```
npm install -D nodemon
```

hello world

```
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```
