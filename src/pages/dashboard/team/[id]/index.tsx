import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react"
import AdminLayoutHoc from "@/components/templates/AdminLayoutHoc";
import { Radar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import SkillItem from '@/components/molecules/SkillItem';
import dataSkill from "@/data/dummySkill.json";
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { error } from 'console';
import { getTeamById, updateTeam } from '@/app/services/teams';

// Schema for yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
  .required("*Name is required"),
  city: Yup.string()
  .required("*city is required"),
});

export default function UpdateTeam() {
  const [formData, setFormData] = useState({name:'',city:''})
  const router = useRouter()
  const teamId = router.query.id;
  const teamName = "Team"

  const _handleSubmit = async(data:any) => {
    const result = await updateTeam(teamId, data);
    if (result?.success) router.push('/dashboard/team')
  }

  const getDetail = async() => {
    let data = await getTeamById(teamId)
    if (data.success) {
      let newData = {
        name: data.data.name,
        city: data.data.city
      }
      setFormData(formData => ({...formData, ...newData}))
    }
  }

  useEffect(() => {
    if (teamId != undefined) getDetail();
  }, [teamId])

  
  return <AdminLayoutHoc contentTitle={teamName} contentTitleButton={<i className="fa fa-2x fa-home" />} url={"/"}>
			<div className="row">
				<div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h3 className="card-title">Edit Teams {router.query.id}</h3>
                <span>
                  <i className='fa fa-1x fa-edit text-primary' />
                </span>
              </div>
            </div>
            <div className="card-body">
              <Formik
                initialValues={formData}
                enableReinitialize={true}
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