import geo from 'geoip-lite'

export function geoIp(ip: string) {
  return geo.lookup(ip)
}