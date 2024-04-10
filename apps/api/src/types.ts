export interface Cities {
  id: number
  name: string
}

export interface States {
  name: string
  abbr: string
}

export interface Quote {
  date: string
  price: number
  state?: string
  city?: string
  commodityId: number
}

interface ProviderDetails {
  id: number
  url: string
  tag: string
  datetag?: string
}

export interface ProviderInfo {
  boi: ProviderDetails
  vaca: ProviderDetails
  soja?: ProviderDetails
  milho?: ProviderDetails
}

export type QuoteType = keyof ProviderInfo