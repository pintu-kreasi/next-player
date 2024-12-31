import React, { useEffect } from "react"
import AdminLayoutHoc from "@/components/templates/AdminLayoutHoc";
import { useRouter } from "next/router";

const ListTeam = () => {
  const router = useRouter();

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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Rhinos</td>
                    <td>Bogor</td>
                    <td>
                      <button type="button" className="btn btn-primary btn-block btn-sm"><i className="fa fa-edit"></i> Edit</button>
                    </td>
                  </tr>
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