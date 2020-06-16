# gostack-challange02-nodejs


> To install the project dependencies: `$ yarn`

> To run: `$ yarn dev`

> To test: `$ yarn test`

Api routes
* **POST /repositories** *(add a repository)*
```
body: {"title": "repository 01", "url":"http://github.com/...", "techs": ["nodejs", "react"]}
```

* **GET /repositories** *(list all repositories)*


* **PUT /repositories/:id** *(update a repository previously added)*
```
body: {"title": "repository 01-changed", "url":"http://github.com/hello", "techs": ["nodejs", "react", "react-native"]}
```

* **DELETE /repositories/:id** *(delete a repository previously added)*


* **POST /repositories/:id/like** *(add a like to a repository previously added)*
