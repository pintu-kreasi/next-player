import { useRouter } from 'next/router'
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
import { error } from 'console';
import { createPlayer } from '@/app/services/players';
import { getTeams } from '@/app/services/teams';
import ListTeam from '../../team';

// Schema for yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
  .required("*Name is required"),
  email: Yup.string()
  .required("*email is required"),
  dob: Yup.date()
  .required("*date of birth is required"),
  position: Yup.string()
  .required("*Speed is required"),
  team_id: Yup.number()
  .required("*Team ID is required")
});

const formData = {
  name: "",
  email: "",
  dob: 0,
  position: "",
  team_id: '0',
  // notes: ""
}

export default function CreatePlayer() {
  const [teams, setTeams] = useState([])
  const router = useRouter()
  const playerId = router.query.id;
  const playerName = "Create Player"

  const _handleSubmit = async(data:any) => {
    const result = await createPlayer(data);
    console.log({result})
    if (result?.success) router.push('/dashboard/player')
  }

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

  return <AdminLayoutHoc contentTitle={playerName} contentTitleButton={<i className="fa fa-2x fa-home" />} url={"/"}>
			<div className="row">
				<div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h3 className="card-title">Create Player Info</h3>
                <span>
                  <i className='fa fa-1x fa-edit text-primary' />
                </span>
              </div>
            </div>
            <div className="card-body">
              <Formik
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
                            key == 'team_id' ? (
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
                                  <option value="0">--Select Team--</option>
                                  {
                                  teams.map((item, index) => (
                                    <option key={'select-team-'+index} value={item.id}>{item.name}</option>
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
                                  type='text'
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