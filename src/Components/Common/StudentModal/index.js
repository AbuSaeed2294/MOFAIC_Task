import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useSelector, useDispatch } from "react-redux";
import {
  postStudent,
  fetchStudentFamilyData,
  postStudentFamilyData,
  updateStudentDetails,
  updateStudentNationalityData,
  updateStudentFamilyData,
  deleteStudentFamilyData,
} from "../../../Redux/Action/studentAction";

const StudentModal = ({
  SelectedStudentDetails,
  isRegistrarWantToEdit,
  onHide,
  showModal,
  approvedStudent,
  setApprovedStudent,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
  });

  const [familyData, setFamilyData] = useState([]);
  const [storedFamilyData, setStoredFamilyData] = useState([]);

  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.role.role);
  const allNationality = useSelector((state) => state.student.allNationality);
  const studentNationality = useSelector(
    (state) => state.student.nationalityData[SelectedStudentDetails?.ID]
  );
  const studentFamilyMembers = useSelector(
    (state) => state.student.familyData[SelectedStudentDetails?.ID]
  );

  const adminRole =
    userRole === "Admin" && SelectedStudentDetails && !isRegistrarWantToEdit;
  const hideButtons = SelectedStudentDetails && !isRegistrarWantToEdit;
  const canOnlyView = adminRole || hideButtons;

  useEffect(() => {
    if (SelectedStudentDetails?.ID) {
      dispatch(fetchStudentFamilyData(SelectedStudentDetails?.ID));
    }

    if (!studentFamilyMembers) {
      // setFamilyData(studentFamilyMembers);
    } else {
      setFamilyData([]);
    }
  }, [SelectedStudentDetails?.ID]);

  useEffect(() => {
    if (studentFamilyMembers?.length) {
      setFamilyData(studentFamilyMembers);
    } else {
      setFamilyData([]);
    }
  }, [studentFamilyMembers]);

  useEffect(() => {
    isRegistrarWantToEdit
      ? setFormData(SelectedStudentDetails)
      : setFormData({});

    setStoredFamilyData(familyData);
  }, [isRegistrarWantToEdit, onHide]);

  const onClickAddFamilyMemberButton = () => {
    setFamilyData([
      ...familyData,
      { firstName: "", lastName: "", nationality: "", relationship: "" },
    ]);
  };

  const handleDeleteFamilyMemberButton = (i, familyDataIndex) => {
    const removeFamilyRecord = [...familyData];
    removeFamilyRecord.splice(i, 1);
    setFamilyData(removeFamilyRecord);
    dispatch(
      deleteStudentFamilyData(SelectedStudentDetails?.ID, familyDataIndex)
    );
  };

  const onChangeFamilyHandler = (e, i) => {
    const { name, value } = e.target;
    const data = [...familyData];
    data[i][name] = value;
    setFamilyData(data);
    console.log({ familyData });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const id = Math.floor(Math.random() * 1000000);

    e.preventDefault();
    const user = { id, ...formData, familyInfo: familyData };
    dispatch(postStudent(user, familyData));
    setFamilyData([]);
    onHide();
  };

  const handleUpdateUserButton = () => {
    dispatch(updateStudentDetails(formData?.ID, formData));
    dispatch(updateStudentNationalityData(formData?.ID, formData?.nationality));
    dispatch(
      updateStudentFamilyData(
        familyData?.[0]?.ID || SelectedStudentDetails?.ID,
        familyData
      )
    );

    const differences = familyData?.filter((item1) => {
      return !storedFamilyData?.some((item2) => {
        return JSON.stringify(item1) === JSON.stringify(item2);
      });
    });
    dispatch(postStudentFamilyData(SelectedStudentDetails?.ID, differences));

    onHide();
  };

  const handleApproveButton = () => {
    // We don't have any api, that's why i am deleting the record on approve button
    // TODO delete is not working need to check or remove the delete dispatch
    // dispatch(deleteUser(SelectedStudentDetails?.ID));
    // const differences = familyData?.filter((item1) => {
    //   // Check if item1 is not found in obj2
    //   return !storedFamilyData?.some((item2) => {
    //     return JSON.stringify(item1) === JSON.stringify(item2);
    //   });
    // });
    // console.log("differences", differences);
    // console.log("familyData +++ :", familyData);
    // dispatch(postStudentFamilyData(SelectedStudentDetails?.ID, differences));

    setApprovedStudent([...approvedStudent, SelectedStudentDetails]);
    onHide();
  };

  return (
    <Modal
      // {...props}
      show={showModal}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Student Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="firstName">
            <Form.Label column sm="2">
              First Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={formData?.firstName || SelectedStudentDetails?.firstName}
                disabled={canOnlyView}
                name="firstName"
                placeholder="First Name"
                required
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="lastName">
            <Form.Label column sm="2">
              Last Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={formData?.lastName || SelectedStudentDetails?.lastName}
                disabled={canOnlyView}
                name="lastName"
                placeholder="Last Name"
                required
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="Nationality">
            <Form.Label column sm="2">
              Nationality
            </Form.Label>
            <Col sm="8">
              <Form.Select
                name="nationality"
                disabled={canOnlyView}
                onChange={handleInputChange}
                required
                aria-label="Select Your Nationality"
              >
                <option>Select Your Nationality</option>
                {studentNationality?.nationality && (
                  <option
                    value={studentNationality?.nationality?.Title}
                    selected
                  >
                    {studentNationality?.nationality?.Title}
                  </option>
                )}
                {allNationality?.map((country) => {
                  return <option value={country.ID}>{country?.Title}</option>;
                })}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="date">
            <Form.Label column sm="2">
              Date of Birth
            </Form.Label>
            <Col sm="8">
              <input
                className="form-control"
                type="date"
                value={SelectedStudentDetails?.dateOfBirth}
                disabled={canOnlyView}
                name="dateOfBirth"
                required
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
          {!!familyData?.length && <h2 className="my-4">Family Member</h2>}
          {familyData?.map((val, i) => (
            <div>
              <hr />
              {!canOnlyView && (
                <div className="text-end">
                  <Button
                    variant="danger"
                    onClick={() =>
                      handleDeleteFamilyMemberButton(i, familyData[i]?.ID)
                    }
                  >
                    Delete
                  </Button>
                </div>
              )}
              <Form.Group as={Row} className="mb-3" controlId="firstName">
                <Form.Label column sm="2">
                  First Name
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    value={familyData[i]?.firstName}
                    disabled={canOnlyView}
                    name="firstName"
                    required
                    placeholder="First Name"
                    onChange={(e) => onChangeFamilyHandler(e, i)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="lastName">
                <Form.Label column sm="2">
                  Last Name
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    value={familyData[i]?.lastName}
                    disabled={canOnlyView}
                    name="lastName"
                    required
                    placeholder="Last Name"
                    onChange={(e) => onChangeFamilyHandler(e, i)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="Nationality">
                <Form.Label column sm="2">
                  Nationality
                </Form.Label>
                <Col sm="8">
                  <Form.Select
                    name="nationality"
                    value={familyData[i]?.nationality?.Title}
                    disabled={canOnlyView}
                    required
                    onChange={(e) => onChangeFamilyHandler(e, i)}
                    aria-label="Select Your Nationality"
                  >
                    <option>Select Your Nationality</option>
                    {familyData[i]?.nationality?.Title && (
                      <option
                        value={familyData[i]?.nationality?.Title}
                        selected
                      >
                        {familyData[i]?.nationality?.Title}
                      </option>
                    )}
                    {allNationality?.map((country) => {
                      return (
                        <option value={country.ID}>{country?.Title}</option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="Nationality">
                <Form.Label column sm="2">
                  Relationship
                </Form.Label>
                <Col sm="8">
                  <Form.Select
                    name="relationship"
                    value={familyData[i]?.relationship}
                    onChange={(e) => onChangeFamilyHandler(e, i)}
                    disabled={canOnlyView}
                    aria-label="Relationship"
                    required
                  >
                    <option>Select Your Relationship</option>
                    {familyData[i]?.relationship && (
                      <option value={familyData[i]?.relationship} selected>
                        {familyData[i]?.relationship}
                      </option>
                    )}
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Spouse">Spouse</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </div>
          ))}
          {!canOnlyView && (
            <Col>
              <Button
                onClick={onClickAddFamilyMemberButton}
                variant="secondary"
                className="me-2"
              >
                Add Family Member
              </Button>
              {isRegistrarWantToEdit && (
                <>
                  <Button
                    onClick={handleUpdateUserButton}
                    variant="dark"
                    className="mx-2"
                  >
                    Update Student
                  </Button>

                  <Button
                    className="mx-2 px-4"
                    variant="primary"
                    onClick={handleApproveButton}
                  >
                    Approve
                  </Button>
                </>
              )}
              {!isRegistrarWantToEdit && <Button type="submit">Submit</Button>}
            </Col>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentModal;
