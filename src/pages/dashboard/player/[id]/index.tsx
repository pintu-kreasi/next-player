import { useRouter } from 'next/router'
import React from "react"
import AdminLayoutHoc from "@/components/templates/AdminLayoutHoc";
import { Radar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import SkillItem from '@/components/molecules/SkillItem';
import dataSkill from "@/data/dummySkill.json";
import dataGame from "@/data/dummyGame.json";
import { title } from 'process';
 
export default function EditPlayer() {
  const router = useRouter()
  const playerId = router.query.id;
  const playerName = "Budi"+playerId

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
                <h3 className="card-title">Skill Stats</h3>
                <span>
                  <i className='fa fa-1x fa-edit text-primary' />
                </span>
              </div>
            </div>
            <div className="card-body">
              {
                dataSkill.map(item => (
                  <SkillItem title={item.title} value={item.value} />
                ))
              }
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h3 className="card-title">Game Stats</h3>
                <span>
                  <i className='fa fa-1x fa-edit text-primary' />
                </span>
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
        </div>
			</div>
		</AdminLayoutHoc>
}