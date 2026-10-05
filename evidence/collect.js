// Read-only evidence collector: GET requests only (SOQL, describe, tooling query, limits).
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ALIAS = 'prod';
const V = 'v67.0';
const OUT = path.join(__dirname, 'raw');
fs.mkdirSync(OUT, { recursive: true });

const auth = JSON.parse(execSync(`sf org auth show-access-token -o ${ALIAS} --json`, { encoding: 'utf8' })).result;
const token = auth.accessToken;
const base = JSON.parse(execSync(`sf org display -o ${ALIAS} --json`, { encoding: 'utf8' })).result.instanceUrl;

async function get(p) {
  const r = await fetch(base + p, { headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' } });
  const t = await r.text();
  let body; try { body = JSON.parse(t); } catch { body = t; }
  return { status: r.status, body };
}

async function queryAll(soql, tooling) {
  let p = `/services/data/${V}/${tooling ? 'tooling/' : ''}query/?q=${encodeURIComponent(soql)}`;
  let records = [], first;
  while (p) {
    const r = await get(p);
    if (r.status !== 200) return { ok: false, status: r.status, error: r.body, soql, tooling: !!tooling };
    first = first || r.body;
    records = records.concat(r.body.records || []);
    p = r.body.nextRecordsUrl || null;
  }
  return { ok: true, soql, tooling: !!tooling, totalSize: first.totalSize, records };
}

const strip = (o) => JSON.parse(JSON.stringify(o, (k, v) => (k === 'attributes' ? undefined : v)));

async function run(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter((l) => l.trim() && !l.startsWith('#'));
  const results = {};
  await Promise.all(lines.map(async (l) => {
    const [label, kind, q] = l.split('|||').map((s) => s.trim());
    let res;
    if (kind === 'GET') { const r = await get(q); res = { ok: r.status === 200, status: r.status, path: q, body: r.body }; }
    else res = await queryAll(q, kind === 'T');
    results[label] = strip(res);
  }));
  return results;
}

(async () => {
  const file = process.argv[2];
  const outName = process.argv[3];
  const res = await run(file);
  fs.writeFileSync(path.join(OUT, outName), JSON.stringify(res, null, 1));
  for (const [k, v] of Object.entries(res)) {
    console.log(`${v.ok ? 'OK ' : 'ERR'} ${k}` + (v.ok ? (v.totalSize !== undefined ? ` n=${v.totalSize}` : '') : ` ${v.status} ${JSON.stringify(v.error || v.body).slice(0, 160)}`));
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
