import { useEffect, useRef, useState } from 'react';
// If one of these icon names fails to import, reuse the imports your Skills section already uses.
import { siGithub, siLeetcode, siCodechef, siCodeforces } from 'simple-icons';
import { AS_OF, ENDPOINTS, FALLBACK, PROFILES, fetchPlatform } from './codingData';
import './Coding.css';

const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function CountUp({ value, active, prefix = '', suffix = '' }) {
  const [n, setN] = useState(REDUCED ? value : 0);
  const from = useRef(0);
  useEffect(() => {
    if (!active) return;
    if (REDUCED) { setN(value); return; }
    const start = performance.now(), a = from.current;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 900);
      setN(Math.round(a + (value - a) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick); else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, active]);
  return <>{prefix}{n.toLocaleString('en-US')}{suffix}</>;
}

const Stat = ({ label, children }) => (
  <div className="cd-stat"><dt>{label}</dt><dd>{children}</dd></div>
);

function Card({ cls, i, icon, name, profile, live, children }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', e.clientX - r.left + 'px');
    e.currentTarget.style.setProperty('--my', e.clientY - r.top + 'px');
  };
  return (
    <article className={`cd-card cursor-target ${cls}`} data-cursor-label="Stats" style={{ '--d': `${i * 90}ms` }} onPointerMove={move}>
      <svg className="cd-ghost" viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} fill="currentColor" /></svg>
      <header className="cd-ch">
        <div className="cd-id">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg>
          <div><h3>{name}</h3><small>@{profile.handle}</small></div>
        </div>
        <a className="cd-ln cursor-target" data-cursor-label="Open" href={profile.url} target="_blank" rel="noopener noreferrer">
          View profile <b>↗</b>
        </a>
      </header>
      <div className="cd-body">{children}</div>
      {!live && <p className="cd-note">Last updated {AS_OF}</p>}
    </article>
  );
}

function Ring({ s, drawn }) {
  const R = 90, C = 2 * Math.PI * R, gap = 6;
  const total = s.easy + s.medium + s.hard || 1;
  let off = 0;
  return (
    <svg viewBox="0 0 220 220" role="img" aria-label={`${s.all} problems solved: ${s.easy} easy, ${s.medium} medium, ${s.hard} hard`}>
      <circle cx="110" cy="110" r={R} style={{ stroke: 'rgba(251,236,227,.08)', transition: 'none' }} />
      {[['easy', 1], ['medium', 0.6], ['hard', 0.32]].map(([k, o], idx) => {
        const share = (s[k] / total) * C, len = Math.max(0, share - gap);
        const el = (
          <circle key={k} cx="110" cy="110" r={R} strokeDashoffset={-off}
            style={{ opacity: o, strokeDasharray: drawn ? `${len} ${C - len}` : `0 ${C}`, transitionDelay: `${idx * 0.25}s` }} />
        );
        off += share;
        return el;
      })}
    </svg>
  );
}

function LeetCode({ d, active, live, i }) {
  const s = d.solved, c = d.contest;
  return (
    <Card cls="cd-lc" i={i} icon={siLeetcode} name="LeetCode" profile={PROFILES.leetcode} live={live}>
      <div className="cd-ringw">
        <div className="cd-ring">
          <Ring s={s} drawn={active} />
          <div className="cd-rc"><span className="cd-big"><CountUp value={s.all} active={active} /></span><span className="cd-note">solved</span></div>
        </div>
        <div className="cd-rows">
          {[['Easy', 'easy', 1], ['Medium', 'medium', 0.6], ['Hard', 'hard', 0.32]].map(([l, k, o]) => (
            <div className="cd-row" key={k}>
              <span>{l}</span><b>{s[k]}</b>
              <i><u style={{ width: `${s.all ? (s[k] / s.all) * 100 : 0}%`, opacity: o }} /></i>
            </div>
          ))}
        </div>
      </div>
      <dl className="cd-stats">
        {d.ranking != null && <Stat label="Global ranking"><CountUp value={d.ranking} active={active} prefix="#" /></Stat>}
        {c && <Stat label="Contest rating"><CountUp value={c.rating} active={active} /></Stat>}
        {c && <Stat label="Contests attended"><CountUp value={c.attended} active={active} /></Stat>}
        {c?.top != null && <Stat label="Contest percentile">Top {c.top}%</Stat>}
        {d.totalActiveDays != null && <Stat label="Active days"><CountUp value={d.totalActiveDays} active={active} /></Stat>}
        {d.badgesCount != null && (
          <Stat label="Badges"><CountUp value={d.badgesCount} active={active} />{d.latestBadge && <small>{d.latestBadge}</small>}</Stat>
        )}
      </dl>
    </Card>
  );
}

