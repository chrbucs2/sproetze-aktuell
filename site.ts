import { chartPalette, householdYears, metricMeta } from './budget-data.ts'
import type { DepartmentRow, HouseholdYearData, MetricKey } from './budget-data.ts'

type BreakdownSide = 'incoming' | 'outgoing'
type FilterKey = 'all' | 'positive' | 'negative' | 'investment' | 'sproetze'
type SortKey = 'metric-desc' | 'metric-asc' | 'label-asc' | 'commitments-desc' | 'investment-desc'
type SelectionSource = 'chart' | 'table' | 'pie'
type InfoMode = 'click' | 'hover'
type DisplayMetricKey = MetricKey | BreakdownSide

interface HouseholdState {
  year: string
  metric: MetricKey
  filter: FilterKey
  sort: SortKey
  search: string
  selectedCode: string | null
  pieDrilldownCode: string | null
  pieBreakdownSide: BreakdownSide | null
  hasUserSelectedArea: boolean
}

interface BreakdownItem {
  label: string
  value: number
  description: string
}

interface BreadcrumbItem {
  label: string
  action?: 'overview' | 'area'
}

type PieSegmentSourceRow = DepartmentRow | { code: null; label: string }

interface PieSegment {
  row: PieSegmentSourceRow
  code: string | null
  label: string
  value: number
  color: string
  startAngle: number
  endAngle: number
}

const householdState: HouseholdState = {
  year: '2026',
  metric: 'result',
  filter: 'all',
  sort: 'metric-desc',
  search: '',
  selectedCode: null,
  pieDrilldownCode: null,
  pieBreakdownSide: null,
  hasUserSelectedArea: false,
}

const officialBudgetPdfUrl =
  'https://www.buchholz.de/downloads/datei/NDNlOWExZGI2NGIzN2FlOC9NZ2NnSTVTYTN1UUpmWjdMWUk2M3VrbzErYjZCbGRJbTNHZHgwQ2tTN1pueXJqanRVbXhxTHFCZHI1WHcrNUxqMHVpU012MWlGK0QzMzZxS3hDZ21VS0hZVlNEOWhmcUxCWkozWS85Uis0NDRaU0M2QzRIS1VYOHk4Tkh1TDVVZ040a1hXcWVFQ0htQkhHNG1jTzdNdWg2QVk4ZDF5SEVuUzh3WjdFOGFYVUcrWjg2Q1pGakh5d1QwWnZJVTM3NQ'

let infoPopoverInitialized = false
let activeInfoButton: HTMLElement | null = null
let activeInfoMode: InfoMode | null = null
let hoverInfoTimer: number | null = null
let hoverCloseTimer: number | null = null
const infoHoverDelay = 1500

function getClosest(target: EventTarget | null, selector: string): HTMLElement | null {
  if (!(target instanceof Element)) {
    return null
  }

  const match = target.closest(selector)
  return match instanceof HTMLElement ? match : null
}

function isDepartmentRow(row: PieSegmentSourceRow): row is DepartmentRow {
  return 'result' in row
}

function escapeAttribute(value: string | number) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function renderInfoButton(title: string, body: string) {
  return `
    <button
      type="button"
      class="info-button"
      aria-label="Info zu ${escapeAttribute(title)}"
      aria-expanded="false"
      data-info-title="${escapeAttribute(title)}"
      data-info-body="${escapeAttribute(body)}"
    >
      i
    </button>
  `
}

function getVisibleYears(): Array<[string, HouseholdYearData]> {
  const availableYears = Object.entries(householdYears).filter(([, data]) => data.available)
  return availableYears.length ? availableYears : Object.entries(householdYears)
}

function formatCompactCurrency(value: number, signed = false) {
  const abs = Math.abs(value)
  let text

  if (abs >= 1_000_000) {
    text = `${(abs / 1_000_000).toLocaleString('de-DE', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} Mio. €`
  } else if (abs >= 1_000) {
    text = `${(abs / 1_000).toLocaleString('de-DE', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} Tsd. €`
  } else {
    text = `${abs.toLocaleString('de-DE')} €`
  }

  if (!signed) {
    return value < 0 ? `-${text}` : text
  }

  if (value > 0) {
    return `+${text}`
  }

  if (value < 0) {
    return `-${text}`
  }

  return text
}

function setupPdfLinks() {
  document.querySelectorAll('[data-pdf-link]').forEach((link) => {
    link.setAttribute('href', officialBudgetPdfUrl)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noreferrer')
  })
}

function setupNavigation() {
  const current = document.body.getAttribute('data-page')
  if (!current) {
    return
  }

  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.getAttribute('data-nav') === current) {
      link.classList.add('active')
    }
  })
}

function closeInfoPopover() {
  const popover = document.getElementById('infoPopover')

  if (!popover) {
    return
  }

  popover.hidden = true

  if (activeInfoButton) {
    activeInfoButton.setAttribute('aria-expanded', 'false')
    activeInfoButton = null
  }

  activeInfoMode = null
}

function clearHoverInfoTimer() {
  if (hoverInfoTimer) {
    window.clearTimeout(hoverInfoTimer)
    hoverInfoTimer = null
  }
}

function clearHoverCloseTimer() {
  if (hoverCloseTimer) {
    window.clearTimeout(hoverCloseTimer)
    hoverCloseTimer = null
  }
}

function getInfoTitle(trigger: HTMLElement) {
  return trigger.getAttribute('data-info-title') ?? trigger.getAttribute('data-hover-info-title') ?? 'Hinweis'
}

function getInfoBody(trigger: HTMLElement) {
  return trigger.getAttribute('data-info-body') ?? trigger.getAttribute('data-hover-info-body') ?? ''
}

