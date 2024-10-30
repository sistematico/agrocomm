export interface Quote {
  id: number
  price: number
  commodity: string
  state: string
  city: string
  createdAt: string
}

export interface State {
  name: string
  abbr: string
}