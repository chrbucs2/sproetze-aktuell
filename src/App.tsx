import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './App.css'
import {
  appropriationRows,
  budgetFlows,
  budgetSnapshot,
  contentBacklog,
  debtRows,
  departmentRows,
  departmentTotals,
  sourceInfo,
  taxRates,
  type DepartmentRow,
} from './data/budgetData'
import wgsLogo from './assets/wgs-logo.png'

type ViewMode = 'infos' | 'diagramme' | 'tabelle'
type BudgetYear = '2026' | '2027' | '2028'

type YearCardTone = 'blue' | 'teal' | 'violet' | 'amber'

type BudgetYearContent = {
  available: boolean
  badge: string
  headline: string
  lead: string
  heroLabel: string
  heroStats: Array<{ label: string; value: string }>
  heroNote: string
  kpis: Array<{ label: string; value: string; description: string; tone: YearCardTone }>
  pendingTitle?: string
  pendingText?: string
}

const budgetYears: BudgetYear[] = ['2026', '2027', '2028']

const euroFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const compactEuroFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const numberFormatter = new Intl.NumberFormat('de-DE')

const chartPalette = ['#2563eb', '#14b8a6', '#8b5cf6', '#f59e0b', '#ef4444', '#0f172a']

function formatEuro(value: number) {
  return euroFormatter.format(value)
}

function formatCompactEuro(value: number) {
  return compactEuroFormatter.format(value)
}

function formatDelta(value: number) {
  const prefix = value > 0 ? '+' : ''
  return `${prefix}${formatEuro(value)}`
}

function formatDebt(value: number) {
  return `${numberFormatter.format(value)} Tsd. €`
}

function numericValue(value: unknown) {
  return typeof value === 'number' ? value : Number(value ?? 0)
}