function positionInfoPopover(button: HTMLElement, popover: HTMLElement) {
  const card = popover.querySelector<HTMLElement>('.info-popover-card')

  if (!card) {
    return
  }

  const buttonRect = button.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()
  const spacing = 12
  const maxLeft = window.innerWidth - cardRect.width - spacing
  const desiredLeft = buttonRect.left + buttonRect.width / 2 - cardRect.width / 2
  const left = Math.max(spacing, Math.min(desiredLeft, maxLeft))
  const fitsBelow = buttonRect.bottom + spacing + cardRect.height <= window.innerHeight - spacing
  const top = fitsBelow
    ? buttonRect.bottom + spacing
    : Math.max(spacing, buttonRect.top - cardRect.height - spacing)

  card.style.left = `${left}px`
  card.style.top = `${top}px`
}

function openInfoPopover(button: HTMLElement, mode: InfoMode = 'click') {
  const popover = document.getElementById('infoPopover')
  const title = document.getElementById('infoPopoverTitle')
  const body = document.getElementById('infoPopoverBody')

  if (!popover || !title || !body) {
    return
  }

  clearHoverInfoTimer()
  clearHoverCloseTimer()

  title.textContent = getInfoTitle(button)
  body.textContent = getInfoBody(button)
  popover.hidden = false

  if (activeInfoButton && activeInfoButton !== button) {
    activeInfoButton.setAttribute('aria-expanded', 'false')
  }

  activeInfoButton = button
  activeInfoMode = mode
  activeInfoButton.setAttribute('aria-expanded', 'true')
  positionInfoPopover(button, popover)
}

function scheduleHoverInfo(trigger: HTMLElement) {
  clearHoverInfoTimer()
  clearHoverCloseTimer()

  hoverInfoTimer = window.setTimeout(() => {
    openInfoPopover(trigger, 'hover')
  }, infoHoverDelay)
}

function scheduleHoverClose() {
  clearHoverCloseTimer()

  hoverCloseTimer = window.setTimeout(() => {
    if (activeInfoMode === 'hover') {
      closeInfoPopover()
    }
  }, 120)
}

function setupInfoPopover() {
  if (infoPopoverInitialized) {
    return
  }

  const popover = document.getElementById('infoPopover')

  if (!popover) {
    return
  }

  const closeButton = popover.querySelector<HTMLButtonElement>('.info-popover-close')
  const popoverCard = popover.querySelector<HTMLElement>('.info-popover-card')

  document.addEventListener('click', (event) => {
    const infoButton = getClosest(event.target, '.info-button')

    if (infoButton && !infoButton.closest('#infoPopover')) {
      event.preventDefault()

      if (activeInfoButton === infoButton && !popover.hidden) {
        closeInfoPopover()
      } else {
        openInfoPopover(infoButton, 'click')
      }

      return
    }

    if (!popover.hidden && !getClosest(event.target, '#infoPopover')) {
      closeInfoPopover()
    }
  })

  document.addEventListener('mouseover', (event) => {
    const hoverTarget = getClosest(event.target, '[data-hover-info-title]')

    if (!hoverTarget) {
      return
    }

    if (event.relatedTarget instanceof Node && hoverTarget.contains(event.relatedTarget)) {
      return
    }

    scheduleHoverInfo(hoverTarget)
  })

  document.addEventListener('mouseout', (event) => {
    const hoverTarget = getClosest(event.target, '[data-hover-info-title]')

    if (!hoverTarget) {
      return
    }

    const nextTarget = event.relatedTarget

    if (
      nextTarget instanceof Element
      && (hoverTarget.contains(nextTarget) || Boolean(nextTarget.closest('#infoPopover')))
    ) {
      return
    }

    clearHoverInfoTimer()

    if (activeInfoMode === 'hover' && activeInfoButton === hoverTarget) {
      scheduleHoverClose()
    }
  })

  closeButton?.addEventListener('click', closeInfoPopover)
  popoverCard?.addEventListener('mouseenter', clearHoverCloseTimer)
  popoverCard?.addEventListener('mouseleave', (event: MouseEvent) => {
    const nextTarget = event.relatedTarget

    if (nextTarget instanceof Node && activeInfoButton?.contains(nextTarget)) {
      return
    }

    if (activeInfoMode === 'hover') {
      scheduleHoverClose()
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeInfoPopover()
    }
  })

  window.addEventListener('resize', () => {
    if (activeInfoButton && !popover.hidden) {
      positionInfoPopover(activeInfoButton, popover)
    }
  })

  window.addEventListener('scroll', () => {
    if (activeInfoButton && !popover.hidden) {
      positionInfoPopover(activeInfoButton, popover)
    }
  }, { passive: true })

  infoPopoverInitialized = true
}

function getCurrentYearData(): HouseholdYearData {
  return householdYears[householdState.year]
}

function getCurrentDepartments(): DepartmentRow[] {
  return getCurrentYearData().departments
}

function getInvestmentRevenue(row: DepartmentRow) {
  return row.investmentRevenue ?? 0
}

function getFinancingRevenue(row: DepartmentRow) {
  return row.financingRevenue ?? 0
}

function getFinancingExpense(row: DepartmentRow) {
  return row.financingExpense ?? 0
}

function getAdminRevenue(row: DepartmentRow) {
  return row.adminRevenue ?? row.revenue
}

function getAdminExpense(row: DepartmentRow) {
  return getAdminRevenue(row) - row.admin
}

function getIncomingTotal(row: DepartmentRow) {
  return getAdminRevenue(row) + getInvestmentRevenue(row) + getFinancingRevenue(row)
}

function getOutgoingTotal(row: DepartmentRow) {
  return getAdminExpense(row) + row.investment + getFinancingExpense(row)
}

function getNonCashRevenue(row: DepartmentRow) {
  return Math.max(row.revenue - getAdminRevenue(row), 0)
}

function getNonCashExpense(row: DepartmentRow) {
  return Math.max(row.expense - getAdminExpense(row), 0)
}

