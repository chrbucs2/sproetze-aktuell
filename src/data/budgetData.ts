export type Metric = {
  new: number
  previous: number
  delta: number
}

export type FlowSet = {
  revenue: Metric
  expense: Metric
  balance: Metric
}

export type LiquiditySet = {
  cashChange: Metric
  commitments: Metric
}

export type DepartmentRow = {
  code: string
  label: string
  result: FlowSet
  admin: FlowSet
  investment: FlowSet
  financing: FlowSet
  liquidity: LiquiditySet
  spotlight?: string
}

export type DebtRow = {
  label: string
  y2025: number
  y2026: number
  y2027: number
}

export type AppropriationRow = {
  account: string
  label: string
  amount: number
}

export const sourceInfo = {
  title: '1. Nachtragshaushaltsplan 2026 der Stadt Buchholz in der Nordheide',
  pdfPath: 'documents/buchholz-nachtragshaushalt-2026.pdf',
  officialPage:
    'https://www.buchholz.de/portal/seiten/der-haushalt-der-stadt-903000713-20101.html',
  decisionDate: '09.02.2026',
  sponsor: 'Wählergruppe Sprötze',
  pagesUsed: [3, 4, 8, 10, 11, 12, 13, 15, 16],
} as const

export const budgetSnapshot = {
  ordinary: {
    revenue: 111_037_000,
    expense: 113_407_400,
    balance: -2_370_400,
  },
  extraordinary: {
    revenue: 980_000,
    expense: 1_045_000,
    balance: -65_000,
  },
  totalFinance: {
    incoming: 121_684_400,
    outgoing: 123_485_600,
    cashChange: -1_801_200,
  },
  creditAuthorization: {
    previous: 13_049_100,
    new: 12_773_100,
    delta: -276_000,
  },
  commitmentsTotal: 20_577_600,
  liquidityCreditLimit: 15_000_000,
} as const

export const taxRates = [
  { label: 'Grundsteuer A', value: '425 v. H.' },
  { label: 'Grundsteuer B', value: '425 v. H.' },
  { label: 'Gewerbesteuer', value: '410 v. H.' },
] as const

export const budgetFlows = [
  {
    label: 'Laufende Verwaltung',
    incoming: { new: 107_328_800, previous: 98_022_800, delta: 9_306_000 },
    outgoing: { new: 106_204_400, previous: 98_908_400, delta: 7_296_000 },
  },
  {
    label: 'Investitionen',
    incoming: { new: 1_582_500, previous: 1_402_500, delta: 180_000 },
    outgoing: { new: 14_355_600, previous: 14_451_600, delta: -96_000 },
  },
  {
    label: 'Finanzierung',
    incoming: { new: 12_773_100, previous: 13_049_100, delta: -276_000 },
    outgoing: { new: 2_925_600, previous: 3_340_100, delta: -414_500 },
  },
] as const

