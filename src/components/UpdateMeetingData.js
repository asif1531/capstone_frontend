import axios from "axios";
import { useState } from "react";

import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import ForJoine from "./ForJoine";
const UpdateMeetingData = (props) => {
  // let {updatecard}=props;

  console.log("props meeting id fro update", props.meetingId);

  let [UpdateMeeting, setUpdateMeeting] = useState(false);
  let localToken = localStorage.getItem("token");

  // let Ids=ReceiverIdS.split(',')
  // let ReceiverIds=[];
  // ReceiverIds.push(Ids);

  let [DataMeeting, setDataMeeting] = useState({
    meetingName: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    // receiverIds
    // _id
  });

  let handleChange = (e) => {
    let { name, value } = e.target;
    setDataMeeting({ ...DataMeeting, [name]: value });
  };

  function toggleUpdateMeetingData() {
    setUpdateMeeting(!UpdateMeeting);
  }

  let SubmitMeeting = async () => {
    let UpdatedMeetingData = {
      meetingName: DataMeeting.meetingName,
      description: DataMeeting.description,
      startDateTime: DataMeeting.startDateTime,
      endDateTime: DataMeeting.endDateTime,
      receiverIds: localStorage.getItem("ReceiverIds").split(","),
      _id: props.meetingId,
    };
    let header = {
      Authorization: localToken,
    };

    try {
      let sendMeetingData = await axios.post(
        "http://localhost:5000/api/updateMeeting",
        UpdatedMeetingData,
        {
          headers: header,
        }
      );
      console.log("Updated adata ", UpdatedMeetingData);
      props.showMeetingData();
      toggleUpdateMeetingData();
    } catch (e) {
      console.log("Error :Updated Meeting data Is not send..");
    }
  };

  return (
    <>
      <Button
        style={{ marginLeft: 126, marginRight: -60 }}
        color="info"
        onClick={toggleUpdateMeetingData}
      >
        UpdateMeeting
      </Button>

      <Modal isOpen={UpdateMeeting} toggle={toggleUpdateMeetingData}>
        <ModalHeader toggle={toggleUpdateMeetingData}>
          Update Meeting data
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="examplePassword">MeetingName</Label>
              <Input
                id="meetingName"
                name="meetingName"
                placeholder="Enter Name"
                type="text"
                onChange={handleChange}
                value={DataMeeting.meetingName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Entar Content"
                type="text"
                onChange={handleChange}
                value={DataMeeting.description}
              />
            </FormGroup>
            <FormGroup>
              <ForJoine user={props.user}></ForJoine>
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">StartDateTime</Label>
              <Input
                id="startDateTime"
                name="startDateTime"
                placeholder="Entar startDateTime"
                type="text"
                onChange={handleChange}
                value={DataMeeting.startDateTime}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">EndDateTime</Label>
              <Input
                id="endDateTime"
                name="endDateTime"
                placeholder="Entar endDateTime"
                type="text"
                onChange={handleChange}
                value={DataMeeting.endDateTime}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={SubmitMeeting}>
            Submit
          </Button>
          <Button color="secondary" onClick={toggleUpdateMeetingData}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UpdateMeetingData;
