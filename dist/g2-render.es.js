import { Chart as q } from "@antv/g2";
function Q(e) {
  return Object.keys(e).reduce((s, n) => {
    const i = e[n];
    return s[n] = Object.assign({}, i), k(i.value) && !ee(i.value) && !Array.isArray(i.value) && (s[n].value = Object.assign({}, i.value)), Array.isArray(i.value) && (s[n].value = i.value.slice(0)), s;
  }, {});
}
function W(e) {
  return e ? Object.keys(e).reduce((s, n) => {
    const i = e[n];
    return s[n] = k(i) && "value" in i ? i : {
      value: i
    }, s[n].attribute || (s[n].attribute = D(n)), s[n].parse = "parse" in s[n] ? s[n].parse : typeof s[n].value != "string", s;
  }, {}) : {};
}
function Z(e) {
  return Object.keys(e).reduce((s, n) => (s[n] = e[n].value, s), {});
}
function Y(e, t) {
  const s = Q(t);
  return Object.keys(t).forEach((i) => {
    const r = s[i], o = e.getAttribute(r.attribute), l = e[i];
    o && (r.value = r.parse ? X(o) : o), l != null && (r.value = Array.isArray(l) ? l.slice(0) : l), r.reflect && I(e, r.attribute, r.value), Object.defineProperty(e, i, {
      get() {
        return r.value;
      },
      set(u) {
        const c = r.value;
        r.value = u, r.reflect && I(this, r.attribute, r.value);
        for (let p = 0, g = this.__propertyChangedCallbacks.length; p < g; p++)
          this.__propertyChangedCallbacks[p](i, u, c);
      },
      enumerable: !0,
      configurable: !0
    });
  }), s;
}
function X(e) {
  if (!!e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function I(e, t, s) {
  if (s == null || s === !1)
    return e.removeAttribute(t);
  let n = JSON.stringify(s);
  e.__updating[t] = !0, n === "true" && (n = ""), e.setAttribute(t, n), Promise.resolve().then(() => delete e.__updating[t]);
}
function D(e) {
  return e.replace(/\.?([A-Z]+)/g, (t, s) => "-" + s.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function k(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function ee(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function te(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let P;
function se(e, t) {
  const s = Object.keys(t);
  return class extends e {
    static get observedAttributes() {
      return s.map((i) => t[i].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Y(this, t);
      const i = Z(this.props), r = this.Component, o = P;
      try {
        P = this, this.__initialized = !0, te(r) ? new r(i, {
          element: this
        }) : r(i, {
          element: this
        });
      } finally {
        P = o;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let i = null;
      for (; i = this.__releaseCallbacks.pop(); )
        i(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(i, r, o) {
      if (!!this.__initialized && !this.__updating[i] && (i = this.lookupProp(i), i in t)) {
        if (o == null && !this[i])
          return;
        this[i] = t[i].parse ? X(o) : o;
      }
    }
    lookupProp(i) {
      if (!!t)
        return s.find((r) => i === r || i === t[r].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(i) {
      this.__releaseCallbacks.push(i);
    }
    addPropertyChangedCallback(i) {
      this.__propertyChangedCallbacks.push(i);
    }
  };
}
function ne(e, t = {}, s = {}) {
  const {
    BaseElement: n = HTMLElement,
    extension: i
  } = s;
  return (r) => {
    if (!e)
      throw new Error("tag is required to register a Component");
    let o = customElements.get(e);
    return o ? (o.prototype.Component = r, o) : (o = se(n, W(t)), o.prototype.Component = r, o.prototype.registeredTag = e, customElements.define(e, o, i), o);
  };
}
const _ = {};
function ie(e) {
  _.context = e;
}
const re = (e, t) => e === t, m = {
  equals: re
};
let K = M;
const y = 1, w = 2, B = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var a = null;
let b = null, f = null, h = null, d = null, v = 0;
function le(e, t) {
  const s = f, n = a, i = e.length === 0, r = i ? B : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t || n
  }, o = i ? e : () => e(() => O(() => j(r)));
  a = r, f = null;
  try {
    return E(o, !0);
  } finally {
    f = s, a = n;
  }
}
function oe(e, t) {
  t = t ? Object.assign({}, m, t) : m;
  const s = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (i) => (typeof i == "function" && (i = i(s.value)), J(s, i));
  return [ce.bind(s), n];
}
function N(e, t, s) {
  const n = L(e, t, !1, y);
  R(n);
}
function G(e, t, s) {
  K = pe;
  const n = L(e, t, !1, y);
  n.user = !0, d ? d.push(n) : R(n);
}
function O(e) {
  const t = f;
  f = null;
  try {
    return e();
  } finally {
    f = t;
  }
}
function ue(e) {
  G(() => O(e));
}
function fe(e) {
  return a === null || (a.cleanups === null ? a.cleanups = [e] : a.cleanups.push(e)), e;
}
function ce() {
  const e = b;
  if (this.sources && (this.state || e))
    if (this.state === y || e)
      R(this);
    else {
      const t = h;
      h = null, E(() => x(this), !1), h = t;
    }
  if (f) {
    const t = this.observers ? this.observers.length : 0;
    f.sources ? (f.sources.push(this), f.sourceSlots.push(t)) : (f.sources = [this], f.sourceSlots = [t]), this.observers ? (this.observers.push(f), this.observerSlots.push(f.sources.length - 1)) : (this.observers = [f], this.observerSlots = [f.sources.length - 1]);
  }
  return this.value;
}
function J(e, t, s) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && E(() => {
    for (let i = 0; i < e.observers.length; i += 1) {
      const r = e.observers[i], o = b && b.running;
      o && b.disposed.has(r), (o && !r.tState || !o && !r.state) && (r.pure ? h.push(r) : d.push(r), r.observers && z(r)), o || (r.state = y);
    }
    if (h.length > 1e6)
      throw h = [], new Error();
  }, !1)), t;
}
function R(e) {
  if (!e.fn)
    return;
  j(e);
  const t = a, s = f, n = v;
  f = a = e, ae(e, e.value, n), f = s, a = t;
}
function ae(e, t, s) {
  let n;
  try {
    n = e.fn(t);
  } catch (i) {
    e.pure && (e.state = y), H(i);
  }
  (!e.updatedAt || e.updatedAt <= s) && (e.updatedAt != null && "observers" in e ? J(e, n) : e.value = n, e.updatedAt = s);
}
function L(e, t, s, n = y, i) {
  const r = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: a,
    context: null,
    pure: s
  };
  return a === null || a !== B && (a.owned ? a.owned.push(r) : a.owned = [r]), r;
}
function S(e) {
  const t = b;
  if (e.state === 0 || t)
    return;
  if (e.state === w || t)
    return x(e);
  if (e.suspense && O(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const s = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < v); )
    (e.state || t) && s.push(e);
  for (let n = s.length - 1; n >= 0; n--)
    if (e = s[n], e.state === y || t)
      R(e);
    else if (e.state === w || t) {
      const i = h;
      h = null, E(() => x(e, s[0]), !1), h = i;
    }
}
function E(e, t) {
  if (h)
    return e();
  let s = !1;
  t || (h = []), d ? s = !0 : d = [], v++;
  try {
    const n = e();
    return he(s), n;
  } catch (n) {
    h || (d = null), H(n);
  }
}
function he(e) {
  if (h && (M(h), h = null), e)
    return;
  const t = d;
  d = null, t.length && E(() => K(t), !1);
}
function M(e) {
  for (let t = 0; t < e.length; t++)
    S(e[t]);
}
function pe(e) {
  let t, s = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[s++] = n : S(n);
  }
  for (_.context && ie(), t = 0; t < s; t++)
    S(e[t]);
}
function x(e, t) {
  const s = b;
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const i = e.sources[n];
    i.sources && (i.state === y || s ? i !== t && S(i) : (i.state === w || s) && x(i, t));
  }
}
function z(e) {
  const t = b;
  for (let s = 0; s < e.observers.length; s += 1) {
    const n = e.observers[s];
    (!n.state || t) && (n.state = w, n.pure ? h.push(n) : d.push(n), n.observers && z(n));
  }
}
function j(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const s = e.sources.pop(), n = e.sourceSlots.pop(), i = s.observers;
      if (i && i.length) {
        const r = i.pop(), o = s.observerSlots.pop();
        n < i.length && (r.sourceSlots[o] = n, i[n] = r, s.observerSlots[n] = o);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      j(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function ge(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function H(e) {
  throw e = ge(e), e;
}
function de(e, t, s) {
  let n = s.length, i = t.length, r = n, o = 0, l = 0, u = t[i - 1].nextSibling, c = null;
  for (; o < i || l < r; ) {
    if (t[o] === s[l]) {
      o++, l++;
      continue;
    }
    for (; t[i - 1] === s[r - 1]; )
      i--, r--;
    if (i === o) {
      const p = r < n ? l ? s[l - 1].nextSibling : s[r - l] : u;
      for (; l < r; )
        e.insertBefore(s[l++], p);
    } else if (r === l)
      for (; o < i; )
        (!c || !c.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === s[r - 1] && s[l] === t[i - 1]) {
      const p = t[--i].nextSibling;
      e.insertBefore(s[l++], t[o++].nextSibling), e.insertBefore(s[--r], p), t[i] = s[r];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let g = l;
        for (; g < r; )
          c.set(s[g], g++);
      }
      const p = c.get(t[o]);
      if (p != null)
        if (l < p && p < r) {
          let g = o, F = 1, T;
          for (; ++g < i && g < r && !((T = c.get(t[g])) == null || T !== p + F); )
            F++;
          if (F > p - l) {
            const V = t[o];
            for (; l < p; )
              e.insertBefore(s[l++], V);
          } else
            e.replaceChild(s[l++], t[o++]);
        } else
          o++;
      else
        t[o++].remove();
    }
  }
}
function ye(e, t, s) {
  const n = document.createElement("template");
  n.innerHTML = e;
  let i = n.content.firstChild;
  return s && (i = i.firstChild), i;
}
function _e(e, t, s) {
  return O(() => e(t, s));
}
function be(e, t, s, n) {
  if (s !== void 0 && !n && (n = []), typeof t != "function")
    return A(e, t, n, s);
  N((i) => A(e, t(), i, s), n);
}
function A(e, t, s, n, i) {
  for (_.context && !s && (s = [...e.childNodes]); typeof s == "function"; )
    s = s();
  if (t === s)
    return s;
  const r = typeof t, o = n !== void 0;
  if (e = o && s[0] && s[0].parentNode || e, r === "string" || r === "number") {
    if (_.context)
      return s;
    if (r === "number" && (t = t.toString()), o) {
      let l = s[0];
      l && l.nodeType === 3 ? l.data = t : l = document.createTextNode(t), s = C(e, s, n, l);
    } else
      s !== "" && typeof s == "string" ? s = e.firstChild.data = t : s = e.textContent = t;
  } else if (t == null || r === "boolean") {
    if (_.context)
      return s;
    s = C(e, s, n);
  } else {
    if (r === "function")
      return N(() => {
        let l = t();
        for (; typeof l == "function"; )
          l = l();
        s = A(e, l, s, n);
      }), () => s;
    if (Array.isArray(t)) {
      const l = [], u = s && Array.isArray(s);
      if ($(l, t, s, i))
        return N(() => s = A(e, l, s, n, !0)), () => s;
      if (_.context) {
        if (!l.length)
          return s;
        for (let c = 0; c < l.length; c++)
          if (l[c].parentNode)
            return s = l;
      }
      if (l.length === 0) {
        if (s = C(e, s, n), o)
          return s;
      } else
        u ? s.length === 0 ? U(e, l, n) : de(e, s, l) : (s && C(e), U(e, l));
      s = l;
    } else if (t instanceof Node) {
      if (_.context && t.parentNode)
        return s = o ? [t] : t;
      if (Array.isArray(s)) {
        if (o)
          return s = C(e, s, n, t);
        C(e, s, null, t);
      } else
        s == null || s === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      s = t;
    }
  }
  return s;
}
function $(e, t, s, n) {
  let i = !1;
  for (let r = 0, o = t.length; r < o; r++) {
    let l = t[r], u = s && s[r];
    if (l instanceof Node)
      e.push(l);
    else if (!(l == null || l === !0 || l === !1))
      if (Array.isArray(l))
        i = $(e, l, u) || i;
      else if (typeof l == "function")
        if (n) {
          for (; typeof l == "function"; )
            l = l();
          i = $(e, Array.isArray(l) ? l : [l], Array.isArray(u) ? u : [u]) || i;
        } else
          e.push(l), i = !0;
      else {
        const c = String(l);
        u && u.nodeType === 3 && u.data === c ? e.push(u) : e.push(document.createTextNode(c));
      }
  }
  return i;
}
function U(e, t, s = null) {
  for (let n = 0, i = t.length; n < i; n++)
    e.insertBefore(t[n], s);
}
function C(e, t, s, n) {
  if (s === void 0)
    return e.textContent = "";
  const i = n || document.createTextNode("");
  if (t.length) {
    let r = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const l = t[o];
      if (i !== l) {
        const u = l.parentNode === e;
        !r && !o ? u ? e.replaceChild(i, l) : e.insertBefore(i, s) : u && l.remove();
      } else
        r = !0;
    }
  } else
    e.insertBefore(i, s);
  return [i];
}
function Ce(e) {
  const t = Object.keys(e), s = {};
  for (let n = 0; n < t.length; n++) {
    const [i, r] = oe(e[t[n]]);
    Object.defineProperty(s, t[n], {
      get: i,
      set(o) {
        r(() => o);
      }
    });
  }
  return s;
}
function Ee(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let t = e.parentNode;
  for (; t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner); )
    t = t.parentNode;
  return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner;
}
function we(e) {
  return (t, s) => {
    const { element: n } = s;
    return le((i) => {
      const r = Ce(t);
      n.addPropertyChangedCallback((l, u) => r[l] = u), n.addReleaseCallback(() => {
        n.renderRoot.textContent = "", i();
      });
      const o = e(r, s);
      return be(n.renderRoot, o);
    }, Ee(n));
  };
}
function Se(e, t, s) {
  return arguments.length === 2 && (s = t, t = {}), ne(e, t)(we(s));
}
const xe = {
  FUNC_PREFIX: "__xfunc__",
  REG_PREFIX: "__xreg__",
  isArrOrObj: function(e) {
    return this.isArr(e) || this.isObj(e);
  },
  isArr: function(e) {
    return !!e && Object.prototype.toString.call(e) === "[object Array]";
  },
  isObj: function(e) {
    return !!e && Object.prototype.toString.call(e) === "[object Object]";
  },
  isRegExp: function(e) {
    return !!e && Object.prototype.toString.call(e) === "[object RegExp]";
  },
  isFunc: function(e) {
    return typeof e == "function";
  },
  funcParse: function(e) {
    let t;
    if (this.isArr(e) && (t = [], t = e.map((s) => this.isFunc(s) ? `${this.FUNC_PREFIX}${s}` : this.isRegExp(s) ? `${this.REG_PREFIX}${s}` : this.isArrOrObj(s) ? this.funcParse(s) : s)), this.isObj(e)) {
      t = {};
      for (let s in e) {
        const n = e[s];
        this.isFunc(n) ? t[s] = `${this.FUNC_PREFIX}${n}` : this.isRegExp(n) ? t[s] = `${this.REG_PREFIX}${n}` : this.isArrOrObj(n) ? t[s] = this.funcParse(n) : t[s] = n;
      }
    }
    return t;
  },
  parse: function(e, t) {
    try {
      return JSON.parse(e, (s, n) => n && typeof n == "string" ? n.indexOf(this.FUNC_PREFIX) > -1 ? new Function(`return ${n.replace(this.FUNC_PREFIX, "")}`)() : n.indexOf(this.REG_PREFIX) > -1 ? new Function(`return ${n.replace(this.REG_PREFIX, "")}`)() : n : n);
    } catch (s) {
      t && t(s);
    }
  },
  stringify: function(e, t, s, n) {
    try {
      let i = e;
      return this.isRegExp(e) && (i = `${this.REG_PREFIX}${e}`), this.isFunc(e) && (i = `${this.FUNC_PREFIX}${e}`), this.isArrOrObj(e) && (i = this.funcParse(e)), JSON.stringify(i, t, s);
    } catch (i) {
      return n && n(i), "";
    }
  },
  fastStringify: function(e, t, s) {
    try {
      return JSON.stringify(
        e,
        (n, i) => this.isFunc(i) ? `${this.FUNC_PREFIX}${i}` : this.isRegExp(i) ? `${this.REG_PREFIX}${i}` : i,
        t
      );
    } catch (n) {
      return s && s(n), "";
    }
  },
  nativeStringify: JSON.stringify,
  nativeParse: JSON.parse
}, Ae = /* @__PURE__ */ ye("<div>  </div>"), Oe = (e) => {
  let t, s;
  return ue(() => {
    s = new q({
      container: t,
      ...e["init-config"]
    }), fe(() => s.destroy());
  }), G(() => {
    e.debug && console.log("props", e), s == null || s.clear();
    const n = {
      ...e.scope,
      chart: s,
      data: e.data ? e.data : []
    };
    if (!!e.json)
      try {
        const i = xe.parse(e.json);
        i || console.error(`[g2-render]: props.json\u53C2\u6570\u683C\u5F0F\u4E0D\u5BF9, parse\u4E4B\u540E\u662F ${typeof i},\u671F\u5F85parse\u6210 object`), i.render(n);
      } catch (i) {
        console.error(i);
      }
  }), (() => {
    const n = Ae.cloneNode(!0), i = t;
    return typeof i == "function" ? _e(i, n) : t = n, n;
  })();
};
Se(
  "g2-render",
  { data: void 0, scope: {}, json: "", "init-config": {}, debug: !1 },
  Oe
);
export {
  xe as parser
};