export const departmentRows: DepartmentRow[] = [
  {
    code: '0001',
    label: 'Verwaltungsführung und Presse- u. Öffentlichkeitsarbeit',
    result: {
      revenue: { new: 400, previous: 400, delta: 0 },
      expense: { new: 1_106_500, previous: 1_106_500, delta: 0 },
      balance: { new: -1_106_100, previous: -1_106_100, delta: 0 },
    },
    admin: {
      revenue: { new: 400, previous: 400, delta: 0 },
      expense: { new: 1_106_500, previous: 1_106_500, delta: 0 },
      balance: { new: -1_106_100, previous: -1_106_100, delta: 0 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -1_106_100, previous: -1_106_100, delta: 0 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '0002',
    label: 'Klimaschutzmanagement',
    result: {
      revenue: { new: 57_500, previous: 57_500, delta: 0 },
      expense: { new: 477_800, previous: 506_800, delta: -29_000 },
      balance: { new: -420_300, previous: -449_300, delta: 29_000 },
    },
    admin: {
      revenue: { new: 57_500, previous: 57_500, delta: 0 },
      expense: { new: 386_700, previous: 415_700, delta: -29_000 },
      balance: { new: -329_200, previous: -358_200, delta: 29_000 },
    },
    investment: {
      revenue: { new: 14_600, previous: 14_600, delta: 0 },
      expense: { new: 79_000, previous: 119_000, delta: -40_000 },
      balance: { new: -64_400, previous: -104_400, delta: 40_000 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -393_600, previous: -462_600, delta: 69_000 },
      commitments: { new: 85_000, previous: 85_000, delta: 0 },
    },
    spotlight:
      'Hier verbessert sich die Liquiditätswirkung um 69 Tsd. Euro, weil sowohl laufende als auch investive Auszahlungen geringer angesetzt sind.',
  },
  {
    code: '0003',
    label: 'Gleichstellungsbeauftragte',
    result: {
      revenue: { new: 22_500, previous: 22_500, delta: 0 },
      expense: { new: 63_700, previous: 63_700, delta: 0 },
      balance: { new: -41_200, previous: -41_200, delta: 0 },
    },
    admin: {
      revenue: { new: 22_500, previous: 22_500, delta: 0 },
      expense: { new: 63_700, previous: 63_700, delta: 0 },
      balance: { new: -41_200, previous: -41_200, delta: 0 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -41_200, previous: -41_200, delta: 0 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '0005',
    label: 'Ortschaft Holm-Seppensen',
    result: {
      revenue: { new: 82_100, previous: 82_100, delta: 0 },
      expense: { new: 62_600, previous: 62_600, delta: 0 },
      balance: { new: 19_500, previous: 19_500, delta: 0 },
    },
    admin: {
      revenue: { new: 82_100, previous: 82_100, delta: 0 },
      expense: { new: 60_100, previous: 60_100, delta: 0 },
      balance: { new: 22_000, previous: 22_000, delta: 0 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 19_500, previous: 19_500, delta: 0 },
      balance: { new: -19_500, previous: -19_500, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: 2_500, previous: 2_500, delta: 0 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '0006',
    label: 'Ortschaft Steinbeck',
    result: {
      revenue: { new: 74_500, previous: 74_500, delta: 0 },
      expense: { new: 64_500, previous: 64_500, delta: 0 },
      balance: { new: 10_000, previous: 10_000, delta: 0 },
    },
    admin: {
      revenue: { new: 74_500, previous: 74_500, delta: 0 },
      expense: { new: 59_500, previous: 59_500, delta: 0 },
      balance: { new: 15_000, previous: 15_000, delta: 0 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 10_000, previous: 10_000, delta: 0 },
      balance: { new: -10_000, previous: -10_000, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: 5_000, previous: 5_000, delta: 0 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '0007',
    label: 'Ortschaft Sprötze',
    result: {
      revenue: { new: 38_100, previous: 38_100, delta: 0 },
      expense: { new: 27_300, previous: 27_300, delta: 0 },
      balance: { new: 10_800, previous: 10_800, delta: 0 },
    },
    admin: {
      revenue: { new: 38_100, previous: 38_100, delta: 0 },
      expense: { new: 26_200, previous: 26_200, delta: 0 },
      balance: { new: 11_900, previous: 11_900, delta: 0 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 10_800, previous: 10_800, delta: 0 },
      balance: { new: -10_800, previous: -10_800, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: 1_100, previous: 1_100, delta: 0 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
    spotlight:
      'Sprötze steht im ordentlichen Ergebnis mit +10,8 Tsd. Euro im Plan. Zusätzlich taucht im Gesamtpaket der Verpflichtungsermächtigungen ein Projekt für die GS Sprötze mit 3,0 Mio. Euro auf.',
  },
  {
    code: '0008',
    label: 'Ortschaft Trelde',
    result: {
      revenue: { new: 27_200, previous: 27_200, delta: 0 },
      expense: { new: 25_200, previous: 25_200, delta: 0 },
      balance: { new: 2_000, previous: 2_000, delta: 0 },
    },
    admin: {
      revenue: { new: 27_200, previous: 27_200, delta: 0 },
      expense: { new: 24_700, previous: 24_700, delta: 0 },
      balance: { new: 2_500, previous: 2_500, delta: 0 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 2_000, previous: 2_000, delta: 0 },
      balance: { new: -2_000, previous: -2_000, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: 500, previous: 500, delta: 0 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '0009',
    label: 'Ortschaft Dibbersen',
    result: {
      revenue: { new: 22_200, previous: 22_200, delta: 0 },
      expense: { new: 15_600, previous: 15_600, delta: 0 },
      balance: { new: 6_600, previous: 6_600, delta: 0 },
    },
    admin: {
      revenue: { new: 22_200, previous: 22_200, delta: 0 },
      expense: { new: 14_500, previous: 14_500, delta: 0 },
      balance: { new: 7_700, previous: 7_700, delta: 0 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 6_600, previous: 6_600, delta: 0 },
      balance: { new: -6_600, previous: -6_600, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: 1_100, previous: 1_100, delta: 0 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '1001',
    label: 'Personalmanagement',
    result: {
      revenue: { new: 581_900, previous: 581_900, delta: 0 },
      expense: { new: 2_695_500, previous: 2_701_500, delta: -6_000 },
      balance: { new: -2_113_600, previous: -2_119_600, delta: 6_000 },
    },
    admin: {
      revenue: { new: 62_400, previous: 62_400, delta: 0 },
      expense: { new: 2_265_600, previous: 2_271_600, delta: -6_000 },
      balance: { new: -2_203_200, previous: -2_209_200, delta: 6_000 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -2_203_200, previous: -2_209_200, delta: 6_000 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '1002',
    label: 'Organisationsentwicklung und zentrale Dienste',
    result: {
      revenue: { new: 11_000, previous: 11_000, delta: 0 },
      expense: { new: 3_832_800, previous: 3_867_800, delta: -35_000 },
      balance: { new: -3_821_800, previous: -3_856_800, delta: 35_000 },
    },
    admin: {
      revenue: { new: 10_500, previous: 10_500, delta: 0 },
      expense: { new: 3_568_300, previous: 3_603_300, delta: -35_000 },
      balance: { new: -3_557_800, previous: -3_592_800, delta: 35_000 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 80_000, previous: 80_000, delta: 0 },
      balance: { new: -80_000, previous: -80_000, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -3_637_800, previous: -3_672_800, delta: 35_000 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '1003',
    label: 'Finanzmanagement und Liegenschaften',
    result: {
      revenue: { new: 80_930_300, previous: 78_774_300, delta: 2_156_000 },
      expense: { new: 44_395_700, previous: 36_224_900, delta: 8_170_800 },
      balance: { new: 36_534_600, previous: 42_549_400, delta: -6_014_800 },
    },
    admin: {
      revenue: { new: 80_007_500, previous: 77_851_500, delta: 2_156_000 },
      expense: { new: 44_035_200, previous: 35_864_400, delta: 8_170_800 },
      balance: { new: 35_972_300, previous: 41_987_100, delta: -6_014_800 },
    },
    investment: {
      revenue: { new: 930_000, previous: 750_000, delta: 180_000 },
      expense: { new: 935_000, previous: 990_000, delta: -55_000 },
      balance: { new: -5_000, previous: -240_000, delta: 235_000 },
    },
    financing: {
      revenue: { new: 12_773_100, previous: 13_049_100, delta: -276_000 },
      expense: { new: 2_925_600, previous: 3_340_100, delta: -414_500 },
      balance: { new: 9_847_500, previous: 9_709_000, delta: 138_500 },
    },
    liquidity: {
      cashChange: { new: 45_814_800, previous: 51_456_100, delta: -5_641_300 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
    spotlight:
      'Hier laufen Steuerkraft, Liegenschaften und Finanzierung zusammen. Der Bereich bleibt mit Abstand größter positiver Ergebnisbeitrag, verliert aber gegenüber dem bisherigen Ansatz rund 6,0 Mio. Euro.',
  },
  {
    code: '1004',
    label: 'Stadtkasse',
    result: {
      revenue: { new: 131_700, previous: 131_700, delta: 0 },
      expense: { new: 490_900, previous: 496_900, delta: -6_000 },
      balance: { new: -359_200, previous: -365_200, delta: 6_000 },
    },
    admin: {
      revenue: { new: 131_700, previous: 131_700, delta: 0 },
      expense: { new: 490_900, previous: 496_900, delta: -6_000 },
      balance: { new: -359_200, previous: -365_200, delta: 6_000 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -359_200, previous: -365_200, delta: 6_000 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '2001',
    label: 'Soziales, Begegnung und Kultur',
    result: {
      revenue: { new: 569_800, previous: 569_800, delta: 0 },
      expense: { new: 2_887_300, previous: 2_831_600, delta: 55_700 },
      balance: { new: -2_317_500, previous: -2_261_800, delta: -55_700 },
    },
    admin: {
      revenue: { new: 563_800, previous: 563_800, delta: 0 },
      expense: { new: 2_641_300, previous: 2_585_600, delta: 55_700 },
      balance: { new: -2_077_500, previous: -2_021_800, delta: -55_700 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 14_400, previous: 15_400, delta: -1_000 },
      balance: { new: -14_400, previous: -15_400, delta: 1_000 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -2_091_900, previous: -2_037_200, delta: -54_700 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '2002',
    label: 'Kinder, Jugend und Sport',
    result: {
      revenue: { new: 15_479_500, previous: 8_479_500, delta: 7_000_000 },
      expense: { new: 26_534_100, previous: 27_085_100, delta: -551_000 },
      balance: { new: -11_054_600, previous: -18_605_600, delta: 7_551_000 },
    },
    admin: {
      revenue: { new: 14_842_800, previous: 7_842_800, delta: 7_000_000 },
      expense: { new: 24_707_300, previous: 25_258_300, delta: -551_000 },
      balance: { new: -9_864_500, previous: -17_415_500, delta: 7_551_000 },
    },
    investment: {
      revenue: { new: 131_900, previous: 131_900, delta: 0 },
      expense: { new: 5_961_700, previous: 5_961_700, delta: 0 },
      balance: { new: -5_829_800, previous: -5_829_800, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -15_694_300, previous: -23_245_300, delta: 7_551_000 },
      commitments: { new: 10_400_000, previous: 10_400_000, delta: 0 },
    },
    spotlight:
      'Der größte Sprung im Haushalt: +7,0 Mio. Euro zusätzliche Einzahlungen verbessern das Ergebnis um 7,551 Mio. Euro. Gleichzeitig sind hier auch die höchsten Verpflichtungsermächtigungen verortet.',
  },
  {
    code: '2090',
    label: 'Germuth-Scheer-Stiftung',
    result: {
      revenue: { new: 51_500, previous: 51_500, delta: 0 },
      expense: { new: 52_200, previous: 52_200, delta: 0 },
      balance: { new: -700, previous: -700, delta: 0 },
    },
    admin: {
      revenue: { new: 30_800, previous: 30_800, delta: 0 },
      expense: { new: 40_700, previous: 40_700, delta: 0 },
      balance: { new: -9_900, previous: -9_900, delta: 0 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -9_900, previous: -9_900, delta: 0 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '3001',
    label: 'Bürgerservice, Ordnung und Gewerbe',
    result: {
      revenue: { new: 589_600, previous: 548_600, delta: 41_000 },
      expense: { new: 2_876_700, previous: 2_921_200, delta: -44_500 },
      balance: { new: -2_287_100, previous: -2_372_600, delta: 85_500 },
    },
    admin: {
      revenue: { new: 565_100, previous: 524_100, delta: 41_000 },
      expense: { new: 2_568_400, previous: 2_612_900, delta: -44_500 },
      balance: { new: -2_003_300, previous: -2_088_800, delta: 85_500 },
    },
    investment: {
      revenue: { new: 42_000, previous: 42_000, delta: 0 },
      expense: { new: 1_315_300, previous: 1_315_300, delta: 0 },
      balance: { new: -1_273_300, previous: -1_273_300, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -3_276_600, previous: -3_362_100, delta: 85_500 },
      commitments: { new: 821_600, previous: 821_600, delta: 0 },
    },
  },
  {
    code: '3002',
    label: 'Standesamt',
    result: {
      revenue: { new: 112_500, previous: 112_500, delta: 0 },
      expense: { new: 351_900, previous: 353_400, delta: -1_500 },
      balance: { new: -239_400, previous: -240_900, delta: 1_500 },
    },
    admin: {
      revenue: { new: 112_500, previous: 112_500, delta: 0 },
      expense: { new: 351_800, previous: 353_300, delta: -1_500 },
      balance: { new: -239_300, previous: -240_800, delta: 1_500 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -239_300, previous: -240_800, delta: 1_500 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '3003',
    label: 'Verkehrsbehörde',
    result: {
      revenue: { new: 1_945_800, previous: 1_912_800, delta: 33_000 },
      expense: { new: 1_263_600, previous: 1_273_600, delta: -10_000 },
      balance: { new: 682_200, previous: 639_200, delta: 43_000 },
    },
    admin: {
      revenue: { new: 1_842_400, previous: 1_809_400, delta: 33_000 },
      expense: { new: 1_150_400, previous: 1_160_400, delta: -10_000 },
      balance: { new: 692_000, previous: 649_000, delta: 43_000 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 415_000, previous: 415_000, delta: 0 },
      balance: { new: -415_000, previous: -415_000, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: 277_000, previous: 234_000, delta: 43_000 },
      commitments: { new: 200_000, previous: 200_000, delta: 0 },
    },
  },
  {
    code: '4001',
    label: 'Bauaufsicht',
    result: {
      revenue: { new: 506_500, previous: 506_500, delta: 0 },
      expense: { new: 979_800, previous: 994_800, delta: -15_000 },
      balance: { new: -473_300, previous: -488_300, delta: 15_000 },
    },
    admin: {
      revenue: { new: 506_600, previous: 506_600, delta: 0 },
      expense: { new: 1_003_700, previous: 1_028_700, delta: -25_000 },
      balance: { new: -497_100, previous: -522_100, delta: 25_000 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -497_100, previous: -522_100, delta: 25_000 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '4002',
    label: 'Stadt- und Grünplanung, Umwelt und Klima',
    result: {
      revenue: { new: 80_000, previous: 80_000, delta: 0 },
      expense: { new: 963_900, previous: 1_001_900, delta: -38_000 },
      balance: { new: -883_900, previous: -921_900, delta: 38_000 },
    },
    admin: {
      revenue: { new: 45_200, previous: 45_200, delta: 0 },
      expense: { new: 946_300, previous: 984_300, delta: -38_000 },
      balance: { new: -901_100, previous: -939_100, delta: 38_000 },
    },
    investment: {
      revenue: { new: 40_000, previous: 40_000, delta: 0 },
      expense: { new: 60_000, previous: 60_000, delta: 0 },
      balance: { new: -20_000, previous: -20_000, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -921_100, previous: -959_100, delta: 38_000 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '4003',
    label: 'Tiefbau und Bauverwaltung',
    result: {
      revenue: { new: 6_996_400, previous: 6_986_400, delta: 10_000 },
      expense: { new: 10_144_900, previous: 10_116_400, delta: 28_500 },
      balance: { new: -3_148_500, previous: -3_130_000, delta: -18_500 },
    },
    admin: {
      revenue: { new: 5_626_500, previous: 5_616_500, delta: 10_000 },
      expense: { new: 6_920_300, previous: 6_881_800, delta: 38_500 },
      balance: { new: -1_293_800, previous: -1_265_300, delta: -28_500 },
    },
    investment: {
      revenue: { new: 374_000, previous: 374_000, delta: 0 },
      expense: { new: 4_766_300, previous: 4_766_300, delta: 0 },
      balance: { new: -4_392_300, previous: -4_392_300, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -5_686_100, previous: -5_657_600, delta: -28_500 },
      commitments: { new: 9_071_000, previous: 9_071_000, delta: 0 },
    },
    spotlight:
      'Ein Schwerpunktbereich bei investiven Maßnahmen: 9,071 Mio. Euro Verpflichtungsermächtigungen liegen hier, etwa für Tiefbauprogramme und Bahnhofsumfeld.',
  },
  {
    code: '4004',
    label: 'Hochbau',
    result: {
      revenue: { new: 2_258_600, previous: 2_258_600, delta: 0 },
      expense: { new: 7_585_700, previous: 7_585_700, delta: 0 },
      balance: { new: -5_327_100, previous: -5_327_100, delta: 0 },
    },
    admin: {
      revenue: { new: 2_258_600, previous: 2_258_600, delta: 0 },
      expense: { new: 7_418_500, previous: 7_418_500, delta: 0 },
      balance: { new: -5_159_900, previous: -5_159_900, delta: 0 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 15_000, previous: 15_000, delta: 0 },
      balance: { new: -15_000, previous: -15_000, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -5_174_900, previous: -5_174_900, delta: 0 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '5001',
    label: 'Controlling und Betriebsführung',
    result: {
      revenue: { new: 63_100, previous: 3_100, delta: 60_000 },
      expense: { new: 1_317_700, previous: 1_337_700, delta: -20_000 },
      balance: { new: -1_254_600, previous: -1_334_600, delta: 80_000 },
    },
    admin: {
      revenue: { new: 63_100, previous: 3_100, delta: 60_000 },
      expense: { new: 1_294_600, previous: 1_314_600, delta: -20_000 },
      balance: { new: -1_231_500, previous: -1_311_500, delta: 80_000 },
    },
    investment: {
      revenue: { new: 50_000, previous: 50_000, delta: 0 },
      expense: { new: 290_000, previous: 290_000, delta: 0 },
      balance: { new: -240_000, previous: -240_000, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -1_471_500, previous: -1_551_500, delta: 80_000 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '5002',
    label: 'Grün- u. Stadtbildpflege, Friedhofswesen',
    result: {
      revenue: { new: 369_300, previous: 363_300, delta: 6_000 },
      expense: { new: 2_771_000, previous: 2_924_000, delta: -153_000 },
      balance: { new: -2_401_700, previous: -2_560_700, delta: 159_000 },
    },
    admin: {
      revenue: { new: 299_800, previous: 293_800, delta: 6_000 },
      expense: { new: 2_666_100, previous: 2_819_100, delta: -153_000 },
      balance: { new: -2_366_300, previous: -2_525_300, delta: 159_000 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 375_000, previous: 375_000, delta: 0 },
      balance: { new: -375_000, previous: -375_000, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -2_741_300, previous: -2_900_300, delta: 159_000 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
  {
    code: '5003',
    label: 'Technische Unterhaltung',
    result: {
      revenue: { new: 35_000, previous: 35_000, delta: 0 },
      expense: { new: 2_393_100, previous: 2_443_100, delta: -50_000 },
      balance: { new: -2_358_100, previous: -2_408_100, delta: 50_000 },
    },
    admin: {
      revenue: { new: 35_000, previous: 35_000, delta: 0 },
      expense: { new: 2_393_100, previous: 2_443_100, delta: -50_000 },
      balance: { new: -2_358_100, previous: -2_408_100, delta: 50_000 },
    },
    investment: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    financing: {
      revenue: { new: 0, previous: 0, delta: 0 },
      expense: { new: 0, previous: 0, delta: 0 },
      balance: { new: 0, previous: 0, delta: 0 },
    },
    liquidity: {
      cashChange: { new: -2_358_100, previous: -2_408_100, delta: 50_000 },
      commitments: { new: 0, previous: 0, delta: 0 },
    },
  },
]

export const departmentTotals = {
  result: {
    revenue: { new: 111_037_000, previous: 101_731_000, delta: 9_306_000 },
    expense: { new: 113_380_000, previous: 106_084_000, delta: 7_296_000 },
    balance: { new: -2_343_000, previous: -4_353_000, delta: 2_010_000 },
  },
  admin: {
    revenue: { new: 107_328_800, previous: 98_022_800, delta: 9_306_000 },
    expense: { new: 106_204_400, previous: 98_908_400, delta: 7_296_000 },
    balance: { new: 1_124_400, previous: -885_600, delta: 2_010_000 },
  },
  investment: {
    revenue: { new: 1_582_500, previous: 1_402_500, delta: 180_000 },
    expense: { new: 14_355_600, previous: 14_451_600, delta: -96_000 },
    balance: { new: -12_773_100, previous: -13_049_100, delta: 276_000 },
  },
  financing: {
    revenue: { new: 12_773_100, previous: 13_049_100, delta: -276_000 },
    expense: { new: 2_925_600, previous: 3_340_100, delta: -414_500 },
    balance: { new: 9_847_500, previous: 9_709_000, delta: 138_500 },
  },
  liquidity: {
    cashChange: { new: -1_801_200, previous: -4_225_700, delta: 2_424_500 },
    commitments: { new: 20_577_600, previous: 20_577_600, delta: 0 },
  },
} as const

export const appropriationRows: AppropriationRow[] = [
  { account: '122005.782119', label: 'Auszahlungen für Verkehrslenkungsanlagen – Lichtsignalanlagen', amount: 200_000 },
  { account: '126050.787100', label: 'Hochbaumaßnahmen FW Holm-Seppensen', amount: 800_000 },
  { account: '126080.783115', label: 'Erwerb von BGA – FFW Trelde', amount: 21_600 },
  { account: '211030.787101', label: 'Hochbaumaßnahme – Neubau Wiesenschule', amount: 500_000 },
  { account: '211070.787100', label: 'Hochbaumaßnahmen – GS Sprötze', amount: 3_000_000 },
  { account: '365001.782108', label: 'Gebäude und Aufbauten bei sozialen Einrichtungen', amount: 6_900_000 },
  { account: '538101.787200', label: 'Tiefbaumaßnahmen – Neu- und Ausbau SWK Mehrjahresprogramm', amount: 2_340_000 },
  { account: '538102.787200', label: 'Tiefbaumaßnahmen – Neu- und Ausbau RWK Mehrjahresprogramm', amount: 840_000 },
  { account: '541001.787200', label: 'Tiefbaumaßnahmen – Gemeindestraßen Mehrjahresprogramm', amount: 735_000 },
  { account: '541001.787223', label: 'Tiefbaumaßnahmen – Veloroute Bahnhofsumfeld', amount: 435_400 },
  { account: '541001.787224', label: 'Tiefbaumaßnahmen – Südtangente', amount: 2_430_000 },
  { account: '541001.787225', label: 'Tiefbaumaßnahmen – Mobilitätsstation Bahnhofsumfeld', amount: 626_800 },
  { account: '541001.787226', label: 'Tiefbaumaßnahmen – ZOB', amount: 1_663_800 },
  { account: '561002.781800', label: 'Investitionszuschüsse Förderprogramm Stadtklima Buchholz', amount: 60_000 },
  { account: '561002.787300', label: 'Umsetzung Klimaaktionsplan und Klimafolgenanpassung – investiv', amount: 25_000 },
]

export const debtRows: DebtRow[] = [
  { label: 'Kredite für Investitionstätigkeit', y2025: 30_144, y2026: 27_301, y2027: 48_869 },
  { label: 'Kreditähnliche Rechtsgeschäfte', y2025: 576, y2026: 384, y2027: 192 },
  { label: 'Lieferungen und Leistungen', y2025: 1_892, y2026: 2_032, y2027: 1_900 },
  { label: 'Transferverbindlichkeiten', y2025: 90, y2026: 81, y2027: 80 },
  { label: 'Sonstige Verbindlichkeiten', y2025: 1_220, y2026: 1_245, y2027: 1_200 },
  { label: 'Schulden insgesamt', y2025: 33_920, y2026: 31_043, y2027: 52_241 },
]

export const contentBacklog = [
  {
    title: 'Leben in Sprötze',
    text: 'Künftig können hier Vereine, Initiativen, Treffpunkte und wiederkehrende Angebote für den Ortsteil gebündelt werden.',
  },
  {
    title: 'Projekte & Beteiligung',
    text: 'Ein Bereich für laufende Vorhaben, Ortsrats-Themen, Beteiligungsformate und nachvollziehbare Projektstände.',
  },
  {
    title: 'Termine & Hinweise',
    text: 'Später lassen sich Sitzungen, Veranstaltungen, Baustellen-Infos und Service-Hinweise zentral veröffentlichen.',
  },
] as const

