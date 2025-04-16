import { useRouter } from 'next/router'
// import { useSearchParams } from 'next/navigation'
import React, {useState, useEffect} from "react"
import AdminLayoutHoc from "@/components/templates/AdminLayoutHoc";
import { Radar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import SkillItem from '@/components/molecules/SkillItem';
import dataSkill from "@/data/dummySkill.json";
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getPlayerById } from '@/app/services/players';
import { updateSkill } from '@/app/services/skills';
import { createGameStats } from '@/app/services/gameStats';
import { error } from 'console';
import { getTeamMatchesByParams, getTeamMatches } from '@/app/services/team-matches';


const validationSchema = Yup.object().shape({
  two_point: Yup.number()
  .integer()
  .min(0)
  .required("*2 pt is required"),
  three_point: Yup.number()
  .integer()
  .min(0)
  .required("*3 pt is required"),
  free_throw: Yup.number()
  .integer()
  .min(0)
  .required("*free throw is required"),
  assist: Yup.number()
  .integer()
  .min(0)
  .required("*assist is required"),
  offensive_rebound: Yup.number()
  .integer()
  .min(0)
  .required("*Off rebound is required"),
  defensive_rebound: Yup.number()
  .integer()
  .min(0)
  .required("*Dev rebound is required"),
  steal: Yup.number()
  .integer()
  .min(0)
  .required("*Cooperative is required"),
  block: Yup.number()
  .integer()
  .min(0)
  .required("*block is required"),
  turn_over: Yup.number()
  .integer()
  .min(0)
  .required("*turn_over is required"),
  match_id: Yup.number()
  .integer()
  .required("*Match ID is required")
  // notes: Yup.string()
  // .min(2, "*Names must have at least 2 characters")
  // .max(255, "*Notes must be less than 100 characters")
  // .required("*Notes is required"),
});

let formData = {
  two_point: 0,
  three_point: 0,
  free_throw: 0,
  assist: 0,
  offensive_rebound: 0,
  defensive_rebound: 0,
  steal: 0,
  block: 0,
  turn_over: 0,
  match_id: 0,
  // notes: ""
}
 
export default function Skills() {
  const [detail, setDetail] = useState({name:'',email:'',dob:'',position:'',matches:[], game_stats: []})
  const router = useRouter()
  const playerId = router.query.id;
  const playerName = detail.name

  // const gameId = searchParams.get('gameId')

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

  const _handleSubmit = async(data:any) => {
    let newData = {...data, ...{
      player_id: parseInt(playerId),
      team_id: parseInt(detail.team_id),
    }}

    const result = await createGameStats(newData);
    console.log({result})
    if (result?.success) router.push('/dashboard/player/'+playerId+'/games')
  }

  const getDetail = async() => {
    let data = await getPlayerById(playerId)
    if (data.success) {
      let newDetail = {
        name: data.data.name,
        email: data.data.email,
        dob: data.data.dob,
        position: data.data.position,
        team_id: data.data.team_id,
        matches: data.data.matches,
        game_stats: data.data.game_stats,
        listMatchId: []
      }
      if (newDetail.game_stats.length) {
        newDetail.listMatchId = newDetail.game_stats.map(item => item.match_id);
        newDetail.matches = newDetail.matches.filter(item => newDetail.listMatchId.includes(item.id) == false)
      }
      console.log({newDetail})
      setDetail(detail => ({...detail, ...newDetail}))
    }

  }

  useEffect(() => {
    if (playerId != undefined) getDetail();
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
                <h3 className="card-title">Create Games Stats</h3>
                <span>
                  <i className='fa fa-1x fa-edit text-primary' />
                </span>
              </div>
            </div>
            <div className="card-body">
              <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={(values) => {_handleSubmit(values)}}
              >
                { ({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    {
                      Object.entries(formData).map(([key, value]) => (
                        <>
                          {
                            key == 'match_id' ? (
                             <div className='mb-3'>
                                <Form.Label>{key}</Form.Label>
                                <Form.Control 
                                  aria-label="Default select example" 
                                  as={"select"}
                                  name={key}
                                  value={values[key]}
                                  className={touched[key] && errors[key] ? "is-invalid":""}
                                  onChange={(e)=> {setFieldValue(key, e.target.value)}}
                                  onBlur={handleBlur}
                                >
                                  <option value="0">--Select Opponent--</option>
                                  {
                                    detail.matches.map((item, index) => (
                                      <option key={'select-Opponent-'+index} value={item.id}>{item.opponent}</option>
                                    ))
                                  }
                                </Form.Control>
                                {!touched[key] && !errors[key] ? null: (
                                  <div className="invalid-feedback">{errors[key]}</div>
                                )}
                              </div>
                            ): (
                              <div className='mb-3'>
                                <Form.Label>{key}</Form.Label>
                                <Form.Control 
                                  type='number'
                                  name={key}
                                  placeholder={'input '+key}
                                  value={values[key]}
                                  className={touched[key] && errors[key] ? "is-invalid":""}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {!touched[key] && !errors[key] ? null: (
                                  <div className="invalid-feedback">{errors[key]}</div>
                                )}
                              </div>
                            )
                          }
                        </>
                      ))
                    }
                    <br />
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </Form>
                ) }
              </Formik>
            </div>
          </div>
        </div>
			</div>
		</AdminLayoutHoc>
}