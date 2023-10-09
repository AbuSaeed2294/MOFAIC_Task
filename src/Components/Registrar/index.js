import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import StudentModal from "../Common/StudentModal";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  getAllNationality,
  fetchStudentNationality,
} from "../../Redux/Action/studentAction";

const Registrar = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [SelectedStudentDetails, setSelectedStudentDetails] = React.useState(
    {}
  );
  const [isRegistrarWantToEdit, setIsRegistrarWantToEdit] = useState(false);
  const [approvedStudent, setApprovedStudent] = useState([]);

  const dispatch = useDispatch();
  const studentsData = useSelector((state) => state.student.students);
  const nationalityData = useSelector((state) => state.student.nationalityData);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(getAllNationality());
  }, [fetchStudents, getAllNationality, showModal]);

  useEffect(() => {
    studentsData.forEach((student) => {
      dispatch(fetchStudentNationality(student.ID));
    });
  }, [dispatch, studentsData]);

  const handleModal = () => {
    setSelectedStudentDetails("");
    setShowModal(true);
  };

  const clickStudentDataHandler = (studentDetails) => {
    setSelectedStudentDetails(studentDetails);
    setShowModal(true);
  };

  const handleEditStudentDetails = () => {
    setSelectedStudentDetails([]);
    setIsRegistrarWantToEdit(true);
  };

  const clickApprovedStudentListHandler = (studentDetails) => {
    setSelectedStudentDetails(studentDetails);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
    setIsRegistrarWantToEdit(false);
  };

  return (
    <div className="mx-5 tableContainer">
      <Button variant="primary" className="px-5 my-4" onClick={handleModal}>
        Add Student
      </Button>
      <StudentModal
        SelectedStudentDetails={SelectedStudentDetails}
        setSelectedStudentDetails={setSelectedStudentDetails}
        showModal={showModal}
        isRegistrarWantToEdit={isRegistrarWantToEdit}
        onHide={hideModal}
        approvedStudent={approvedStudent}
        setApprovedStudent={setApprovedStudent}
      />

      {!!studentsData?.length && (
        <>
          <h2>Pending Students</h2>
          <Table
            responsive="sm"
            className="table-responsive table-hover table-bordered mb-0"
          >
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Nationality</th>
                <th>Date of Birth</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {studentsData?.map((student, i) => {
                return (
                  <tr onClick={() => clickStudentDataHandler(student)}>
                    <td>{student?.firstName}</td>
                    <td>{student?.lastName}</td>
                    <td>{nationalityData[student.ID]?.nationality?.Title}</td>
                    <td>{student?.dateOfBirth}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={handleEditStudentDetails}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}

      {/* approved student list */}
      {!!approvedStudent?.length && (
        <>
          <h2 className="mt-5">Approved Students</h2>
          <Table
            responsive="sm"
            className="table-responsive table-hover table-bordered mb-0"
          >
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Nationality</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {approvedStudent?.map((student, i) => {
                return (
                  <tr onClick={() => clickApprovedStudentListHandler(student)}>
                    <td>{student?.firstName}</td>
                    <td>{student?.lastName}</td>
                    <td>{nationalityData[student.ID]?.nationality?.Title}</td>
                    <td>{student?.dateOfBirth}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Registrar;
