const pathToRegexp = require('path-to-regexp')
let connection = null
let socket = null
const urls = []

module.exports = {
  init (wss) {
    connection = wss

    connection.on('connection', ws => this.onConnection(ws))
  },
  onConnection(ws) {
    socket = ws
    socket.on('message', message => this.onMessage(message))
  },
  send (data) {
    socket.send(JSON.stringify(data))
  },
  onMessage (message) {
    const messageJson = JSON.parse(message)

    const endpoint = urls.find(urlConfig =>
      pathToRegexp(urlConfig.url).exec(messageJson.config.url))

    endpoint.cb({
      config: messageJson.config,
      params: this.getParamsFromRoute(endpoint.url, messageJson.config.url)
    }, {
      json: data => this.send({ data, config: messageJson.config })
    })
  },

  get (url, cb) {
    urls.push({ url, cb })
  },

  getParamsFromRoute (parametrizedUrl, url) {
    let keys = []
    const re = pathToRegexp(parametrizedUrl, keys)
    const results = re.exec(url)
    const params = {}
    results.slice(1).forEach((res, index) => {
      params[keys[index].name] = res
    })

    return params
  }
}