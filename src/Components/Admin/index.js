import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import StudentModal from "../Common/StudentModal";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  getAllNationality,
  fetchStudentNationality,
} from "../../Redux/Action/studentAction";

const Admin = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [SelectedStudentDetails, setSelectedStudentDetails] = React.useState(
    {}
  );

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
  }, [dispatch, studentsData, showModal]);

  const handleModal = () => {
    setSelectedStudentDetails("");
    setShowModal(true);
  };

  const clickStudentDataHandler = (studentDetails) => {
    setSelectedStudentDetails(studentDetails);
    setShowModal(true);
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
        onHide={() => setShowModal(false)}
      />

      {!!studentsData?.length && (
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
            {studentsData?.map((student, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => clickStudentDataHandler(student)}
                >
                  <td>{student?.firstName}</td>
                  <td>{student?.lastName}</td>
                  <td>{nationalityData[student.ID]?.nationality?.Title}</td>
                  <td>{student?.dateOfBirth}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Admin;
