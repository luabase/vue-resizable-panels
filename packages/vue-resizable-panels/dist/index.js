import { ref as q, defineComponent as W, inject as ne, computed as B, watch as H, onUnmounted as de, h as J, provide as fe } from "vue";
let ve = 0;
function X(e = null) {
  const n = q(e);
  return n.value === null && (n.value = "" + ve++), n;
}
const Y = Symbol(), ke = W({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Panel",
  props: {
    collapsible: {
      type: Boolean,
      default: !1,
      required: !1
    },
    defaultSize: {
      type: null,
      default: null,
      required: !1,
      validator: (e) => typeof e == "number" && !(e < 0 || e > 100) || e === null
    },
    maxSize: {
      type: Number,
      default: 100,
      required: !1,
      validator: (e) => !(e < 0 || e > 100)
    },
    minSize: {
      type: Number,
      default: 10,
      required: !1,
      validator: (e) => !(e < 0 || e > 100)
    },
    onCollapse: {
      type: null,
      default: null,
      required: !1
    },
    onResize: {
      type: null,
      default: null,
      required: !1
    },
    order: {
      type: null,
      default: null,
      required: !1,
      validator: (e) => typeof e == "number" || e === null
    },
    id: {
      type: null,
      default: null,
      required: !1,
      validator: (e) => typeof e == "string" || e === null
    },
    tagName: {
      type: String,
      default: "div",
      required: !1
    }
  },
  setup(e, { slots: n, expose: t }) {
    if (e.defaultSize !== null && e.minSize > e.defaultSize && !e.collapsible)
      throw Error(
        `Panel minSize ${e.minSize} cannot be greater than defaultSize ${e.defaultSize}`
      );
    const l = ne(Y);
    if (l === void 0)
      throw Error(
        "Panel components must be rendered within a PanelGroup container"
      );
    const a = X(e.id), {
      collapsePanel: s,
      expandPanel: i,
      getPanelStyle: m,
      registerPanel: c,
      resizePanel: d,
      unregisterPanel: u
    } = l, h = B(() => ({ onCollapse: e.onCollapse, onResize: e.onResize }));
    H(
      [
        () => e.collapsible,
        () => e.defaultSize,
        a,
        () => e.maxSize,
        () => e.minSize,
        () => e.order
      ],
      (g, S, L) => {
        const w = {
          callbacksRef: h.value,
          collapsible: e.collapsible,
          defaultSize: e.defaultSize,
          id: a.value,
          maxSize: e.maxSize,
          minSize: e.minSize,
          order: e.order
        };
        c(a.value, w), L(() => {
          u(a.value);
        });
      },
      { immediate: !0 }
    ), de(() => {
      u(a.value);
    });
    const z = B(() => m(a.value)), f = B(() => ({
      size: me(z.value)
    }));
    return t({
      collapse: () => s(a.value),
      expand: () => i(a.value),
      getCollapsed() {
        return f.value.size === 0;
      },
      getSize() {
        return f.value.size;
      },
      resize: (g) => d(a.value, g)
    }), () => {
      var g;
      return J(
        e.tagName,
        {
          "data-panel": "",
          "data-panel-collapsible": e.collapsible || void 0,
          "data-panel-id": a.value,
          "data-panel-size": parseFloat("" + z.value.flexGrow).toFixed(1),
          id: `data-panel-id-${a.value}`,
          style: z.value
        },
        (g = n.default) == null ? void 0 : g.call(n)
      );
    };
  }
});
function me(e) {
  const { flexGrow: n } = e;
  if (n === void 0)
    throw Error("flexGrow is undefined");
  return typeof n == "string" ? parseFloat(n) : n;
}
function te(e) {
  return e.map((n) => {
    const { minSize: t, order: l } = n;
    return l ? `${l}:${t}` : `${t}`;
  }).sort((n, t) => n.localeCompare(t)).join(",");
}
function le(e) {
  try {
    const n = localStorage.getItem(`PanelGroup:sizes:${e}`);
    if (n) {
      const t = JSON.parse(n);
      if (typeof t == "object" && t != null)
        return t;
    }
  } catch (n) {
    console.error(n);
  }
  return null;
}
function ze(e, n) {
  const t = le(e);
  if (t) {
    const l = te(n);
    return t[l] || null;
  }
  return null;
}
function ge(e, n, t) {
  const l = te(n), a = le(e) || {};
  a[l] = t;
  try {
    localStorage.setItem(
      `PanelGroup:sizes:${e}`,
      JSON.stringify(a)
    );
  } catch (s) {
    console.error(s);
  }
}
const $ = 10;
function T(e, n, t, l, a, s) {
  if (l === 0)
    return a;
  const i = G(e), m = a.concat();
  let c = 0;
  {
    const h = l < 0 ? t : n, z = i.findIndex((L) => L.id === h), f = i[z], g = a[z], S = ee(f, Math.abs(l), g);
    if (g === S)
      return a;
    S === 0 && g > 0 && s.set(h, g), l = l < 0 ? g - S : S - g;
  }
  let d = l < 0 ? n : t, u = i.findIndex((h) => h.id === d);
  for (; ; ) {
    const h = i[u], z = a[u], f = ee(h, 0 - Math.abs(l), z);
    if (z !== f && (f === 0 && z > 0 && s.set(h.id, z), c += z - f, m[u] = f, c.toPrecision($) >= l.toPrecision($)))
      break;
    if (l < 0) {
      if (--u < 0)
        break;
    } else if (++u >= i.length)
      break;
  }
  return c === 0 ? a : (d = l < 0 ? t : n, u = i.findIndex((h) => h.id === d), m[u] = a[u] + c, m);
}
function O(e, n, t) {
  t.forEach((l, a) => {
    const s = n[a];
    if (s !== l) {
      const { callbacksRef: i } = e[a], { onCollapse: m, onResize: c } = i;
      c && c(l), m && (s === 0 && l !== 0 ? m(!1) : s !== 0 && l === 0 && m(!0));
    }
  });
}
function K(e, n) {
  if (n.length < 2)
    return [null, null];
  const t = n.findIndex((i) => i.id === e);
  if (t < 0)
    return [null, null];
  const l = t === n.length - 1, a = l ? n[t - 1].id : e, s = l ? e : n[t + 1].id;
  return [a, s];
}
function ae(e, n, t) {
  if (e.size === 1)
    return "100";
  const a = G(e).findIndex((i) => i.id === n), s = t[a];
  return s == null ? "0" : s.toPrecision($);
}
function he(e) {
  const n = document.querySelector(`[data-panel-id="${e}"]`);
  return n || null;
}
function Q(e) {
  const n = document.querySelector(`[data-panel-group-id="${e}"]`);
  return n || null;
}
function Z(e) {
  const n = document.querySelector(
    `[data-panel-resize-handle-id="${e}"]`
  );
  return n || null;
}
function pe(e) {
  return ie().findIndex(
    (l) => l.getAttribute("data-panel-resize-handle-id") === e
  ) || null;
}
function ie() {
  return Array.from(document.querySelectorAll("[data-panel-resize-handle-id]"));
}
function oe(e) {
  return Array.from(
    document.querySelectorAll(
      `[data-panel-resize-handle-id][data-panel-group-id="${e}"]`
    )
  );
}
function _(e, n, t) {
  var c, d;
  const l = Z(n), s = oe(e).indexOf(l), i = ((c = t[s]) == null ? void 0 : c.id) || null, m = ((d = t[s + 1]) == null ? void 0 : d.id) || null;
  return [i, m];
}
function G(e) {
  return Array.from(e.values()).sort(
    (n, t) => n.order - t.order
  );
}
function ee(e, n, t) {
  const l = t + n;
  if (e.collapsible) {
    if (t > 0) {
      if (l <= 0)
        return 0;
    } else if (l < e.minSize)
      return 0;
  }
  return Math.min(
    e.maxSize,
    Math.max(e.minSize, l)
  );
}
function re(e, n, t, l = 0) {
  const a = t === "horizontal";
  let s = 0;
  if (xe(e))
    s = a ? e.clientX : e.clientY;
  else if (we(e)) {
    const d = e.touches[0];
    s = a ? d.screenX : d.screenY;
  } else
    return 0;
  const m = Z(n).getBoundingClientRect(), c = a ? m.left : m.top;
  return s - c - l;
}
function Se(e, n, t, l, a, s, i) {
  if (ye(e)) {
    const m = a === "horizontal", d = Q(n).getBoundingClientRect(), u = m ? d.width : d.height, h = e.shiftKey ? 10 : 100, z = u / h;
    let f = 0;
    switch (e.key) {
      case "ArrowDown":
        f = m ? 0 : z;
        break;
      case "ArrowLeft":
        f = m ? -z : 0;
        break;
      case "ArrowRight":
        f = m ? z : 0;
        break;
      case "ArrowUp":
        f = m ? 0 : -z;
        break;
      case "End":
        f = u;
        break;
      case "Home":
        f = -u;
        break;
    }
    const [g, S] = _(
      n,
      t,
      l
    ), L = f < 0 ? g : S, w = l.findIndex(
      (M) => M.id === L
    ), P = l[w];
    if (P.collapsible) {
      const M = s[w];
      (M === 0 || M.toPrecision($) === P.minSize.toPrecision($)) && (f = f < 0 ? -P.minSize * u : P.minSize * u);
    }
    return f;
  } else
    return re(e, t, a, i);
}
function ye(e) {
  return e.type === "keydown";
}
function xe(e) {
  return e.type.startsWith("mouse");
}
function we(e) {
  return e.type.startsWith("touch");
}
let U = null, N = null;
function ue(e) {
  switch (e) {
    case "horizontal":
      return "col-resize";
    case "horizontal-max":
      return "w-resize";
    case "horizontal-min":
      return "e-resize";
    case "vertical":
      return "row-resize";
    case "vertical-max":
      return "n-resize";
    case "vertical-min":
      return "s-resize";
  }
}
function be() {
  N !== null && (document.head.removeChild(N), U = null, N = null);
}
function j(e) {
  if (U === e)
    return;
  U = e;
  const n = ue(e);
  N === null && (N = document.createElement("style"), document.head.appendChild(N)), N.innerHTML = `*{cursor: ${n}!important;}`;
}
function Pe(e, n = 10) {
  let t = null;
  return (...a) => {
    clearTimeout(t === null ? void 0 : t), t = setTimeout(() => {
      e(...a);
    }, n);
  };
}
function Ae({
  committedValuesRef: e,
  groupId: n,
  panels: t,
  sizes: l,
  panelSizeBeforeCollapse: a
}) {
  H([n, t, l], (s, i, m) => {
    const { direction: c, panels: d } = e.value, u = Q(n.value), { height: h, width: z } = u.getBoundingClientRect(), g = oe(n.value).map((S) => {
      const L = S.getAttribute("data-panel-resize-handle-id"), w = G(d), [P, M] = _(
        n.value,
        L,
        w
      );
      if (P == null || M == null)
        return () => {
        };
      let C = 0, V = 100, o = 0, r = 0;
      w.forEach((A) => {
        A.id === P ? (V = A.maxSize, C = A.minSize) : (o += A.minSize, r += A.maxSize);
      });
      const v = Math.min(V, 100 - o), x = Math.max(
        C,
        (w.length - 1) * 100 - r
      ), b = ae(d, P, l.value);
      S.setAttribute("aria-valuemax", "" + Math.round(v)), S.setAttribute("aria-valuemin", "" + Math.round(x)), S.setAttribute("aria-valuenow", "" + Math.round(parseInt(b)));
      const y = (A) => {
        switch (A.key) {
          case "Enter": {
            const E = w.findIndex(
              (R) => R.id === P
            );
            if (E >= 0) {
              const R = w[E], D = l.value[E];
              if (D !== null) {
                let I = 0;
                D.toPrecision($) <= R.minSize.toPrecision($) ? I = c === "horizontal" ? z : h : I = -(c === "horizontal" ? z : h);
                const k = T(
                  d,
                  P,
                  M,
                  I,
                  l.value,
                  a.value
                );
                l.value !== k && (l.value = k);
              }
            }
            break;
          }
        }
      };
      S.addEventListener("keydown", y);
      const p = he(P);
      return p != null && S.setAttribute("aria-controls", p.id), () => {
        S.removeAttribute("aria-valuemax"), S.removeAttribute("aria-valuemin"), S.removeAttribute("aria-valuenow"), S.removeEventListener("keydown", y), p != null && S.removeAttribute("aria-controls");
      };
    });
    m(() => {
      g.forEach((S) => S());
    });
  });
}
function Ee({
  disabled: e,
  handleId: n,
  resizeHandler: t
}) {
  H(
    [e, n, t],
    (l, a, s) => {
      if (e.value || t.value == null)
        return;
      const i = Z(n.value);
      if (i == null)
        return;
      const m = (c) => {
        var d;
        switch (c.key) {
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case "ArrowUp":
          case "End":
          case "Home": {
            (d = t.value) == null || d.call(t, c);
            break;
          }
          case "F6": {
            const u = ie(), h = pe(n.value), z = c.shiftKey ? h > 0 ? h - 1 : u.length - 1 : h + 1 < u.length ? h + 1 : 0;
            u[z].focus();
            break;
          }
        }
      };
      i.addEventListener("keydown", m), s(() => {
        i.removeEventListener("keydown", m);
      });
    },
    { immediate: !0 }
  );
}
const Re = Pe(ge, 100), Le = W({
  name: "PanelGroup",
  props: {
    autoSaveId: {
      type: String,
      required: !1
    },
    direction: {
      type: String,
      required: !0
    },
    id: {
      type: null,
      default: null,
      required: !1,
      validator: (e) => typeof e == "string" || e === null
    },
    onLayout: {
      type: null,
      default: null,
      required: !1
    },
    tagName: {
      type: String,
      default: "div",
      required: !1
    }
  },
  setup(e, { slots: n }) {
    const t = X(e.id), l = q(null), a = q(/* @__PURE__ */ new Map()), s = B(() => ({ onLayout: e.onLayout })), i = q([]), m = q(0), c = q(/* @__PURE__ */ new Map()), d = B(() => ({
      direction: e.direction,
      panels: a.value,
      sizes: i.value
    }));
    Ae({
      committedValuesRef: d,
      groupId: t,
      panels: a,
      sizes: i,
      panelSizeBeforeCollapse: c
    }), H(
      i,
      () => {
        const { onLayout: o } = s.value;
        if (o) {
          const { sizes: r } = d.value;
          r.length > 0 && o(r);
        }
      },
      { immediate: !0 }
    );
    const u = q(!1);
    H(
      [i],
      () => {
        if (u.value)
          return;
        const { panels: o, sizes: r } = d.value;
        if (r.length > 0) {
          u.value = !0;
          const v = G(o);
          O(v, [], r);
        }
      },
      { immediate: !0 }
    ), H(
      [() => e.autoSaveId, a],
      () => {
        if (d.value.sizes.length === a.value.size)
          return;
        let r = null;
        if (e.autoSaveId) {
          const v = G(a.value);
          r = ze(e.autoSaveId, v);
        }
        if (r !== null)
          i.value = r;
        else {
          const v = G(a.value);
          let x = 0, b = 0, y = 0;
          if (v.forEach((p) => {
            y += p.minSize, p.defaultSize === null ? x++ : b += p.defaultSize;
          }), b > 100)
            throw new Error(
              "The sum of the defaultSize of all panels in a group cannot exceed 100."
            );
          if (y > 100)
            throw new Error(
              "The sum of the minSize of all panels in a group cannot exceed 100."
            );
          i.value = v.map((p) => p.defaultSize === null ? (100 - b) / x : p.defaultSize);
        }
      },
      { immediate: !0 }
    ), H(
      [() => e.autoSaveId, a, i],
      () => {
        if (e.autoSaveId) {
          if (i.value.length === 0 || i.value.length !== a.value.size)
            return;
          const o = G(a.value);
          Re(
            e.autoSaveId,
            o,
            i.value
          );
        }
      },
      { immediate: !0 }
    );
    const h = (o) => {
      const { panels: r } = d.value;
      return r.size === 0 ? {
        flexBasis: "auto",
        flexGrow: 1,
        flexShrink: 1,
        // Without this, Panel sizes may be unintentionally overridden by their content.
        overflow: "hidden"
      } : {
        flexBasis: 0,
        flexGrow: +ae(r, o, i.value),
        flexShrink: 1,
        // Without this, Panel sizes may be unintentionally overridden by their content.
        overflow: "hidden",
        // Disable pointer events inside of a panel during resize.
        // This avoid edge cases like nested iframes.
        pointerEvents: l.value !== null ? "none" : void 0
      };
    }, z = (o, r) => {
      const v = a.value;
      if (!v.has(o)) {
        const x = new Map(v);
        x.set(o, r), a.value = x;
      }
    }, f = (o) => (v) => {
      v.preventDefault();
      const {
        direction: x,
        panels: b,
        sizes: y
      } = d.value, p = G(b), [A, E] = _(
        t.value,
        o,
        p
      );
      if (A == null || E == null)
        return;
      const R = Se(
        v,
        t.value,
        o,
        p,
        x,
        y,
        m.value
      );
      if (R === 0)
        return;
      const I = Q(t.value).getBoundingClientRect(), k = x === "horizontal", se = k ? I.width : I.height, ce = R / se * 100, F = T(
        b,
        A,
        E,
        ce,
        y,
        c.value
      );
      y === F ? j(
        k ? R < 0 ? "horizontal-min" : "horizontal-max" : R < 0 ? "vertical-min" : "vertical-max"
      ) : (j(k ? "horizontal" : "vertical"), O(p, y, F), i.value = F);
    }, g = (o) => {
      const r = a.value;
      if (r.has(o)) {
        const v = new Map(r);
        v.delete(o), a.value = v;
      }
    }, S = (o) => {
      const { panels: r, sizes: v } = d.value, x = r.get(o);
      if (x == null || !x.collapsible)
        return;
      const b = G(r), y = b.indexOf(x);
      if (y < 0)
        return;
      const p = v[y];
      if (p === 0)
        return;
      c.value.set(o, p);
      const [A, E] = K(o, b);
      if (A == null || E == null)
        return;
      const D = y === b.length - 1 ? p : 0 - p, I = T(
        r,
        A,
        E,
        D,
        v,
        c.value
      );
      v !== I && (O(b, v, I), i.value = I);
    }, L = (o) => {
      const { panels: r, sizes: v } = d.value, x = r.get(o);
      if (x == null)
        return;
      const b = c.value.get(o) || x.minSize;
      if (!b)
        return;
      const y = G(r), p = y.indexOf(x);
      if (p < 0 || v[p] !== 0)
        return;
      const [E, R] = K(o, y);
      if (E == null || R == null)
        return;
      const I = p === y.length - 1 ? 0 - b : b, k = T(
        r,
        E,
        R,
        I,
        v,
        c.value
      );
      v !== k && (O(y, v, k), i.value = k);
    }, w = (o, r) => {
      const { panels: v, sizes: x } = d.value, b = v.get(o);
      if (b == null)
        return;
      const y = G(v), p = y.indexOf(b);
      if (p < 0)
        return;
      const A = x[p];
      if (A === r)
        return;
      const [E, R] = K(o, y);
      if (E == null || R == null)
        return;
      const I = p === y.length - 1 ? A - r : r - A, k = T(
        v,
        E,
        R,
        I,
        x,
        c.value
      );
      x !== k && (O(y, x, k), i.value = k);
    }, P = (o, r) => {
      l.value = o, m.value = re(r, o, e.direction);
    }, M = () => {
      be(), l.value = null;
    }, C = B(() => e.direction);
    fe(Y, {
      activeHandleId: l,
      collapsePanel: S,
      direction: C,
      expandPanel: L,
      getPanelStyle: h,
      groupId: t,
      registerPanel: z,
      registerResizeHandle: f,
      resizePanel: w,
      startDragging: P,
      stopDragging: M,
      unregisterPanel: g
    });
    const V = B(() => ({
      display: "flex",
      flexDirection: e.direction === "horizontal" ? "row" : "column",
      height: "100%",
      overflow: "hidden",
      width: "100%"
    }));
    return () => {
      var o;
      return J(
        e.tagName,
        {
          "data-panel-group-direction": e.direction,
          "data-panel-group-id": t.value,
          style: V.value
        },
        (o = n.default) == null ? void 0 : o.call(n)
      );
    };
  }
}), Me = W({
  name: "PanelResizeHandle",
  props: {
    disabled: {
      type: Boolean,
      default: !1,
      required: !1
    },
    id: {
      type: null,
      default: null,
      required: !1,
      validator: (e) => typeof e == "string" || e === null
    },
    tagName: {
      type: String,
      default: "div",
      required: !1
    }
  },
  setup(e, { slots: n }) {
    const t = q(null), l = ne(Y);
    if (l === void 0)
      throw Error(
        "PanelResizeHandle components must be rendered within a PanelGroup container"
      );
    const {
      activeHandleId: a,
      direction: s,
      groupId: i,
      registerResizeHandle: m,
      startDragging: c,
      stopDragging: d
    } = l, u = X(e.id), h = B(
      () => a.value === u.value
    ), z = q(!1), f = q(null), g = () => {
      var w;
      (w = t.value) == null || w.blur(), d();
    };
    H(
      [
        () => e.disabled,
        u
        // registerResizeHandle
      ],
      () => {
        if (e.disabled)
          f.value = null;
        else {
          const w = m(u.value);
          f.value = w;
        }
      },
      { immediate: !0 }
    ), H(
      [
        s,
        () => e.disabled,
        h,
        f
        // stopDraggingAndBlur,
      ],
      (w, P, M) => {
        if (e.disabled || f.value == null || !h.value)
          return;
        const C = (V) => {
          var o;
          (o = f.value) == null || o.call(f, V);
        };
        document.body.addEventListener("contextmenu", g), document.body.addEventListener("mousemove", C), document.body.addEventListener("touchmove", C), window.addEventListener("mouseup", g), window.addEventListener("touchend", g), M(() => {
          document.body.removeEventListener("contextmenu", g), document.body.removeEventListener("mousemove", C), document.body.removeEventListener("touchmove", C), window.removeEventListener("mouseup", g), window.removeEventListener("touchend", g);
        });
      },
      { immediate: !0 }
    );
    const S = B(() => e.disabled);
    Ee({
      disabled: S,
      handleId: u,
      resizeHandler: f
    });
    const L = B(() => ({
      cursor: ue(s.value),
      touchAction: "none",
      userSelect: "none"
    }));
    return () => {
      var w;
      return J(
        e.tagName,
        {
          "data-resize-handle-active": h.value ? "pointer" : z.value ? "keyboard" : void 0,
          "data-panel-group-direction": s.value,
          "data-panel-group-id": i.value,
          "data-panel-resize-handle-enabled": !e.disabled,
          "data-panel-resize-handle-id": u.value,
          onBlur: () => {
            z.value = !1;
          },
          onFocus: () => {
            z.value = !0;
          },
          onMousedown: (P) => c(u.value, P),
          onMouseup: g,
          onTouchcancel: g,
          onTouchend: g,
          onTouchstart: (P) => c(u.value, P),
          ref: t,
          role: "separator",
          style: L.value,
          tabIndex: 0
        },
        (w = n.default) == null ? void 0 : w.call(n)
      );
    };
  }
});
export {
  ke as Panel,
  Le as PanelGroup,
  Me as PanelResizeHandle
};