function buildBreakdownItems(row: DepartmentRow, side: BreakdownSide): BreakdownItem[] {
  const isIncoming = side === 'incoming'
  const items = isIncoming
    ? [
        {
          label: 'Laufende Einzahlungen',
          value: getAdminRevenue(row),
          description: 'Geld, das im normalen Jahresverlauf tatsächlich hereinkommt.',
        },
        {
          label: 'Investitionseinzahlungen',
          value: getInvestmentRevenue(row),
          description: 'Zahlungen für Investitionen, Zuschüsse oder Beiträge.',
        },
        {
          label: 'Finanzierungseinzahlungen',
          value: getFinancingRevenue(row),
          description: 'Zum Beispiel Kreditaufnahmen.',
        },
        {
          label: 'Nicht zahlungswirksame Erträge',
          value: getNonCashRevenue(row),
          description: 'Verbessern das Ergebnis, ohne sofort Geld aufs Konto zu bringen.',
        },
      ]
    : [
        {
          label: 'Laufende Auszahlungen',
          value: getAdminExpense(row),
          description: 'Geld, das im normalen Jahresverlauf tatsächlich abgeht.',
        },
        {
          label: 'Investive Auszahlungen',
          value: row.investment,
          description: 'Geld für Bau, Ausstattung und andere länger wirkende Anschaffungen.',
        },
        {
          label: 'Finanzierungsauszahlungen',
          value: getFinancingExpense(row),
          description: 'Zum Beispiel Tilgung oder Rückzahlungen.',
        },
        {
          label: 'Nicht zahlungswirksame Aufwendungen',
          value: getNonCashExpense(row),
          description: 'Belasten das Ergebnis, ohne sofort Geldabfluss auszulösen.',
        },
      ]

  return items.filter((item) => item.value > 0)
}

function renderBreakdownList(items: BreakdownItem[]) {
  return items
    .map(
        (item: BreakdownItem) => `
        <article class="bar-row breakdown-row">
          <div class="bar-row-head">
            <strong>${item.label}</strong>
            <span class="metric-badge">${formatCompactCurrency(item.value)}</span>
          </div>
          <p class="muted breakdown-copy">${item.description}</p>
        </article>
      `,
    )
    .join('')
}

function renderBreadcrumbs(items: BreadcrumbItem[]) {
  return `
    <nav class="breadcrumbs" aria-label="Drilldown-Navigation">
      ${items
        .map((item: BreadcrumbItem) => {
          if (item.action) {
            return `<button type="button" class="breadcrumb-button" data-breadcrumb-action="${item.action}">${item.label}</button>`
          }

          return `<span class="breadcrumb-current">${item.label}</span>`
        })
        .join('<span class="breadcrumb-separator">/</span>')}
    </nav>
  `
}

function getPieValue(row: DepartmentRow, key: DisplayMetricKey) {
  if (key === 'incoming') {
    return getIncomingTotal(row)
  }

  if (key === 'outgoing') {
    return getOutgoingTotal(row)
  }

  return row[key] ?? 0
}

function getDepartmentProfileHeadline(row: DepartmentRow) {
  if (row.commitments >= 5_000_000) {
    return 'Große Vorhaben gebunden'
  }

  if (row.result >= 5_000_000) {
    return 'Starker Netto-Beitrag'
  }

  if (row.result <= -5_000_000) {
    return 'Großer Zuschussbedarf'
  }

  if (row.investment >= 1_000_000) {
    return 'Investitionsschwerpunkt'
  }

  return row.result >= 0 ? 'Leichter Überschuss' : 'Laufender Zuschussbereich'
}

function getDepartmentHoverBody(row: DepartmentRow) {
  const extras = []

  if (row.investment > 0) {
    extras.push(`Investive Auszahlungen: ${formatCompactCurrency(row.investment)}.`)
  }

  if (row.commitments > 0) {
    extras.push(`Verpflichtungsermächtigung: ${formatCompactCurrency(row.commitments)}.`)
  }

  return [
    `${getDepartmentProfileHeadline(row)}.`,
    getDepartmentNote(row),
    `Ordentliches Ergebnis: ${formatCompactCurrency(row.result, true)}.`,
    ...extras,
  ].join(' ')
}

function resetHouseholdFilters() {
  householdState.metric = 'result'
  householdState.filter = 'all'
  householdState.sort = 'metric-desc'
  householdState.search = ''
  householdState.selectedCode = null
  householdState.pieDrilldownCode = null
  householdState.pieBreakdownSide = null
  householdState.hasUserSelectedArea = false
}

function resetToHouseholdTopLevel() {
  householdState.selectedCode = null
  householdState.pieDrilldownCode = null
  householdState.pieBreakdownSide = null
  householdState.hasUserSelectedArea = false
}

function updateToggleStates() {
  document.querySelectorAll<HTMLButtonElement>('[data-year-tab]').forEach((button) => {
    const isActive = button.getAttribute('data-year-tab') === householdState.year
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-selected', String(isActive))
    button.tabIndex = isActive ? 0 : -1
  })

  document.querySelectorAll<HTMLButtonElement>('[data-metric-button]').forEach((button) => {
    button.classList.toggle('is-active', button.getAttribute('data-metric-button') === householdState.metric)
  })

  document.querySelectorAll<HTMLButtonElement>('[data-filter-button]').forEach((button) => {
    button.classList.toggle('is-active', button.getAttribute('data-filter-button') === householdState.filter)
  })
}

function setControlsEnabled(enabled: boolean) {
  document.querySelectorAll<HTMLButtonElement>('[data-metric-button], [data-filter-button]').forEach((button) => {
    button.disabled = !enabled
  })

  const search = document.getElementById('departmentSearch')
  const sort = document.getElementById('departmentSort')

  if (search instanceof HTMLInputElement) {
    search.disabled = !enabled
  }

  if (sort instanceof HTMLSelectElement) {
    sort.disabled = !enabled
  }
}

