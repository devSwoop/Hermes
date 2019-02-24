const Hermes = {
  init (options, routes) {
    Object.assign(this._options, options)
    this.api = routes
  },
  listeners: [],
  api: [],
  _options: {
    port: window.location.port,
    protocol: window.location.protocol,
    baseUrl: window.location.hostname,
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache': 'no-cache'
    }
  },
  addRequestListener: function (listener) {
    this.listeners.push(listener)
  },
  run (name, options = {}) {
    return new Promise((resolve, reject) => {
      let params = options.params
      let body = options.data
      let route = this._getRoute(name, params)

      if (route === null) {
        return reject(new Error(`The route "${name}" does not exist`))
      }

      options = Object.assign({}, this._options, options)
      options.method = (route.method !== undefined) ? (route.method) : (options.method)

      let url = `${options.protocol}//${options.baseUrl}:${options.port}/${route.path}`

      body = (options.headers['Content-Type'] === 'application/json') ? JSON.stringify(body) : body

      this._fetch(url, options, body)
        .then(resolve)
        .catch(reject)
    })
  },
  _fetch (url, options, body) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        credentials: 'include',
        method: options.method,
        headers: options.headers,
        mode: 'cors',
        cache: 'no-cache',
        body
      })
      .then(response => {
        if (response.ok === false) {
          return reject(new Error(`${url}: ${response.status} ${response.statusText}`))
        }
        return response.text()
      })
      .then(data => {
        try {
          data = JSON.parse(data)
        } catch (e) { }

        if (data.success === false) {
          return reject(data)
        }
        resolve(data)
      })
      .catch(reject)
    })
  },
  _getRoute (path, params) {
    let route = null

    this.api.forEach(element => {
      if (element.name === path) {
        route = element
      }
    })
    if (route === null) {
      return null
    }
    if (typeof params === 'undefined') {
      return route
    } else {
      for (let i in params) {
        let param = params[i]

        route = route.replace(`{${i}}`, param)
      }
      return route
    }
  }
}

export default Hermes