function R(e, d) {
  const l = {
    type: "footnotes",
    raw: d,
    rawItems: [],
    items: []
  };
  return {
    name: "footnote",
    level: "block",
    childTokens: ["content"],
    tokenizer(c) {
      e.hasFootnotes || (this.lexer.tokens.push(l), e.tokens = this.lexer.tokens, e.hasFootnotes = !0, l.rawItems = [], l.items = []);
      const a = /^\[\^([^\]\n]+)\]:(?:[ \t]+|[\n]*?|$)([^\n]*?(?:\n|$)(?:\n*?[ ]{4,}[^\n]*)*)/.exec(
        c
      );
      if (a) {
        const [i, f, s = ""] = a;
        let n = s.split(`
`).reduce((r, p) => r + `
` + p.replace(/^(?:[ ]{4}|[\t])/, ""), "");
        const t = n.trimEnd().split(`
`).pop();
        n += // add lines after list, blockquote, codefence, and table
        t && /^[ \t]*?[>\-*][ ]|[`]{3,}$|^[ \t]*?[|].+[|]$/.test(t) ? `

` : "";
        const o = {
          type: "footnote",
          raw: i,
          label: f,
          refs: [],
          content: this.lexer.blockTokens(n)
        };
        return l.rawItems.push(o), o;
      }
    },
    renderer() {
      return "";
    }
  };
}
function T(e) {
  return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function A(e, d = !1, l = !1) {
  let c = 0;
  return {
    name: "footnoteRef",
    level: "inline",
    tokenizer(a) {
      const i = /^\[\^([^\]\n]+)\]/.exec(a);
      if (i) {
        const [f, s] = i, n = this.lexer.tokens[0], t = n.rawItems.filter(
          (u) => u.label === s
        );
        if (!t.length) return;
        const o = t[0], r = n.items.filter((u) => u.label === s)[0], p = {
          type: "footnoteRef",
          raw: f,
          index: o.refs.length,
          id: "",
          label: s
        };
        return r ? (p.id = r.refs[0].id, r.refs.push(p)) : (c++, p.id = String(c), o.refs.push(p), n.items.push(o)), p;
      }
    },
    renderer({ index: a, id: i, label: f }) {
      c = 0;
      const s = encodeURIComponent(f), n = l ? T(f) : i, t = a > 0 ? `-${a + 1}` : "";
      return `<sup><a id="${e}ref-${s}${t}" href="#${e + s}" data-${e}ref aria-describedby="${e}label">${d ? `[${n}]` : n}</a></sup>`;
    }
  };
}
function E(e, d, l, c, a, i) {
  return {
    name: "footnotes",
    renderer({ raw: f, items: s = [] }) {
      if (s.length === 0) return "";
      const n = s.reduce(
        (p, { label: u, content: x, refs: y }) => {
          const b = encodeURIComponent(u), $ = this.parser.parse(x).trimEnd(), w = $.endsWith("</p>");
          let h = `<li id="${e + b}">
`;
          return h += w ? $.replace(/<\/p>$/, "") : $, y.forEach((I, F) => {
            const g = i.replace("{0}", u);
            let m, k;
            if (F > 0) {
              const L = F + 1;
              m = `↩<sup>${L}</sup>`, k = `-${L}`;
            } else
              m = "↩", k = "";
            h += ` <a href="#${e}ref-${b}${k}" data-${e}backref aria-label="${g}">${m}</a>`;
          }), h += w ? `</p>
` : `
`, h += `</li>
`, p + h;
        },
        ""
      );
      let t = "";
      l && (t += `<hr data-${d}footnotes>
`);
      let o = "";
      c && (o = ` class="${c}"`);
      let r = "";
      return a && (r = ` class="${a}"`), t += `<section${o} data-${d}footnotes>
`, t += `<h2 id="${e}label"${r}>${f.trimEnd()}</h2>
`, t += `<ol>
${n}</ol>
`, t += `</section>
`, t;
    }
  };
}
function C(e = {}) {
  const {
    prefixId: d = "footnote-",
    prefixData: l = "",
    description: c = "Footnotes",
    refMarkers: a = !1,
    footnoteDivider: i = !1,
    keepLabels: f = !1,
    sectionClass: s = "footnotes",
    headingClass: n = "sr-only",
    backRefLabel: t = "Back to reference {0}"
  } = e, o = { hasFootnotes: !1, tokens: [] };
  return {
    extensions: [
      R(o, c),
      A(d, a, f),
      E(
        d,
        l,
        i,
        s,
        n,
        t
      )
    ],
    walkTokens(r) {
      r.type === "footnotes" && o.tokens.indexOf(r) === 0 && r.items.length && (o.tokens[0] = { type: "space", raw: "" }, o.tokens.push(r)), o.hasFootnotes && (o.hasFootnotes = !1);
    }
  };
}
export {
  C as default
};
//# sourceMappingURL=index.js.map
