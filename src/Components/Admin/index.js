import React from "react";
import Button from "react-bootstrap/Button";
import StudentModal from "../Common/StudentModal";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

const Admin = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [singleStudentData, setSingleStudentData] = React.useState({});

  const users = useSelector((state) => state.student.users);
  const role = useSelector((state) => state.role.role);

  const isAdminLogin = role === "Admin";

  console.log({ isAdminLogin });

  const handleModal = () => {
    setSingleStudentData("");
    setShowModal(true);
  };

  const clickStudentDataHandler = (studentDetails) => {
    setSingleStudentData(studentDetails);
    setShowModal(true);
  };

  return (
    <div className="mx-5 tableContainer">
      <Button variant="primary" className="px-5 my-4" onClick={handleModal}>
        Add Student
      </Button>
      <StudentModal
        singleStudentData={singleStudentData}
        setSingleStudentData={setSingleStudentData}
        show={showModal}
        onHide={() => setShowModal(false)}
      />

      {!!users?.length && (
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
            {users?.map((student, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => clickStudentDataHandler(student)}
                >
                  <td>{student?.firstName}</td>
                  <td>{student?.lastName}</td>
                  <td>{student?.nationality}</td>
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
