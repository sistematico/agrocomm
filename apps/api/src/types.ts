export interface Cities {
  id: number
  name: string
}

export interface State {
  name: string
  abbr: string
}

export interface Commodity {
  commodity: 'boi' | 'vaca' | 'soja' | 'milho' | 'machos' | 'femeas'
}

export interface Quote {
  price: number
  state: string
  city?: string
  commodity: string
  createdAt: string
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