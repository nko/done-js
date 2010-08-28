var cradle = exports;

cradle.Connection.prototype.database = function (name) {
    var that = this;
    
    return {
        name: name,
        //
        // Database query cache
        //
        cache: {
            store: {},
            get: function (id) {
                return this.query('get', id);
            },
            save: function (id, doc) {
                return this.query('save', id, doc);
            },
            purge: function () {
                return this.query('purge');
            },
            has: function (id) {
                return this.query('has', id);
            },
            query: function (op, id, doc) {
                if (that.options.cache) {
                    switch (op) {
                        case 'has'  : return id in this.store;
                        case 'get'  : return this.store[id];
                        case 'save' : return this.store[id] = doc;
                        case 'purge': if (id) { delete(this.store[id]) }
                                      else { this.store = {} };
                                      break;
                    }
                } else { return false }
            }
        },
        query: function (method, path, options, data, headers) {
            return that.request(
                method, [name, path].join('/'), options, data, headers
            );
        },
        exists: function () {
            var promise = new(events.Promise);

            this.query('GET', '/').addCallback(function (res) {
                promise.emitSuccess(true);
            }).addErrback(function (res) {
                if (res._headers.status === 404) {
                    promise.emitSuccess(false);
                } else if (res._headers.status === 200) {
                    promise.emitError(res);
                }
            });
            return promise;
        },
        get: function (id, rev) {
            var that = this, options = {};

            if (typeof(rev) === 'string') { options = {rev: rev} }
            else if (rev && typeof(rev) === 'object') { options = rev }

            return this.query('GET', id, options).addCallback(function (res) {
                that.cache.save(res.id, res.doc);
            });
        },
        save: function (/* [id], [rev], doc, ... */) {
            var id, doc = {}, that = this, args = Array.prototype.slice.call(arguments);

            // PUT a single document, with an id
            if (typeof(args[0]) === 'string' && args.length > 1) {
                id = args[0];
                // Design document
                if (/^_design\/\w+$/.test(id)) {
                    doc.language = "javascript";
                    doc.views = args[args.length - 1];
                } else {
                    doc = args[args.length - 1];
                }
                // _rev
                if (typeof(args[1]) === 'string') { doc._rev = args[1] }
                else if (!doc._rev && this.cache.has(id)) {
                    doc._rev = this.cache.get(id)._rev;
                }

                return this.query('PUT', id, {}, doc).addCallback(writeThrough);
            // POST a single document
            } else if (args.length === 1 && !Array.isArray(args[0])) {
                doc = args[0];
                return this.query('POST', '/', {}, doc).addCallback(writeThrough);
            // Bulk insert
            } else {
                if (Array.isArray(args[0])) {
                    doc = {docs: args[0]};
                    if (args[1] === true) { doc.all_or_nothing = true }
                } else {
                    doc = {docs: args};    
                }
                return this.query('POST', '/_bulk_docs', {}, doc);
            }

            function writeThrough(res) {
                that.cache.save(id, process.mixin({}, doc, { _rev: res.rev })); 
            }
        },
        update: function (id, obj) {
            var doc = this.cache.get(id);
            if (doc) {
                return this.save(id, process.mixin(true, {}, doc, obj));
            } else {
                throw new(Error)(id + " wasn't found in cache-store, couldn't update");
            }
        },
        destroy: function () {
            if (arguments.length > 0) {
                throw new(Error)("destroy() doesn't take any arguments");
            } else {
                return this.query('DELETE', '/');
            }
        },
        remove: function (id, rev) {
            var that = this, doc;
            if (! rev) {
                if (doc = this.cache.get(id)) { rev = doc._rev }
                else { throw new(Error)("rev needs to be supplied") }
            }
            return this.query('DELETE', id, {rev: rev}).addCallback(function (res) {
                that.cache.purge(id);
            });
        },
        create: function () {
            return this.query('PUT', '/');
        },
        info: function () {
            return this.query('GET', '/');
        },
        all: function (options) {
            return this.query('GET', '/_all_docs', options);
        },
        compact: function (design) {
            return this.query('POST', '/_compact' + (design ? '/' + design : ''));
        },
        viewCleanup: function () {
            return this.query('POST', '/_view_cleanup');
        },
        allBySeq: function (options) {
            return this.query('GET', '/_all_docs_by_seq', options);
        },
        view: function (path, options) {
            path = path.split('/');

            if (options) {
                ['key', 'startkey', 'endkey'].forEach(function (k) {
                    if (k in options) { options[k] = JSON.stringify(options[k]) }
                });
            }

            return this.query(
                'GET', ['_design', path[0], '_view', path[1]].join('/'), options
            );
        },

        push: function (doc) {}
    }

};
