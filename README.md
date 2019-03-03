# Hermes

Simple, centralized and promised API routes manager for the browser.

```js
import Hermes from 'Hermes'

Hermes.init({
  baseUrl: 'serverHostname',
  port: 3000
}, [
  {
    name: 'userLogin',
    method: 'post',
    path: 'login'
  }
])

// POST http://localhost:3000/login
Hermes.run('userLogin', {
  data: {
    mail: 'mail@example.com',
    password: 'secretPassword'
  }
}
.then(data => {
  // ...
})
.catch(error => {
  // ...
})
```

You can also add middlewares like that

```js
Hermes.listener(data => new Promise((resolve, reject) => {
  if (data.message === 'You are not authenticated') {
    reject(new Error('Not logged in'))
  } else {
    resolve(data)
  }
}))
```