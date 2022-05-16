import axios from 'axios'
import { parse } from 'date-fns'
import { format } from 'date-fns/esm'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Header from '../components/Header'

function UpdateMatch() {
  const [Matches, setMatches] = useState([])
  const [match, setmatch] = useState()
  const [winner, setwinner] = useState()
  const [result, setresult] = useState()
  const [matchresult, setmatchresult] = useState()
  const [team1score, setteam1score] = useState()
  const [team2score, setteam2score] = useState()
  const loadData = () => {
    axios.get('http://localhost:8080/api/matches').then((resp) => {
      setMatches(resp.data)
    })
  }

  const handleComplete = (e) => {
    e.preventDefault()
    if (result == undefined) {
      toast.error('Please fill all required details')
      return
    }

    axios
      .post('http://localhost:8080/api/matches/update', {
        matchid: match?.matchId,
        matchComplete: true,
        matchwinnerid: winner,
        team1score: team1score,
        team2score: team2score,
        result: matchresult,
      })
      .then((resp) => {
        toast.success(resp.data)
        loadData()
      })
      .catch((err) => {
        toast.error('Error updating match')
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (result == undefined) {
      toast.error('Please fill all required details')
      return
    }
    axios
      .post('http://localhost:8080/api/matches/update', {
        matchid: match?.matchId,
        toss: true,
        tosswinnerid: result,
      })
      .then((resp) => {
        toast.success(resp.data)
        loadData()
      })
      .catch((err) => {
        toast.error('Error updating match')
      })
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    switch (result) {
      case '0':
        setmatchresult('Match Draw')
        setwinner(null)
        break
      case '1':
        setmatchresult(match?.teamOne.tname + ' Win')
        setwinner(match?.teamOne.teamId)
        break
      case '2':
        setmatchresult(match?.teamTwo.tname + ' Win')
        setwinner(match?.teamTwo.teamId)
        break
    }
  }, [result])
  return (
    <>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-12'>
                <h4 className='text-left p-2 border-bottom border-success'>
                  All Matches
                </h4>
                <table className='table table-bordered table-light table-sm table-hover'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Match</th>
                      <th>Date</th>
                      <th>Toss Winner</th>
                      <th>Match Winner</th>
                      <th>Score</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Matches.map((x) => (
                      <tr key={x.id}>
                        <td>{x.matchId}</td>
                        <td>{x.teamOne.tname + ' vs ' + x.teamTwo.tname}</td>
                        <td>
                          {x.date != null
                            ? format(
                                parse(x?.date, 'yyyy-MM-dd', new Date()),
                                'dd-MMM-yyyy'
                              )
                            : null}
                        </td>
                        <td>{x?.tossWinner?.tname}</td>
                        <td>{x?.winner?.tname}</td>
                        <td>
                          {x.teamOne.tname} : {x?.team1score}
                          <br />
                          {x.teamTwo.tname} : {x?.team2score}{' '}
                        </td>
                        <td>{x?.status}</td>
                        <td>
                          {!x.tossDone && x.date != null ? (
                            <button
                              onClick={(e) => setmatch(x)}
                              type='button'
                              className='btn btn-primary btn-sm mr-1'
                              data-toggle='modal'
                              data-target='#tossModal'
                            >
                              Toss Update
                            </button>
                          ) : null}
                          {x.tossDone && !x.matchComplete ? (
                            <button
                              onClick={(e) => setmatch(x)}
                              type='button'
                              className='btn btn-success btn-sm mr-1'
                              data-toggle='modal'
                              data-target='#resultModal'
                            >
                              Result Update
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className='modal fade'
                id='resultModal'
                tabIndex={-1}
                aria-labelledby='tossModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='tossModalLabel'>
                        Result Update -{' '}
                        {match?.teamOne?.tname + ' vs ' + match?.teamTwo?.tname}
                      </h5>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                        aria-label='Close'
                      >
                        <span aria-hidden='true'>×</span>
                      </button>
                    </div>
                    <div className='modal-body'>
                      <div className='form-group'>
                        <label>Team {match?.teamOne.tname} Score</label>
                        <input
                          type='text'
                          placeholder='Runs/Wickets'
                          onChange={(e) => setteam1score(e.target.value)}
                          className='form-control form-control-sm'
                        />
                      </div>
                      <div className='form-group'>
                        <label>Team {match?.teamTwo.tname} Score</label>
                        <input
                          type='text'
                          onChange={(e) => setteam2score(e.target.value)}
                          placeholder='Runs/Wickets'
                          className='form-control form-control-sm'
                        />
                      </div>
                      <div className='form-group'>
                        <label>Select Result</label>
                        <select
                          value={result}
                          className='form-control form-control-sm'
                          onChange={(e) => setresult(e.target.value)}
                        >
                          <option value=''>Select Result</option>
                          <option value={1}>{match?.teamOne?.tname} Win</option>
                          <option value={2}>{match?.teamTwo?.tname} Win</option>
                          <option value={0}>Match Draw</option>
                        </select>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        onClick={handleComplete}
                        className='btn btn-primary btn-sm'>
                        Save Result
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='modal fade'
                id='tossModal'
                tabIndex={-1}
                aria-labelledby='tossModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='tossModalLabel'>
                        Toss Update -{' '}
                        {match?.teamOne?.tname + ' vs ' + match?.teamTwo?.tname}
                      </h5>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                        aria-label='Close'>
                        <span aria-hidden='true'>×</span>
                      </button>
                    </div>
                    <div className='modal-body'>
                      <div className='form-group'>
                        <label>Select Result</label>
                        <select
                          value={result}
                          className='form-control form-control-sm'
                          onChange={(e) => setresult(e.target.value)}
                        >
                          <option value=''>Select Toss Winner</option>
                          <option value={match?.teamOne.teamId}>
                            {match?.teamOne?.tname}
                          </option>
                          <option value={match?.teamTwo.teamId}>
                            {match?.teamTwo?.tname}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        onClick={handleSubmit}
                        className='btn btn-primary btn-sm' >
                        Save changes
                      </button>
                    </div>
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

export default UpdateMatch
