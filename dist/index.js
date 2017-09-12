System.register("index", ["ws"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ws_1, connection, promises, Instarest;
    return {
        setters: [
            function (ws_1_1) {
                ws_1 = ws_1_1;
            }
        ],
        execute: function () {
            connection = null;
            promises = {};
            Instarest = class Instarest {
                constructor(url) {
                    debugger;
                    connection = new ws_1.default(`ws://${url}`);
                    connection.on('message', data => this.onMessage(data));
                }
                onMessage(data) {
                    const dataJson = JSON.parse(data);
                    promises[dataJson.config.url].promise.resolve(dataJson.data);
                }
                send(data) {
                    connection.send(JSON.stringify(data));
                }
                get(url) {
                    return new Promise((resolve, reject) => {
                        promises[url] = {
                            config: { url },
                            promise: { resolve, reject }
                        };
                        this.send({ config: promises[url].config });
                    });
                }
            };
            exports_1("default", Instarest);
        }
    };
});
