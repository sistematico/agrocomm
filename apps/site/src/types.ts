export interface Estado {
  id:       number
  name:     string
  acronym:  string
  icon:     string
}

export interface TableData {
  [key: string]: string | number | Date // unknown
}
