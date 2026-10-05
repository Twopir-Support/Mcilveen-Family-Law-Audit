const fs = require('fs');
const path = require('path');
const [file, ...labels] = process.argv.slice(2);
const r = JSON.parse(fs.readFileSync(path.join(__dirname, 'raw', file), 'utf8'));
const flat = (o, p = '') => Object.entries(o).reduce((a, [k, v]) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.assign(a, flat(v, p + k + '.')) : ((a[p + k] = v), a)), {});
for (const l of labels.length ? labels : Object.keys(r)) {
  const v = r[l];
  if (!v) { console.log(`== ${l}: missing`); continue; }
  console.log(`== ${l}${v.ok ? '' : ' ERROR ' + v.status}`);
  if (!v.ok) { console.log(JSON.stringify(v.error || v.body).slice(0, 300)); continue; }
  if (v.records) for (const rec of v.records) console.log(Object.values(flat(rec)).map((x) => (x === null ? '' : x)).join(' | '));
  else console.log(JSON.stringify(v.body).slice(0, 4000));
}
