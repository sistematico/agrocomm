import { reactive } from 'vue'

export const store = reactive({
  ip: '0.0.0.0',
  state: 'Brasil',
  setState(state: string) {
    localStorage.setItem('state', state)
    this.state = state
  },
  async setIp(ip: string) {
    localStorage.setItem('ip', ip)
    this.ip = ip
  }
})
