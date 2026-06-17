(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`#2563eb`,`#14b8a6`,`#8b5cf6`,`#f59e0b`,`#ef4444`,`#0f172a`,`#0ea5e9`,`#22c55e`],t={result:{label:`Ordentliches Ergebnis`,signed:!0},admin:{label:`Verwaltungssaldo`,signed:!0},investment:{label:`Investive Auszahlungen`,signed:!1},commitments:{label:`Verpflichtungsermächtigung`,signed:!1}},n={2026:{available:!0,sponsor:`Buchholz 1. Nachtragshaushalt 2026`,title:`Haushalt 2026: Woher das Geld kommt und wohin es fließt.`,lead:`Die Seite zeigt, wie sich die gesamten Ein- und Auszahlungen des Jahres auf die Bereiche verteilen und welche Schwerpunkte im Haushalt 2026 besonders ins Gewicht fallen.`,overviewLabel:`Schnellüberblick 2026`,heroStats:[{label:`Ordentliche Erträge`,value:`111,0 Mio. €`},{label:`Ordentliche Aufwendungen`,value:`113,4 Mio. €`},{label:`Einzahlungen gesamt`,value:`121,7 Mio. €`,info:`Hier steckt mehr drin als in den ordentlichen Erträgen: zusätzlich zählen auch Investitionseinzahlungen und Finanzierungseinzahlungen dazu, zum Beispiel Kredite.`},{label:`Auszahlungen gesamt`,value:`123,5 Mio. €`,info:`Hier geht es um alle tatsächlichen Geldabflüsse des Jahres: laufende Auszahlungen, Investitionen und Finanzierungsauszahlungen zusammen.`}],kpis:[{label:`Saldo Ergebnishaushalt`,value:`-2,44 Mio. €`,description:`Ordentlich und außerordentlich zusammen.`},{label:`Veränderung Zahlungsmittel`,value:`-1,80 Mio. €`,description:`Verbesserung um rund 2,42 Mio. € gegenüber bisher.`},{label:`Kreditermächtigung`,value:`12,77 Mio. €`,description:`276 Tsd. € weniger als bisher geplant.`},{label:`Verpflichtungsermächtigungen`,value:`20,58 Mio. €`,description:`Schwerpunkt bei Schulen, Kitas und Tiefbau.`,info:`Das ist noch kein sofort ausgezahltes Geld. Die Stadt darf damit aber schon Aufträge oder Verträge für kommende Jahre eingehen.`}],availabilityNote:`2026 ist vollständig mit Einnahmen-, Ausgaben- und Bereichsdaten hinterlegt.`,emptyState:`Für 2026 sollten Daten verfügbar sein. Wenn hier nichts erscheint, greift gerade ein Filter zu stark ein.`,pieReferenceTotals:{incoming:121684400,outgoing:123485600},departments:[{code:`0001`,label:`Verwaltungsführung und Presse- u. Öffentlichkeitsarbeit`,revenue:400,expense:1106500,result:-1106100,admin:-1106100,adminRevenue:400,investment:0,commitments:0,cashChange:-1106100,tags:[`verwaltung`,`presse`],note:`Der Bereich ist vor allem laufend geprägt und zeigt im Nachtrag keine großen Verschiebungen gegenüber dem bisherigen Ansatz.`},{code:`0002`,label:`Klimaschutzmanagement`,investmentRevenue:14600,revenue:57500,expense:477800,result:-420300,admin:-329200,adminRevenue:57500,investment:79e3,commitments:85e3,cashChange:-393600,tags:[`klima`,`investition`],note:`Verbesserte Liquiditätswirkung durch geringere laufende und investive Auszahlungen.`},{code:`0003`,label:`Gleichstellungsbeauftragte`,revenue:22500,expense:63700,result:-41200,admin:-41200,adminRevenue:22500,investment:0,commitments:0,cashChange:-41200,tags:[`verwaltung`]},{code:`0005`,label:`Ortschaft Holm-Seppensen`,revenue:82100,expense:62600,result:19500,admin:22e3,adminRevenue:82100,investment:19500,commitments:0,cashChange:2500,tags:[`ortschaft`],note:`Kleiner positiver Bereich mit überschaubarem Investitionsvolumen.`},{code:`0006`,label:`Ortschaft Steinbeck`,revenue:74500,expense:64500,result:1e4,admin:15e3,adminRevenue:74500,investment:1e4,commitments:0,cashChange:5e3,tags:[`ortschaft`],note:`Solide positive Ortsbudget-Lage bei geringen investiven Mitteln.`},{code:`0007`,label:`Ortschaft Sprötze`,revenue:38100,expense:27300,result:10800,admin:11900,adminRevenue:38100,investment:10800,commitments:0,cashChange:1100,tags:[`sproetze`,`ortschaft`],note:`Sprötze steht im ordentlichen Ergebnis mit +10,8 Tsd. € im Plan. Zusätzlich taucht im Gesamtpaket der Verpflichtungsermächtigungen ein Projekt für die GS Sprötze mit 3,0 Mio. € auf.`},{code:`0008`,label:`Ortschaft Trelde`,revenue:27200,expense:25200,result:2e3,admin:2500,adminRevenue:27200,investment:2e3,commitments:0,cashChange:500,tags:[`ortschaft`],note:`Nur geringe Bewegungen im Teilhaushalt.`},{code:`0009`,label:`Ortschaft Dibbersen`,revenue:22200,expense:15600,result:6600,admin:7700,adminRevenue:22200,investment:6600,commitments:0,cashChange:1100,tags:[`ortschaft`],note:`Positives ordentliches Ergebnis bei kleinem Investitionsansatz.`},{code:`1001`,label:`Personalmanagement`,revenue:581900,expense:2695500,result:-2113600,admin:-2203200,adminRevenue:62400,investment:0,commitments:0,cashChange:-2203200,tags:[`verwaltung`,`personal`],note:`Klarer Aufwandsschwerpunkt ohne investive Mittel.`},{code:`1002`,label:`Organisationsentwicklung und zentrale Dienste`,revenue:11e3,expense:3832800,result:-3821800,admin:-3557800,adminRevenue:10500,investment:8e4,commitments:0,cashChange:-3637800,tags:[`verwaltung`],note:`Deutlich negativer Verwaltungssaldo bei nur kleinen Investitionen.`},{code:`1003`,label:`Finanzmanagement und Liegenschaften`,investmentRevenue:93e4,revenue:80930300,expense:44395700,result:36534600,admin:35972300,adminRevenue:80007500,investment:935e3,commitments:0,cashChange:45814800,tags:[`finanzen`,`liegenschaften`],note:`Größter positiver Ergebnisbeitrag im Haushalt 2026 – hier laufen Steuerkraft, Liegenschaften und Finanzierung zusammen.`},{code:`1004`,label:`Stadtkasse`,revenue:131700,expense:490900,result:-359200,admin:-359200,adminRevenue:131700,investment:0,commitments:0,cashChange:-359200,tags:[`finanzen`,`verwaltung`]},{code:`2001`,label:`Soziales, Begegnung und Kultur`,revenue:569800,expense:2887300,result:-2317500,admin:-2077500,adminRevenue:563800,investment:14400,commitments:0,cashChange:-2091900,tags:[`soziales`,`kultur`],note:`Negativer Bereich mit nur geringem investivem Anteil.`},{code:`2002`,label:`Kinder, Jugend und Sport`,investmentRevenue:131900,revenue:15479500,expense:26534100,result:-11054600,admin:-9864500,adminRevenue:14842800,investment:5961700,commitments:104e5,cashChange:-15694300,tags:[`schule`,`kita`,`sport`,`sproetze`],note:`Der größte Sprung im Haushalt: +7,0 Mio. € zusätzliche Einzahlungen verbessern das Ergebnis um 7,551 Mio. €. Gleichzeitig liegen hier die höchsten Verpflichtungsermächtigungen.`},{code:`2090`,label:`Germuth-Scheer-Stiftung`,revenue:51500,expense:52200,result:-700,admin:-9900,adminRevenue:30800,investment:0,commitments:0,cashChange:-9900,tags:[`stiftung`,`kultur`]},{code:`3001`,label:`Bürgerservice, Ordnung und Gewerbe`,investmentRevenue:42e3,revenue:589600,expense:2876700,result:-2287100,admin:-2003300,adminRevenue:565100,investment:1315300,commitments:821600,cashChange:-3276600,tags:[`ordnung`,`gewerbe`],note:`Mittlerer Aufwandsschwerpunkt mit sichtbaren investiven Auszahlungen.`},{code:`3002`,label:`Standesamt`,revenue:112500,expense:351900,result:-239400,admin:-239300,adminRevenue:112500,investment:0,commitments:0,cashChange:-239300,tags:[`verwaltung`]},{code:`3003`,label:`Verkehrsbehörde`,revenue:1945800,expense:1263600,result:682200,admin:692e3,adminRevenue:1842400,investment:415e3,commitments:2e5,cashChange:277e3,tags:[`verkehr`],note:`Positiver Bereich mit relevanten Mitteln für Verkehrslenkung.`},{code:`4001`,label:`Bauaufsicht`,revenue:506500,expense:979800,result:-473300,admin:-497100,adminRevenue:506600,investment:0,commitments:0,cashChange:-497100,tags:[`planung`,`bau`]},{code:`4002`,label:`Stadt- und Grünplanung, Umwelt und Klima`,investmentRevenue:4e4,revenue:8e4,expense:963900,result:-883900,admin:-901100,adminRevenue:45200,investment:6e4,commitments:0,cashChange:-921100,tags:[`planung`,`klima`],note:`Planungsbereich mit begrenzten Investitionen und negativem Ergebnissaldo.`},{code:`4003`,label:`Tiefbau und Bauverwaltung`,investmentRevenue:374e3,revenue:6996400,expense:10144900,result:-3148500,admin:-1293800,adminRevenue:5626500,investment:4766300,commitments:9071e3,cashChange:-5686100,tags:[`tiefbau`,`verkehr`],note:`Ein Schwerpunktbereich bei investiven Maßnahmen: 9,071 Mio. € Verpflichtungsermächtigungen liegen hier, etwa für Tiefbauprogramme und Bahnhofsumfeld.`},{code:`4004`,label:`Hochbau`,revenue:2258600,expense:7585700,result:-5327100,admin:-5159900,adminRevenue:2258600,investment:15e3,commitments:0,cashChange:-5174900,tags:[`gebaeude`],note:`Hoher Aufwand im Hochbau, jedoch kaum zusätzliche investive Auszahlungen.`},{code:`5001`,label:`Controlling und Betriebsführung`,investmentRevenue:5e4,revenue:63100,expense:1317700,result:-1254600,admin:-1231500,adminRevenue:63100,investment:29e4,commitments:0,cashChange:-1471500,tags:[`verwaltung`]},{code:`5002`,label:`Grün- u. Stadtbildpflege, Friedhofswesen`,revenue:369300,expense:2771e3,result:-2401700,admin:-2366300,adminRevenue:299800,investment:375e3,commitments:0,cashChange:-2741300,tags:[`stadtbild`],note:`Sachaufwandsschwerpunkt mit spürbarem laufendem Zuschussbedarf.`},{code:`5003`,label:`Technische Unterhaltung`,revenue:35e3,expense:2393100,result:-2358100,admin:-2358100,adminRevenue:35e3,investment:0,commitments:0,cashChange:-2358100,tags:[`technik`]}],defaultSelectedCode:`2002`},2027:{available:!1,sponsor:`Haushaltsjahr 2027`,title:`Haushalt 2027 vorbereiten.`,lead:`Sobald neue Zahlen vorliegen, können sie hier ergänzt und direkt in Einnahmen, Ausgaben und Bereichsschwerpunkte übernommen werden.`,overviewLabel:`Datenstand 2027`,heroStats:[{label:`Status`,value:`folgt`},{label:`Datenquelle`,value:`noch offen`},{label:`Einnahmen`,value:`vorbereitet`},{label:`Ausgaben`,value:`vorbereitet`}],kpis:[{label:`Haushaltsdaten`,value:`noch nicht hinterlegt`,description:`Kennzahlen können später zentral ergänzt werden.`},{label:`Bereichsansicht`,value:`wartet auf Daten`,description:`Sobald Zahlen vorliegen, werden die Schwerpunkte automatisch sichtbar.`},{label:`PDF-Verknüpfung`,value:`bereit`,description:`Die Navigation und der Aufbau bleiben identisch.`},{label:`Jahreslogik`,value:`aktiv`,description:`Weitere Jahre lassen sich ohne Umbau ergänzen.`}],availabilityNote:`Für 2027 sind noch keine aufbereiteten Haushaltsdaten hinterlegt.`,emptyState:`Für 2027 gibt es aktuell noch keine aufbereiteten Haushaltswerte.`,pieReferenceTotals:{revenue:0,expense:0},departments:[],defaultSelectedCode:null},2028:{available:!1,sponsor:`Haushaltsjahr 2028`,title:`Haushalt 2028 vorbereiten.`,lead:`Auch für 2028 ist die Seitenstruktur schon vorbereitet. Sobald Werte vorliegen, muss nur der Jahresdatensatz ergänzt werden.`,overviewLabel:`Datenstand 2028`,heroStats:[{label:`Status`,value:`folgt`},{label:`Vorlage`,value:`vorhanden`},{label:`Filterlogik`,value:`aktiv`},{label:`Bereichsansicht`,value:`aktivierbar`}],kpis:[{label:`Jahresauswahl`,value:`einsatzbereit`,description:`Die Auswahl kann direkt auf neue Daten umschalten.`},{label:`Bereiche`,value:`offen`,description:`Sobald ein Datensatz ergänzt wird, erscheint er hier.`},{label:`Kennzahlen`,value:`offen`,description:`Hero-Statistiken und Kacheln sind als Platzhalter vorbereitet.`},{label:`Quellenbezug`,value:`stabil`,description:`PDF-Link und Seitenstruktur können unverändert bleiben.`}],availabilityNote:`Für 2028 sind noch keine Haushaltswerte eingetragen.`,emptyState:`Für 2028 erscheinen die Auswertungen, sobald Werte ergänzt sind.`,pieReferenceTotals:{revenue:0,expense:0},departments:[],defaultSelectedCode:null}},r={year:`2026`,metric:`result`,filter:`all`,sort:`metric-desc`,search:``,selectedCode:null,pieDrilldownCode:null,pieBreakdownSide:null,hasUserSelectedArea:!1},i=`https://www.buchholz.de/downloads/datei/NDNlOWExZGI2NGIzN2FlOC9NZ2NnSTVTYTN1UUpmWjdMWUk2M3VrbzErYjZCbGRJbTNHZHgwQ2tTN1pueXJqanRVbXhxTHFCZHI1WHcrNUxqMHVpU012MWlGK0QzMzZxS3hDZ21VS0hZVlNEOWhmcUxCWkozWS85Uis0NDRaU0M2QzRIS1VYOHk4Tkh1TDVVZ040a1hXcWVFQ0htQkhHNG1jTzdNdWg2QVk4ZDF5SEVuUzh3WjdFOGFYVUcrWjg2Q1pGakh5d1QwWnZJVTM3NQ`,a=!1,o=null,s=null,c=null,l=null,u=1500;function d(e,t){if(!(e instanceof Element))return null;let n=e.closest(t);return n instanceof HTMLElement?n:null}function f(e){return`result`in e}function p(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`"`,`&quot;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`)}function m(e,t){return`
    <button
      type="button"
      class="info-button"
      aria-label="Info zu ${p(e)}"
      aria-expanded="false"
      data-info-title="${p(e)}"
      data-info-body="${p(t)}"
    >
      i
    </button>
  `}function h(){let e=Object.entries(n).filter(([,e])=>e.available);return e.length?e:Object.entries(n)}function g(e,t=!1){let n=Math.abs(e),r;return r=n>=1e6?`${(n/1e6).toLocaleString(`de-DE`,{minimumFractionDigits:1,maximumFractionDigits:1})} Mio. €`:n>=1e3?`${(n/1e3).toLocaleString(`de-DE`,{minimumFractionDigits:1,maximumFractionDigits:1})} Tsd. €`:`${n.toLocaleString(`de-DE`)} €`,t&&e>0?`+${r}`:e<0?`-${r}`:r}function ee(){document.querySelectorAll(`[data-pdf-link]`).forEach(e=>{e.setAttribute(`href`,i),e.setAttribute(`target`,`_blank`),e.setAttribute(`rel`,`noreferrer`)})}function te(){let e=document.body.getAttribute(`data-page`);e&&document.querySelectorAll(`[data-nav]`).forEach(t=>{t.getAttribute(`data-nav`)===e&&t.classList.add(`active`)})}function _(){let e=document.getElementById(`infoPopover`);e&&(e.hidden=!0,o&&=(o.setAttribute(`aria-expanded`,`false`),null),s=null)}function v(){c&&=(window.clearTimeout(c),null)}function y(){l&&=(window.clearTimeout(l),null)}function b(e){return e.getAttribute(`data-info-title`)??e.getAttribute(`data-hover-info-title`)??`Hinweis`}function x(e){return e.getAttribute(`data-info-body`)??e.getAttribute(`data-hover-info-body`)??``}function S(e,t){let n=t.querySelector(`.info-popover-card`);if(!n)return;let r=e.getBoundingClientRect(),i=n.getBoundingClientRect(),a=window.innerWidth-i.width-12,o=r.left+r.width/2-i.width/2,s=Math.max(12,Math.min(o,a)),c=r.bottom+12+i.height<=window.innerHeight-12?r.bottom+12:Math.max(12,r.top-i.height-12);n.style.left=`${s}px`,n.style.top=`${c}px`}function C(e,t=`click`){let n=document.getElementById(`infoPopover`),r=document.getElementById(`infoPopoverTitle`),i=document.getElementById(`infoPopoverBody`);!n||!r||!i||(v(),y(),r.textContent=b(e),i.textContent=x(e),n.hidden=!1,o&&o!==e&&o.setAttribute(`aria-expanded`,`false`),o=e,s=t,o.setAttribute(`aria-expanded`,`true`),S(e,n))}function w(e){v(),y(),c=window.setTimeout(()=>{C(e,`hover`)},u)}function T(){y(),l=window.setTimeout(()=>{s===`hover`&&_()},120)}function ne(){if(a)return;let e=document.getElementById(`infoPopover`);if(!e)return;let t=e.querySelector(`.info-popover-close`),n=e.querySelector(`.info-popover-card`);document.addEventListener(`click`,t=>{let n=d(t.target,`.info-button`);if(n&&!n.closest(`#infoPopover`)){t.preventDefault(),o===n&&!e.hidden?_():C(n,`click`);return}!e.hidden&&!d(t.target,`#infoPopover`)&&_()}),document.addEventListener(`mouseover`,e=>{let t=d(e.target,`[data-hover-info-title]`);t&&(e.relatedTarget instanceof Node&&t.contains(e.relatedTarget)||w(t))}),document.addEventListener(`mouseout`,e=>{let t=d(e.target,`[data-hover-info-title]`);if(!t)return;let n=e.relatedTarget;n instanceof Element&&(t.contains(n)||n.closest(`#infoPopover`))||(v(),s===`hover`&&o===t&&T())}),t?.addEventListener(`click`,_),n?.addEventListener(`mouseenter`,y),n?.addEventListener(`mouseleave`,e=>{let t=e.relatedTarget;t instanceof Node&&o?.contains(t)||s===`hover`&&T()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&_()}),window.addEventListener(`resize`,()=>{o&&!e.hidden&&S(o,e)}),window.addEventListener(`scroll`,()=>{o&&!e.hidden&&S(o,e)},{passive:!0}),a=!0}function E(){return n[r.year]}function D(){return E().departments}function O(e){return e.investmentRevenue??0}function k(e){return e.financingRevenue??0}function A(e){return e.financingExpense??0}function j(e){return e.adminRevenue??e.revenue}function M(e){return j(e)-e.admin}function N(e){return j(e)+O(e)+k(e)}function P(e){return M(e)+e.investment+A(e)}function F(e){return Math.max(e.revenue-j(e),0)}function re(e){return Math.max(e.expense-M(e),0)}function I(e,t){return(t===`incoming`?[{label:`Laufende Einzahlungen`,value:j(e),description:`Geld, das im normalen Jahresverlauf tatsächlich hereinkommt.`},{label:`Investitionseinzahlungen`,value:O(e),description:`Zahlungen für Investitionen, Zuschüsse oder Beiträge.`},{label:`Finanzierungseinzahlungen`,value:k(e),description:`Zum Beispiel Kreditaufnahmen.`},{label:`Nicht zahlungswirksame Erträge`,value:F(e),description:`Verbessern das Ergebnis, ohne sofort Geld aufs Konto zu bringen.`}]:[{label:`Laufende Auszahlungen`,value:M(e),description:`Geld, das im normalen Jahresverlauf tatsächlich abgeht.`},{label:`Investive Auszahlungen`,value:e.investment,description:`Geld für Bau, Ausstattung und andere länger wirkende Anschaffungen.`},{label:`Finanzierungsauszahlungen`,value:A(e),description:`Zum Beispiel Tilgung oder Rückzahlungen.`},{label:`Nicht zahlungswirksame Aufwendungen`,value:re(e),description:`Belasten das Ergebnis, ohne sofort Geldabfluss auszulösen.`}]).filter(e=>e.value>0)}function L(e){return e.map(e=>`
        <article class="bar-row breakdown-row">
          <div class="bar-row-head">
            <strong>${e.label}</strong>
            <span class="metric-badge">${g(e.value)}</span>
          </div>
          <p class="muted breakdown-copy">${e.description}</p>
        </article>
      `).join(``)}function R(e){return`
    <nav class="breadcrumbs" aria-label="Drilldown-Navigation">
      ${e.map(e=>e.action?`<button type="button" class="breadcrumb-button" data-breadcrumb-action="${e.action}">${e.label}</button>`:`<span class="breadcrumb-current">${e.label}</span>`).join(`<span class="breadcrumb-separator">/</span>`)}
    </nav>
  `}function z(e,t){return t===`incoming`?N(e):t===`outgoing`?P(e):e[t]??0}function B(e){return e.commitments>=5e6?`Große Vorhaben gebunden`:e.result>=5e6?`Starker Netto-Beitrag`:e.result<=-5e6?`Großer Zuschussbedarf`:e.investment>=1e6?`Investitionsschwerpunkt`:e.result>=0?`Leichter Überschuss`:`Laufender Zuschussbereich`}function V(e){let t=[];return e.investment>0&&t.push(`Investive Auszahlungen: ${g(e.investment)}.`),e.commitments>0&&t.push(`Verpflichtungsermächtigung: ${g(e.commitments)}.`),[`${B(e)}.`,X(e),`Ordentliches Ergebnis: ${g(e.result,!0)}.`,...t].join(` `)}function H(){r.metric=`result`,r.filter=`all`,r.sort=`metric-desc`,r.search=``,r.selectedCode=null,r.pieDrilldownCode=null,r.pieBreakdownSide=null,r.hasUserSelectedArea=!1}function U(){r.selectedCode=null,r.pieDrilldownCode=null,r.pieBreakdownSide=null,r.hasUserSelectedArea=!1}function W(){document.querySelectorAll(`[data-year-tab]`).forEach(e=>{let t=e.getAttribute(`data-year-tab`)===r.year;e.classList.toggle(`is-active`,t),e.setAttribute(`aria-selected`,String(t)),e.tabIndex=t?0:-1}),document.querySelectorAll(`[data-metric-button]`).forEach(e=>{e.classList.toggle(`is-active`,e.getAttribute(`data-metric-button`)===r.metric)}),document.querySelectorAll(`[data-filter-button]`).forEach(e=>{e.classList.toggle(`is-active`,e.getAttribute(`data-filter-button`)===r.filter)})}function G(e){document.querySelectorAll(`[data-metric-button], [data-filter-button]`).forEach(t=>{t.disabled=!e});let t=document.getElementById(`departmentSearch`),n=document.getElementById(`departmentSort`);t instanceof HTMLInputElement&&(t.disabled=!e),n instanceof HTMLSelectElement&&(n.disabled=!e)}function K(e){let t=h();t.some(([e])=>e===r.year)||(r.year=t[0]?.[0]??r.year),e.innerHTML=t.map(([e])=>`
          <button
            type="button"
            role="tab"
            class="year-tab ${e===r.year?`is-active`:``}"
            data-year-tab="${e}"
            aria-selected="${e===r.year?`true`:`false`}"
            tabindex="${e===r.year?`0`:`-1`}"
          >
            <span>${e}</span>
          </button>
        `).join(``)}function q(){let e=E(),t=document.getElementById(`householdSponsor`),n=document.getElementById(`householdTitle`),r=document.getElementById(`householdLead`),i=document.getElementById(`yearOverviewLabel`),a=document.getElementById(`householdHeroStats`),o=document.getElementById(`householdKpis`),s=document.getElementById(`yearAvailabilityNote`);!t||!n||!r||!i||!a||!o||!s||(t.textContent=e.sponsor,n.textContent=e.title,r.textContent=e.lead,i.textContent=e.overviewLabel,s.textContent=e.available?``:e.availabilityNote,s.hidden=e.available||!e.availabilityNote,a.innerHTML=e.heroStats.map(t=>`
        <div class="${e.available?``:`is-placeholder`}">
          <div class="label-with-info">
            <span>${t.label}</span>
            ${t.info?m(t.label,t.info):``}
          </div>
          <strong>${t.value}</strong>
        </div>
      `).join(``),o.innerHTML=e.kpis.map(t=>`
        <article class="kpi ${e.available?``:`is-placeholder`}">
          <div class="label-with-info">
            <span>${t.label}</span>
            ${t.info?m(t.label,t.info):``}
          </div>
          <strong>${t.value}</strong>
          <p>${t.description}</p>
        </article>
      `).join(``))}function J(){return D().filter(e=>{if(!`${e.label} ${e.tags.join(` `)} ${e.note??``}`.toLowerCase().includes(r.search))return!1;switch(r.filter){case`positive`:return e.result>0;case`negative`:return e.result<0;case`investment`:return e.investment>0||e.commitments>0;case`sproetze`:return e.tags.includes(`sproetze`)||e.label.includes(`Sprötze`);default:return!0}})}function Y(e){let t=[...e],n=r.metric;switch(r.sort){case`metric-asc`:t.sort((e,t)=>e[n]-t[n]);break;case`label-asc`:t.sort((e,t)=>e.label.localeCompare(t.label,`de`));break;case`commitments-desc`:t.sort((e,t)=>t.commitments-e.commitments);break;case`investment-desc`:t.sort((e,t)=>t.investment-e.investment);break;default:t.sort((e,t)=>t[n]-e[n]);break}return t}function ie(e){r.hasUserSelectedArea&&(e.some(e=>e.code===r.selectedCode)||(r.selectedCode=[...e].sort((e,t)=>Math.abs(t[r.metric])-Math.abs(e[r.metric]))[0]?.code??null))}function X(e){if(e.note)return e.note;let t=[{label:`ordentlichen Ergebnis`,value:e.result,signed:!0},{label:`Liquiditätswirkung`,value:e.cashChange,signed:!0},{label:`investiven Auszahlungen`,value:e.investment,signed:!1},{label:`Verpflichtungsermächtigungen`,value:e.commitments,signed:!1}].sort((e,t)=>Math.abs(t.value)-Math.abs(e.value))[0];if(!t||t.value===0)return`Für diesen Bereich zeigt der Nachtragshaushalt keine auffällige Veränderung gegenüber dem bisherigen Ansatz.`;if(t.label===`Verpflichtungsermächtigungen`)return`Der Bereich ist vor allem über künftige Bindungen sichtbar: ${g(t.value)} Verpflichtungsermächtigung.`;if(t.label===`investiven Auszahlungen`)return`Der Bereich fällt vor allem investiv auf: ${g(t.value)} an Auszahlungen sind hier eingeplant.`;let n=t.value>0?`positiv`:`negativ`;return`Auffällig ist vor allem der Beitrag im ${t.label}: ${g(t.value,t.signed)} (${n}).`}function Z(e,t,n,r){let i=(r-90)*Math.PI/180;return{x:e+n*Math.cos(i),y:t+n*Math.sin(i)}}function ae(e,t,n,r,i){let a=i-r;if(a>=359.999){let r={x:e,y:t-n},i={x:e,y:t+n};return[`M ${e} ${t}`,`L ${r.x} ${r.y}`,`A ${n} ${n} 0 1 0 ${i.x} ${i.y}`,`A ${n} ${n} 0 1 0 ${r.x} ${r.y}`,`Z`].join(` `)}let o=Z(e,t,n,i),s=Z(e,t,n,r),c=a<=180?`0`:`1`;return[`M ${e} ${t}`,`L ${o.x} ${o.y}`,`A ${n} ${n} 0 ${c} 0 ${s.x} ${s.y}`,`Z`].join(` `)}function oe(t,n,r=null){let i=t.map(e=>({row:e,value:z(e,n)})).filter(e=>e.value>0).sort((e,t)=>t.value-e.value),a=i.slice(0,7),o=i.reduce((e,t)=>e+t.value,0),s=i.slice(7).reduce((e,t)=>e+t.value,0),c=r&&r>o?r-o:0,l=s+c,u=s>0&&c>0?`Weitere Bereiche / nicht zugeordnet`:c>0?`Nicht bereichsscharf zugeordnet`:`Weitere Bereiche`,d=l>0?[...a,{row:{code:null,label:u},value:l}]:a,f=o+c,p=0;return{total:f,segments:d.map((t,n)=>{let r=t.value,i=f===0?0:r/f*360,a={row:t.row,code:t.row.code??null,label:t.row.label,value:r,color:e[n%e.length],startAngle:p,endAngle:p+i};return p+=i,a})}}function Q(e,t,n,i){let a=document.getElementById(n),o=document.getElementById(i),s=E(),c=r.filter===`all`&&r.search===``,l={incoming:`Einzahlungen gesamt`,outgoing:`Auszahlungen gesamt`};if(!a||!o)return;if(!s.available){a.innerHTML=`<p class="muted">${s.emptyState}</p>`,o.innerHTML=``;return}let{total:u,segments:d}=oe(t,e,c?s.pieReferenceTotals?.[e]??null:null);if(!d.length||u===0){a.innerHTML=`<p class="muted">Keine passenden Bereiche für die aktuelle Auswahl.</p>`,o.innerHTML=``;return}a.innerHTML=`
    <div class="pie-chart-stage">
      <svg class="pie-chart-svg" viewBox="0 0 240 240" aria-label="${l[e]}">
        ${d.map(e=>{let t=e.code===r.selectedCode;return`
              <path
                d="${ae(120,120,102,e.startAngle,e.endAngle)}"
                fill="${e.color}"
                class="pie-slice ${e.code?``:`is-rest`} ${t?`is-selected`:``}"
                ${e.code?`data-select-code="${e.code}"`:``}
                ${e.code?`data-hover-info-title="${p(e.label)}"`:``}
                ${e.code&&f(e.row)?`data-hover-info-body="${p(V(e.row))}"`:``}
              ></path>
            `}).join(``)}
        <circle cx="120" cy="120" r="56" fill="white"></circle>
      </svg>
      <div class="pie-chart-center">
        <span>${l[e]}</span>
        <strong>${g(u)}</strong>
      </div>
    </div>
  `,o.innerHTML=d.map(e=>{let t=`<span class="pie-legend-marker" style="background:${e.color}"></span>`;return e.code?`
        <button
          type="button"
          class="pie-legend-row ${e.code===r.selectedCode?`is-active`:``}"
          data-select-code="${e.code}"
          data-hover-info-title="${p(e.label)}"
          data-hover-info-body="${p(f(e.row)?V(e.row):``)}"
        >
          <div class="pie-legend-label">${t}<span>${e.label}</span></div>
          <strong>${g(e.value)}</strong>
        </button>
      `:`
          <div class="pie-legend-row is-rest">
            <div class="pie-legend-label">${t}<span>${e.label}</span></div>
            <strong>${g(e.value)}</strong>
          </div>
        `}).join(``)}function se(e){Q(`incoming`,e,`revenuePieChart`,`revenuePieLegend`),Q(`outgoing`,e,`expensePieChart`,`expensePieLegend`)}function ce(e){let n=document.getElementById(`departmentChart`),i=document.getElementById(`departmentChartTitle`),a=document.getElementById(`departmentChartHint`),o=E();if(!n||!i||!a)return;if(i.textContent=t[r.metric].label,a.textContent=o.available?`Sortiert nach absolutem Wert der aktiven Kennzahl. Ein Klick öffnet den gewählten Bereich in der Detailansicht.`:`Wird automatisch befüllt, sobald Daten für dieses Jahr vorliegen.`,!o.available){n.innerHTML=`<p class="muted">${o.emptyState}</p>`;return}let s=[...e].sort((e,t)=>Math.abs(t[r.metric])-Math.abs(e[r.metric])).slice(0,10),c=Math.max(...s.map(e=>Math.abs(e[r.metric])),0);if(!s.length){n.innerHTML=`<p class="muted">Keine Bereiche für die aktuelle Auswahl gefunden.</p>`;return}n.innerHTML=s.map(e=>{let n=e[r.metric],i=c===0?0:Math.max(Math.abs(n)/c*100,2),a=r.metric===`commitments`?`neutral`:n<0?`negative`:`positive`;return`
        <div class="chart-row">
          <button
            type="button"
            data-select-code="${e.code}"
            class="${e.code===r.selectedCode?`is-selected`:``}"
            data-hover-info-title="${p(e.label)}"
            data-hover-info-body="${p(V(e))}"
          >
            <div class="chart-row-head">
              <strong>${e.label}</strong>
              <span class="${n<0&&t[r.metric].signed?`metric-badge negative`:`metric-badge`}">${g(n,t[r.metric].signed)}</span>
            </div>
            <div class="chart-track" aria-hidden="true">
              <div class="chart-fill ${a}" style="width: ${i}%"></div>
            </div>
          </button>
        </div>
      `}).join(``)}function le(e){let n=document.getElementById(`departmentSummary`),i=E();if(!n)return;if(!i.available){n.innerHTML=`
      <article class="mini-card">
        <span class="label">Ausgewähltes Jahr</span>
        <strong class="metric">${r.year}</strong>
        <p>${i.availabilityNote}</p>
      </article>
      <article class="mini-card">
        <span class="label">Nächster Schritt</span>
        <strong class="metric">Datensatz ergänzen</strong>
        <p>Lege für ${r.year} Kennzahlen und Bereiche an, dann erscheinen hier automatisch die Verteilungen, Schwerpunkte und Detailwerte.</p>
      </article>
    `;return}let a=e.find(e=>e.code===r.selectedCode);if(!r.hasUserSelectedArea||!a){n.innerHTML=`
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
    `;return}let o=a[r.metric],s=`${g(a.revenue)} Einnahmen − ${g(a.expense)} Ausgaben = ${g(a.result,!0)}`,c=B(a);n.innerHTML=`
    <article class="mini-card">
      <span class="label">Ausgewählter Bereich</span>
      <strong class="metric">${a.label}</strong>
      <p>${r.metric===`result`?`Ordentliches Ergebnis: <strong>${g(a.result,!0)}</strong><br />${s}`:`${t[r.metric].label}: <strong>${g(o,t[r.metric].signed)}</strong>`}</p>
    </article>
    <article class="mini-card">
      <span class="label">Ordentliche Einnahmen / Ausgaben</span>
      <strong class="metric">${g(a.revenue)}</strong>
      <p>Ausgaben: <strong>${g(a.expense)}</strong></p>
    </article>
    <article class="mini-card">
      <span class="label">Investition / VE / Liquidität</span>
      <strong class="metric">${g(a.investment)}</strong>
      <p>VE: <strong>${g(a.commitments)}</strong> · Liquidität: <strong>${g(a.cashChange,!0)}</strong></p>
    </article>
    <article class="mini-card">
      <span class="label">Warum der Bereich auffällt</span>
      <strong class="metric">${c}</strong>
      <p>${X(a)}<br /><span class="muted">Bereichscode: ${a.code}</span></p>
    </article>
  `}function ue(e){let t=document.getElementById(`revenuePieCard`),n=document.getElementById(`expensePieCard`),i=document.getElementById(`departmentSummary`),a=document.getElementById(`pieDrilldownCard`),o=document.getElementById(`departmentOverviewSection`),s=document.getElementById(`departmentTableSection`);if(!t||!n||!i||!a||!o||!s)return;let c=e.find(e=>e.code===r.pieDrilldownCode),l=!!c;if(t.hidden=l,n.hidden=l,i.hidden=l,a.hidden=!l,o.hidden=l,s.hidden=l,!c){a.innerHTML=``;return}let u=N(c),d=P(c),f=B(c),p=I(c,`incoming`),m=I(c,`outgoing`),h=r.pieBreakdownSide;if(h){let e=h===`incoming`?{title:`Einzahlungen im Bereich`,total:u,items:p,intro:`Hier siehst du die Einzahlungen des gewählten Bereichs noch einmal tiefer gegliedert – nach laufendem Geschäft, Investitionen, Finanzierung und nicht zahlungswirksamen Anteilen.`}:{title:`Auszahlungen im Bereich`,total:d,items:m,intro:`Hier siehst du die Auszahlungen des gewählten Bereichs noch einmal tiefer gegliedert – nach laufendem Geschäft, Investitionen, Finanzierung und nicht zahlungswirksamen Anteilen.`};a.innerHTML=`
      ${R([{label:`Gesamtüberblick`,action:`overview`},{label:c.label,action:`area`},{label:e.title}])}

      <div class="chart-head detail-card-head">
        <div>
          <p class="eyebrow">Dritte Ebene</p>
          <h3>${e.title}</h3>
          <p class="muted detail-code">${c.label}</p>
        </div>
      </div>

      <article class="mini-card detail-note-card">
        <span class="label">Summe auf dieser Ebene</span>
        <strong class="metric">${g(e.total)}</strong>
        <p>${e.intro}</p>
      </article>

      <div class="bar-list breakdown-focus-list">
        ${L(e.items)}
      </div>
    `;return}a.innerHTML=`
    ${R([{label:`Gesamtüberblick`,action:`overview`},{label:c.label}])}

    <div class="chart-head detail-card-head">
      <div>
        <p class="eyebrow">Bereich im Fokus</p>
        <h3>${c.label}</h3>
        <p class="muted detail-code">Bereichscode: ${c.code}</p>
      </div>
    </div>

    <div class="facts">
      <article class="mini-card">
        <span class="label">Einzahlungen / Auszahlungen gesamt</span>
        <strong class="metric">${g(u)}</strong>
        <p>Auszahlungen gesamt: <strong>${g(d)}</strong></p>
      </article>
      <article class="mini-card">
        <span class="label">Ordentliches Ergebnis</span>
        <strong class="metric">${g(c.result,!0)}</strong>
        <p>${g(c.revenue)} Einnahmen − ${g(c.expense)} Ausgaben</p>
      </article>
      <article class="mini-card">
        <span class="label">Investive Auszahlungen</span>
        <strong class="metric">${g(c.investment)}</strong>
        <p>Das ist Geld für Bau, Ausstattung oder andere länger wirkende Anschaffungen – nicht für den normalen Alltag.</p>
      </article>
      <article class="mini-card">
        <span class="label">Verpflichtungsermächtigung</span>
        <strong class="metric">${g(c.commitments)}</strong>
        <p>Damit darf die Stadt heute schon Aufträge für kommende Jahre binden, auch wenn die Zahlung erst später kommt.</p>
      </article>
    </div>

    <div class="detail-nav-grid">
      <button type="button" class="detail-nav-card" data-breakdown-side="incoming">
        <span class="label">Einzahlungen im Bereich</span>
        <strong class="metric">${g(u)}</strong>
        <p>Tiefer aufschlüsseln nach laufenden Einzahlungen, Investitionen, Finanzierung und nicht zahlungswirksamen Erträgen.</p>
      </button>

      <button type="button" class="detail-nav-card" data-breakdown-side="outgoing">
        <span class="label">Auszahlungen im Bereich</span>
        <strong class="metric">${g(d)}</strong>
        <p>Tiefer aufschlüsseln nach laufenden Auszahlungen, Investitionen, Finanzierung und nicht zahlungswirksamen Aufwendungen.</p>
      </button>
    </div>

    <article class="mini-card detail-note-card">
      <span class="label">Warum der Bereich auffällt</span>
      <strong class="metric">${f}</strong>
      <p>${X(c)}</p>
    </article>
  `}function de(e){let t=document.getElementById(`departmentTableBody`),n=document.getElementById(`departmentTableCount`),i=E();if(!(!t||!n)){if(!i.available){t.innerHTML=`<tr class="is-empty"><td colspan="7">${i.emptyState}</td></tr>`,n.textContent=i.availabilityNote;return}if(!e.length){t.innerHTML=`<tr class="is-empty"><td colspan="7">Keine Bereiche entsprechen der aktuellen Suche oder dem gewählten Filter.</td></tr>`,n.textContent=`0 Bereiche sichtbar.`;return}t.innerHTML=e.map(e=>`
        <tr
          data-select-code="${e.code}"
          class="${e.code===r.selectedCode?`is-selected`:``}"
          data-hover-info-title="${p(e.label)}"
          data-hover-info-body="${p(V(e))}"
        >
          <td><strong>${e.label}</strong></td>
          <td>${g(e.revenue)}</td>
          <td>${g(e.expense)}</td>
          <td>${g(e.result,!0)}</td>
          <td>${g(e.admin,!0)}</td>
          <td>${g(e.investment)}</td>
          <td>${g(e.commitments)}</td>
        </tr>
      `).join(``),n.textContent=`${e.length} ${e.length===1?`Bereich ist`:`Bereiche sind`} sichtbar.`}}function $(){let e=E();_(),q(),W(),G(e.available);let t=J();ie(t);let n=Y(t);se(t),ce(t),le(t),ue(t),de(n)}function fe(){let e=document.getElementById(`departmentChart`),t=document.getElementById(`departmentTableBody`),n=document.getElementById(`departmentSearch`),i=document.getElementById(`departmentSort`),a=document.getElementById(`householdYearTabs`),o=[`revenuePieChart`,`revenuePieLegend`,`expensePieChart`,`expensePieLegend`];if(!(e instanceof HTMLElement)||!(t instanceof HTMLElement)||!(n instanceof HTMLInputElement)||!(i instanceof HTMLSelectElement)||!(a instanceof HTMLElement))return;K(a),ne(),document.querySelectorAll(`[data-metric-button]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-metric-button`);t&&(r.metric=t,$())})}),document.querySelectorAll(`[data-filter-button]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-filter-button`);t&&(r.filter=t,U(),$())})}),n.addEventListener(`input`,()=>{r.search=n.value.trim().toLowerCase(),U(),$()}),i.addEventListener(`change`,()=>{r.sort=i.value,$()}),a.addEventListener(`click`,e=>{let t=d(e.target,`[data-year-tab]`);if(!t)return;let a=t.getAttribute(`data-year-tab`);!a||a===r.year||(r.year=a,H(),n.value=``,i.value=r.sort,$())});let s=(e,t)=>{let n=d(e.target,`[data-select-code]`);!n||!E().available||(r.selectedCode=n.getAttribute(`data-select-code`),r.hasUserSelectedArea=!0,r.pieDrilldownCode=t===`pie`?r.selectedCode:null,r.pieBreakdownSide=null,$())};e.addEventListener(`click`,e=>s(e,`chart`)),t.addEventListener(`click`,e=>s(e,`table`)),o.forEach(e=>{let t=document.getElementById(e);t&&t.addEventListener(`click`,e=>s(e,`pie`))}),document.addEventListener(`click`,e=>{let t=d(e.target,`[data-breadcrumb-action]`),n=d(e.target,`[data-breakdown-side]`),i=d(e.target,`[data-close-pie-detail]`);if(t){let e=t.getAttribute(`data-breadcrumb-action`);e===`overview`&&U(),e===`area`&&(r.pieBreakdownSide=null),$();return}if(n){r.pieBreakdownSide=n.getAttribute(`data-breakdown-side`),$();return}i&&(U(),$())}),$()}ee(),te(),document.body.getAttribute(`data-page`)===`haushalt`&&fe();