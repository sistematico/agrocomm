import geoIp from 'geoip-lite'

export function geo(ip: string) {
  return geoIp.lookup(ip)
}