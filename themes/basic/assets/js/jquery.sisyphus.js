!(function (a) {
  a.fn.sisyphus = function (b) {
    var c = a
        .map(this, function (b) {
          return a(b).attr('id') + a(b).attr('name');
        })
        .join(),
      d = Sisyphus.getInstance(c);
    return d.protect(this, b), d;
  };
  var b = {};
  (b.isAvailable = function () {
    if ('object' == typeof a.jStorage) return !0;
    try {
      return localStorage.getItem;
    } catch (b) {
      return !1;
    }
  }),
    (b.set = function (b, c) {
      if ('object' == typeof a.jStorage) a.jStorage.set(b, c + '');
      else
        try {
          localStorage.setItem(b, c + '');
        } catch (d) {}
    }),
    (b.get = function (b) {
      if ('object' == typeof a.jStorage) {
        var c = a.jStorage.get(b);
        return c ? c.toString() : c;
      }
      return localStorage.getItem(b);
    }),
    (b.remove = function (b) {
      'object' == typeof a.jStorage ? a.jStorage.deleteKey(b) : localStorage.removeItem(b);
    }),
    (Sisyphus = (function () {
      function d() {
        return {
          setInstanceIdentifier: function (a) {
            this.identifier = a;
          },
          getInstanceIdentifier: function () {
            return this.identifier;
          },
          setInitialOptions: function (c) {
            var d = {
              excludeFields: [],
              customKeySuffix: '',
              locationBased: !1,
              timeout: 0,
              autoRelease: !0,
              onSave: function () {},
              onBeforeRestore: function () {},
              onRestore: function () {},
              onRelease: function () {},
            };
            (this.options = this.options || a.extend(d, c)), (this.browserStorage = b);
          },
          setOptions: function (b) {
            (this.options = this.options || this.setInitialOptions(b)),
              (this.options = a.extend(this.options, b));
          },
          protect: function (b, d) {
            this.setOptions(d), (b = b || {});
            var e = this;
            if (
              ((this.targets = this.targets || []),
              (this.href = location.hostname + location.pathname + location.search + location.hash),
              (this.targets = a.merge(this.targets, b)),
              (this.targets = a.unique(this.targets)),
              (this.targets = a(this.targets)),
              !this.browserStorage.isAvailable())
            )
              return !1;
            var f = e.options.onBeforeRestore.call(e);
            if (
              ((void 0 === f || f) && e.restoreAllData(),
              this.options.autoRelease && e.bindReleaseData(),
              !c.started[this.getInstanceIdentifier()])
            )
              if (e.isCKEditorPresent())
                var g = setInterval(function () {
                  CKEDITOR.isLoaded &&
                    (clearInterval(g),
                    e.bindSaveData(),
                    (c.started[e.getInstanceIdentifier()] = !0));
                }, 100);
              else e.bindSaveData(), (c.started[e.getInstanceIdentifier()] = !0);
          },
          isCKEditorPresent: function () {
            return this.isCKEditorExists()
              ? ((CKEDITOR.isLoaded = !1),
                CKEDITOR.on('instanceReady', function () {
                  CKEDITOR.isLoaded = !0;
                }),
                !0)
              : !1;
          },
          isCKEditorExists: function () {
            return 'undefined' != typeof CKEDITOR;
          },
          bindSaveData: function () {
            var b = this;
            b.options.timeout && b.saveDataByTimeout(),
              b.targets.each(function () {
                var c = a(this).attr('id') + a(this).attr('name'),
                  d = a(this)
                    .find(':input')
                    .not(':submit')
                    .not(':reset')
                    .not(':button')
                    .not(':file')
                    .not(':password');
                d.each(function () {
                  if (-1 !== a.inArray(this, b.options.excludeFields)) return !0;
                  var d = a(this),
                    e =
                      (b.options.locationBased ? b.href : '') +
                      c +
                      d.attr('name') +
                      b.options.customKeySuffix;
                  (d.is(':text') || d.is('textarea')) &&
                    (b.options.timeout || b.bindSaveDataImmediately(d, e)),
                    b.bindSaveDataOnChange(d, e);
                });
              });
          },
          saveAllData: function () {
            var b = this;
            b.targets.each(function () {
              var c = a(this).attr('id') + a(this).attr('name'),
                d = a(this)
                  .find(':input')
                  .not(':submit')
                  .not(':reset')
                  .not(':button')
                  .not(':file')
                  .not(':password'),
                e = {};
              d.each(function () {
                var d = a(this);
                if (-1 !== a.inArray(this, b.options.excludeFields) || void 0 === d.attr('name'))
                  return !0;
                var f =
                    (b.options.locationBased ? b.href : '') +
                    c +
                    d.attr('name') +
                    b.options.customKeySuffix,
                  g = d.val();
                if (d.is(':checkbox')) {
                  if (-1 !== d.attr('name').indexOf('[')) {
                    if (e[d.attr('name')] === !0) return;
                    (g = []),
                      a("[name='" + d.attr('name') + "']:checked").each(function () {
                        g.push(a(this).val());
                      }),
                      (e[d.attr('name')] = !0);
                  } else g = d.is(':checked');
                  b.saveToBrowserStorage(f, g, !1);
                } else if (d.is(':radio'))
                  d.is(':checked') && ((g = d.val()), b.saveToBrowserStorage(f, g, !1));
                else if (b.isCKEditorExists()) {
                  var h;
                  (h = CKEDITOR.instances[d.attr('name')] || CKEDITOR.instances[d.attr('id')])
                    ? (h.updateElement(), b.saveToBrowserStorage(f, d.val(), !1))
                    : b.saveToBrowserStorage(f, g, !1);
                } else b.saveToBrowserStorage(f, g, !1);
              });
            }),
              b.options.onSave.call(b);
          },
          restoreAllData: function () {
            var b = this,
              c = !1;
            b.targets.each(function () {
              var d = a(this),
                e = a(this).attr('id') + a(this).attr('name'),
                f = d
                  .find(':input')
                  .not(':submit')
                  .not(':reset')
                  .not(':button')
                  .not(':file')
                  .not(':password');
              f.each(function () {
                if (-1 !== a.inArray(this, b.options.excludeFields)) return !0;
                var d = a(this),
                  f =
                    (b.options.locationBased ? b.href : '') +
                    e +
                    d.attr('name') +
                    b.options.customKeySuffix,
                  g = b.browserStorage.get(f);
                null !== g && (b.restoreFieldsData(d, g), (c = !0));
              });
            }),
              c && b.options.onRestore.call(b);
          },
          restoreFieldsData: function (a, b) {
            return void 0 === a.attr('name')
              ? !1
              : (a.is(':checkbox') && 'false' !== b && -1 === a.attr('name').indexOf('[')
                  ? a.attr('checked', 'checked')
                  : a.is(':checkbox') && 'false' === b && -1 === a.attr('name').indexOf('[')
                  ? a.removeAttr('checked')
                  : a.is(':radio')
                  ? a.val() === b && a.attr('checked', 'checked')
                  : -1 === a.attr('name').indexOf('[')
                  ? a.val(b)
                  : ((b = b.split(',')), a.val(b)),
                void 0);
          },
          bindSaveDataImmediately: function (a, b) {
            var c = this;
            if (
              ('onpropertychange' in a
                ? (a.get(0).onpropertychange = function () {
                    c.saveToBrowserStorage(b, a.val());
                  })
                : (a.get(0).oninput = function () {
                    c.saveToBrowserStorage(b, a.val());
                  }),
              this.isCKEditorExists())
            ) {
              var d;
              (d = CKEDITOR.instances[a.attr('name')] || CKEDITOR.instances[a.attr('id')]) &&
                d.document.on('keyup', function () {
                  d.updateElement(), c.saveToBrowserStorage(b, a.val());
                });
            }
          },
          saveToBrowserStorage: function (a, b, c) {
            (c = void 0 === c ? !0 : c),
              this.browserStorage.set(a, b),
              c && '' !== b && this.options.onSave.call(this);
          },
          bindSaveDataOnChange: function (a) {
            var c = this;
            a.change(function () {
              c.saveAllData();
            });
          },
          saveDataByTimeout: function () {
            var a = this,
              b = a.targets;
            setTimeout(
              (function () {
                function c() {
                  a.saveAllData(), setTimeout(c, 1e3 * a.options.timeout);
                }
                return c;
              })(b),
              1e3 * a.options.timeout,
            );
          },
          bindReleaseData: function () {
            var b = this;
            b.targets.each(function () {
              var d = a(this),
                e = d
                  .find(':input')
                  .not(':submit')
                  .not(':reset')
                  .not(':button')
                  .not(':file')
                  .not(':password'),
                f = d.attr('id') + d.attr('name');
              a(this).bind('submit reset', function () {
                b.releaseData(f, e);
              });
            });
          },
          manuallyReleaseData: function () {
            var b = this;
            b.targets.each(function () {
              var d = a(this),
                e = d
                  .find(':input')
                  .not(':submit')
                  .not(':reset')
                  .not(':button')
                  .not(':file')
                  .not(':password'),
                f = d.attr('id') + d.attr('name');
              b.releaseData(f, e);
            });
          },
          releaseData: function (b, d) {
            var e = !1,
              f = this;
            (c.started[f.getInstanceIdentifier()] = !1),
              d.each(function () {
                if (-1 !== a.inArray(this, f.options.excludeFields)) return !0;
                var c = a(this),
                  d =
                    (f.options.locationBased ? f.href : '') +
                    b +
                    c.attr('name') +
                    f.options.customKeySuffix;
                f.browserStorage.remove(d), (e = !0);
              }),
              e && f.options.onRelease.call(f);
          },
        };
      }
      var c = { instantiated: [], started: [] };
      return {
        getInstance: function (a) {
          return (
            c.instantiated[a] ||
              ((c.instantiated[a] = d()),
              c.instantiated[a].setInstanceIdentifier(a),
              c.instantiated[a].setInitialOptions()),
            a ? c.instantiated[a] : c.instantiated[a]
          );
        },
        free: function () {
          return (c = { instantiated: [], started: [] }), null;
        },
        version: '1.1.107',
      };
    })());
})(jQuery);
