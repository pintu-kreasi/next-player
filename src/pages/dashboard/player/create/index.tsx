import { useRouter } from 'next/router'
import React from "react"
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

// Schema for yup
const validationSchema = Yup.object().shape({
  dribbling: Yup.number()
  .integer()
  .min(1)
  .required("*Dribbling is required"),
  passing: Yup.number()
  .integer()
  .min(1)
  .required("*Passing is required"),
  shooting: Yup.number()
  .integer()
  .min(1)
  .required("*Shooting is required"),
  speed: Yup.number()
  .integer()
  .min(1)
  .required("*Speed is required"),
  durability: Yup.number()
  .integer()
  .min(1)
  .required("*Durability is required"),
  power: Yup.number()
  .integer()
  .min(1)
  .required("*Power is required"),
  cooperative: Yup.number()
  .integer()
  .min(1)
  .required("*Cooperative is required"),
  dicipline: Yup.number()
  .integer()
  .min(1)
  .required("*Dicipline is required"),
  effort: Yup.number()
  .integer()
  .min(1)
  .required("*Effort is required"),
  notes: Yup.string()
  .min(2, "*Names must have at least 2 characters")
  .max(255, "*Notes must be less than 100 characters")
  .required("*Notes is required"),
});

const formData = {
  dribbling: 0,
  passing: 0,
  shooting: 0,
  speed: 0,
  durability: 0,
  power: 0,
  cooperative: 0,
  dicipline: 0,
  effort: 0,
  // notes: ""
}
 
export default function CreatePlayer() {
  const router = useRouter()
  const playerId = router.query.id;
  const playerName = "Skills Budi"+playerId

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
                <h3 className="card-title">Edit Skill Stats</h3>
                <span>
                  <i className='fa fa-1x fa-edit text-primary' />
                </span>
              </div>
            </div>
            <div className="card-body">
              <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={() => {alert('onsubmit')}}
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