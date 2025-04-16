import React, { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { getPlayers } from "@/app/services/players";
import { getTeams } from "@/app/services/teams";
import Link from 'next/link'

import AdminLayoutHoc from "@/components/templates/AdminLayoutHoc";


const ListPlayer = () => {
  const router = useRouter();
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      let listTeams = await getTeams()
      if (listTeams?.success??false) {
        if (listTeams.data.length) {
          var result = {}
          for(let item of listTeams.data) {
            result[item.id] = item.name
          }
          setTeams(result)
        }
      }

      let listPlayers = await getPlayers()
      console.log({listPlayers})
      if (listPlayers?.success??false) {
        if (listPlayers.data.length) setPlayers(listPlayers.data)
      }
    }
    fetchPosts()
  }, [])
  console.log({teams})
  
	return (
		<AdminLayoutHoc contentTitle={'Player'} contentTitleButton={<i className="fa fa-2x fa-home" />} url={"/"}>
			<div className="row">
				<div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">My Players</h3>
            </div>
            <div className="card-header d-flex justify-content-end">
              <button onClick={() => router.push('/dashboard/player/create')} className="btn btn-success btn-block btn-sm" style={{width: '100px'}}>Create</button>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{width: "10px"}}>#</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Offense</th>
                    <th>Defence</th>
                    <th>Physical</th>
                    <th>Mentality</th>
                    <th style={{width: "40px"}}>Overall</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    players.map((item, index) => (
                      <tr key={'player-list-'+index}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.position}</td>
                        <td>{teams[item.team_id]}</td>
                        <td>
                          <div className="progress progress-xs">
                            <div className="progress-bar bg-danger" style={{width: "55%"}}></div>
                          </div>
                        </td>
                        <td>
                          <div className="progress progress-xs">
                            <div className="progress-bar" style={{width: "55%"}}></div>
                          </div>
                        </td>
                        <td>
                          <div className="progress progress-xs">
                            <div className="progress-bar bg-danger" style={{width: "55%"}}></div>
                          </div>
                        </td>
                        <td>
                          <div className="progress progress-xs">
                            <div className="progress-bar" style={{width: "55%"}}></div>
                          </div>
                        </td>
                        <td><span className="badge bg-danger">55%</span></td>
                        <td>
                          {/* <button type="button" className="btn btn-primary btn-block btn-sm"><i className="fa fa-edit"></i> Edit</button> */}
                          <Link className="btn btn-primary btn-block btn-sm" href={'/dashboard/player/'+item.id}><i className="fa fa-edit"></i> Edit</Link>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className="card-footer clearfix">
              <ul className="pagination pagination-sm m-0 float-right">
                <li className="page-item"><a className="page-link" href="#">«</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">»</a></li>
              </ul>
            </div>
          </div>
				</div>
			</div>
		</AdminLayoutHoc>
  )
}

export default ListPlayer