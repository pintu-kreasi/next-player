import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
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
import { getGameStatById } from '@/app/services/gameStats';
import { getPlayerById } from '@/app/services/players';
import { updateGameStats } from '@/app/services/gameStats';

 
export default function EditGameStats() {
  const router = useRouter()
  const playerId = router.query.id;
  const gameStatsId = router.query.gameStatsId;
  const [opponent, setOpponent] = useState('');
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    two_point: 0,
    three_point: 0,
    free_throw: 0,
    assist: 0,
    offensive_rebound: 0,
    defensive_rebound: 0,
    steal: 0,
    block: 0,
    turn_over: 0,
  })
  const [detail, setDetail] = useState({name:'',email:'',dob:'',position:'',matches:[], game_stats: []})
  

  const gameId = searchParams.get('gameId')
  let modeText = "Create"
  if (gameId != null) {
    modeText = "Edit"
  }
  let validationSchema = Yup.object().shape({
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
  });

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
    let data = await getGameStatById(gameStatsId)
    if (data.success) {
      let newData = {
        two_point: data?.data?.two_point??0,
        three_point: data?.data?.three_point??0,
        free_throw: data?.data?.free_throw??0,
        assist: data?.data?.assist??0,
        offensive_rebound: data?.data?.offensive_rebound??0,
        defensive_rebound: data?.data?.defensive_rebound??0,
        steal: data?.data?.steal??0,
        block: data?.data?.block??0,
        turn_over: data?.data?.turn_over??0
      }
      setFormData(formData => ({...formData, ...newData}))
    }
    let dataPlayer = await getPlayerById(playerId)
    if (dataPlayer.success) {
      let newDetail = {
        name: dataPlayer.data.name,
        email: dataPlayer.data.email,
        dob: dataPlayer.data.dob,
        position: dataPlayer.data.position,
        team_id: dataPlayer.data.team_id,
        matches: dataPlayer.data.matches,
        game_stats: dataPlayer.data.game_stats,
        listMatchId: []
      }
      let _opponent = newDetail.matches.find(item => item.id == gameStatsId).opponent;
      setOpponent(_opponent)
      setDetail(detail => ({...detail, ...newDetail}))
    }
  }

  const _handleSubmit = async(data:any) => {
    const result = await updateGameStats(gameStatsId, data);
    if (result?.success) router.push('/dashboard/player/'+playerId+'/games')
  }

  useEffect(() => {
    if (playerId != undefined) getDetail();
  }, [playerId])

  
  return <AdminLayoutHoc contentTitle={detail.name +' VS '+opponent} contentTitleButton={<i className="fa fa-2x fa-home" />} url={"/"}>
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
                <h3 className="card-title">Edit Games Stats</h3>
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
                  isSubmitting
                }) => (
                  <Form onSubmit={handleSubmit}>
                    {
                      Object.entries(formData).map(([key, value]) => (
                        <>
                          {
                            key == 'match_id' ? (
                              <div className='mb-3'>
                                {/* <Form.Label>{key}</Form.Label>
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
                                )} */}
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