function assetHref(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

function shortLabel(label: string) {
  return label
    .replace('Ortschaft ', '')
    .replace(' und ', ' & ')
    .replace('Verwaltungsführung und Presse- u. Öffentlichkeitsarbeit', 'Verwaltung & Presse')
    .replace('Organisationsentwicklung und zentrale Dienste', 'Orga & Dienste')
    .replace('Stadt- und Grünplanung, Umwelt und Klima', 'Planung & Klima')
    .replace('Grün- u. Stadtbildpflege, Friedhofswesen', 'Grünpflege')
}

function departmentStory(row: DepartmentRow) {
  if (row.spotlight) {
    return row.spotlight
  }

  const strongestDelta = [
    { label: 'ordentliches Ergebnis', value: row.result.balance.delta },
    { label: 'Verwaltungssaldo', value: row.admin.balance.delta },
    { label: 'Liquiditätswirkung', value: row.liquidity.cashChange.delta },
  ].sort((a, b) => Math.abs(b.value) - Math.abs(a.value))[0]

  if (strongestDelta.value === 0) {
    return 'Für diesen Bereich zeigt der Nachtragshaushalt keine inhaltlich großen Verschiebungen gegenüber dem bisherigen Ansatz.'
  }

  const direction = strongestDelta.value > 0 ? 'verbessert' : 'verschlechtert'

  return `Der auffälligste Effekt liegt beim ${strongestDelta.label}: Gegenüber dem bisherigen Ansatz ${direction} sich der Wert um ${formatEuro(Math.abs(strongestDelta.value))}.`
}

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('diagramme')
  const [selectedYear, setSelectedYear] = useState<BudgetYear>('2026')
  const [selectedCode, setSelectedCode] = useState('0007')

  const sproetzeSchoolProject = appropriationRows.find((row) => row.label.includes('GS Sprötze'))
  const sproetzeSchoolShare = sproetzeSchoolProject
    ? Math.round((sproetzeSchoolProject.amount / budgetSnapshot.commitmentsTotal) * 1000) / 10
    : 0

  const yearContent: Record<BudgetYear, BudgetYearContent> = {
    '2026': {
      available: true,
      badge: `Gesponsert von der ${sourceInfo.sponsor}`,
      headline: 'Sprötze verständlich erklärt – beginnend mit dem Buchholzer Haushalt 2026.',
      lead: 'Interaktive Diagramme, Teilhaushalte und Kennzahlen machen den Nachtragshaushalt für Sprötze schneller lesbar.',
      heroLabel: 'Schnellüberblick 2026',
      heroStats: [
        { label: 'Ordentliche Erträge', value: formatCompactEuro(budgetSnapshot.ordinary.revenue) },
        { label: 'Ordentliche Aufwendungen', value: formatCompactEuro(budgetSnapshot.ordinary.expense) },
        { label: 'Einzahlungen gesamt', value: formatCompactEuro(budgetSnapshot.totalFinance.incoming) },
        { label: 'Auszahlungen gesamt', value: formatCompactEuro(budgetSnapshot.totalFinance.outgoing) },
      ],
      heroNote: `Beschlossen am ${sourceInfo.decisionDate} · Verpflichtungsermächtigungen ${formatCompactEuro(budgetSnapshot.commitmentsTotal)}`,
      kpis: [
        {
          label: 'Saldo Ergebnishaushalt',
          value: formatEuro(budgetSnapshot.ordinary.balance + budgetSnapshot.extraordinary.balance),
          description: 'Ordentlich plus außerordentlich.',
          tone: 'blue',
        },
        {
          label: 'Veränderung Zahlungsmittel',
          value: formatEuro(departmentTotals.liquidity.cashChange.new),
          description: 'Im Nachtrag deutlich besser als bisher.',
          tone: 'teal',
        },
        {
          label: 'Schuldenstand 2027',
          value: formatDebt(debtRows[debtRows.length - 1].y2027),
          description: 'Vor allem durch Investitionskredite geprägt.',
          tone: 'violet',
        },
        {
          label: 'GS Sprötze',
          value: formatEuro(sproetzeSchoolProject?.amount ?? 0),
          description: 'Verpflichtungsermächtigung im aktuellen Paket.',
          tone: 'amber',
        },
      ],
    },
    '2027': {
      available: false,
      badge: 'Haushaltsjahr 2027',
      headline: '2027 ist schon vorbereitet.',
      lead: 'Sobald der nächste Haushalt vorliegt, erscheinen hier automatisch Karten, Diagramme und Tabellen für das neue Jahr.',
      heroLabel: 'Stand 2027',
      heroStats: [
        { label: 'Datenbasis', value: 'folgt' },
        { label: 'Diagramme', value: 'vorbereitet' },
        { label: 'Tabellen', value: 'vorbereitet' },
        { label: 'Vergleich', value: 'geplant' },
      ],
      heroNote: 'Die Auswahl ist eingebaut – es fehlen nur noch die konkreten Haushaltszahlen.',
      kpis: [
        {
          label: 'Jahresumschaltung',
          value: 'aktiv',
          description: 'Die Seite kann sofort auf neue Daten umgestellt werden.',
          tone: 'blue',
        },
        {
          label: 'Dashboard',
          value: 'wartet auf Daten',
          description: 'Diagramme und Step-In werden nachgeliefert.',
          tone: 'teal',
        },
        {
          label: 'Quellenlogik',
          value: 'bereit',
          description: 'PDF und offizielle Quellen lassen sich ergänzen.',
          tone: 'violet',
        },
        {
          label: 'Sprötze-Fokus',
          value: 'vorbereitet',
          description: 'Lokale Auswertung kann direkt folgen.',
          tone: 'amber',
        },
      ],
      pendingTitle: 'Haushaltsdaten für 2027 folgen',
      pendingText: 'Die Jahresauswahl ist sichtbar eingebaut. Sobald Zahlen vorliegen, werden hier dieselben Diagramm- und Tabellenmodule wie für 2026 angezeigt.',
    },
    '2028': {
      available: false,
      badge: 'Haushaltsjahr 2028',
      headline: '2028 ist ebenfalls auswählbar.',
      lead: 'Die Struktur steht bereits. Das spart später Umbauten, wenn mehrere Haushaltsjahre parallel verglichen werden sollen.',
      heroLabel: 'Stand 2028',
      heroStats: [
        { label: 'Datenbasis', value: 'offen' },
        { label: 'Visualisierung', value: 'einsatzbereit' },
        { label: 'KPI-Karten', value: 'einsatzbereit' },
        { label: 'Vergleich', value: 'geplant' },
      ],
      heroNote: '2028 ist als weitere Ausbaustufe vorbereitet.',
      kpis: [
        {
          label: 'Navigation',
          value: 'fertig',
          description: 'Das Jahr ist direkt anwählbar.',
          tone: 'blue',
        },
        {
          label: 'Charts',
          value: 'bereit',
          description: 'Sobald Daten vorliegen, greifen dieselben Komponenten.',
          tone: 'teal',
        },
        {
          label: 'Step-In',
          value: 'bereit',
          description: 'Teilhaushalte können später übernommen werden.',
          tone: 'violet',
        },
        {
          label: 'Datenpflege',
          value: 'minimal',
          description: 'Es muss nur der Jahresdatensatz ergänzt werden.',
          tone: 'amber',
        },
      ],
      pendingTitle: '2028 wird nach gleichem Muster ergänzt',
      pendingText: 'Die Komponenten sind absichtlich wiederverwendbar aufgebaut. Neue Haushaltsjahre brauchen vor allem Daten, keinen Neuaufbau des Frontends.',
    },
  }

  const currentYear = yearContent[selectedYear]

  const selectedDepartment = departmentRows.find((row) => row.code === selectedCode) ?? departmentRows[0]

  const flowChartData = budgetFlows.map((row) => ({
    name: row.label,
    einzahlungen: row.incoming.new,
    auszahlungen: row.outgoing.new,
  }))

  const balanceChartData = useMemo(
    () =>
      [...departmentRows]
        .sort((a, b) => Math.abs(b.result.balance.new) - Math.abs(a.result.balance.new))
        .slice(0, 10)
        .map((row) => ({
          code: row.code,
          name: shortLabel(row.label),
          fullName: row.label,
          saldo: row.result.balance.new,
          delta: row.result.balance.delta,
          sproetze: row.code === '0007',
        })),
    [],
  )

  const commitmentChartData = useMemo(() => {
    const top = [...appropriationRows].sort((a, b) => b.amount - a.amount).slice(0, 5)
    const topAmount = top.reduce((sum, row) => sum + row.amount, 0)

    return [
      ...top.map((row) => ({ name: shortLabel(row.label), value: row.amount, fullName: row.label })),
      {
        name: 'Weitere Projekte',
        fullName: 'Weitere Projekte',
        value: budgetSnapshot.commitmentsTotal - topAmount,
      },
    ]
  }, [])

  const debtTrendData = debtRows.map((row) => ({
    name: row.label,
    y2025: row.y2025,
    y2026: row.y2026,
    y2027: row.y2027,
  }))

  const quickSelectRows = useMemo(
    () =>
      ['0007', '2002', '1003', '4003', '3003']
        .map((code) => departmentRows.find((row) => row.code === code))
        .filter((row): row is DepartmentRow => Boolean(row)),
    [],
  )


  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <img className="brand-logo" src={wgsLogo} alt="Logo der Wählergruppe Sprötze" />
          <div>
            <p className="eyebrow">Sprötze aktuell</p>
            <p className="brand-subline">Informationen für den Ortsteil – klar, lokal und nachvollziehbar.</p>
          </div>
        </div>
        <nav className="topnav" aria-label="Seitennavigation">
          <a href="#haushalt">Haushalt</a>
          <a href="#fokus">Sprötze im Fokus</a>
          <a href="#ausblick">Ausblick</a>
          <a href="#quellen">Quellen</a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <span className="sponsor-badge">{currentYear.badge}</span>
            <h1>{currentYear.headline}</h1>
            <p className="lead">{currentYear.lead}</p>
            <div className="hero-toolbar">
              <label className="year-select-card" htmlFor="budget-year-select">
                <span className="year-select-label">Haushaltsjahr</span>
                <select
                  id="budget-year-select"
                  value={selectedYear}
                  onChange={(event) => setSelectedYear(event.target.value as BudgetYear)}
                >
                  {budgetYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
              <p className="hero-toolbar-note">
                {currentYear.available
                  ? '2026 ist interaktiv gepflegt.'
                  : 'Dieses Jahr ist schon auswählbar und für Daten vorbereitet.'}
              </p>
            </div>
            <div className="hero-actions">
              <a className="button primary" href="#haushalt">
                Haushalts-Dashboard öffnen
              </a>
              <a className="button secondary" href={assetHref(sourceInfo.pdfPath)} target="_blank" rel="noreferrer">
                Original-PDF ansehen
              </a>
              <a className="button ghost" href={sourceInfo.officialPage} target="_blank" rel="noreferrer">
                Offizielle Haushaltsseite
              </a>
            </div>
            <div className="bullet-grid compact-bullets">
              <div className="bullet-card">
                <span>📊</span>
                <div>
                  <strong>Interaktiv</strong>
                  <p>Charts, Tabellen und Step-In für einzelne Bereiche.</p>
                </div>
              </div>
              <div className="bullet-card">
                <span>🗓️</span>
                <div>
                  <strong>Mehrjährige Struktur</strong>
                  <p>2026 ist aktiv, weitere Jahre sind schon auswählbar.</p>
                </div>
              </div>
              <div className="bullet-card">
                <span>📄</span>
                <div>
                  <strong>Mit Quellenbezug</strong>
                  <p>PDF und offizielle Haushaltsseite bleiben direkt verlinkt.</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="hero-panel">
            <p className="panel-label">{currentYear.heroLabel}</p>
            <div className="hero-stats">
              {currentYear.heroStats.map((item) => (
                <div key={item.label} className={!currentYear.available ? 'hero-stat-placeholder' : ''}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className="hero-note">
              <p>{currentYear.heroNote}</p>
            </div>
          </aside>
        </section>

        <section className="kpi-grid" aria-label="Wesentliche Kennzahlen">
          {currentYear.kpis.map((item) => (
            <article key={item.label} className={`kpi-card accent-${item.tone}`}>
              <span className="kpi-label">{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section id="haushalt" className={`section-shell ${currentYear.available ? 'split-layout' : 'year-preview-shell'}`}>
          {!currentYear.available && (
            <div className="year-preview-grid">
              <article className="pending-card pending-card-strong">
                <p className="eyebrow">Jahresauswahl aktiv</p>
                <h2>{currentYear.pendingTitle}</h2>
                <p>{currentYear.pendingText}</p>
              </article>
              <article className="pending-card">
                <h3>Was schon steht</h3>
                <ul>
                  <li>Logo und neue Kopfzeile sind eingebunden.</li>
                  <li>Das Jahr kann direkt umgeschaltet werden.</li>
                  <li>Die Komponenten für Charts und Tabellen werden wiederverwendet.</li>
                </ul>
              </article>
            </div>
          )}

          {currentYear.available && (
            <>
          <div className="section-main">
            <div className="section-header">
              <div>
                <p className="eyebrow">Haushalt aufbereitet</p>
                <h2>Vom PDF zur verständlichen Übersicht</h2>
                <p>
                  Die Darstellung kombiniert offizielle Summen aus der Satzung mit Teilhaushalten aus
                  Ergebnis-, Finanz- und Schuldenübersicht.
                </p>
              </div>

              <div className="mode-switch" role="tablist" aria-label="Ansichtsmodus wechseln">
                {(['infos', 'diagramme', 'tabelle'] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={mode === viewMode ? 'active' : ''}
                    onClick={() => setViewMode(mode)}
                  >
                    {mode === 'infos' ? 'Info-I' : mode === 'diagramme' ? 'Diagramme' : 'Tabelle'}
                  </button>
                ))}
              </div>
            </div>

            {viewMode === 'infos' && (
              <div className="info-layout">
                <div className="flow-cards">
                  {budgetFlows.map((flow) => (
                    <article key={flow.label} className="info-card">
                      <div className="info-card-head">
                        <span>{flow.label}</span>
                        <strong>{formatCompactEuro(flow.incoming.new - flow.outgoing.new)}</strong>
                      </div>
                      <dl>
                        <div>
                          <dt>Einzahlungen</dt>
                          <dd>{formatEuro(flow.incoming.new)}</dd>
                        </div>
                        <div>
                          <dt>Auszahlungen</dt>
                          <dd>{formatEuro(flow.outgoing.new)}</dd>
                        </div>
                        <div>
                          <dt>Änderung ggü. bisher</dt>
                          <dd>{formatDelta(flow.incoming.delta - flow.outgoing.delta)}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>

                <div className="term-grid">
                  <details open className="term-card">
                    <summary>Was ist der Ergebnishaushalt?</summary>
                    <p>
                      Er zeigt, welche Erträge und Aufwendungen im Jahr voraussichtlich anfallen. Er ist
                      der beste Einstieg, um politische Schwerpunkte und laufende Belastungen zu sehen.
                    </p>
                  </details>
                  <details className="term-card">
                    <summary>Was bedeutet der Finanzhaushalt?</summary>
                    <p>
                      Hier geht es um echte Zahlungsströme: Ein- und Auszahlungen aus Verwaltung,
                      Investitionen und Finanzierung. Er zeigt, wie viel Liquidität gebraucht wird.
                    </p>
                  </details>
                  <details className="term-card">
                    <summary>Was sind Verpflichtungsermächtigungen?</summary>
                    <p>
                      Sie erlauben schon heute Zusagen für zukünftige Jahre. Für Sprötze besonders
                      relevant: 3,0 Mio. Euro für die GS Sprötze innerhalb des Gesamtpakets.
                    </p>
                  </details>
                  <details className="term-card">
                    <summary>Welche Hebesätze gelten?</summary>
                    <ul className="tax-list">
                      {taxRates.map((tax) => (
                        <li key={tax.label}>
                          <span>{tax.label}</span>
                          <strong>{tax.value}</strong>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
            )}

            {viewMode === 'diagramme' && (
              <div className="chart-grid">
                <article className="chart-card chart-card-wide">
                  <div className="card-heading">
                    <div>
                      <h3>Ein- und Auszahlungen nach Haushaltslogik</h3>
                      <p>Verwaltung, Investitionen und Finanzierung im direkten Vergleich.</p>
                    </div>
                  </div>
                  <div className="chart-wrap tall">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={flowChartData} barGap={6}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis tickFormatter={formatCompactEuro} tickLine={false} axisLine={false} />
                        <Tooltip
                          formatter={(value) => formatEuro(numericValue(value))}
                          labelFormatter={(label) => String(label)}
                        />
                        <Bar dataKey="einzahlungen" fill="#2563eb" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="auszahlungen" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </article>

                <article className="chart-card chart-card-wide">
                  <div className="card-heading">
                    <div>
                      <h3>Die 10 prägendsten Teilhaushalte</h3>
                      <p>Klick auf einen Balken, um rechts in den Bereich hineinzusteppen.</p>
                    </div>
                  </div>
                  <div className="chart-wrap tall">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={balanceChartData} layout="vertical" margin={{ left: 12, right: 24 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" tickFormatter={formatCompactEuro} tickLine={false} axisLine={false} />
                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={132} />
                        <Tooltip
                          formatter={(value) => formatEuro(numericValue(value))}
                          labelFormatter={(_, payload) => String(payload?.[0]?.payload.fullName ?? '')}
                        />
                        <Bar
                          dataKey="saldo"
                          radius={[0, 10, 10, 0]}
                          onClick={(_, index) => setSelectedCode(balanceChartData[index].code)}
                        >
                          {balanceChartData.map((entry) => (
                            <Cell
                              key={entry.code}
                              cursor="pointer"
                              fill={entry.sproetze ? '#f59e0b' : entry.saldo >= 0 ? '#2563eb' : '#8b5cf6'}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </article>

                <article className="chart-card">
                  <div className="card-heading">
                    <div>
                      <h3>Verpflichtungsermächtigungen</h3>
                      <p>Die größten Blöcke im Paket von {formatCompactEuro(budgetSnapshot.commitmentsTotal)}.</p>
                    </div>
                  </div>
                  <div className="chart-wrap">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={commitmentChartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={70}
                          outerRadius={108}
                          paddingAngle={2}
                        >
                          {commitmentChartData.map((entry, index) => (
                            <Cell key={entry.name} fill={chartPalette[index % chartPalette.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => formatEuro(numericValue(value))}
                          labelFormatter={(label) => String(label)}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </article>

                <article className="chart-card">
                  <div className="card-heading">
                    <div>
                      <h3>Schuldenentwicklung</h3>
                      <p>Werte laut Übersicht jeweils in Tausend Euro.</p>
                    </div>
                  </div>
                  <div className="chart-wrap">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={debtTrendData} margin={{ left: 8, right: 12 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} hide />
                        <YAxis tickFormatter={formatDebt} tickLine={false} axisLine={false} width={88} />
                        <Tooltip
                          formatter={(value) => formatDebt(numericValue(value))}
                          labelFormatter={(label) => String(label)}
                        />
                        <Line type="monotone" dataKey="y2025" stroke="#94a3b8" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="y2026" stroke="#2563eb" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="y2027" stroke="#ef4444" strokeWidth={2.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </article>
              </div>
            )}

            {viewMode === 'tabelle' && (
              <div className="table-shell">
                <table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Bereich</th>
                      <th>Ordentliches Ergebnis</th>
                      <th>Verwaltungssaldo</th>
                      <th>Investive Auszahlungen</th>
                      <th>VE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentRows.map((row) => (
                      <tr key={row.code} className={row.code === selectedCode ? 'selected-row' : ''}>
                        <td>{row.code}</td>
                        <td>
                          <strong>{row.label}</strong>
                        </td>
                        <td>{formatEuro(row.result.balance.new)}</td>
                        <td>{formatEuro(row.admin.balance.new)}</td>
                        <td>{formatEuro(row.investment.expense.new)}</td>
                        <td>{formatEuro(row.liquidity.commitments.new)}</td>
                        <td>
                          <button type="button" className="table-action" onClick={() => setSelectedCode(row.code)}>
                            Step-In
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <aside className="stepin-panel">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Step-In</p>
                <h3>{selectedDepartment.label}</h3>
              </div>
            </div>

            <div className="quick-select">
              {quickSelectRows.map((row) => (
                <button
                  key={row.code}
                  type="button"
                  className={row.code === selectedCode ? 'active' : ''}
                  onClick={() => setSelectedCode(row.code)}
                >
                  {shortLabel(row.label)}
                </button>
              ))}
            </div>

            <div className="stepin-metrics">
              <article>
                <span>Ordentliches Ergebnis</span>
                <strong>{formatEuro(selectedDepartment.result.balance.new)}</strong>
                <small>{formatDelta(selectedDepartment.result.balance.delta)}</small>
              </article>
              <article>
                <span>Verwaltungssaldo</span>
                <strong>{formatEuro(selectedDepartment.admin.balance.new)}</strong>
                <small>{formatDelta(selectedDepartment.admin.balance.delta)}</small>
              </article>
              <article>
                <span>Investive Auszahlungen</span>
                <strong>{formatEuro(selectedDepartment.investment.expense.new)}</strong>
                <small>{formatDelta(selectedDepartment.investment.expense.delta)}</small>
              </article>
              <article>
                <span>Verpflichtungsermächtigungen</span>
                <strong>{formatEuro(selectedDepartment.liquidity.commitments.new)}</strong>
                <small>{formatDelta(selectedDepartment.liquidity.commitments.delta)}</small>
              </article>
              <article>
                <span>Liquiditätswirkung</span>
                <strong>{formatEuro(selectedDepartment.liquidity.cashChange.new)}</strong>
                <small>{formatDelta(selectedDepartment.liquidity.cashChange.delta)}</small>
              </article>
              <article>
                <span>Finanzierungssaldo</span>
                <strong>{formatEuro(selectedDepartment.financing.balance.new)}</strong>
                <small>{formatDelta(selectedDepartment.financing.balance.delta)}</small>
              </article>
            </div>

            <div className="stepin-story">
              <h4>Einordnung</h4>
              <p>{departmentStory(selectedDepartment)}</p>
            </div>

            <div className="stepin-actions">
              <a className="button secondary" href={assetHref(sourceInfo.pdfPath)} target="_blank" rel="noreferrer">
                Quelle öffnen
              </a>
              <a className="button ghost" href={sourceInfo.officialPage} target="_blank" rel="noreferrer">
                Buchholz.de
              </a>
              <a className="button ghost" href="#quellen">
                Zur Transparenz-Sektion
              </a>
            </div>
          </aside>
            </>
          )}
        </section>

        <section id="fokus" className="section-shell">
          <div className="section-header compact">
            <div>
              <p className="eyebrow">Sprötze im Fokus</p>
              <h2>Was der Nachtrag für Sprötze besonders sichtbar macht</h2>
            </div>
          </div>

          <div className="focus-grid">
            <article className="focus-card">
              <span className="focus-icon">🏡</span>
              <h3>Ortschaftshaushalt Sprötze</h3>
              <strong>{formatEuro((departmentRows.find((row) => row.code === '0007') ?? selectedDepartment).result.balance.new)}</strong>
              <p>
                Im ordentlichen Ergebnis bleibt Sprötze positiv. Im Verwaltungsteil stehen {formatEuro((departmentRows.find((row) => row.code === '0007') ?? selectedDepartment).admin.balance.new)}.
              </p>
            </article>
            <article className="focus-card">
              <span className="focus-icon">🏫</span>
              <h3>GS Sprötze als Zukunftsprojekt</h3>
              <strong>{formatEuro(sproetzeSchoolProject?.amount ?? 0)}</strong>
              <p>
                Das Schulprojekt macht rund {numberFormatter.format(sproetzeSchoolShare)} % des gesamten VE-Pakets aus.
              </p>
            </article>
            <article className="focus-card">
              <span className="focus-icon">💧</span>
              <h3>Liquidität verbessert</h3>
              <strong>{formatEuro(departmentTotals.liquidity.cashChange.delta)}</strong>
              <p>
                Gegenüber dem bisherigen Ansatz verbessert sich die Veränderung des Zahlungsmittelbestands spürbar.
              </p>
            </article>
          </div>
        </section>

        <section id="ausblick" className="section-shell">
          <div className="section-header compact">
            <div>
              <p className="eyebrow">Nächste Ausbaustufen</p>
              <h2>Die Website kann schrittweise zu einem echten Sprötze-Portal wachsen</h2>
              <p>
                Der Haushaltsbereich ist als erster Baustein umgesetzt. Darauf lassen sich weitere lokale
                Themenmodule aufsetzen.
              </p>
            </div>
          </div>

          <div className="backlog-grid">
            {contentBacklog.map((entry) => (
              <article key={entry.title} className="backlog-card">
                <h3>{entry.title}</h3>
                <p>{entry.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="quellen" className="section-shell transparency-shell">
          <div className="section-header compact">
            <div>
              <p className="eyebrow">Quellen & Transparenz</p>
              <h2>Woher die Daten stammen</h2>
            </div>
          </div>

          <div className="transparency-grid">
            <article className="source-card">
              <h3>Verwendetes Dokument</h3>
              <p>{sourceInfo.title}</p>
              <ul>
                <li>Beschlussdatum: {sourceInfo.decisionDate}</li>
                <li>Verwendete Seiten: {sourceInfo.pagesUsed.join(', ')}</li>
                <li>PDF im Repository und zusätzlich im Web-Public-Ordner verfügbar</li>
                <li>Zusätzliche Quelle: offizielle Haushaltsseite der Stadt Buchholz</li>
              </ul>
              <div className="hero-actions">
                <a className="button primary" href={assetHref(sourceInfo.pdfPath)} target="_blank" rel="noreferrer">
                  PDF öffnen
                </a>
                <a className="button secondary" href={sourceInfo.officialPage} target="_blank" rel="noreferrer">
                  Buchholz.de öffnen
                </a>
              </div>
            </article>

            <article className="source-card">
              <h3>Wie diese Ansicht zu lesen ist</h3>
              <ul>
                <li>Die KPI-Karten nutzen die offiziellen Summen aus der Nachtragssatzung.</li>
                <li>Die Tabellen und Drilldowns basieren auf den Teilhaushalten der Übersichten.</li>
                <li>Schuldenwerte werden laut PDF in Tausend Euro dargestellt.</li>
              </ul>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
