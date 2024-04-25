export function useCurrency(numero: string | number): string {
  const numeroStr = String(numero)
  return 'R$ ' + numeroStr.slice(0, -2) + ',' + numeroStr.slice(-2)
}