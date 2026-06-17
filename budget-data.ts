export type MetricKey = 'result' | 'admin' | 'investment' | 'commitments'

export interface MetricMetaEntry {
  label: string
  signed: boolean
}

export interface DepartmentRow {
  code: string
  label: string
  revenue: number
  expense: number
  result: number
  admin: number
  adminRevenue: number
  investment: number
  commitments: number
  cashChange: number
  tags: string[]
  note?: string
  investmentRevenue?: number
  financingRevenue?: number
  financingExpense?: number
}

interface HouseholdHeroStat {
  label: string
  value: string
  info?: string
}

interface HouseholdKpi {
  label: string
  value: string
  description: string
  info?: string
}

interface PieReferenceTotals {
  incoming?: number
  outgoing?: number
  revenue?: number
  expense?: number
}

export interface HouseholdYearData {
  available: boolean
  sponsor: string
  title: string
  lead: string
  overviewLabel: string
  heroStats: HouseholdHeroStat[]
  kpis: HouseholdKpi[]
  availabilityNote: string
  emptyState: string
  pieReferenceTotals: PieReferenceTotals
  departments: DepartmentRow[]
  defaultSelectedCode: string | null
}

export const chartPalette: string[] = ['#2563eb', '#14b8a6', '#8b5cf6', '#f59e0b', '#ef4444', '#0f172a', '#0ea5e9', '#22c55e']

export const metricMeta: Record<MetricKey, MetricMetaEntry> = {
  result: { label: 'Ordentliches Ergebnis', signed: true },
  admin: { label: 'Verwaltungssaldo', signed: true },
  investment: { label: 'Investive Auszahlungen', signed: false },
  commitments: { label: 'Verpflichtungsermächtigung', signed: false },
}

