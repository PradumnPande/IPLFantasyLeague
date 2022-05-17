import axios from 'axios'
import { parse } from 'date-fns'
import { format } from 'date-fns/esm'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function CreateBid() {
  const [Matches, setMatches] = useState([])
  const [opinion, setopinion] = useState()
  const [match, setmatch] = useState()
  const userid = sessionStorage.getItem('id')
  const navigate = useNavigate()

  //common method to load data
  const loadData = () => {
    axios.get('http://localhost:8080/api/matches').then((resp) => {
      setMatches(resp.data)
    })
  }

  //store match info to access
  const handleBid = (id) => {
    axios
      .get('http://localhost:8080/api/matches/' + id)
      .then((resp) => {
        setmatch(resp.data)
      })
      .catch((err) => {
        toast.error(err.response.data)
      })
  }
  //store load data to database
  const handleSubmit = (e) => {
    e.preventDefault()
    if (opinion == undefined || match == undefined) {
      toast.error('Please fill all required details')
      return
    }
    axios
      .post('http://localhost:8080/api/bidders/bids', {
        bidderid: userid,
        matchid: match?.matchId,
        opinion: opinion,
      })
      .then((resp) => {
        toast.success(resp.data)
        navigate('/biddings')
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
                      <th>Match</th>
                      <th>Stadium</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Matches.filter((x) => x?.stadium != null).map((x) => (
                      <tr key={x.matchId}>
                        <td>{x.matchId}</td>
                        <td>
                          {x.teamOne.tname} vs {x.teamTwo.tname}
                        </td>
                        <td>{x?.stadium}</td>
                        <td>
                          {x.date != null
                            ? format(
                                parse(x?.date, 'yyyy-MM-dd', new Date()),
                                'dd-MMM-yyyy'
                              )
                            : null}
                        </td>
                        <td>{x?.status}</td>
                        <td>
                          {!x.tossDone ? (
                            <button
                              onClick={(e) => handleBid(x.matchId)}
                              className='btn btn-success btn-sm mr-2'
                            >
                              Bid Now
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='col-sm-4'>
                <h4 className='text-left p-2 border-bottom border-success'>
                  Create Bid
                </h4>
                <div className='form-group'>
                  <label>Match</label>
                  <input
                    readOnly={true}
                    type='text'
                    value={
                      match
                        ? match?.teamOne?.tname + ' vs ' + match?.teamTwo?.tname
                        : null
                    }
                    className='form-control form-control-sm'
                  />
                </div>
                <div className='form-group'>
                  <label>Your Opinion</label>
                  <select
                    value={opinion}
                    className='form-control form-control-sm'
                    onChange={(e) => setopinion(e.target.value)}
                  >
                    <option value=''>Select Opinion</option>
                    <option>{match?.teamOne?.tname} Win</option>
                    <option>{match?.teamTwo?.tname} Win</option>
                    <option>Match Draw</option>
                  </select>
                </div>
                <button
                  onClick={handleSubmit}
                  className='btn btn-primary float-right'
                >
                  Bid Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateBid
