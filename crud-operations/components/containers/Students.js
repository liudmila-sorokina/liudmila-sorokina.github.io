import React, { useEffect, useState } from "react";
import InformSearch from "../InformSearch";
import StudentsItem from "../StudentsItem";
import axios, { isCancel, AxiosError } from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";

import { ADD_STUDENTS } from '../../actions/constants'

const config = {
  method: 'get',
  url: 'https://users-e87a.restdb.io/rest/students',
  headers: {
    'Content-Type': 'application/json',
    'x-apikey': '63e26aaf478852088da67e61'
  }
};

const Students = (props) => {
  const [studentsDefault, setStudentsDefault] = useState([]);
  const [sortOrderForvard, setSortOrderForvard] = useState(true);
  const dispatch = useDispatch()
  const students = useSelector((store) => store.students)

  useEffect(() => {
    axios(config)
      .then((response) => {
        const addStudentsAction = {type: ADD_STUDENTS, payload: response.data}
        dispatch(addStudentsAction)
        setStudentsDefault(response.data)
      })
      .catch((error) => console.log(error))

  }, [])

  const onClick = (evt) => {
    if (sortOrderForvard == true) {
      const studentsArray = [...students];
      studentsArray.sort((x, y) => x.name > y.name ? 1 : -1);
      dispatch({type: ADD_STUDENTS, payload: studentsArray})

      toast("This is students's filter");
    }
    else {
      const studentsArray = [...students];
      studentsArray.sort((x, y) => x.name < y.name ? 1 : -1);
      dispatch({type: ADD_STUDENTS, payload: studentsArray})

      toast("This is students's filter");
    }

    setSortOrderForvard(!sortOrderForvard)
  };


  return (
    <section className="students-list">
      <div className="students-list__search">
        <h2 className="students-list__title">
          Students List
        </h2>
        <div>Debtors</div>
        <div className="students-list__buttons-container">

          <img src="./svg/arrows-up-down-crud.svg" alt="arrows up down" onClick={onClick} />
          <ToastContainer />
          <Link className="students-list__button" to="/students/new">ADD NEW STUDENT</Link>
        </div>
      </div>
      <table className="students-list__table">
        <thead className="students-list__thead">
          <StudentsItem name="Name" email="Email" phone="Phone" number="Enroll Number" date="Date of admission" />
        </thead>
        <tbody>
          {students && students.map((student) => <StudentsItem photopath="#" name={student.name} email={student.email} phone={student.phone} number={student.number} date={student.date} key={student.name} id={student._id}/>)}
        </tbody>
      </table>
    </section>
  );
};

export default Students;