const householdDepartments2026: DepartmentRow[] = [
  {
    code: '0001',
    label: 'Verwaltungsführung und Presse- u. Öffentlichkeitsarbeit',
    revenue: 400,
    expense: 1106500,
    result: -1106100,
    admin: -1106100,
    adminRevenue: 400,
    investment: 0,
    commitments: 0,
    cashChange: -1106100,
    tags: ['verwaltung', 'presse'],
    note: 'Der Bereich ist vor allem laufend geprägt und zeigt im Nachtrag keine großen Verschiebungen gegenüber dem bisherigen Ansatz.',
  },
  {
    code: '0002',
    label: 'Klimaschutzmanagement',
    investmentRevenue: 14600,
    revenue: 57500,
    expense: 477800,
    result: -420300,
    admin: -329200,
    adminRevenue: 57500,
    investment: 79000,
    commitments: 85000,
    cashChange: -393600,
    tags: ['klima', 'investition'],
    note: 'Verbesserte Liquiditätswirkung durch geringere laufende und investive Auszahlungen.',
  },
  {
    code: '0003',
    label: 'Gleichstellungsbeauftragte',
    revenue: 22500,
    expense: 63700,
    result: -41200,
    admin: -41200,
    adminRevenue: 22500,
    investment: 0,
    commitments: 0,
    cashChange: -41200,
    tags: ['verwaltung'],
  },
  {
    code: '0005',
    label: 'Ortschaft Holm-Seppensen',
    revenue: 82100,
    expense: 62600,
    result: 19500,
    admin: 22000,
    adminRevenue: 82100,
    investment: 19500,
    commitments: 0,
    cashChange: 2500,
    tags: ['ortschaft'],
    note: 'Kleiner positiver Bereich mit überschaubarem Investitionsvolumen.',
  },
  {
    code: '0006',
    label: 'Ortschaft Steinbeck',
    revenue: 74500,
    expense: 64500,
    result: 10000,
    admin: 15000,
    adminRevenue: 74500,
    investment: 10000,
    commitments: 0,
    cashChange: 5000,
    tags: ['ortschaft'],
    note: 'Solide positive Ortsbudget-Lage bei geringen investiven Mitteln.',
  },
  {
    code: '0007',
    label: 'Ortschaft Sprötze',
    revenue: 38100,
    expense: 27300,
    result: 10800,
    admin: 11900,
    adminRevenue: 38100,
    investment: 10800,
    commitments: 0,
    cashChange: 1100,
    tags: ['sproetze', 'ortschaft'],
    note: 'Sprötze steht im ordentlichen Ergebnis mit +10,8 Tsd. € im Plan. Zusätzlich taucht im Gesamtpaket der Verpflichtungsermächtigungen ein Projekt für die GS Sprötze mit 3,0 Mio. € auf.',
  },
  {
    code: '0008',
    label: 'Ortschaft Trelde',
    revenue: 27200,
    expense: 25200,
    result: 2000,
    admin: 2500,
    adminRevenue: 27200,
    investment: 2000,
    commitments: 0,
    cashChange: 500,
    tags: ['ortschaft'],
    note: 'Nur geringe Bewegungen im Teilhaushalt.',
  },
  {
    code: '0009',
    label: 'Ortschaft Dibbersen',
    revenue: 22200,
    expense: 15600,
    result: 6600,
    admin: 7700,
    adminRevenue: 22200,
    investment: 6600,
    commitments: 0,
    cashChange: 1100,
    tags: ['ortschaft'],
    note: 'Positives ordentliches Ergebnis bei kleinem Investitionsansatz.',
  },
  {
    code: '1001',
    label: 'Personalmanagement',
    revenue: 581900,
    expense: 2695500,
    result: -2113600,
    admin: -2203200,
    adminRevenue: 62400,
    investment: 0,
    commitments: 0,
    cashChange: -2203200,
    tags: ['verwaltung', 'personal'],
    note: 'Klarer Aufwandsschwerpunkt ohne investive Mittel.',
  },
  {
    code: '1002',
    label: 'Organisationsentwicklung und zentrale Dienste',
    revenue: 11000,
    expense: 3832800,
    result: -3821800,
    admin: -3557800,
    adminRevenue: 10500,
    investment: 80000,
    commitments: 0,
    cashChange: -3637800,
    tags: ['verwaltung'],
    note: 'Deutlich negativer Verwaltungssaldo bei nur kleinen Investitionen.',
  },
  {
    code: '1003',
    label: 'Finanzmanagement und Liegenschaften',
    investmentRevenue: 930000,
    revenue: 80930300,
    expense: 44395700,
    result: 36534600,
    admin: 35972300,
    adminRevenue: 80007500,
    investment: 935000,
    commitments: 0,
    cashChange: 45814800,
    tags: ['finanzen', 'liegenschaften'],
    note: 'Größter positiver Ergebnisbeitrag im Haushalt 2026 – hier laufen Steuerkraft, Liegenschaften und Finanzierung zusammen.',
  },
  {
    code: '1004',
    label: 'Stadtkasse',
    revenue: 131700,
    expense: 490900,
    result: -359200,
    admin: -359200,
    adminRevenue: 131700,
    investment: 0,
    commitments: 0,
    cashChange: -359200,
    tags: ['finanzen', 'verwaltung'],
  },
  {
    code: '2001',
    label: 'Soziales, Begegnung und Kultur',
    revenue: 569800,
    expense: 2887300,
    result: -2317500,
    admin: -2077500,
    adminRevenue: 563800,
    investment: 14400,
    commitments: 0,
    cashChange: -2091900,
    tags: ['soziales', 'kultur'],
    note: 'Negativer Bereich mit nur geringem investivem Anteil.',
  },
  {
    code: '2002',
    label: 'Kinder, Jugend und Sport',
    investmentRevenue: 131900,
    revenue: 15479500,
    expense: 26534100,
    result: -11054600,
    admin: -9864500,
    adminRevenue: 14842800,
    investment: 5961700,
    commitments: 10400000,
    cashChange: -15694300,
    tags: ['schule', 'kita', 'sport', 'sproetze'],
    note: 'Der größte Sprung im Haushalt: +7,0 Mio. € zusätzliche Einzahlungen verbessern das Ergebnis um 7,551 Mio. €. Gleichzeitig liegen hier die höchsten Verpflichtungsermächtigungen.',
  },
  {
    code: '2090',
    label: 'Germuth-Scheer-Stiftung',
    revenue: 51500,
    expense: 52200,
    result: -700,
    admin: -9900,
    adminRevenue: 30800,
    investment: 0,
    commitments: 0,
    cashChange: -9900,
    tags: ['stiftung', 'kultur'],
  },
  {
    code: '3001',
    label: 'Bürgerservice, Ordnung und Gewerbe',
    investmentRevenue: 42000,
    revenue: 589600,
    expense: 2876700,
    result: -2287100,
    admin: -2003300,
    adminRevenue: 565100,
    investment: 1315300,
    commitments: 821600,
    cashChange: -3276600,
    tags: ['ordnung', 'gewerbe'],
    note: 'Mittlerer Aufwandsschwerpunkt mit sichtbaren investiven Auszahlungen.',
  },
  {
    code: '3002',
    label: 'Standesamt',
    revenue: 112500,
    expense: 351900,
    result: -239400,
    admin: -239300,
    adminRevenue: 112500,
    investment: 0,
    commitments: 0,
    cashChange: -239300,
    tags: ['verwaltung'],
  },
  {
    code: '3003',
    label: 'Verkehrsbehörde',
    revenue: 1945800,
    expense: 1263600,
    result: 682200,
    admin: 692000,
    adminRevenue: 1842400,
    investment: 415000,
    commitments: 200000,
    cashChange: 277000,
    tags: ['verkehr'],
    note: 'Positiver Bereich mit relevanten Mitteln für Verkehrslenkung.',
  },
  {
    code: '4001',
    label: 'Bauaufsicht',
    revenue: 506500,
    expense: 979800,
    result: -473300,
    admin: -497100,
    adminRevenue: 506600,
    investment: 0,
    commitments: 0,
    cashChange: -497100,
    tags: ['planung', 'bau'],
  },
  {
    code: '4002',
    label: 'Stadt- und Grünplanung, Umwelt und Klima',
    investmentRevenue: 40000,
    revenue: 80000,
    expense: 963900,
    result: -883900,
    admin: -901100,
    adminRevenue: 45200,
    investment: 60000,
    commitments: 0,
    cashChange: -921100,
    tags: ['planung', 'klima'],
    note: 'Planungsbereich mit begrenzten Investitionen und negativem Ergebnissaldo.',
  },
  {
    code: '4003',
    label: 'Tiefbau und Bauverwaltung',
    investmentRevenue: 374000,
    revenue: 6996400,
    expense: 10144900,
    result: -3148500,
    admin: -1293800,
    adminRevenue: 5626500,
    investment: 4766300,
    commitments: 9071000,
    cashChange: -5686100,
    tags: ['tiefbau', 'verkehr'],
    note: 'Ein Schwerpunktbereich bei investiven Maßnahmen: 9,071 Mio. € Verpflichtungsermächtigungen liegen hier, etwa für Tiefbauprogramme und Bahnhofsumfeld.',
  },
  {
    code: '4004',
    label: 'Hochbau',
    revenue: 2258600,
    expense: 7585700,
    result: -5327100,
    admin: -5159900,
    adminRevenue: 2258600,
    investment: 15000,
    commitments: 0,
    cashChange: -5174900,
    tags: ['gebaeude'],
    note: 'Hoher Aufwand im Hochbau, jedoch kaum zusätzliche investive Auszahlungen.',
  },
  {
    code: '5001',
    label: 'Controlling und Betriebsführung',
    investmentRevenue: 50000,
    revenue: 63100,
    expense: 1317700,
    result: -1254600,
    admin: -1231500,
    adminRevenue: 63100,
    investment: 290000,
    commitments: 0,
    cashChange: -1471500,
    tags: ['verwaltung'],
  },
  {
    code: '5002',
    label: 'Grün- u. Stadtbildpflege, Friedhofswesen',
    revenue: 369300,
    expense: 2771000,
    result: -2401700,
    admin: -2366300,
    adminRevenue: 299800,
    investment: 375000,
    commitments: 0,
    cashChange: -2741300,
    tags: ['stadtbild'],
    note: 'Sachaufwandsschwerpunkt mit spürbarem laufendem Zuschussbedarf.',
  },
  {
    code: '5003',
    label: 'Technische Unterhaltung',
    revenue: 35000,
    expense: 2393100,
    result: -2358100,
    admin: -2358100,
    adminRevenue: 35000,
    investment: 0,
    commitments: 0,
    cashChange: -2358100,
    tags: ['technik'],
  },
]