function renderYearTabs(container: HTMLElement) {
  const years = getVisibleYears()

  if (!years.some(([year]) => year === householdState.year)) {
    householdState.year = years[0]?.[0] ?? householdState.year
  }

  container.innerHTML = years
    .map(
        ([year]: [string, HouseholdYearData]) =>
        `
          <button
            type="button"
            role="tab"
            class="year-tab ${year === householdState.year ? 'is-active' : ''}"
            data-year-tab="${year}"
            aria-selected="${year === householdState.year ? 'true' : 'false'}"
            tabindex="${year === householdState.year ? '0' : '-1'}"
          >
            <span>${year}</span>
          </button>
        `,
    )
    .join('')
}

function renderHouseholdOverview() {
  const yearData = getCurrentYearData()
  const sponsor = document.getElementById('householdSponsor')
  const title = document.getElementById('householdTitle')
  const lead = document.getElementById('householdLead')
  const overviewLabel = document.getElementById('yearOverviewLabel')
  const heroStats = document.getElementById('householdHeroStats')
  const kpis = document.getElementById('householdKpis')
  const note = document.getElementById('yearAvailabilityNote')

  if (!sponsor || !title || !lead || !overviewLabel || !heroStats || !kpis || !note) {
    return
  }

  sponsor.textContent = yearData.sponsor
  title.textContent = yearData.title
  lead.textContent = yearData.lead
  overviewLabel.textContent = yearData.overviewLabel
  note.textContent = yearData.available ? '' : yearData.availabilityNote
  note.hidden = yearData.available || !yearData.availabilityNote

  heroStats.innerHTML = yearData.heroStats
    .map(
        (item) => `
        <div class="${yearData.available ? '' : 'is-placeholder'}">
          <div class="label-with-info">
            <span>${item.label}</span>
            ${item.info ? renderInfoButton(item.label, item.info) : ''}
          </div>
          <strong>${item.value}</strong>
        </div>
      `,
    )
    .join('')

  kpis.innerHTML = yearData.kpis
    .map(
        (item) => `
        <article class="kpi ${yearData.available ? '' : 'is-placeholder'}">
          <div class="label-with-info">
            <span>${item.label}</span>
            ${item.info ? renderInfoButton(item.label, item.info) : ''}
          </div>
          <strong>${item.value}</strong>
          <p>${item.description}</p>
        </article>
      `,
    )
    .join('')
}

function getFilteredRows(): DepartmentRow[] {
  return getCurrentDepartments().filter((row) => {
    const haystack = `${row.label} ${row.tags.join(' ')} ${row.note ?? ''}`.toLowerCase()
    const matchesSearch = haystack.includes(householdState.search)

    if (!matchesSearch) {
      return false
    }

    switch (householdState.filter) {
      case 'positive':
        return row.result > 0
      case 'negative':
        return row.result < 0
      case 'investment':
        return row.investment > 0 || row.commitments > 0
      case 'sproetze':
        return row.tags.includes('sproetze') || row.label.includes('Sprötze')
      default:
        return true
    }
  })
}

function sortRows(rows: DepartmentRow[]) {
  const sorted = [...rows]
  const currentMetric = householdState.metric

  switch (householdState.sort) {
    case 'metric-asc':
      sorted.sort((a, b) => a[currentMetric] - b[currentMetric])
      break
    case 'label-asc':
      sorted.sort((a, b) => a.label.localeCompare(b.label, 'de'))
      break
    case 'commitments-desc':
      sorted.sort((a, b) => b.commitments - a.commitments)
      break
    case 'investment-desc':
      sorted.sort((a, b) => b.investment - a.investment)
      break
    default:
      sorted.sort((a, b) => b[currentMetric] - a[currentMetric])
      break
  }

  return sorted
}

function ensureSelection(rows: DepartmentRow[]) {
  if (!householdState.hasUserSelectedArea) {
    return
  }

  if (rows.some((row) => row.code === householdState.selectedCode)) {
    return
  }

  const chartRows = [...rows].sort(
    (a, b) => Math.abs(b[householdState.metric]) - Math.abs(a[householdState.metric]),
  )

  householdState.selectedCode = chartRows[0]?.code ?? null
}

