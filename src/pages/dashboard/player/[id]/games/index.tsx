import { useRouter } from 'next/router'
import React, {useState, useEffect} from "react"
import AdminLayoutHoc from "@/components/templates/AdminLayoutHoc";
import { Radar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import SkillItem from '@/components/molecules/SkillItem';
import dataSkill from "@/data/dummySkill.json";
import dataGame from "@/data/dummyGame.json";
import { title } from 'process';
import { getPlayerById } from '@/app/services/players';
import Link from 'next/link'
import { getGameStats, getGameStatsWithParams } from '@/app/services/gameStats';

 
export default function Games() {
  const [detail, setDetail] = useState({name:'',email:'',dob:'',position:'', game_stats: []})
  const router = useRouter()
  const playerId = router.query.id;
  const playerName = detail.name

  Chart.register(CategoryScale);
  const dataRadar1 = {
    labels: ['pass', 'speed', '3pts', '2pts', 'strength'],
    datasets: [
      {
        label: '',
        data: [80, 60, 60, 70, 89],
        borderColor: '#ccc',
        backgroundColor: "#f00",
        fill: false,
      },
    ]
  }

  const getDetail = async() => {
    let data = await getPlayerById(playerId)
    if (data.success) {
      let game_stats = data.data.game_stats;
      game_stats = game_stats.map(item => {
        let matchSelected = data.data.matches.filter(match => match.id == item.match_id);
        item.match =  matchSelected[0]??'';
        return item;
      });
      let newDetail = {
        name: data.data.name,
        email: data.data.email,
        dob: data.data.dob,
        position: data.data.position,
        game_stats,
      }
      setDetail(detail => ({...detail, ...newDetail}))
    }

  }

  const _getGameStats = async() => {
    let params = {player_id: playerId}
    let data = await getGameStatsWithParams(params)
    console.log({data})
  }


  useEffect(() => {
    if (playerId != undefined) {
      getDetail();
      _getGameStats();
    }
  }, [playerId])
  
  return <AdminLayoutHoc contentTitle={playerName} contentTitleButton={<i className="fa fa-2x fa-home" />} url={"/"}>
			<div className="row">
				<div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">OVERALL</h3>
            </div>
            <div className="card-body">
                <Radar data={dataRadar1} />
            </div>
          </div>
				</div>
				<div className="col-md-8">

        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <h3 className="card-title">Average Game Stats</h3>
            </div>
          </div>
          <div className="card-body">
            {
              dataGame.map(item => (
                <SkillItem title={item.title} value={item.value} />
              ))
            }
          </div>
        </div>

        <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">

                <h3 className="card-title">List Games Stats</h3>
                <span>
                <Link className="btn btn-primary btn-block btn-sm" href={'/dashboard/player/'+playerId+'/games/create'}>
                  <i className='fa fa-2x fa-plus-circle' />
                </Link>
                </span>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{width: "10px"}}>#</th>
                    <th>Opponent</th>
                    <th>Offense</th>
                    <th>Defence</th>
                    <th>Turnover</th>
                    <th style={{width: "40px"}}>Overall</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                   {
                      detail.game_stats.map((item, index) => (
                        <tr key={'player-game-stats-'+index}>
                          <td>{index+1}</td>
                          <td>{item?.match?.opponent??''}</td>
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
                              <div className="progress-bar" style={{width: "55%"}}></div>
                            </div>
                          </td>
                          <td><span className="badge bg-danger">55%</span></td>
                          <td>
                            <Link href={'/dashboard/player/'+playerId+'/games/'+item?.match?.id??''} className="btn btn-primary btn-block btn-sm">
                              <i className="fa fa-edit"></i> Edit
                            </Link>
                          </td>
                        </tr>
                    ))}
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