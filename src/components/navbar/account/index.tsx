// import LoggedMenu from './logged'
// import UnLoggedMenu from './unlogged'

export default function Account() {
  return (
    <>
      <a
        href="/cotacoes"
        className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors duration-500 mr-2"
      >
        Cadastrar
      </a>
      <a
        href="/cotacoes"
        className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors duration-500"
      >
        Entrar
      </a>
    </>
  )
}
