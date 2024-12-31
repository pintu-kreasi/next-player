import { useRouter } from 'next/router'
import React from "react"
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
import { createTeam, getTeams } from '@/app/services/teams';

// Schema for yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
  .required("*Name is required"),
  city: Yup.string()
  .required("*city is required"),
});

const formData = {
  name: '',
  city: '',
}
 
export default function CreateTeam() {
  const router = useRouter()
  const teamId = router.query.id;
  const teamName = "Team"

  const _handleSubmit = (data:any) => {
    console.log('handle submit')
    // createTeam(data);
  }
  
  return <AdminLayoutHoc contentTitle={teamName} contentTitleButton={<i className="fa fa-2x fa-home" />} url={"/"}>
			<div className="row">
				<div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h3 className="card-title">Edit Teams</h3>
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