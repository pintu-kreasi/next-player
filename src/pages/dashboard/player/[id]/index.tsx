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
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getPlayerById, updatePlayer } from '@/app/services/players';
import { getSkillByPlayerId } from '@/app/services/skills';
import Link from 'next/link'


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
});

// const initFormData = {
//   name: "",
//   email: "",
//   dob: 0,
//   position: "",
// }
 
export default function EditPlayer() {
  const [formData, setFormData] = useState({name:'',email:'',dob:'',position:''})
  const [skillData, setSkillData] = useState([])
  const router = useRouter()
  const playerId = router.query.id;
  const playerName = formData.name

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
    const result = await updatePlayer(playerId, data);
    if (result?.success) router.push('/dashboard/player')
  }

  const getDetail = async() => {
    let data = await getPlayerById(playerId)
    if (data.success) {
      let newData = {
        name: data.data.name,
        email: data.data.email,
        dob: data.data.dob,
        position: data.data.position,
      }
      setFormData(formData => ({...formData, ...newData}))
    }

    let _skillData = await getSkillByPlayerId(playerId)
    if (_skillData.success) {
      let newSkillData = [];
      for (const property in _skillData.data) {
        newSkillData.push({title: property, value: _skillData.data[property]})
      }
      setSkillData(newSkillData)
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
                <h3 className="card-title">Info</h3>
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

          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h3 className="card-title">Skill Stats</h3>
                <span>
                  <Link className="btn btn-primary btn-block btn-sm" href={'/dashboard/player/'+playerId+'/skills'}><i className="fa fa-edit"></i> 
                  </Link>
                </span>
              </div>
            </div>
            <div className="card-body">
              {
                skillData.length && skillData.map(item => (
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
                  <Link className="btn btn-primary btn-block btn-sm" href={'/dashboard/player/'+playerId+'/games'}><i className="fa fa-edit"></i>
                  </Link>
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