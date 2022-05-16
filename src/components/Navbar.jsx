import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
var classNames = require('classnames')

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const role = sessionStorage.getItem('role')
  const navclass = 'nav-item '
  console.log(location.pathname)
  //logout from the system
  const logout = () => {
    dispatch({ type: 'LogOut' })
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-danger'>
      <Link className='navbar-brand' to='#'>
        IPL Fantasy
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon' />
      </button>
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav'>
          {role === 'Admin' ? (
            <>
              <li
                className={classNames(navclass, {
                  active: location.pathname == '/dashboard',
                })}
              >
                <Link to='/dashboard' className='nav-link'>
                  Dashboard
                </Link>
              </li>
              <li
                className={classNames(navclass, {
                  active: location.pathname == '/tournaments',
                })}
              >
                <Link to='/tournaments' className='nav-link'>
                  Tournaments
                </Link>
              </li>
              <li
                className={classNames(navclass, {
                  active: location.pathname == '/teams',
                })}
              >
                <Link to='/teams' className='nav-link'>
                  Teams
                </Link>
              </li>
              <li
                className={classNames(navclass, {
                  active: location.pathname == '/matches',
                })}
              >
                <Link to='/matches' className='nav-link'>
                  Create Matches
                </Link>
              </li>
              <li
                className={classNames(navclass, {
                  active: location.pathname == '/schedule',
                })}
              >
                <Link to='/schedule' className='nav-link'>
                  Schedule Match
                </Link>
              </li>
              <li
                className={classNames(navclass, {
                  active: location.pathname == '/update',
                })}
              >
                <Link to='/update' className='nav-link'>
                  Update Match
                </Link>
              </li>
              <li
                className={classNames(navclass, {
                  active: location.pathname == '/bidders',
                })}
              >
                <Link to='/bidders' className='nav-link'>
                  Bidders
                </Link>
              </li>
              <li
                className={classNames(navclass, {
                  active: location.pathname == '/biddings',
                })}
              >
                <Link to='/biddings' className='nav-link'>
                  Biddings
                </Link>
              </li>
            </>
          ) : (
            <>
              <li
                className={classNames(navclass, {
                  active: location.pathname == '/profile',
                })}
              >
                <Link to='/profile' className='nav-link'>
                  Profile
                </Link>
              </li>
              <li
                className={classNames(navclass, {
                  active: location.pathname == '/createbid',
                })}
              >
                <Link to='/createbid' className='nav-link'>
                  Create Bidding
                </Link>
              </li>
              <li
                className={classNames(navclass, {
                  active: location.pathname == '/biddings',
                })}
              >
                <Link to='/biddings' className='nav-link'>
                  Biddings
                </Link>
              </li>
            </>
          )}
          <li className='nav-item' style={{ cursor: 'pointer' }}>
            <a onClick={() => logout()} className='nav-link btn-link'>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
