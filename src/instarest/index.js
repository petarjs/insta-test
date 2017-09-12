let connection = null
const promises = {}

window.Instarest = class Instarest {
  constructor (url) {
    connection = new WebSocket(`ws://${url}`)
    connection.onmessage = e => this.onMessage(e.data)
  }
  onMessage (data) {
    const dataJson = JSON.parse(data)
    promises[dataJson.config.url].promise.resolve(dataJson)
  }
  send (data) {
    setTimeout(function() {
      connection.send(JSON.stringify(data))
    });
  }

  get (url) {
    return new Promise ((resolve, reject) => {
      promises[url] = {
        config: { url },
        promise: { resolve, reject }
      }

      this.send({ config: promises[url].config })
    })
  }
}
