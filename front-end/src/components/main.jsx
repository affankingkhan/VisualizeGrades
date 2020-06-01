import React, { Component } from "react";
import { Table} from "reactstrap";
import {axiosClient} from './axiosClient';
import EditModal from './editModal';
import AddModal from './addModal';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
            users: [],
            editModal: {
                isOpen: false,
                user: [],
            },
            addModal: {
                isOpen: false,
            }
        };
        this.getAllUsers = this.getAllUsers.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.sortData = this.sortData.bind(this);
    }
    
    componentDidMount() {
        const vm = this;
        vm.getAllUsers();

    }

    openEditModal (user){
        const vm = this;
        let {editModal} = vm.state;
        editModal.isOpen = true;
        editModal.user = user;
        vm.setState({editModal});
    }
    closeEditModal(){
        const vm = this;
        let {editModal} = vm.state;
        editModal.isOpen = false;
        vm.setState({editModal});
    }

    openAddModal (user){
        const vm = this;
        let {addModal} = vm.state;
        addModal.isOpen = true;
        vm.setState({addModal});
    }
    closeAddModal(){
        const vm = this;
        let {addModal} = vm.state;
        addModal.isOpen = false;
        vm.setState({addModal});
    }

    getAllUsers() {
        const vm = this;
        let url = '/';

        axiosClient.get(url)
            .then(res=>{
                if(res.data){
                    let users = res.data;
                    vm.setState({
                        users: users
                    });
                }
            })
            .catch(error =>{
                console.log(error);
            })
    }
    
    deleteUser(id){
        const vm = this;
        let url = '/delete'
        let userID={
            userID: id
        }

        axiosClient.post(url,userID)
            .then(res=>{
                if(res.data){
                    vm.getAllUsers();
                }
            })
            .catch(error =>{
            console.log(error);
            })
    }

    sortData(e){
        const vm = this;
        const {name} = e.target
        let users = [...vm.state.users];
        users.sort((a,b) => a[name]>b[name] ? 1 : -1);
        vm.setState({users});
    }

	render() {
        const vm = this;
        let users = vm.state.users.map((user) =>{
            return tableRow(user,vm);
        });

        let edit = '';
        if(vm.state.editModal.isOpen){
            edit = <EditModal closeModal={vm.closeEditModal} modal={vm.state.editModal}/>
        }

        let add = '';
        if(vm.state.addModal.isOpen){
            add = <AddModal closeModal={vm.closeAddModal} modal={vm.state.addModal}/>
        }

		return (
			<div className='card center'>
                <div className="card-header text-center">
                    List of All Users in The System
                </div>
				<Table>
					<thead>
						<tr>
							<th>ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Age</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
                        {users}
					</tbody>
				</Table>
                <div className='container mb-1'>
				    <button type='button' className='btn btn-primary mr-1' onClick={vm.openAddModal}>Add</button>
				    <button name='firstName' type='button' className='btn btn-secondary mr-1' onClick={vm.sortData}>Sort First Name</button>
				    <button name='lastName' type='button' className='btn btn-secondary mr-1' onClick={vm.sortData}>Sort Last Name</button>
				    <button name='email' type='button' className='btn btn-secondary mr-1' onClick={vm.sortData}>Sort Email</button>
				    <button name='age' type='button' className='btn btn-secondary mr-1' onClick={vm.sortData}>Sort Age</button>
				    <button name='status' type='button' className='btn btn-secondary mr-1' onClick={vm.sortData}>Sort Status</button>

                </div>
                {edit}
                {add}
			</div>
		);
	}
}


const tableRow = (user, vm) =>{
    return (
        <tr key={user.userID+'_tr'}>
            <th>{user.userID}</th>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.status}</td>
            <td>
                <button key={user.userID+'btnEdit'} className="btn btn-warning mr-1" onClick={()=>vm.openEditModal(user)}>Edit</button>
                <button key={user.userID+'btnDel'} className="btn btn-danger" onClick={()=>vm.deleteUser(user.userID)}>Delete</button>
            </td>
        </tr>
    )
}
