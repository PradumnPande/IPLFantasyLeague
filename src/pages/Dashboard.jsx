import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function Dashboard() {
  const [data, setData] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:8080/api/users/dashboard').then((resp) => {
      setData(resp.data)
    })
  }, [])
  return (
    <>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <h4 className='text-left p-2 border-bottom border-success'>
              Admin Dashboard
            </h4>
            <div className='row'>
              <div className='col-sm-3'>
                <div
                  className='card shadow bg-primary text-white text-right'
                  onClick={(e) => navigate('/tournaments')}
                >
                  <div className='card-body'>
                    <h4>Tournaments</h4>
                    <h5>{data.tournaments}</h5>
                  </div>
                </div>
              </div>

              <div className='col-sm-3'>
                <div
                  className='card shadow bg-success text-white text-right'
                  onClick={(e) => navigate('/teams')}
                >
                  <div className='card-body'>
                    <h4>Teams</h4>
                    <h5>{data.teams}</h5>
                  </div>
                </div>
              </div>

              <div className='col-sm-3'>
                <div
                  className='card shadow bg-danger text-white text-right'
                  onClick={(e) => navigate('/matches')}
                >
                  <div className='card-body'>
                    <h4>Matches</h4>
                    <h5>{data.matches}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
