/*! Sortable 1.8.0-rc1 - MIT | git://github.com/SortableJS/Sortable.git */

!(function (t) {
  'use strict';
  'function' == typeof define && define.amd
    ? define(t)
    : 'undefined' != typeof module && void 0 !== module.exports
    ? (module.exports = t())
    : (window.Sortable = t());
})(function () {
  'use strict';
  if ('undefined' == typeof window || !window.document)
    return function () {
      throw new Error('Sortable.js requires a window with a document');
    };
  var T,
    S,
    E,
    x,
    A,
    B,
    h,
    w,
    y,
    D,
    c,
    i,
    N,
    P,
    l,
    s,
    d,
    u,
    C,
    X,
    Y,
    k,
    R,
    t,
    o,
    I = [],
    M = !1,
    H = !1,
    O = !1,
    r = /\s+/g,
    L = 'Sortable' + new Date().getTime(),
    F = window,
    f = F.document,
    W = F.parseInt,
    U = F.setTimeout,
    e = F.jQuery || F.Zepto,
    n = F.Polymer,
    a = { capture: !1, passive: !1 },
    p = 'draggable' in f.createElement('div'),
    g =
      !navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i) &&
      (((t = f.createElement('x')).style.cssText = 'pointer-events:auto'),
      'auto' === t.style.pointerEvents),
    j = !1,
    v = !1,
    z = Math.abs,
    m = Math.min,
    _ = [],
    b = [],
    V = function (t, e) {
      var n = it(t),
        i = W(n.width),
        o = ct(t, 0, e),
        r = ct(t, 1, e),
        a = o && it(o),
        l = r && it(r),
        s = a && W(a.marginLeft) + W(a.marginRight) + o.getBoundingClientRect().width,
        c = l && W(l.marginLeft) + W(l.marginRight) + r.getBoundingClientRect().width;
      return 'flex' === n.display
        ? 'column' === n.flexDirection || 'column-reverse' === n.flexDirection
          ? 'vertical'
          : 'horizontal'
        : o &&
          ('block' === a.display ||
            'grid' === a.display ||
            (i <= s && 'none' === n.float) ||
            (r && 'none' === n.float && i < s + c))
        ? 'vertical'
        : 'horizontal';
    },
    q = function (t, e) {
      if (!t || !t.getBoundingClientRect) return F;
      var n = t,
        i = !1;
      do {
        if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
          var o = it(n);
          if (
            (n.clientWidth < n.scrollWidth && ('auto' == o.overflowX || 'scroll' == o.overflowX)) ||
            (n.clientHeight < n.scrollHeight && ('auto' == o.overflowY || 'scroll' == o.overflowY))
          ) {
            if (!n || !n.getBoundingClientRect || n === f.body) return F;
            if (i || e) return n;
            i = !0;
          }
        }
      } while ((n = n.parentNode));
      return F;
    },
    G = pt(function (n, t, e, i) {
      if (t.scroll) {
        var o,
          r,
          a,
          l,
          s = e ? e[L] : window,
          c = t.scrollSensitivity,
          d = t.scrollSpeed,
          h = n.clientX,
          u = n.clientY,
          f = window.innerWidth,
          p = window.innerHeight,
          g = !1;
        y !== e && (Z(), (w = t.scroll), (D = t.scrollFn), !0 === w && ((w = q(e, !0)), (y = w)));
        var v = 0,
          m = w;
        do {
          var _;
          if (
            (m && m !== F
              ? ((r = it((_ = m))),
                (o = m.getBoundingClientRect()),
                (a =
                  _.clientWidth < _.scrollWidth &&
                  ('auto' == r.overflowX || 'scroll' == r.overflowX) &&
                  (z(o.right - h) <= c) - (z(o.left - h) <= c)),
                (l =
                  _.clientHeight < _.scrollHeight &&
                  ('auto' == r.overflowY || 'scroll' == r.overflowY) &&
                  (z(o.bottom - u) <= c) - (z(o.top - u) <= c)))
              : m === F && ((_ = F), (a = (f - h <= c) - (h <= c)), (l = (p - u <= c) - (u <= c))),
            !I[v])
          )
            for (var b = 0; b <= v; b++) I[b] || (I[b] = {});
          (I[v].vx == a && I[v].vy == l && I[v].el === _) ||
            ((I[v].el = _),
            (I[v].vx = a),
            (I[v].vy = l),
            clearInterval(I[v].pid),
            !_ ||
              (0 == a && 0 == l) ||
              ((g = !0),
              (I[v].pid = setInterval(
                function () {
                  i && 0 === this.layer && K.active._emulateDragOver(!0);
                  var t = I[this.layer].vy ? I[this.layer].vy * d : 0,
                    e = I[this.layer].vx ? I[this.layer].vx * d : 0;
                  ('function' == typeof D &&
                    'continue' !== D.call(s, e, t, n, C, I[this.layer].el)) ||
                    (I[this.layer].el === F
                      ? F.scrollTo(F.pageXOffset + e, F.pageYOffset + t)
                      : ((I[this.layer].el.scrollTop += t), (I[this.layer].el.scrollLeft += e)));
                }.bind({ layer: v }),
                24,
              )))),
            v++;
        } while (t.bubbleScroll && m !== F && (m = q(m, !1)));
        M = g;
      }
    }, 30),
    Z = function () {
      I.forEach(function (t) {
        clearInterval(t.pid);
      }),
        (I = []);
    },
    Q = function (t) {
      function e(a, l) {
        return function (t, e, n, i) {
          var o;
          if (null == a && l) o = !0;
          else if (null == a || !1 === a) o = !1;
          else if (l && 'clone' === a) o = a;
          else if ('function' == typeof a) o = a(t, e, n, i);
          else {
            var r = (l ? t : e).options.group.name;
            o = !0 === a || ('string' == typeof a && a === r) || (a.join && -1 < a.indexOf(r));
          }
          return (
            o ||
            (t.options.group.name &&
              e.options.group.name &&
              t.options.group.name === e.options.group.name)
          );
        };
      }
      var n = {},
        i = t.group;
      (i && 'object' == typeof i) || (i = { name: i }),
        (n.name = i.name),
        (n.checkPull = e(i.pull, !0)),
        (n.checkPut = e(i.put)),
        (n.revertClone = i.revertClone),
        (t.group = n);
    },
    J = function (t) {
      T && T.parentNode[L] && T.parentNode[L]._computeIsAligned(t);
    };
  function K(t, e) {
    if (!t || !t.nodeType || 1 !== t.nodeType)
      throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(t);
    (this.el = t), (this.options = e = gt({}, e)), (t[L] = this);
    var n = {
      group: null,
      sort: !0,
      disabled: !1,
      store: null,
      handle: null,
      scroll: !0,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0,
      draggable: /[uo]l/i.test(t.nodeName) ? 'li' : '>*',
      swapThreshold: 1,
      invertSwap: !1,
      invertedSwapThreshold: null,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      ignore: 'a, img',
      filter: null,
      preventOnFilter: !0,
      animation: 0,
      setData: function (t, e) {
        t.setData('Text', e.textContent);
      },
      dropBubble: !1,
      dragoverBubble: !1,
      dataIdAttr: 'data-id',
      delay: 0,
      touchStartThreshold: W(window.devicePixelRatio, 10) || 1,
      forceFallback: !1,
      fallbackClass: 'sortable-fallback',
      fallbackOnBody: !1,
      fallbackTolerance: 0,
      fallbackOffset: { x: 0, y: 0 },
      supportPointer:
        !1 !== K.supportPointer &&
        ('PointerEvent' in window || (window.navigator && 'msPointerEnabled' in window.navigator)),
    };
    for (var i in n) !(i in e) && (e[i] = n[i]);
    for (var o in ('direction' in e ||
      (e.direction = function () {
        return V(t, e);
      }),
    Q(e),
    null == e.invertedSwapThreshold && (e.invertedSwapThreshold = e.swapThreshold),
    this))
      '_' === o.charAt(0) && 'function' == typeof this[o] && (this[o] = this[o].bind(this));
    (this.nativeDraggable = !e.forceFallback && p),
      tt(t, 'mousedown', this._onTapStart),
      tt(t, 'touchstart', this._onTapStart),
      e.supportPointer && tt(t, 'pointerdown', this._onTapStart),
      this.nativeDraggable && (tt(t, 'dragover', this), tt(t, 'dragenter', this)),
      b.push(this._onDragOver),
      e.store && e.store.get && this.sort(e.store.get(this) || []);
  }
  function $(t, e, n, i) {
    if (t) {
      n = n || f;
      do {
        if (('>*' === e && t.parentNode === n) || ft(t, e) || (i && t === n)) return t;
        if (t === n) break;
      } while ((t = (o = t).host && o !== f && o.host.nodeType ? o.host : o.parentNode));
    }
    var o;
    return null;
  }
  function tt(t, e, n) {
    t.addEventListener(e, n, a);
  }
  function et(t, e, n) {
    t.removeEventListener(e, n, a);
  }
  function nt(t, e, n) {
    if (t && e)
      if (t.classList) t.classList[n ? 'add' : 'remove'](e);
      else {
        var i = (' ' + t.className + ' ').replace(r, ' ').replace(' ' + e + ' ', ' ');
        t.className = (i + (n ? ' ' + e : '')).replace(r, ' ');
      }
  }
  function it(t, e, n) {
    var i = t && t.style;
    if (i) {
      if (void 0 === n)
        return (
          f.defaultView && f.defaultView.getComputedStyle
            ? (n = f.defaultView.getComputedStyle(t, ''))
            : t.currentStyle && (n = t.currentStyle),
          void 0 === e ? n : n[e]
        );
      e in i || (e = '-webkit-' + e), (i[e] = n + ('string' == typeof n ? '' : 'px'));
    }
  }
  function ot(t, e, n) {
    if (t) {
      var i = t.getElementsByTagName(e),
        o = 0,
        r = i.length;
      if (n) for (; o < r; o++) n(i[o], o);
      return i;
    }
    return [];
  }
  function rt(t, e, n, i, o, r, a, l, s) {
    var c,
      d = (t = t || e[L]).options,
      h = 'on' + n.charAt(0).toUpperCase() + n.substr(1);
    window.CustomEvent
      ? (c = new CustomEvent(n, { bubbles: !0, cancelable: !0 }))
      : (c = f.createEvent('Event')).initEvent(n, !0, !0),
      (c.to = o || e),
      (c.from = r || e),
      (c.item = i || e),
      (c.clone = x),
      (c.oldIndex = a),
      (c.newIndex = l),
      (c.originalEvent = s),
      e.dispatchEvent(c),
      d[h] && d[h].call(t, c);
  }
  function at(t, e, n, i, o, r, a, l) {
    var s,
      c,
      d = t[L],
      h = d.options.onMove;
    return (
      window.CustomEvent
        ? (s = new CustomEvent('move', { bubbles: !0, cancelable: !0 }))
        : (s = f.createEvent('Event')).initEvent('move', !0, !0),
      (s.to = e),
      (s.from = t),
      (s.dragged = n),
      (s.draggedRect = i),
      (s.related = o || e),
      (s.relatedRect = r || e.getBoundingClientRect()),
      (s.willInsertAfter = l),
      (s.originalEvent = a),
      t.dispatchEvent(s),
      h && (c = h.call(d, s, a)),
      c
    );
  }
  function lt(t) {
    t.draggable = !1;
  }
  function st() {
    j = !1;
  }
  function ct(t, e, n) {
    for (var i = 0, o = 0, r = t.children; o < r.length; ) {
      if (
        'none' !== r[o].style.display &&
        r[o] !== E &&
        r[o] !== T &&
        $(r[o], n.draggable, t, !1)
      ) {
        if (i === e) return r[o];
        i++;
      }
      o++;
    }
    return null;
  }
  function dt(t) {
    var e = t.lastElementChild;
    return e === E && (e = t.children[t.childElementCount - 2]), e || null;
  }
  function ht(t) {
    for (
      var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, i = 0;
      n--;

    )
      i += e.charCodeAt(n);
    return i.toString(36);
  }
  function ut(t, e) {
    var n = 0;
    if (!t || !t.parentNode) return -1;
    for (; t && (t = t.previousElementSibling); )
      'TEMPLATE' === t.nodeName.toUpperCase() || ('>*' !== e && !ft(t, e)) || n++;
    return n;
  }
  function ft(t, e) {
    if (t)
      try {
        if (t.matches) return t.matches(e);
        if (t.msMatchesSelector) return t.msMatchesSelector(e);
      } catch (t) {
        return !1;
      }
    return !1;
  }
  function pt(n, i) {
    return function () {
      if (!o) {
        var t = arguments,
          e = this;
        o = U(function () {
          1 === t.length ? n.call(e, t[0]) : n.apply(e, t), (o = void 0);
        }, i);
      }
    };
  }
  function gt(t, e) {
    if (t && e) for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    return t;
  }
  function vt(t) {
    return n && n.dom ? n.dom(t).cloneNode(!0) : e ? e(t).clone(!0)[0] : t.cloneNode(!0);
  }
  function mt(t) {
    return U(t, 0);
  }
  function _t(t) {
    return clearTimeout(t);
  }
  function bt(t) {
    K.active && t.cancelable && t.preventDefault();
  }
  return (
    (K.prototype = {
      constructor: K,
      _isAligned: !0,
      _computeIsAligned: function (t, e) {
        var n, i, o, r, a, l, s;
        v ||
          (T &&
            T.parentNode === this.el &&
            (!0 !== e && !1 !== e && (e = !!$(t.target, null, T, !0)),
            (this._isAligned =
              !M &&
              (e ||
                (this._isAligned &&
                  ((n = t.clientX),
                  (i = t.clientY),
                  this.el,
                  (o = this._getDirection(t, null)),
                  this.options,
                  (r = R || T.getBoundingClientRect()),
                  (a = 'vertical' === o ? r.left : r.top),
                  (l = 'vertical' === o ? r.right : r.bottom),
                  a < (s = 'vertical' === o ? n : i) && s < l)))),
            (v = !0),
            U(function () {
              v = !1;
            }, 30)));
      },
      _getDirection: function (t, e) {
        return 'function' == typeof this.options.direction
          ? this.options.direction.call(this, t, e, T)
          : this.options.direction;
      },
      _onTapStart: function (t) {
        var e,
          n = this,
          i = this.el,
          o = this.options,
          r = o.preventOnFilter,
          a = t.type,
          l = t.touches && t.touches[0],
          s = (l || t).target,
          c =
            (t.target.shadowRoot &&
              ((t.path && t.path[0]) || (t.composedPath && t.composedPath()[0]))) ||
            s,
          d = o.filter;
        if (
          ((function (t) {
            _.length = 0;
            var e = t.getElementsByTagName('input'),
              n = e.length;
            for (; n--; ) {
              var i = e[n];
              i.checked && _.push(i);
            }
          })(i),
          !T &&
            !((/mousedown|pointerdown/.test(a) && 0 !== t.button) || o.disabled) &&
            !c.isContentEditable &&
            (s = $(s, o.draggable, i, !0)) &&
            h !== s)
        ) {
          if (((e = ut(s, o.draggable)), 'function' == typeof d)) {
            if (d.call(this, t, s, this))
              return rt(n, c, 'filter', s, i, i, e), void (r && t.cancelable && t.preventDefault());
          } else if (
            d &&
            (d = d.split(',').some(function (t) {
              if ((t = $(c, t.trim(), i, !1))) return rt(n, t, 'filter', s, i, i, e), !0;
            }))
          )
            return void (r && t.cancelable && t.preventDefault());
          (o.handle && !$(c, o.handle, i, !1)) || this._prepareDragStart(t, l, s, e);
        }
      },
      _handleAutoScroll: function (e, t) {
        if (T && this.options.scroll) {
          var n = e.clientX,
            i = e.clientY,
            o = f.elementFromPoint(n, i),
            r = this;
          if (
            t ||
            (window.navigator && -1 < window.navigator.userAgent.toLowerCase().indexOf('firefox'))
          ) {
            G(e, r.options, o, !0);
            var a = q(o, !0);
            !M ||
              (l && n === s && i === d) ||
              (l && clearInterval(l),
              (l = setInterval(function () {
                if (T) {
                  var t = q(f.elementFromPoint(n, i), !0);
                  t !== a && ((a = t), Z(), G(e, r.options, a, !0));
                }
              }, 10)),
              (s = n),
              (d = i));
          } else {
            if (!r.options.bubbleScroll || q(o, !0) === window) return void Z();
            G(e, r.options, q(o, !1));
          }
        }
      },
      _prepareDragStart: function (t, e, n, i) {
        var o,
          r = this,
          a = r.el,
          l = r.options,
          s = a.ownerDocument;
        n &&
          !T &&
          n.parentNode === a &&
          ((u = t),
          (A = a),
          (S = (T = n).parentNode),
          (B = T.nextSibling),
          (h = n),
          (N = l.group),
          (c = i),
          (this._lastX = (e || t).clientX),
          (this._lastY = (e || t).clientY),
          (T.style['will-change'] = 'all'),
          (o = function () {
            r._disableDelayedDrag(),
              (T.draggable = r.nativeDraggable),
              r._triggerDragStart(t, e),
              rt(r, A, 'choose', T, A, A, c),
              nt(T, l.chosenClass, !0);
          }),
          l.ignore.split(',').forEach(function (t) {
            ot(T, t.trim(), lt);
          }),
          tt(s, 'mouseup', r._onDrop),
          tt(s, 'touchend', r._onDrop),
          tt(s, 'touchcancel', r._onDrop),
          l.supportPointer && tt(s, 'pointercancel', r._onDrop),
          l.delay
            ? (tt(s, 'mouseup', r._disableDelayedDrag),
              tt(s, 'touchend', r._disableDelayedDrag),
              tt(s, 'touchcancel', r._disableDelayedDrag),
              tt(s, 'mousemove', r._delayedDragTouchMoveHandler),
              tt(s, 'touchmove', r._delayedDragTouchMoveHandler),
              l.supportPointer && tt(s, 'pointermove', r._delayedDragTouchMoveHandler),
              (r._dragStartTimer = U(o.bind(r), l.delay)))
            : o());
      },
      _delayedDragTouchMoveHandler: function (t) {
        var e = t.touches ? t.touches[0] : t;
        m(z(e.clientX - this._lastX), z(e.clientY - this._lastY)) >=
          this.options.touchStartThreshold && this._disableDelayedDrag();
      },
      _disableDelayedDrag: function () {
        var t = this.el.ownerDocument;
        clearTimeout(this._dragStartTimer),
          et(t, 'mouseup', this._disableDelayedDrag),
          et(t, 'touchend', this._disableDelayedDrag),
          et(t, 'touchcancel', this._disableDelayedDrag),
          et(t, 'mousemove', this._delayedDragTouchMoveHandler),
          et(t, 'touchmove', this._delayedDragTouchMoveHandler),
          et(t, 'pointermove', this._delayedDragTouchMoveHandler);
      },
      _triggerDragStart: function (t, e) {
        (e = e || ('touch' == t.pointerType ? t : null))
          ? ((u = { target: T, clientX: e.clientX, clientY: e.clientY }),
            this._onDragStart(u, 'touch'))
          : this.nativeDraggable
          ? (tt(T, 'dragend', this), tt(A, 'dragstart', this._onDragStart))
          : this._onDragStart(u, !0);
        try {
          f.selection
            ? mt(function () {
                f.selection.empty();
              })
            : window.getSelection().removeAllRanges();
        } catch (t) {}
      },
      _dragStarted: function () {
        if (A && T) {
          this.nativeDraggable && (tt(f, 'dragover', this._handleAutoScroll), tt(f, 'dragover', J));
          var t = this.options;
          nt(T, t.dragClass, !1),
            nt(T, t.ghostClass, !0),
            it(T, 'transform', ''),
            ((K.active = this)._isAligned = !0),
            rt(this, A, 'start', T, A, A, c);
        } else this._nulling();
      },
      _emulateDragOver: function (t) {
        if (C) {
          if (this._lastX === C.clientX && this._lastY === C.clientY && !t) return;
          (this._lastX = C.clientX), (this._lastY = C.clientY), g || it(E, 'display', 'none');
          for (
            var e = f.elementFromPoint(C.clientX, C.clientY), n = e, i = !!$(e, null, T, !0);
            e && e.shadowRoot;

          )
            n = e = e.shadowRoot.elementFromPoint(C.clientX, C.clientY);
          if (n)
            do {
              if (n[L]) {
                for (var o = b.length; o--; )
                  b[o]({ clientX: C.clientX, clientY: C.clientY, target: e, rootEl: n });
                if (!this.options.dragoverBubble) break;
              }
              e = n;
            } while ((n = n.parentNode));
          T.parentNode[L]._computeIsAligned(C, i), g || it(E, 'display', '');
        }
      },
      _onTouchMove: function (t) {
        if (u) {
          var e = this.options,
            n = e.fallbackTolerance,
            i = e.fallbackOffset,
            o = t.touches ? t.touches[0] : t,
            r = o.clientX - u.clientX + i.x,
            a = o.clientY - u.clientY + i.y,
            l = t.touches
              ? 'translate3d(' + r + 'px,' + a + 'px,0)'
              : 'translate(' + r + 'px,' + a + 'px)';
          if (this.options.supportPointer && 'touchmove' === t.type) return;
          if (!K.active) {
            if (n && m(z(o.clientX - this._lastX), z(o.clientY - this._lastY)) < n) return;
            this._dragStarted();
          }
          this._appendGhost(),
            this._handleAutoScroll(o, !0),
            (X = !0),
            (C = o),
            it(E, 'webkitTransform', l),
            it(E, 'mozTransform', l),
            it(E, 'msTransform', l),
            it(E, 'transform', l),
            t.cancelable && t.preventDefault();
        }
      },
      _appendGhost: function () {
        if (!E) {
          var t,
            e = T.getBoundingClientRect(),
            n = it(T),
            i = this.options;
          nt((E = T.cloneNode(!0)), i.ghostClass, !1),
            nt(E, i.fallbackClass, !0),
            nt(E, i.dragClass, !0),
            it(E, 'top', e.top - W(n.marginTop, 10)),
            it(E, 'left', e.left - W(n.marginLeft, 10)),
            it(E, 'width', e.width),
            it(E, 'height', e.height),
            it(E, 'opacity', '0.8'),
            it(E, 'position', 'fixed'),
            it(E, 'zIndex', '100000'),
            it(E, 'pointerEvents', 'none'),
            (i.fallbackOnBody && f.body.appendChild(E)) || A.appendChild(E),
            (t = E.getBoundingClientRect()),
            it(E, 'width', 2 * e.width - t.width),
            it(E, 'height', 2 * e.height - t.height);
        }
      },
      _onDragStart: function (t, e) {
        var n = this,
          i = t.dataTransfer,
          o = n.options;
        n._offUpEvents(),
          N.checkPull(n, n, T, t) &&
            (((x = vt(T)).draggable = !1),
            (x.style['will-change'] = ''),
            this._hideClone(),
            nt(x, n.options.chosenClass, !1),
            (n._cloneId = mt(function () {
              A.insertBefore(x, T), rt(n, A, 'clone', T);
            }))),
          nt(T, o.dragClass, !0),
          e
            ? ('touch' === e
                ? (tt(f, 'touchmove', bt),
                  tt(f, 'touchmove', n._onTouchMove),
                  tt(f, 'touchend', n._onDrop),
                  tt(f, 'touchcancel', n._onDrop),
                  o.supportPointer &&
                    (tt(f, 'pointermove', n._onTouchMove), tt(f, 'pointerup', n._onDrop)))
                : (tt(f, 'mousemove', n._onTouchMove), tt(f, 'mouseup', n._onDrop)),
              (n._loopId = setInterval(n._emulateDragOver, 50)),
              nt(T, o.dragClass, !1))
            : (i && ((i.effectAllowed = 'move'), o.setData && o.setData.call(n, i, T)),
              tt(f, 'drop', n),
              it(T, 'transform', 'translateZ(0)'),
              (n._dragStartId = mt(n._dragStarted))),
          tt(f, 'selectstart', n);
      },
      _onDragOver: function (t) {
        var e,
          n,
          i,
          o,
          r,
          a,
          l,
          s,
          c,
          d,
          h,
          u,
          f = this.el,
          p = this.options,
          g = p.group,
          v = K.active,
          m = N === g,
          _ = p.sort;
        if (
          (void 0 === t.rootEl || t.rootEl === this.el) &&
          (p.dragoverBubble ||
            t.rootEl ||
            (this._handleAutoScroll(t), T.parentNode[L]._computeIsAligned(t)),
          void 0 !== t.preventDefault &&
            (t.cancelable && t.preventDefault(), !p.dragoverBubble && t.stopPropagation()),
          (X = !0),
          (e = $(t.target, p.draggable, f, !0)),
          !((T.animated && e === T) || e.animated || j) &&
            (e !== Y && ((H = O = !1), (Y = null)),
            v &&
              !p.disabled &&
              (m
                ? _ || (o = !A.contains(T))
                : P === this ||
                  ((this.lastPutMode = N.checkPull(this, v, T, t)) && g.checkPut(this, v, T, t)))))
        ) {
          var b,
            w = this._getDirection(t, e);
          if (
            ((n = T.getBoundingClientRect()),
            P !== this && this !== K.active
              ? ((P = this), !0)
              : this === K.active && (!1, (P = null)),
            o)
          )
            return (
              this._hideClone(),
              (S = A),
              void (x || B ? A.insertBefore(T, x || B) : _ || A.appendChild(T))
            );
          if (
            0 === f.children.length ||
            f.children[0] === E ||
            (f === t.target &&
              ((r = t),
              (a = w),
              (l = dt(f).getBoundingClientRect()),
              (s = 'vertical' === a ? r.clientY : r.clientX),
              (c = 'vertical' === a ? r.clientX : r.clientY),
              (d = 'vertical' === a ? l.bottom : l.right),
              (h = 'vertical' === a ? l.left : l.top),
              (u = 'vertical' === a ? l.right : l.bottom),
              h < c && c < u && d < s))
          ) {
            if (
              (0 !== f.children.length && f.children[0] !== E && f === t.target && (e = dt(f)), e)
            ) {
              if (e.animated) return;
              i = e.getBoundingClientRect();
            }
            m ? v._hideClone() : v._showClone(this),
              !1 !== at(A, f, T, n, e, i, t, !!e) &&
                (T.contains(f) || (f.appendChild(T), (S = f), (this._isAligned = !0), (R = null)),
                this._animate(n, T),
                e && this._animate(i, e));
          } else if (e && !e.animated && e !== T && void 0 !== e.parentNode[L] && e !== f) {
            if (
              ((O = O || p.invertSwap || T.parentNode !== f || !this._isAligned),
              0 ===
                (b = (function (t, e, n, i, o, r, a) {
                  var l = e.getBoundingClientRect(),
                    s = 'vertical' === n ? t.clientY : t.clientX,
                    c = 'vertical' === n ? l.height : l.width,
                    d = 'vertical' === n ? l.top : l.left,
                    h = 'vertical' === n ? l.bottom : l.right,
                    u = T.getBoundingClientRect(),
                    f = 'vertical' === n ? u.height : u.width,
                    p = !1,
                    g = it(T);
                  if (((f += W(g.marginLeft) + W(g.marginRight)), !r))
                    if (a && f < c * i)
                      if (
                        (!H && (1 === k ? d + (c * o) / 2 < s : s < h - (c * o) / 2) && (H = !0), H)
                      )
                        p = !0;
                      else {
                        'vertical' === n ? u.top : u.left, 'vertical' === n ? u.bottom : u.right;
                        if (1 === k ? s < d + f : h - f < s) return -1 * k;
                      }
                    else if (d + (c * (1 - i)) / 2 < s && s < h - (c * (1 - i)) / 2)
                      return d + c / 2 < s ? -1 : 1;
                  if ((p = p || r) && (s < d + (c * o) / 2 || h - (c * o) / 2 < s))
                    return d + c / 2 < s ? 1 : -1;
                  return 0;
                })(t, e, w, p.swapThreshold, p.invertedSwapThreshold, O, Y === e)))
            )
              return;
            (R = null),
              (this._isAligned = !0),
              (Y && (Y === e || (e && e.animated))) || ((H = !1), (Y = e)),
              (k = b),
              (i = e.getBoundingClientRect());
            var y = e.nextElementSibling,
              D = !1,
              C = at(A, f, T, n, e, i, t, (D = 1 === b));
            !1 !== C &&
              ((1 !== C && -1 !== C) || (D = 1 === C),
              (j = !0),
              U(st, 30),
              m ? v._hideClone() : v._showClone(this),
              T.contains(f) ||
                (D && !y ? f.appendChild(T) : e.parentNode.insertBefore(T, D ? y : e)),
              (S = T.parentNode),
              this._animate(n, T),
              this._animate(i, e));
          }
        }
      },
      _animate: function (t, e) {
        var n = this.options.animation;
        if (n) {
          var i = e.getBoundingClientRect();
          if (
            (e === T && (R = i),
            1 === t.nodeType && (t = t.getBoundingClientRect()),
            t.left + t.width / 2 === i.left + i.width / 2 &&
              t.top + t.height / 2 === i.top + i.height / 2)
          )
            return;
          it(e, 'transition', 'none'),
            it(
              e,
              'transform',
              'translate3d(' + (t.left - i.left) + 'px,' + (t.top - i.top) + 'px,0)',
            ),
            e.offsetWidth,
            it(e, 'transition', 'all ' + n + 'ms'),
            it(e, 'transform', 'translate3d(0,0,0)'),
            clearTimeout(e.animated),
            (e.animated = U(function () {
              it(e, 'transition', ''), it(e, 'transform', ''), (e.animated = !1);
            }, n));
        }
      },
      _offUpEvents: function () {
        var t = this.el.ownerDocument;
        et(f, 'touchmove', bt),
          et(f, 'touchmove', this._onTouchMove),
          et(f, 'pointermove', this._onTouchMove),
          et(t, 'mouseup', this._onDrop),
          et(t, 'touchend', this._onDrop),
          et(t, 'pointerup', this._onDrop),
          et(t, 'touchcancel', this._onDrop),
          et(t, 'pointercancel', this._onDrop),
          et(f, 'selectstart', this);
      },
      _onDrop: function (t) {
        var e = this.el,
          n = this.options;
        (H = O = M = !1),
          clearInterval(this._loopId),
          clearInterval(l),
          Z(),
          clearTimeout(o),
          (o = void 0),
          clearTimeout(this._dragStartTimer),
          _t(this._cloneId),
          _t(this._dragStartId),
          et(f, 'mousemove', this._onTouchMove),
          this.nativeDraggable &&
            (et(f, 'drop', this),
            et(e, 'dragstart', this._onDragStart),
            et(f, 'dragover', this._handleAutoScroll),
            et(f, 'dragover', J)),
          this._offUpEvents(),
          t &&
            (X && (t.cancelable && t.preventDefault(), !n.dropBubble && t.stopPropagation()),
            E && E.parentNode && E.parentNode.removeChild(E),
            (A === S || (P && 'clone' !== P.lastPutMode)) &&
              x &&
              x.parentNode &&
              x.parentNode.removeChild(x),
            T &&
              (this.nativeDraggable && et(T, 'dragend', this),
              lt(T),
              (T.style['will-change'] = ''),
              nt(T, this.options.ghostClass, !1),
              nt(T, this.options.chosenClass, !1),
              rt(this, A, 'unchoose', T, S, A, c, null, t),
              A !== S
                ? (0 <= (i = ut(T, n.draggable)) &&
                    (rt(null, S, 'add', T, S, A, c, i, t),
                    rt(this, A, 'remove', T, S, A, c, i, t),
                    rt(null, S, 'sort', T, S, A, c, i, t),
                    rt(this, A, 'sort', T, S, A, c, i, t)),
                  P && P.save())
                : T.nextSibling !== B &&
                  0 <= (i = ut(T, n.draggable)) &&
                  (rt(this, A, 'update', T, S, A, c, i, t), rt(this, A, 'sort', T, S, A, c, i, t)),
              K.active &&
                ((null != i && -1 !== i) || (i = c),
                rt(this, A, 'end', T, S, A, c, i, t),
                this.save()))),
          this._nulling();
      },
      _nulling: function () {
        (A =
          T =
          S =
          E =
          B =
          x =
          h =
          w =
          y =
          I.length =
          l =
          s =
          d =
          u =
          C =
          X =
          i =
          c =
          Y =
          k =
          R =
          P =
          N =
          K.active =
            null),
          _.forEach(function (t) {
            t.checked = !0;
          }),
          (_.length = 0);
      },
      handleEvent: function (t) {
        switch (t.type) {
          case 'drop':
          case 'dragend':
            this._onDrop(t);
            break;
          case 'dragenter':
          case 'dragover':
            T &&
              (this._onDragOver(t),
              (function (t) {
                t.dataTransfer && (t.dataTransfer.dropEffect = 'move');
                t.cancelable && t.preventDefault();
              })(t));
            break;
          case 'selectstart':
            t.preventDefault();
        }
      },
      toArray: function () {
        for (var t, e = [], n = this.el.children, i = 0, o = n.length, r = this.options; i < o; i++)
          $((t = n[i]), r.draggable, this.el, !1) && e.push(t.getAttribute(r.dataIdAttr) || ht(t));
        return e;
      },
      sort: function (t) {
        var i = {},
          o = this.el;
        this.toArray().forEach(function (t, e) {
          var n = o.children[e];
          $(n, this.options.draggable, o, !1) && (i[t] = n);
        }, this),
          t.forEach(function (t) {
            i[t] && (o.removeChild(i[t]), o.appendChild(i[t]));
          });
      },
      save: function () {
        var t = this.options.store;
        t && t.set && t.set(this);
      },
      closest: function (t, e) {
        return $(t, e || this.options.draggable, this.el, !1);
      },
      option: function (t, e) {
        var n = this.options;
        if (void 0 === e) return n[t];
        (n[t] = e), 'group' === t && Q(n);
      },
      destroy: function () {
        var t = this.el;
        (t[L] = null),
          et(t, 'mousedown', this._onTapStart),
          et(t, 'touchstart', this._onTapStart),
          et(t, 'pointerdown', this._onTapStart),
          this.nativeDraggable && (et(t, 'dragover', this), et(t, 'dragenter', this)),
          Array.prototype.forEach.call(t.querySelectorAll('[draggable]'), function (t) {
            t.removeAttribute('draggable');
          }),
          b.splice(b.indexOf(this._onDragOver), 1),
          this._onDrop(),
          (this.el = t = null);
      },
      _hideClone: function () {
        x.cloneHidden || (it(x, 'display', 'none'), (x.cloneHidden = !0));
      },
      _showClone: function (t) {
        'clone' === t.lastPutMode
          ? x.cloneHidden &&
            (A.contains(T) && !this.options.group.revertClone
              ? A.insertBefore(x, T)
              : B
              ? A.insertBefore(x, B)
              : A.appendChild(x),
            this.options.group.revertClone && this._animate(T, x),
            it(x, 'display', ''),
            (x.cloneHidden = !1))
          : this._hideClone();
      },
    }),
    (K.utils = {
      on: tt,
      off: et,
      css: it,
      find: ot,
      is: function (t, e) {
        return !!$(t, e, t, !1);
      },
      extend: gt,
      throttle: pt,
      closest: $,
      toggleClass: nt,
      clone: vt,
      index: ut,
      nextTick: mt,
      cancelNextTick: _t,
      detectDirection: V,
      getChild: ct,
    }),
    (K.create = function (t, e) {
      return new K(t, e);
    }),
    (K.version = '1.8.0-rc1'),
    K
  );
});
