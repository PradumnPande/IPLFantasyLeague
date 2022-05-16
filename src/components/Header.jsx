import Navbar from './Navbar'

function Header() {
  const uname = sessionStorage.getItem('uname')
  return (
    <>
      <Navbar />
    </>
  )
}

export default Header
