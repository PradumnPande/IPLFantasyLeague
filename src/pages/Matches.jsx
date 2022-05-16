import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Header from '../components/Header'

function Matches() {
  const [Matches, setMatches] = useState([])
  const [teams, setteams] = useState([])
  const [teamOne, setteamOne] = useState()
  const [teamTwo, setteamTwo] = useState()
  const loadData = () => {
    axios.get('http://localhost:8080/api/matches').then((resp) => {
      setMatches(resp.data)
    })
    axios.get('http://localhost:8080/api/teams').then((resp) => {
      setteams(resp.data)
    })
  }

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8080/api/matches/' + id)
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
    if (teamOne == undefined || teamTwo == undefined) {
      toast.error('Please fill all required details')
      return
    }
    axios
      .post('http://localhost:8080/api/matches', {
        team1: teamOne,
        team2: teamTwo,
      })
      .then((resp) => {
        toast.success(resp.data)
        setteamOne('')
        setteamTwo('')
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
                  All Matches
                </h4>
                <table className='table table-bordered table-light table-sm table-hover'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Team One</th>
                      <th>Team Two</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Matches.map((x) => (
                      <tr key={x.id}>
                        <td>{x.matchId}</td>
                        <td>{x.teamOne.tname}</td>
                        <td>{x.teamTwo.tname}</td>
                        <td>
                          <button
                            onClick={(e) => handleDelete(x.matchId)}
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
                  Add Match
                </h4>
                <div className='form-group'>
                  <label>Team One</label>
                  <select
                    value={teamOne}
                    className='form-control form-control-sm'
                    onChange={(e) => setteamOne(e.target.value)}
                  >
                    <option value=''>Select Team</option>
                    {teams.map((x) => (
                      <option value={x?.teamId}>{x?.tname}</option>
                    ))}
                  </select>
                </div>
                <div className='form-group'>
                  <label>Team Two</label>
                  <select
                    value={teamTwo}
                    className='form-control form-control-sm'
                    onChange={(e) => setteamTwo(e.target.value)}
                  >
                    <option value=''>Select Team</option>
                    {teams.map((x) => (
                      <option value={x?.teamId}>{x?.tname}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleSubmit}
                  className='btn btn-primary float-right'
                >
                  Save Match
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Matches