function getDepartmentNote(row: DepartmentRow) {
  if (row.note) {
    return row.note
  }

  const strongestSignal = [
    { label: 'ordentlichen Ergebnis', value: row.result, signed: true },
    { label: 'Liquiditätswirkung', value: row.cashChange, signed: true },
    { label: 'investiven Auszahlungen', value: row.investment, signed: false },
    { label: 'Verpflichtungsermächtigungen', value: row.commitments, signed: false },
  ].sort((a, b) => Math.abs(b.value) - Math.abs(a.value))[0]

  if (!strongestSignal || strongestSignal.value === 0) {
    return 'Für diesen Bereich zeigt der Nachtragshaushalt keine auffällige Veränderung gegenüber dem bisherigen Ansatz.'
  }

  if (strongestSignal.label === 'Verpflichtungsermächtigungen') {
    return `Der Bereich ist vor allem über künftige Bindungen sichtbar: ${formatCompactCurrency(strongestSignal.value)} Verpflichtungsermächtigung.`
  }

  if (strongestSignal.label === 'investiven Auszahlungen') {
    return `Der Bereich fällt vor allem investiv auf: ${formatCompactCurrency(strongestSignal.value)} an Auszahlungen sind hier eingeplant.`
  }

  const direction = strongestSignal.value > 0 ? 'positiv' : 'negativ'
  return `Auffällig ist vor allem der Beitrag im ${strongestSignal.label}: ${formatCompactCurrency(strongestSignal.value, strongestSignal.signed)} (${direction}).`
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

function createPieSlicePath(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) {
  const angleDelta = endAngle - startAngle

  if (angleDelta >= 359.999) {
    const topPoint = { x: centerX, y: centerY - radius }
    const bottomPoint = { x: centerX, y: centerY + radius }

    return [
      `M ${centerX} ${centerY}`,
      `L ${topPoint.x} ${topPoint.y}`,
      `A ${radius} ${radius} 0 1 0 ${bottomPoint.x} ${bottomPoint.y}`,
      `A ${radius} ${radius} 0 1 0 ${topPoint.x} ${topPoint.y}`,
      'Z',
    ].join(' ')
  }

  const start = polarToCartesian(centerX, centerY, radius, endAngle)
  const end = polarToCartesian(centerX, centerY, radius, startAngle)
  const largeArcFlag = angleDelta <= 180 ? '0' : '1'

  return [
    `M ${centerX} ${centerY}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    'Z',
  ].join(' ')
}

function buildPieSegments(rows: DepartmentRow[], key: BreakdownSide, referenceTotal: number | null = null) {
  const sourceRows = rows
    .map((row) => ({ row, value: getPieValue(row, key) }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
  const primaryRows = sourceRows.slice(0, 7)
  const sourceTotal = sourceRows.reduce((sum, item) => sum + item.value, 0)
  const hiddenTotal = sourceRows.slice(7).reduce((sum, item) => sum + item.value, 0)
  const unassignedTotal = referenceTotal && referenceTotal > sourceTotal ? referenceTotal - sourceTotal : 0
  const remainderTotal = hiddenTotal + unassignedTotal
  const remainderLabel = hiddenTotal > 0 && unassignedTotal > 0
    ? 'Weitere Bereiche / nicht zugeordnet'
    : unassignedTotal > 0
      ? 'Nicht bereichsscharf zugeordnet'
      : 'Weitere Bereiche'
  const visibleRows = remainderTotal > 0
    ? [...primaryRows, { row: { code: null, label: remainderLabel }, value: remainderTotal }]
    : primaryRows

  const total = sourceTotal + unassignedTotal
  let currentAngle = 0

  return {
    total,
    segments: visibleRows.map((item, index): PieSegment => {
      const value = item.value
      const angle = total === 0 ? 0 : (value / total) * 360
      const segment = {
        row: item.row,
        code: item.row.code ?? null,
        label: item.row.label,
        value,
        color: chartPalette[index % chartPalette.length],
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
      }
      currentAngle += angle
      return segment
    }),
  }
}

function renderPieChart(key: BreakdownSide, rows: DepartmentRow[], chartId: string, legendId: string) {
  const chart = document.getElementById(chartId)
  const legend = document.getElementById(legendId)
  const yearData = getCurrentYearData()
  const shouldUseReferenceTotals = householdState.filter === 'all' && householdState.search === ''
  const labels = {
    incoming: 'Einzahlungen gesamt',
    outgoing: 'Auszahlungen gesamt',
  }

  if (!chart || !legend) {
    return
  }

  if (!yearData.available) {
    chart.innerHTML = `<p class="muted">${yearData.emptyState}</p>`
    legend.innerHTML = ''
    return
  }

  const { total, segments } = buildPieSegments(
    rows,
    key,
    shouldUseReferenceTotals ? yearData.pieReferenceTotals?.[key] ?? null : null,
  )

  if (!segments.length || total === 0) {
    chart.innerHTML = '<p class="muted">Keine passenden Bereiche für die aktuelle Auswahl.</p>'
    legend.innerHTML = ''
    return
  }

  chart.innerHTML = `
    <div class="pie-chart-stage">
      <svg class="pie-chart-svg" viewBox="0 0 240 240" aria-label="${labels[key]}">
        ${segments
          .map((segment) => {
            const isSelected = segment.code === householdState.selectedCode
            return `
              <path
                d="${createPieSlicePath(120, 120, 102, segment.startAngle, segment.endAngle)}"
                fill="${segment.color}"
                class="pie-slice ${segment.code ? '' : 'is-rest'} ${isSelected ? 'is-selected' : ''}"
                ${segment.code ? `data-select-code="${segment.code}"` : ''}
                ${segment.code ? `data-hover-info-title="${escapeAttribute(segment.label)}"` : ''}
                ${segment.code && isDepartmentRow(segment.row) ? `data-hover-info-body="${escapeAttribute(getDepartmentHoverBody(segment.row))}"` : ''}
              ></path>
            `
          })
          .join('')}
        <circle cx="120" cy="120" r="56" fill="white"></circle>
      </svg>
      <div class="pie-chart-center">
        <span>${labels[key]}</span>
        <strong>${formatCompactCurrency(total)}</strong>
      </div>
    </div>
  `

  legend.innerHTML = segments
    .map((segment) => {
      const marker = `<span class="pie-legend-marker" style="background:${segment.color}"></span>`
      if (!segment.code) {
        return `
          <div class="pie-legend-row is-rest">
            <div class="pie-legend-label">${marker}<span>${segment.label}</span></div>
            <strong>${formatCompactCurrency(segment.value)}</strong>
          </div>
        `
      }

      return `
        <button
          type="button"
          class="pie-legend-row ${segment.code === householdState.selectedCode ? 'is-active' : ''}"
          data-select-code="${segment.code}"
          data-hover-info-title="${escapeAttribute(segment.label)}"
          data-hover-info-body="${escapeAttribute(isDepartmentRow(segment.row) ? getDepartmentHoverBody(segment.row) : '')}"
        >
          <div class="pie-legend-label">${marker}<span>${segment.label}</span></div>
          <strong>${formatCompactCurrency(segment.value)}</strong>
        </button>
      `
    })
    .join('')
}

function renderPieCharts(rows: DepartmentRow[]) {
  renderPieChart('incoming', rows, 'revenuePieChart', 'revenuePieLegend')
  renderPieChart('outgoing', rows, 'expensePieChart', 'expensePieLegend')
}

function renderDepartmentChart(rows: DepartmentRow[]) {
  const chart = document.getElementById('departmentChart')
  const title = document.getElementById('departmentChartTitle')
  const hint = document.getElementById('departmentChartHint')
  const yearData = getCurrentYearData()

  if (!chart || !title || !hint) {
    return
  }

  title.textContent = metricMeta[householdState.metric].label
  hint.textContent = yearData.available
    ? 'Sortiert nach absolutem Wert der aktiven Kennzahl. Ein Klick öffnet den gewählten Bereich in der Detailansicht.'
    : 'Wird automatisch befüllt, sobald Daten für dieses Jahr vorliegen.'

  if (!yearData.available) {
    chart.innerHTML = `<p class="muted">${yearData.emptyState}</p>`
    return
  }

  const chartRows = [...rows]
    .sort((a, b) => Math.abs(b[householdState.metric]) - Math.abs(a[householdState.metric]))
    .slice(0, 10)

  const maxValue = Math.max(...chartRows.map((row) => Math.abs(row[householdState.metric])), 0)

  if (!chartRows.length) {
    chart.innerHTML = '<p class="muted">Keine Bereiche für die aktuelle Auswahl gefunden.</p>'
    return
  }

  chart.innerHTML = chartRows
    .map((row) => {
      const value = row[householdState.metric]
      const width = maxValue === 0 ? 0 : Math.max((Math.abs(value) / maxValue) * 100, 2)
      const tone =
        householdState.metric === 'commitments'
          ? 'neutral'
          : value < 0
            ? 'negative'
            : 'positive'

      return `
        <div class="chart-row">
          <button
            type="button"
            data-select-code="${row.code}"
            class="${row.code === householdState.selectedCode ? 'is-selected' : ''}"
            data-hover-info-title="${escapeAttribute(row.label)}"
            data-hover-info-body="${escapeAttribute(getDepartmentHoverBody(row))}"
          >
            <div class="chart-row-head">
              <strong>${row.label}</strong>
              <span class="${value < 0 && metricMeta[householdState.metric].signed ? 'metric-badge negative' : 'metric-badge'}">${formatCompactCurrency(
                value,
                metricMeta[householdState.metric].signed,
              )}</span>
            </div>
            <div class="chart-track" aria-hidden="true">
              <div class="chart-fill ${tone}" style="width: ${width}%"></div>
            </div>
          </button>
        </div>
      `
    })
    .join('')
}

function renderDepartmentSummary(rows: DepartmentRow[]) {
  const summary = document.getElementById('departmentSummary')
  const yearData = getCurrentYearData()

  if (!summary) {
    return
  }

  if (!yearData.available) {
    summary.innerHTML = `
      <article class="mini-card">
        <span class="label">Ausgewähltes Jahr</span>
        <strong class="metric">${householdState.year}</strong>
        <p>${yearData.availabilityNote}</p>
      </article>
      <article class="mini-card">
        <span class="label">Nächster Schritt</span>
        <strong class="metric">Datensatz ergänzen</strong>
        <p>Lege für ${householdState.year} Kennzahlen und Bereiche an, dann erscheinen hier automatisch die Verteilungen, Schwerpunkte und Detailwerte.</p>
      </article>
    `
    return
  }

  const selected = rows.find((row) => row.code === householdState.selectedCode)

  if (!householdState.hasUserSelectedArea || !selected) {
    summary.innerHTML = `
      <article class="mini-card">
        <span class="label">Was zeigen die Kreise?</span>
        <strong class="metric">Ein- und Auszahlungen gesamt</strong>
        <p>Hier ist nicht nur das laufende Haushaltsgeschäft enthalten, sondern auch Investitionen und Finanzierung.</p>
      </article>
      <article class="mini-card">
        <span class="label">Warum ist das wichtig?</span>
        <strong class="metric">2026 fließt mehr hinaus als hinein</strong>
        <p>In der Gesamtbetrachtung stehen 121,7 Mio. € Einzahlungen 123,5 Mio. € Auszahlungen gegenüber.</p>
      </article>
      <article class="mini-card">
        <span class="label">Bereich öffnen</span>
        <strong class="metric">Einfach auf ein Segment klicken</strong>
        <p>Dann verschwinden die Diagramme und der gewählte Bereich wird mit Ergebnis, Investitionen, VE und Liquidität erklärt.</p>
      </article>
    `
    return
  }

  const activeValue = selected[householdState.metric]
  const resultFormula = `${formatCompactCurrency(selected.revenue)} Einnahmen − ${formatCompactCurrency(selected.expense)} Ausgaben = ${formatCompactCurrency(selected.result, true)}`
  const profileHeadline = getDepartmentProfileHeadline(selected)

  summary.innerHTML = `
    <article class="mini-card">
      <span class="label">Ausgewählter Bereich</span>
      <strong class="metric">${selected.label}</strong>
      <p>${
        householdState.metric === 'result'
          ? `Ordentliches Ergebnis: <strong>${formatCompactCurrency(selected.result, true)}</strong><br />${resultFormula}`
          : `${metricMeta[householdState.metric].label}: <strong>${formatCompactCurrency(activeValue, metricMeta[householdState.metric].signed)}</strong>`
      }</p>
    </article>
    <article class="mini-card">
      <span class="label">Ordentliche Einnahmen / Ausgaben</span>
      <strong class="metric">${formatCompactCurrency(selected.revenue)}</strong>
      <p>Ausgaben: <strong>${formatCompactCurrency(selected.expense)}</strong></p>
    </article>
    <article class="mini-card">
      <span class="label">Investition / VE / Liquidität</span>
      <strong class="metric">${formatCompactCurrency(selected.investment)}</strong>
      <p>VE: <strong>${formatCompactCurrency(selected.commitments)}</strong> · Liquidität: <strong>${formatCompactCurrency(selected.cashChange, true)}</strong></p>
    </article>
    <article class="mini-card">
      <span class="label">Warum der Bereich auffällt</span>
      <strong class="metric">${profileHeadline}</strong>
      <p>${getDepartmentNote(selected)}<br /><span class="muted">Bereichscode: ${selected.code}</span></p>
    </article>
  `
}

function renderPieDrilldown(rows: DepartmentRow[]) {
  const revenueCard = document.getElementById('revenuePieCard')
  const expenseCard = document.getElementById('expensePieCard')
  const summary = document.getElementById('departmentSummary')
  const detailCard = document.getElementById('pieDrilldownCard')
  const overviewSection = document.getElementById('departmentOverviewSection')
  const tableSection = document.getElementById('departmentTableSection')

  if (!revenueCard || !expenseCard || !summary || !detailCard || !overviewSection || !tableSection) {
    return
  }

  const selected = rows.find((row) => row.code === householdState.pieDrilldownCode)
  const isActive = Boolean(selected)

  revenueCard.hidden = isActive
  expenseCard.hidden = isActive
  summary.hidden = isActive
  detailCard.hidden = !isActive
  overviewSection.hidden = isActive
  tableSection.hidden = isActive

  if (!selected) {
    detailCard.innerHTML = ''
    return
  }

  const incomingTotal = getIncomingTotal(selected)
  const outgoingTotal = getOutgoingTotal(selected)
  const profileHeadline = getDepartmentProfileHeadline(selected)
  const incomingItems = buildBreakdownItems(selected, 'incoming')
  const outgoingItems = buildBreakdownItems(selected, 'outgoing')
  const activeSide = householdState.pieBreakdownSide

  if (activeSide) {
    const sideMeta = activeSide === 'incoming'
      ? {
          title: 'Einzahlungen im Bereich',
          total: incomingTotal,
          items: incomingItems,
          intro:
            'Hier siehst du die Einzahlungen des gewählten Bereichs noch einmal tiefer gegliedert – nach laufendem Geschäft, Investitionen, Finanzierung und nicht zahlungswirksamen Anteilen.',
        }
      : {
          title: 'Auszahlungen im Bereich',
          total: outgoingTotal,
          items: outgoingItems,
          intro:
            'Hier siehst du die Auszahlungen des gewählten Bereichs noch einmal tiefer gegliedert – nach laufendem Geschäft, Investitionen, Finanzierung und nicht zahlungswirksamen Anteilen.',
        }

    detailCard.innerHTML = `
      ${renderBreadcrumbs([
        { label: 'Gesamtüberblick', action: 'overview' },
        { label: selected.label, action: 'area' },
        { label: sideMeta.title },
      ])}

      <div class="chart-head detail-card-head">
        <div>
          <p class="eyebrow">Dritte Ebene</p>
          <h3>${sideMeta.title}</h3>
          <p class="muted detail-code">${selected.label}</p>
        </div>
      </div>

      <article class="mini-card detail-note-card">
        <span class="label">Summe auf dieser Ebene</span>
        <strong class="metric">${formatCompactCurrency(sideMeta.total)}</strong>
        <p>${sideMeta.intro}</p>
      </article>

      <div class="bar-list breakdown-focus-list">
        ${renderBreakdownList(sideMeta.items)}
      </div>
    `

    return
  }

  detailCard.innerHTML = `
    ${renderBreadcrumbs([
      { label: 'Gesamtüberblick', action: 'overview' },
      { label: selected.label },
    ])}

    <div class="chart-head detail-card-head">
      <div>
        <p class="eyebrow">Bereich im Fokus</p>
        <h3>${selected.label}</h3>
        <p class="muted detail-code">Bereichscode: ${selected.code}</p>
      </div>
    </div>

    <div class="facts">
      <article class="mini-card">
        <span class="label">Einzahlungen / Auszahlungen gesamt</span>
        <strong class="metric">${formatCompactCurrency(incomingTotal)}</strong>
        <p>Auszahlungen gesamt: <strong>${formatCompactCurrency(outgoingTotal)}</strong></p>
      </article>
      <article class="mini-card">
        <span class="label">Ordentliches Ergebnis</span>
        <strong class="metric">${formatCompactCurrency(selected.result, true)}</strong>
        <p>${formatCompactCurrency(selected.revenue)} Einnahmen − ${formatCompactCurrency(selected.expense)} Ausgaben</p>
      </article>
      <article class="mini-card">
        <span class="label">Investive Auszahlungen</span>
        <strong class="metric">${formatCompactCurrency(selected.investment)}</strong>
        <p>Das ist Geld für Bau, Ausstattung oder andere länger wirkende Anschaffungen – nicht für den normalen Alltag.</p>
      </article>
      <article class="mini-card">
        <span class="label">Verpflichtungsermächtigung</span>
        <strong class="metric">${formatCompactCurrency(selected.commitments)}</strong>
        <p>Damit darf die Stadt heute schon Aufträge für kommende Jahre binden, auch wenn die Zahlung erst später kommt.</p>
      </article>
    </div>

    <div class="detail-nav-grid">
      <button type="button" class="detail-nav-card" data-breakdown-side="incoming">
        <span class="label">Einzahlungen im Bereich</span>
        <strong class="metric">${formatCompactCurrency(incomingTotal)}</strong>
        <p>Tiefer aufschlüsseln nach laufenden Einzahlungen, Investitionen, Finanzierung und nicht zahlungswirksamen Erträgen.</p>
      </button>

      <button type="button" class="detail-nav-card" data-breakdown-side="outgoing">
        <span class="label">Auszahlungen im Bereich</span>
        <strong class="metric">${formatCompactCurrency(outgoingTotal)}</strong>
        <p>Tiefer aufschlüsseln nach laufenden Auszahlungen, Investitionen, Finanzierung und nicht zahlungswirksamen Aufwendungen.</p>
      </button>
    </div>

    <article class="mini-card detail-note-card">
      <span class="label">Warum der Bereich auffällt</span>
      <strong class="metric">${profileHeadline}</strong>
      <p>${getDepartmentNote(selected)}</p>
    </article>
  `
}

function renderDepartmentTable(rows: DepartmentRow[]) {
  const body = document.getElementById('departmentTableBody')
  const count = document.getElementById('departmentTableCount')
  const yearData = getCurrentYearData()

  if (!body || !count) {
    return
  }

  if (!yearData.available) {
    body.innerHTML = `<tr class="is-empty"><td colspan="7">${yearData.emptyState}</td></tr>`
    count.textContent = yearData.availabilityNote
    return
  }

  if (!rows.length) {
    body.innerHTML = '<tr class="is-empty"><td colspan="7">Keine Bereiche entsprechen der aktuellen Suche oder dem gewählten Filter.</td></tr>'
    count.textContent = '0 Bereiche sichtbar.'
    return
  }

  body.innerHTML = rows
    .map(
      (row) => `
        <tr
          data-select-code="${row.code}"
          class="${row.code === householdState.selectedCode ? 'is-selected' : ''}"
          data-hover-info-title="${escapeAttribute(row.label)}"
          data-hover-info-body="${escapeAttribute(getDepartmentHoverBody(row))}"
        >
          <td><strong>${row.label}</strong></td>
          <td>${formatCompactCurrency(row.revenue)}</td>
          <td>${formatCompactCurrency(row.expense)}</td>
          <td>${formatCompactCurrency(row.result, true)}</td>
          <td>${formatCompactCurrency(row.admin, true)}</td>
          <td>${formatCompactCurrency(row.investment)}</td>
          <td>${formatCompactCurrency(row.commitments)}</td>
        </tr>
      `,
    )
    .join('')

  count.textContent = `${rows.length} ${rows.length === 1 ? 'Bereich ist' : 'Bereiche sind'} sichtbar.`
}

function renderHouseholdPage() {
  const yearData = getCurrentYearData()

  closeInfoPopover()
  renderHouseholdOverview()
  updateToggleStates()
  setControlsEnabled(yearData.available)

  const filteredRows = getFilteredRows()
  ensureSelection(filteredRows)
  const tableRows = sortRows(filteredRows)

  renderPieCharts(filteredRows)
  renderDepartmentChart(filteredRows)
  renderDepartmentSummary(filteredRows)
  renderPieDrilldown(filteredRows)
  renderDepartmentTable(tableRows)
}

function initHouseholdPage() {
  const chart = document.getElementById('departmentChart')
  const tableBody = document.getElementById('departmentTableBody')
  const search = document.getElementById('departmentSearch')
  const sort = document.getElementById('departmentSort')
  const yearTabs = document.getElementById('householdYearTabs')
  const pieTargets = ['revenuePieChart', 'revenuePieLegend', 'expensePieChart', 'expensePieLegend']

  if (
    !(chart instanceof HTMLElement)
    || !(tableBody instanceof HTMLElement)
    || !(search instanceof HTMLInputElement)
    || !(sort instanceof HTMLSelectElement)
    || !(yearTabs instanceof HTMLElement)
  ) {
    return
  }

  renderYearTabs(yearTabs)
  setupInfoPopover()

  document.querySelectorAll<HTMLButtonElement>('[data-metric-button]').forEach((button) => {
    button.addEventListener('click', () => {
      const metric = button.getAttribute('data-metric-button') as MetricKey | null

      if (!metric) {
        return
      }

      householdState.metric = metric
      renderHouseholdPage()
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-filter-button]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter-button') as FilterKey | null

      if (!filter) {
        return
      }

      householdState.filter = filter
      resetToHouseholdTopLevel()
      renderHouseholdPage()
    })
  })

  search.addEventListener('input', () => {
    householdState.search = search.value.trim().toLowerCase()
    resetToHouseholdTopLevel()
    renderHouseholdPage()
  })

  sort.addEventListener('change', () => {
    householdState.sort = sort.value as SortKey
    renderHouseholdPage()
  })

  yearTabs.addEventListener('click', (event) => {
    const button = getClosest(event.target, '[data-year-tab]')

    if (!button) {
      return
    }

    const nextYear = button.getAttribute('data-year-tab')

    if (!nextYear || nextYear === householdState.year) {
      return
    }

    householdState.year = nextYear
    resetHouseholdFilters()
    search.value = ''
    sort.value = householdState.sort
    renderHouseholdPage()
  })

  const handleSelection = (event: Event, source: SelectionSource) => {
    const target = getClosest(event.target, '[data-select-code]')
    if (!target || !getCurrentYearData().available) {
      return
    }

    householdState.selectedCode = target.getAttribute('data-select-code')
    householdState.hasUserSelectedArea = true
    householdState.pieDrilldownCode = source === 'pie' ? householdState.selectedCode : null
    householdState.pieBreakdownSide = null
    renderHouseholdPage()
  }

  chart.addEventListener('click', (event) => handleSelection(event, 'chart'))
  tableBody.addEventListener('click', (event) => handleSelection(event, 'table'))

  pieTargets.forEach((id) => {
    const element = document.getElementById(id)
    if (element) {
      element.addEventListener('click', (event) => handleSelection(event, 'pie'))
    }
  })

  document.addEventListener('click', (event) => {
    const breadcrumb = getClosest(event.target, '[data-breadcrumb-action]')
    const breakdownSide = getClosest(event.target, '[data-breakdown-side]')
    const closeButton = getClosest(event.target, '[data-close-pie-detail]')

    if (breadcrumb) {
      const action = breadcrumb.getAttribute('data-breadcrumb-action')

      if (action === 'overview') {
        resetToHouseholdTopLevel()
      }

      if (action === 'area') {
        householdState.pieBreakdownSide = null
      }

      renderHouseholdPage()
      return
    }

    if (breakdownSide) {
      householdState.pieBreakdownSide = breakdownSide.getAttribute('data-breakdown-side') as BreakdownSide | null
      renderHouseholdPage()
      return
    }

    if (!closeButton) {
      return
    }

    resetToHouseholdTopLevel()
    renderHouseholdPage()
  })

  renderHouseholdPage()
}

setupPdfLinks()
setupNavigation()

if (document.body.getAttribute('data-page') === 'haushalt') {
  initHouseholdPage()
}
