import React, { Component } from "react";
import axios from "axios";
import NavBar from './NavBar';

class GetStudents extends Component {
    constructor(props) {
        super(props);
        this.state= {
            name: "",
            DOB: "",
            email: "",
            mobileno: "",
            department: "",
            address: "",
            editValue: false,
            data: [],
        };
    }

    // To call the API using getDetails method
    componentDidMount(){
        this.getDetails();
    }

    // To get the details from API
    getDetails = async () => {
        const token = localStorage.getItem("token")
        const {data} = await axios.get("https://studentdetails-cbe.herokuapp.com/student/list", {headers: {'Authorization': `bearer ${token}`}});
        console.log(data);
        this.setState({data});
    }

    deletePost = async (id) => {
        try {
            const token = localStorage.getItem("token")
            const result = await axios.delete(`https://studentdetails-cbe.herokuapp.com/student/delete/${id}`, {headers: {'Authorization': `bearer ${token}`}});
            console.log(result)
            const data = this.state.data.filter((post) => post._id !== id);
            this.setState({data});
        } catch (err) {
            console.log(err)
        }
        
    }

    // To render the edit component and update state
    editPost = (data) => {
        data.DOB = data.DOB.split("T")[0];
        this.setState({...data, editValue:true})
    }

    // To change the value in state and update UI
    handleChange = ( {target: { name, value} }) => {
        this.setState({...this.state, [name]: value});   
    }

    // To send the updated data to API and update UI
    handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token")
        const {_id, name, mobileno, email, DOB, department, address} = this.state;
        if (name && email && mobileno && DOB && department && address) {
            const result = await axios.put(`https://studentdetails-cbe.herokuapp.com/student/update/${_id}`, {name, mobileno, email, DOB, department, address}, {headers: {'Authorization': `bearer ${token}`}})
            const posts = [...this.state.data];
            const index = posts.findIndex((post) => post._id === _id);
            posts[index] = result.data;
            this.setState({data: posts, editValue: false});
        } else {
            this.setState( {allerror: "Enter All Details" })
        }
    }

    // to rendet the listOfStudentsComponent 
    CancelSubmit = () => {
        this.setState({editValue: false})
    }

    render () {
        return (
            <>
            <NavBar />
            {!this.state.editValue ? 
                <table class="centered highlight responsive-table"> 
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Mobile No</th>
                            <th>Department</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((student) => {
                            return(
                                <tr key={student._id}>                            
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.age}</td>
                                    <td>{student.mobileno}</td>
                                    <td>{student.department}</td>
                                    <td>{student.address}</td>
                                    <td><button onClick={() => this.editPost(student)}>Edit</button>
                                    <button onClick={() => this.deletePost(student._id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                :
                <div>
                    <div className="card create-student">
                        <h4>Edit Student Info</h4>
                        <input type="text" placeholder="Student Name" name="name" value={this.state.name} onChange={this.handleChange}></input>
                        <input type="text" placeholder="Student DOB" name="DOB" value={this.state.DOB} onChange={this.handleChange}></input>
                        <input type="number" placeholder="Mobile No" name="mobileno" value={this.state.mobileno} onChange={this.handleChange}></input>
                        <input type="text" placeholder="Department" name="department" value={this.state.department} onChange={this.handleChange}></input>
                        <input type="text" placeholder="Address" name="address" value={this.state.address} onChange={this.handleChange}></input>
                        <button className="btn waves-effect waves-light" onClick={this.handleSubmit} type="submit" name="action">Update</button>
                        <button className="btn waves-effect waves-light" onClick={this.CancelSubmit}>Cancel</button>
                    </div>
                </div>
            }   
            </>
        )
    }
}

export default GetStudents;
