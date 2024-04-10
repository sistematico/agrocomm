// export function convertStringToDateUTC(dateString: string): Date {
//   // Usa uma expressão regular para encontrar a data no formato DD/MM/YYYY na string
//   const regex = /(\d{2})\/(\d{2})\/(\d{4})/;
//   const matches = dateString.match(regex);

//   if (!matches) {
//     throw new Error('Formato de data inválido.');
//   }

//   // Extrai dia, mês e ano da correspondência da expressão regular
//   const day = parseInt(matches[1], 10);
//   const month = parseInt(matches[2], 10) - 1; // Ajusta para base zero
//   const year = parseInt(matches[3], 10);

//   // Cria a data assumida como GMT-3
//   let date = new Date(Date.UTC(year, month, day));

//   // Ajusta a data para UTC adicionando 3 horas
//   date.setUTCHours(date.getUTCHours() + 3);

//   return date;
// }

function formatDateToDDMMYYYY(date: Date): string {
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Meses são 0-indexados
  const year = date.getUTCFullYear().toString();
  return `${day}/${month}/${year}`;
}

export function convertStringToFormattedDateString(dateString: string): string {
  // O mesmo processo para extrair e ajustar a data para UTC
  const regex = /(\d{2})\/(\d{2})\/(\d{4})/;
  const matches = dateString.match(regex);
  
  if (!matches) {
    throw new Error('Formato de data inválido.');
  }

  const day = parseInt(matches[1], 10);
  const month = parseInt(matches[2], 10) - 1;
  const year = parseInt(matches[3], 10);

  let date = new Date(Date.UTC(year, month, day));
  date.setUTCHours(date.getUTCHours() + 3);

  // Usa a função auxiliar para formatar a data
  return formatDateToDDMMYYYY(date);
}

export function stringToNumber(price: string): number {
  return parseInt(price.replace(',', ''), 10)
}