function GitHub({ d, active, live, i }) {
  const L = d.languages || [];
  return (
    <Card cls="cd-gh" i={i} icon={siGithub} name="GitHub" profile={PROFILES.github} live={live}>
      <dl className="cd-stats cd-top">
        {d.publicRepos != null && <Stat label="Repositories"><span className="cd-big"><CountUp value={d.publicRepos} active={active} /></span></Stat>}
        {d.followers != null && <Stat label="Followers"><span className="cd-big"><CountUp value={d.followers} active={active} /></span></Stat>}
        {d.following != null && <Stat label="Following"><span className="cd-big"><CountUp value={d.following} active={active} /></span></Stat>}
        {d.totalStars != null && <Stat label="Stars"><span className="cd-big"><CountUp value={d.totalStars} active={active} /></span></Stat>}
        {d.totalForks > 0 && <Stat label="Forks"><span className="cd-big"><CountUp value={d.totalForks} active={active} /></span></Stat>}
      </dl>
      {L.length > 0 && (
        <div>
          <div className="cd-lang" role="img" aria-label={'Languages: ' + L.map((l) => `${l.name} ${l.count}`).join(', ')}>
            {L.map((l, k) => <u key={l.name} style={{ flex: l.count, opacity: Math.max(0.2, 1 - k * 0.16), transitionDelay: `${k * 0.08}s` }} />)}
          </div>
          <div className="cd-leg">{L.map((l) => <span key={l.name}>{l.name} <b>{l.count}</b></span>)}</div>
        </div>
      )}
    </Card>
  );
}

function Rating({ cls, i, icon, name, profile, live, active, big, chip, stats }) {
  return (
    <Card cls={cls} i={i} icon={icon} name={name} profile={profile} live={live}>
      <div className="cd-hero">
        {big != null && <span className="cd-big"><CountUp value={big} active={active} /></span>}
        {chip && <span className="cd-chip">{chip}</span>}
      </div>
      <dl className="cd-stats">
        {stats.filter(([, v]) => v != null).map(([label, v, prefix]) => (
          <Stat key={label} label={label}><CountUp value={v} active={active} prefix={prefix} /></Stat>
        ))}
      </dl>
    </Card>
  );
}

export default function Coding() {
  const ref = useRef(null);
  const [active, setActive] = useState(REDUCED);
  const [data, setData] = useState(FALLBACK);
  const [live, setLive] = useState({});
  const [updated, setUpdated] = useState(null);

  useEffect(() => {
    if (REDUCED) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let off = false;
    const base = import.meta.env.VITE_API_URL || '';
    Promise.all(Object.keys(ENDPOINTS).map((k) => fetchPlatform(k, base).then((r) => [k, r]))).then((rs) => {
      if (off) return;
      const nd = {}, nl = {};
      rs.forEach(([k, r]) => { nl[k] = r.ok; nd[k] = r.ok ? r.data : FALLBACK[k]; });
      setData(nd); setLive(nl);
      if (Object.values(nl).some(Boolean)) setUpdated(new Date());
    });
    return () => { off = true; };
  }, []);

  const { leetcode: L, github: G, codechef: C, codeforces: F } = data;
  const anyLive = Object.values(live).some(Boolean);
  const items = [];
  if (L?.solved?.all) items.push(`${L.solved.all} problems solved`);
  if (L?.contest) items.push(`${L.contest.rating} LeetCode contest rating`);
  if (C?.currentRating) items.push(`${C.currentRating} CodeChef rating`);
  if (G?.publicRepos) items.push(`${G.publicRepos} public repositories`);
  if (F?.contests) items.push(`${F.contests} Codeforces contest${F.contests > 1 ? 's' : ''}`);
  const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

  return (
    <section id="coding" ref={ref} className={`cd${active ? ' on' : ''}`} aria-labelledby="coding-h">
      <div className="cd-in">
        <div className="cd-head">
          <h2 id="coding-h" className="cd-label">Coding<span>Problem solving</span></h2>
          <div className="cd-head-right">
            <span className="cd-pill">
              <i className={`cd-dot${anyLive ? '' : ' off'}`} />
              {anyLive ? 'Live from my servers' : 'Showing saved stats'}
              {updated && ` · Updated ${updated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            </span>
            {import.meta.env.DEV && (
              <span className="cd-dev-diag">
                {`github: ${live.github ? 'live' : 'saved'} · leetcode: ${live.leetcode ? 'live' : 'saved'} · codechef: ${live.codechef ? 'live' : 'saved'} · codeforces: ${live.codeforces ? 'live' : 'saved'}`}
              </span>
            )}
          </div>
        </div>

        <div className="cd-grid">
          {L && <LeetCode d={L} active={active} live={live.leetcode} i={0} />}
          {G && <GitHub d={G} active={active} live={live.github} i={1} />}
          {F && <Rating cls="cd-cf" i={2} icon={siCodeforces} name="Codeforces" profile={PROFILES.codeforces} live={live.codeforces} active={active}
            big={F.rating} chip={cap(F.rank)} stats={[['Max rating', F.maxRating], ['Contests', F.contests], ['Best rank', F.bestRank, '#']]} />}
          {C && <Rating cls="cd-cc" i={3} icon={siCodechef} name="CodeChef" profile={PROFILES.codechef} live={live.codechef} active={active}
            big={C.currentRating} chip={C.stars ? `${C.stars}★` : null} stats={[['Highest', C.highestRating], ['Global rank', C.globalRank, '#'], ['Country rank', C.countryRank, '#']]} />}
        </div>

        {items.length > 0 && (
          <div className="cd-tk cursor-target" data-cursor-label="Stats">
            <div>
              {items.map((t) => <span key={t}>{t}</span>)}
              {items.map((t) => <span key={t + '2'} aria-hidden="true">{t}</span>)}
            </div>
          </div>
        )}
        <p className="cd-foot">Main language for problem solving: C++.</p>
        <p className="cd-sr" aria-live="polite">{anyLive ? 'Coding stats updated.' : ''}</p>
      </div>
    </section>
  );
}
