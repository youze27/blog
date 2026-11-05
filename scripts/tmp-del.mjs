import fs from "node:fs";

const base = "C:/blog/src/net/assets";
const bad = fs.readdirSync(base).filter((n) => n.startsWith("!") || n.startsWith("(") || n.includes("]("));
console.log("bad entries: " + JSON.stringify(bad));

for (const n of bad) {
  const variants = [
    base + "/" + n,
    "\\\\?\\" + (base + "/" + n).replace(/\//g, "\\"),
  ];
  let ok = false;
  for (const v of variants) {
    try {
      fs.rmSync(v, { recursive: true, force: true, maxRetries: 3 });
      ok = true;
      console.log("deleted via: " + v);
      break;
    } catch (e) {
      console.log("fail " + v + " -> " + e.code);
    }
  }
  if (!ok) {
    for (const v of variants) {
      try {
        if (fs.lstatSync(v).isDirectory()) fs.rmdirSync(v);
        else fs.unlinkSync(v);
        ok = true;
        console.log("deleted2 via: " + v);
        break;
      } catch (e) {
        console.log("fail2 " + v + " -> " + e.code);
      }
    }
  }
}

console.log("after: " + JSON.stringify(fs.readdirSync(base).filter((n) => n.startsWith("!") || n.includes("](")));