export const householdYears: Record<string, HouseholdYearData> = {
  '2026': {
    available: true,
    sponsor: 'Buchholz 1. Nachtragshaushalt 2026',
    title: 'Haushalt 2026: Woher das Geld kommt und wohin es fließt.',
    lead: 'Die Seite zeigt, wie sich die gesamten Ein- und Auszahlungen des Jahres auf die Bereiche verteilen und welche Schwerpunkte im Haushalt 2026 besonders ins Gewicht fallen.',
    overviewLabel: 'Schnellüberblick 2026',
    heroStats: [
      { label: 'Ordentliche Erträge', value: '111,0 Mio. €' },
      { label: 'Ordentliche Aufwendungen', value: '113,4 Mio. €' },
      {
        label: 'Einzahlungen gesamt',
        value: '121,7 Mio. €',
        info:
          'Hier steckt mehr drin als in den ordentlichen Erträgen: zusätzlich zählen auch Investitionseinzahlungen und Finanzierungseinzahlungen dazu, zum Beispiel Kredite.',
      },
      {
        label: 'Auszahlungen gesamt',
        value: '123,5 Mio. €',
        info:
          'Hier geht es um alle tatsächlichen Geldabflüsse des Jahres: laufende Auszahlungen, Investitionen und Finanzierungsauszahlungen zusammen.',
      },
    ],
    kpis: [
      {
        label: 'Saldo Ergebnishaushalt',
        value: '-2,44 Mio. €',
        description: 'Ordentlich und außerordentlich zusammen.',
      },
      {
        label: 'Veränderung Zahlungsmittel',
        value: '-1,80 Mio. €',
        description: 'Verbesserung um rund 2,42 Mio. € gegenüber bisher.',
      },
      {
        label: 'Kreditermächtigung',
        value: '12,77 Mio. €',
        description: '276 Tsd. € weniger als bisher geplant.',
      },
      {
        label: 'Verpflichtungsermächtigungen',
        value: '20,58 Mio. €',
        description: 'Schwerpunkt bei Schulen, Kitas und Tiefbau.',
        info:
          'Das ist noch kein sofort ausgezahltes Geld. Die Stadt darf damit aber schon Aufträge oder Verträge für kommende Jahre eingehen.',
      },
    ],
    availabilityNote: '2026 ist vollständig mit Einnahmen-, Ausgaben- und Bereichsdaten hinterlegt.',
    emptyState: 'Für 2026 sollten Daten verfügbar sein. Wenn hier nichts erscheint, greift gerade ein Filter zu stark ein.',
    pieReferenceTotals: {
      incoming: 121_684_400,
      outgoing: 123_485_600,
    },
    departments: householdDepartments2026,
    defaultSelectedCode: '2002',
  },
  '2027': {
    available: false,
    sponsor: 'Haushaltsjahr 2027',
    title: 'Haushalt 2027 vorbereiten.',
    lead: 'Sobald neue Zahlen vorliegen, können sie hier ergänzt und direkt in Einnahmen, Ausgaben und Bereichsschwerpunkte übernommen werden.',
    overviewLabel: 'Datenstand 2027',
    heroStats: [
      { label: 'Status', value: 'folgt' },
      { label: 'Datenquelle', value: 'noch offen' },
      { label: 'Einnahmen', value: 'vorbereitet' },
      { label: 'Ausgaben', value: 'vorbereitet' },
    ],
    kpis: [
      {
        label: 'Haushaltsdaten',
        value: 'noch nicht hinterlegt',
        description: 'Kennzahlen können später zentral ergänzt werden.',
      },
      {
        label: 'Bereichsansicht',
        value: 'wartet auf Daten',
        description: 'Sobald Zahlen vorliegen, werden die Schwerpunkte automatisch sichtbar.',
      },
      {
        label: 'PDF-Verknüpfung',
        value: 'bereit',
        description: 'Die Navigation und der Aufbau bleiben identisch.',
      },
      {
        label: 'Jahreslogik',
        value: 'aktiv',
        description: 'Weitere Jahre lassen sich ohne Umbau ergänzen.',
      },
    ],
    availabilityNote: 'Für 2027 sind noch keine aufbereiteten Haushaltsdaten hinterlegt.',
    emptyState: 'Für 2027 gibt es aktuell noch keine aufbereiteten Haushaltswerte.',
    pieReferenceTotals: {
      revenue: 0,
      expense: 0,
    },
    departments: [],
    defaultSelectedCode: null,
  },
  '2028': {
    available: false,
    sponsor: 'Haushaltsjahr 2028',
    title: 'Haushalt 2028 vorbereiten.',
    lead: 'Auch für 2028 ist die Seitenstruktur schon vorbereitet. Sobald Werte vorliegen, muss nur der Jahresdatensatz ergänzt werden.',
    overviewLabel: 'Datenstand 2028',
    heroStats: [
      { label: 'Status', value: 'folgt' },
      { label: 'Vorlage', value: 'vorhanden' },
      { label: 'Filterlogik', value: 'aktiv' },
      { label: 'Bereichsansicht', value: 'aktivierbar' },
    ],
    kpis: [
      {
        label: 'Jahresauswahl',
        value: 'einsatzbereit',
        description: 'Die Auswahl kann direkt auf neue Daten umschalten.',
      },
      {
        label: 'Bereiche',
        value: 'offen',
        description: 'Sobald ein Datensatz ergänzt wird, erscheint er hier.',
      },
      {
        label: 'Kennzahlen',
        value: 'offen',
        description: 'Hero-Statistiken und Kacheln sind als Platzhalter vorbereitet.',
      },
      {
        label: 'Quellenbezug',
        value: 'stabil',
        description: 'PDF-Link und Seitenstruktur können unverändert bleiben.',
      },
    ],
    availabilityNote: 'Für 2028 sind noch keine Haushaltswerte eingetragen.',
    emptyState: 'Für 2028 erscheinen die Auswertungen, sobald Werte ergänzt sind.',
    pieReferenceTotals: {
      revenue: 0,
      expense: 0,
    },
    departments: [],
    defaultSelectedCode: null,
  },
}

