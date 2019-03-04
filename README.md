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

You can also add middlewares like that, these will requests without errors

```js
Hermes.listener(data => new Promise((resolve, reject) => {
  // You can edit the data
  data.date = Date.now()
  resolve(data)
}))
```

You can do the same with errors

```js
Hermes.catch(data => new Promise((resolve, reject) => {
  if (data.message === 'You are not authenticated') {
    window.location.reload()
  } else {
    reject(data)
  }
}))
```