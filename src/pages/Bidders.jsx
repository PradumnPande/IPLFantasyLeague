import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../components/Header'

function Bidders() {
  const [bidders, setbidders] = useState([])
  const loadData = () => {
    axios.get('http://localhost:8080/api/bidders').then((resp) => {
      setbidders(resp.data)
    })
  }

  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-12'>
                <h4 className='text-left p-2 border-bottom border-success'>
                  All Bidders
                </h4>
                <table className='table table-bordered table-light table-sm table-hover'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email Id</th>
                      <th>User Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bidders.map((x) => (
                      <tr key={x.bidderId}>
                        <td>{x.bidderId}</td>
                        <td>{x.name}</td>
                        <td>{x.phone}</td>
                        <td>{x.email}</td>
                        <td>{x.userName}</td>
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

export default Bidders
