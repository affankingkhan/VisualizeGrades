import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {axiosClient} from './axiosClient';


 class EditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: this.props.modal.isOpen,
      user: this.props.modal.user,
    };
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  

  handleModalClose(event) {
    const vm = this;
    vm.props.closeModal(event);
  }

  onChangeHandler(e) {
    const vm = this;
    const {name, value} = e.target;
    let user  = {...vm.state.user};
    user[name] = value;

    vm.setState({user});
}

  handleSubmit(event, values) {
    const vm = this;
    // event.preventDefault();

    let url = "/update";

    let user = {...vm.state.user};

    axiosClient.post(url, user)
      .then(function(response) {
        if (response.data) {
          vm.handleModalClose();
          window.location.reload();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const vm = this;
    return (
      <Modal
        isOpen={vm.state.isOpen}
        toggle={vm.handleModalClose}
        backdrop={"static"}
        centered={true}
      >
        <ModalHeader toggle={vm.handleModalClose} tag="h4">
          <strong>Edit User</strong>
        </ModalHeader>
        <ModalBody>
          <AvForm onValidSubmit={vm.handleSubmit}>
            <AvField
              name="firstName"
              label="First Name"
              type="text"
              required
              onChange={vm.onChangeHandler}
              value={vm.state.user.firstName}
            />
            <AvField name="lastName" label="Last Name" type="text" value={vm.state.user.lastName} required onChange={vm.onChangeHandler}/>
            <AvField name="email" label="Email Address" type="email" value={vm.state.user.email} required onChange={vm.onChangeHandler} />
            <AvField name="age" label="Age" type="number" value={vm.state.user.age} required onChange={vm.onChangeHandler} />
            <AvField name="status" label="Status" type="select" value={vm.state.user.status} required onChange={vm.onChangeHandler}>
                <option>Infected</option>
                <option>Not Infected</option>
                <option>Recovered</option>
                <option>N/A</option>
            </AvField>
            <button type="submit" className="btn btn-primary">Save</button>
            &nbsp;&nbsp;
            <button className='btn btn-danger' type='button' onClick={vm.handleModalClose}>
              Cancel
            </button>
          </AvForm>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    );
  }
}

export default EditModal
