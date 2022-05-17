import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Header from '../components/Header'

function Teams() {
  const [Teams, setTeams] = useState([])
  const [tname, settname] = useState()
  const loadData = () => {
    axios.get('http://localhost:8080/api/teams').then((resp) => {
      setTeams(resp.data)
      console.log(Teams)
    })
  }

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8080/api/teams/' + id)
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
    console.log('team', tname)
    if (tname == '') {
      toast.error('Please provide team name')
      return
    }
    axios
      .post('http://localhost:8080/api/teams', {
        tname: tname,
      })
      .then((resp) => {
        toast.success(resp.data)
        settname('')
        loadData()
      })
      .catch((err) => {
        toast.error(err.response.data)
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
                  All Teams
                </h4>
                <table className='table table-bordered table-light table-sm table-hover'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Team Name</th>
                      <th>No of Players</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Teams.map((x) => (
                      <tr key={x.id}>
                        <td>{x.teamId}</td>
                        <td>{x.tname}</td>
                        <td>{x.noOfPlayers}</td>
                        <td>
                          <button
                            onClick={(e) => handleDelete(x.teamId)}
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
                  Add Team
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
                <button
                  onClick={handleSubmit}
                  className='btn btn-primary float-right'
                >
                  Save Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Teams
