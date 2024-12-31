import React from "react"
import AdminLayoutHoc from "@/components/templates/AdminLayoutHoc";

export default class Index extends React.Component {
	render() {
		return <AdminLayoutHoc contentTitle={'Player'} contentTitleButton={<i className="fa fa-2x fa-home" />} url={"/"}>
			<div className="row">
				<div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">KU 14</h3>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{width: "10px"}}>#</th>
                    <th>Name</th>
                    <th>Offense</th>
                    <th>Defence</th>
                    <th>Physical</th>
                    <th>Mentality</th>
                    <th style={{width: "40px"}}>Overall</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Ruby</td>
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
                      <button type="button" className="btn btn-primary btn-block btn-sm"><i className="fa fa-edit"></i> Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>John</td>
                    <td>
                      <div className="progress progress-xs">
                        <div className="progress-bar bg-warning" style={{width: "70%"}}></div>
                      </div>
                    </td>
                    <td>
                      <div className="progress progress-xs">
                        <div className="progress-bar bg-danger" style={{width: "55%"}}></div>
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
                    <td><span className="badge bg-warning">70%</span></td>
                    <td>
                      <button type="button" className="btn btn-primary btn-block btn-sm"><i className="fa fa-edit"></i> Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>3.</td>
                    <td>Danu</td>
                    <td>
                      <div className="progress progress-xs progress-striped active">
                        <div className="progress-bar bg-primary" style={{width: "30%"}}></div>
                      </div>
                    </td>
                    <td>
                      <div className="progress progress-xs">
                        <div className="progress-bar bg-danger" style={{width: "55%"}}></div>
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
                    <td><span className="badge bg-primary">30%</span></td>
                    <td>
                      <button type="button" className="btn btn-primary btn-block btn-sm"><i className="fa fa-edit"></i> Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>4.</td>
                    <td>Supriadi</td>
                    <td>
                      <div className="progress progress-xs progress-striped active">
                        <div className="progress-bar bg-success" style={{width: "90%"}}></div>
                      </div>
                    </td>
                    <td>
                      <div className="progress progress-xs">
                        <div className="progress-bar bg-danger" style={{width: "55%"}}></div>
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
                    <td><span className="badge bg-success">90%</span></td>
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
	}
}