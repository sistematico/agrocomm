export async function useFetch(url: string) {
  // const headers = new Headers({
  //   "Accept"       : "application/json",
  //   "Content-Type" : "application/json",
  // })

  // const data = await (await fetch(url, { method: 'GET', headers })).json()
  const data = await (await fetch(url)).json()
  return data
}