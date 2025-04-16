import React, { useEffect, useState } from "react"
import AdminLayoutHoc from "@/components/templates/AdminLayoutHoc";
import { useRouter } from "next/router";
import { getTeams } from "@/app/services/teams";
import Link from 'next/link'
import { Row,Col } from "react-bootstrap";


const ListTeam = () => {
  const router = useRouter();
  const [teams, setTeams] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      let listTeams = await getTeams()
      console.log({listTeams})
      if (listTeams?.success??false) {
        if (listTeams.data.length) setTeams(listTeams.data)
      }
    }
    fetchPosts()
  }, [])

	return (
		<AdminLayoutHoc contentTitle={'Team'} contentTitleButton={<i className="fa fa-2x fa-home" />} url={"/"}>
			<div className="row">
				<div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">My Teams</h3>
            </div>
            <div className="card-header d-flex justify-content-end">
              <button onClick={() => router.push('/dashboard/team/create')} className="btn btn-success btn-block btn-sm" style={{width: '100px'}}>Create</button>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{width: "10px"}}>#</th>
                    <th>Name</th>
                    <th>Head Office</th>
                    <th>Total Match</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    teams.map((item, index) => (
                      <tr key={'team-list-'+index}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.city}</td>
                        <td>
                          <Row>
                            <Col>
                              {item.total_match}
                            </Col>
                            <Col>
                              <Link className="btn btn-warning btn-block btn-sm" href={'/dashboard/match/create?team_id='+item.id}><i className="fa fa-edit"></i> Add Match</Link>
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <Link className="btn btn-primary btn-block btn-sm" href={'/dashboard/team/'+item.id}><i className="fa fa-edit"></i> Edit</Link>
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

export default ListTeam