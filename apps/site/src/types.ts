export interface Estado {
  id:    number;
  nome:  string;
  uf: string;
  icone: string;
}

export interface TableData {
  [key: string]: string | number | Date; // unknown
}
