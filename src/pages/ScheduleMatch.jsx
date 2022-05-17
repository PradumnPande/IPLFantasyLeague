import axios from 'axios'
import { parse } from 'date-fns'
import { format } from 'date-fns/esm'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Header from '../components/Header'

function ScheduleMatch() {
  const [Matches, setMatches] = useState([])
  const [match, setmatch] = useState()
  const [stadium, setstadium] = useState()
  const [date, setdate] = useState()
  const [time, settime] = useState()
  //load matches data from  server
  const loadData = () => {
    axios.get('http://localhost:8080/api/matches').then((resp) => {
      setMatches(resp.data)
    })
  }
  //save the match to server
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      match == undefined ||
      stadium == undefined ||
      date == undefined ||
      time == undefined
    ) {
      toast.error('Please fill all required details')
      return
    }
    axios
      .put('http://localhost:8080/api/matches/' + match, {
        stadium: stadium,
        date: date,
        time: time,
      })
      .then((resp) => {
        toast.success(resp.data)
        setmatch('')
        setstadium('')
        setdate('')
        settime('')
        loadData()
      })
      .catch((err) => {
        toast.error('Error updating match')
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
                      <th>Match</th>
                      <th>Stadium</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Matches.map((x) => (
                      <tr key={x.id}>
                        <td>{x.matchId}</td>
                        <td>{x.teamOne.tname + ' vs ' + x.teamTwo.tname}</td>
                        <td>{x?.stadium}</td>
                        <td>
                          {x.date != null
                            ? format(
                                parse(x?.date, 'yyyy-MM-dd', new Date()),
                                'dd-MMM-yyyy'
                              )
                            : null}
                        </td>
                        <td>{x?.time}</td>
                        <td>{x?.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='col-sm-4'>
                <h4 className='text-left p-2 border-bottom border-success'>
                  Schedule/Reschedule Match
                </h4>
                <div className='form-group'>
                  <label>Select Match</label>
                  <select
                    value={match}
                    className='form-control form-control-sm'
                    onChange={(e) => setmatch(e.target.value)}
                  >
                    <option value=''>Select Match</option>
                    {Matches.map((x) => (
                      <option value={x?.matchId}>
                        {x?.teamOne?.tname} vs {x?.teamTwo?.tname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='form-group'>
                  <label>Stadium</label>
                  <input
                    type='text'
                    value={stadium}
                    className='form-control form-control-sm'
                    onChange={(e) => setstadium(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Start Date</label>
                  <input
                    type='date'
                    value={date}
                    className='form-control form-control-sm'
                    onChange={(e) => setdate(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>End Time</label>
                  <input
                    type='time'
                    value={time}
                    className='form-control form-control-sm'
                    onChange={(e) => settime(e.target.value)}
                  />
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

export default ScheduleMatch