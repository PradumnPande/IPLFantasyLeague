import axios from 'axios'
import { parse } from 'date-fns'
import { format } from 'date-fns/esm'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header'

function Tournaments() {
  const [Tournaments, setTournaments] = useState([])
  const [tname, settname] = useState()
  const [location, setlocation] = useState()
  const [startdate, setStartdate] = useState()
  const [enddate, setEnddate] = useState()
  const loadData = () => {
    axios.get('http://localhost:8080/api/tournaments').then((resp) => {
      setTournaments(resp.data)
      console.log(Tournaments)
    })
  }

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8080/api/tournaments/' + id)
      .then((resp) => {
        toast.success(resp.data)
        loadData()
      })
      .catch((err) => {
        toast.error(err.response.data)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8080/api/tournaments', {
        tname: tname,
        location: location,
        startDate: startdate,
        endDate: enddate,
      })
      .then((resp) => {
        toast.success(resp.data)
        settname('')
        loadData()
      })
      .catch((err) => {
        toast.error('Error saving test')
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
              <div className='col-sm-8'>
                <h4 className='text-left p-2 border-bottom border-success'>
                  All Tournaments
                </h4>
                <table className='table table-bordered table-light table-sm table-hover'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Tournament Name</th>
                      <th>Location</th>
                      <th>No of Teams</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Tournaments.map((x) => (
                      <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.tname}</td>
                        <td>{x.location}</td>
                        <td>{x.noOfTeams}</td>
                        <td>
                          {format(
                            parse(x.startDate, 'yyyy-MM-dd', new Date()),
                            'dd-MMM-yyyy'
                          )}{' '}
                          -
                          {format(
                            parse(x.endDate, 'yyyy-MM-dd', new Date()),
                            'dd-MMM-yyyy'
                          )}
                        </td>
                        <td>
                          <button
                            onClick={(e) => handleDelete(x.id)}
                            className='btn btn-danger btn-sm mr-2'
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='col-sm-4'>
                <h4 className='text-left p-2 border-bottom border-success'>
                  Add Tournament
                </h4>
                <div className='form-group'>
                  <label>Name</label>
                  <input
                    type='text'
                    value={tname}
                    className='form-control form-control-sm'
                    onChange={(e) => settname(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Location</label>
                  <input
                    type='text'
                    value={location}
                    className='form-control form-control-sm'
                    onChange={(e) => setlocation(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Start Date</label>
                  <input
                    type='date'
                    value={startdate}
                    className='form-control form-control-sm'
                    onChange={(e) => setStartdate(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>End Date</label>
                  <input
                    type='date'
                    value={enddate}
                    className='form-control form-control-sm'
                    onChange={(e) => setEnddate(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className='btn btn-primary float-right'
                >
                  Save Tournament
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tournaments
