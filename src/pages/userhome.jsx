import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Header from '../components/Header'

function UserHome() {
  const cid = sessionStorage.getItem('id')
  const [userinfo, setuserinfo] = useState()
  const [data, setdata] = useState([])
  const [teams, setteams] = useState([])
  //load all information regarding bidders,teams and user
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/bidders/' + cid)
      .then((resp) => setuserinfo(resp.data))
      .catch((err) => console.log(err))
    axios
      .get('http://localhost:8080/api/bidders/leaders')
      .then((resp) => setdata(resp.data))
      .catch((err) => toast.error('error'))
    axios
      .get('http://localhost:8080/api/teams/points')
      .then((resp) => setteams(resp.data))
      .catch((err) => toast.error('error'))
  }, [])
  return (
    <>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className='col-sm-5 p-1'>
            <div className='card shadow'>
              <div className='card-header p-2'>
                <h5>User Profile</h5>
              </div>
              <div className='card-body p-2'>
                <table className='table table-borderless table-sm'>
                  <tbody>
                    <tr>
                      <th>User Name</th>
                      <th>{userinfo?.name}</th>
                    </tr>
                    <tr>
                      <th>Phone no</th>
                      <th>{userinfo?.phone}</th>
                    </tr>
                    <tr>
                      <th>User Id</th>
                      <th>{userinfo?.userName}</th>
                    </tr>
                    <tr>
                      <th>Email Address</th>
                      <th>{userinfo?.email}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='card shadow'>
              <div className='card-header p-2'>
                <h5>Team Leader Board</h5>
              </div>
              <div className='card-body p-2'>
                <table className='table table-bordered table-sm'>
                  <thead className='text-center'>
                    <tr>
                      <th>Team name</th>
                      <th>Played</th>
                      <th>Win</th>
                      <th>Lost</th>
                      <th>Draw</th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    {teams.map((x) => (
                      <tr key={x.id}>
                        <td className='text-left'>{x.team.tname}</td>
                        <td>{x.matchPlayed}</td>
                        <td>{x.matchWon}</td>
                        <td>{x.matchLost}</td>
                        <td>{x.matchDraw}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='col-sm-5 p-1'>
            <div className='card shadow'>
              <div className='card-header p-2'>
                <h5>Bidder Leader Board</h5>
              </div>
              <div className='card-body p-2'>
                <table className='table table-bordered table-sm'>
                  <thead>
                    <tr>
                      <th>Bidder Name</th>
                      <th>Bids Participated</th>
                      <th>Bids Won</th>
                      <th>Bids Lost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((x) => (
                      <tr key={x.id}>
                        <td>{x.bidder.name}</td>
                        <td>{x.bidsPaticipated}</td>
                        <td>{x.bidsWon}</td>
                        <td>{x.bidsLost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserHome
