# Hermes

Simple, centralized and promised API routes manager for the browser.

```javascript
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
