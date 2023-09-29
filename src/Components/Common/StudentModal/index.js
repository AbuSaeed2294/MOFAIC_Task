import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useSelector, useDispatch } from "react-redux";
import {
  updateBasicInfo,
  deleteFamilyMember,
  updateFamilyMember,
  deleteUser,
} from "../../../Redux/Action/studentAction";

const StudentModal = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
  });

  const [familyData, setFamilyData] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const role = useSelector((state) => state.role.role);

  const adminRole =
    role === "Admin" &&
    props?.singleStudentData &&
    !props.isRegistrarWantToEdit;
  const hideButtons = props?.singleStudentData && !props?.isRegistrarWantToEdit;
  const canOnlyView = adminRole || hideButtons;

  useEffect(() => {
    if (props?.singleStudentData) {
      setFamilyData(props?.singleStudentData?.familyInfo);
    } else {
      setFamilyData([]);
      setFormData([]);
    }
  }, [props.singleStudentData]);

  const onClickAddFamilyMemberButton = () => {
    setFamilyData([
      ...familyData,
      { firstName: "", lastName: "", nationality: "", relationship: "" },
    ]);
  };

  const handleDeleteFamilyMemberButton = (i) => {
    const removeFamilyRecord = [...familyData];
    removeFamilyRecord.splice(i, 1);
    setFamilyData(removeFamilyRecord);
    dispatch(deleteFamilyMember(props?.singleStudentData?.id, i));
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
    dispatch(updateBasicInfo(user));
    setFamilyData([]);
    props.onHide();
  };

  const handleUpdateUserButton = () => {
    dispatch(
      updateFamilyMember(props?.singleStudentData?.id, {
        ...props.singleStudentData,
        familyInfo: familyData,
      })
    );
    props.onHide();
  };

  const handleApproveButton = () => {
    // We don't have any api, that's why i am deleting the record on approve button
    dispatch(deleteUser(props?.singleStudentData?.id));
    props.onHide();
  };

  return (
    <Modal
      {...props}
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
                value={props?.singleStudentData?.firstName}
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
                value={props?.singleStudentData?.lastName}
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
                {props?.singleStudentData?.nationality && (
                  <option
                    value={props?.singleStudentData?.nationality}
                    selected
                  >
                    {props?.singleStudentData?.nationality}
                  </option>
                )}
                <option value="UAE">UAE</option>
                <option value="USA">USA</option>
                <option value="KSA">KSA</option>
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
                value={props?.singleStudentData?.dateOfBirth}
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
                    onClick={() => handleDeleteFamilyMemberButton(i)}
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
                    value={familyData[i]?.nationality}
                    disabled={canOnlyView}
                    required
                    onChange={(e) => onChangeFamilyHandler(e, i)}
                    aria-label="Select Your Nationality"
                  >
                    <option>Select Your Nationality</option>
                    {familyData[i]?.nationality && (
                      <option value={familyData[i]?.nationality} selected>
                        {familyData[i]?.nationality}
                      </option>
                    )}
                    <option value="UAE">UAE</option>
                    <option value="USA">USA</option>
                    <option value="KSA">KSA</option>
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
              {props.isRegistrarWantToEdit && (
                <>
                  <Button
                    onClick={handleUpdateUserButton}
                    variant="dark"
                    className="mx-2"
                  >
                    Update User
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
              {!props.isRegistrarWantToEdit && (
                <Button type="submit">Submit</Button>
              )}
            </Col>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentModal;
