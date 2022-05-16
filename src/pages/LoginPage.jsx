import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [bidder, setbidder] = useState(null)
  const handleInput2 = (e) => {
    setbidder({ ...bidder, [e.target.name]: e.target.value })
  }

  const [user, setUser] = useState()
  const [userid, setuserid] = useState()
  const [pwd, setpwd] = useState()
  const [showadmin, setshowadmin] = useState(false)
  const [showbid, setshowbid] = useState(false)
  const [showreg, setshowreg] = useState(false)

  //store input field values for admin
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  //validate bidders login
  const handleSubmit2 = (e) => {
    e.preventDefault()
    if (userid == undefined || pwd == undefined) {
      toast.error('Please provide userid and password')
      return
    }
    axios
      .post('http://localhost:8080/api/bidders/validate', {
        userName: userid,
        password: pwd,
      })
      .then((resp) => {
        console.log(resp.data)
        sessionStorage.setItem('uname', resp.data.name)
        sessionStorage.setItem('role', 'User')
        sessionStorage.setItem('id', resp.data.bidderId)
        dispatch({ type: 'IsLoggedIn' })
        toast.success('Login successfull')
        navigate('/profile')
      })
      .catch((err) => {
        toast.error(err.response.data)
      })
  }

  //register bidder
  const handleSubmit3 = (e) => {
    e.preventDefault()
    console.log('Info => ', bidder)
    if (
      !bidder?.name ||
      !bidder?.password ||
      !bidder?.userName ||
      !bidder?.email ||
      !bidder?.phone
    ) {
      toast.error('Please provide full details')
      return
    }
    axios
      .post('http://localhost:8080/api/bidders', bidder)
      .then((resp) => {
        console.log(resp)
        setbidder(null)
        e.target.reset()
        toast.success('Bidder registered successfully')
        navigate('/')
      })
      .catch((error) => toast.error(error.response.data))
  }

  //create admin user
  const handleCreateAdmin = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8080/api/admin', {
        userName: user.userid,
        password: user.pwd,
      })
      .then((resp) => {
        toast.success('Admin registered successfull')
      })
      .catch((error) => {
        console.log('Error', error)
        toast.error('Unable to register admin')
      })
  }
  //login validation method
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8080/api/admin/validate', {
        userName: user.userid,
        password: user.pwd,
      })
      .then((resp) => {
        console.log(resp.data)
        sessionStorage.setItem('uname', 'Administrator')
        sessionStorage.setItem('role', 'Admin')
        dispatch({ type: 'IsLoggedIn' })
        toast.success('Login successfull')
        navigate('/dashboard')
      })
      .catch((error) => {
        console.log('Error', error)
        toast.error('Invalid username or password')
      })
  }

  return (
    <div className='login'>
      <div className='jumbotron p-4 text-white text-center border-bottom mb-0 bg-danger'>
        <h4>Welcome to IPL Fantasy League</h4>
      </div>
      <div className='container pt-4'>
        <div className='row'>
          <div className='col-sm-4 offset-1'>
            <div
              className='card text-center my-5'
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                setshowadmin(true)
                setshowbid(false)
                setshowreg(false)
              }}
            >
              <div className='card-body'>
                <h4>Admin Login</h4>
              </div>
            </div>
            <div
              className='card text-center my-5'
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                setshowadmin(false)
                setshowbid(true)
                setshowreg(false)
              }}
            >
              <div className='card-body'>
                <h4>User Login</h4>
              </div>
            </div>
            <div
              className='card text-center my-5'
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                setshowadmin(false)
                setshowbid(false)
                setshowreg(true)
              }}
            >
              <div className='card-body'>
                <h4>User Register</h4>
              </div>
            </div>
          </div>
          <div className='col-sm-6 offset-1'>
            {showadmin && (
              <form className='card shadow mt-5' onSubmit={handleSubmit}>
                <div className='card-header'>
                  <h5 className='text-center'>Admin Login</h5>
                </div>
                <div className='card-body'>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 col-form-label'>User Id</label>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        name='userid'
                        required
                        className='form-control'
                        placeholder='User Id'
                        value={user?.userid}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 col-form-label'>Password</label>
                    <div className='col-sm-8'>
                      <input
                        type='password'
                        required
                        className='form-control'
                        name='pwd'
                        placeholder='Password'
                        value={user?.pwd}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <button className='btn btn-primary float-right'>Login</button>
                  <button
                    onClick={handleCreateAdmin}
                    className='btn btn-danger float-right mr-2'
                  >
                    Create Admin
                  </button>
                </div>
              </form>
            )}
            {showbid && (
              <form className='card shadow mt-5' onSubmit={handleSubmit2}>
                <div className='card-header'>
                  <h5 className='text-center'>Bidder Login</h5>
                </div>
                <div className='card-body'>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 col-form-label'>User Id</label>
                    <div className='col-sm-8'>
                      <input
                        className='form-control'
                        placeholder='User Id'
                        value={userid}
                        onChange={(e) => setuserid(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 col-form-label'>Password</label>
                    <div className='col-sm-8'>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        value={pwd}
                        onChange={(e) => setpwd(e.target.value)}
                      />
                    </div>
                  </div>
                  <button className='btn btn-primary float-right'>Login</button>
                </div>
              </form>
            )}
            {showreg && (
              <form className='card shadow mt-5' onSubmit={handleSubmit3}>
                <div className='card-header'>
                  <h5 className='text-center'>Bidder Login</h5>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-sm-12 mx-auto'>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Bidder Name
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='name'
                            value={bidder?.name}
                            onChange={handleInput2}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Phone
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='phone'
                            maxLength={10}
                            value={bidder?.phone}
                            onChange={handleInput2}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Email Id
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='email'
                            name='email'
                            value={bidder?.email}
                            onChange={handleInput2}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          User Id
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='userName'
                            value={bidder?.userName}
                            onChange={handleInput2}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Password
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='password'
                            name='password'
                            value={bidder?.password}
                            onChange={handleInput2}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <button className='btn btn-primary btn-sm float-right'>
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
