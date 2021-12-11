import { Component } from "react";
import axios from "axios";
import NavBar from './NavBar';

class CreateStudent extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            name: "",
            DOB: "",
            email: "",
            mobileno: "",
            department: "",
            address: "",
            allerror: "",
        }
    }
    // To change the value in state and update UI
    handleChange = ( {target: { name, value} }) => {
        this.setState({...this.state, [name]: value});   
    }

    // To send new student data to API for creating new student record
    handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token")
        const {name, mobileno, email, DOB, department, address} = this.state;
        if (name && email && mobileno && DOB && department && address) {
            const data = await axios.post("https://studentdetails-cbe.herokuapp.com/student/create", {name, mobileno, email, DOB, department, address}, {headers: {'Authorization': `bearer ${token}`}})
            console.log(data);
            this.setState({name:"", mobileno:"", email:"", DOB:"", department:"", address:"", allerror:""})
        } else {
            this.setState( {allerror: "Enter All Details" })
        }
    }

    render () {
        return (
            <>
                <NavBar />
                <div>
                    <div className="card create-student">
                        <h4>Create Student</h4>
                        <input type="text" placeholder="Student Name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)}></input>
                        <input type="text" placeholder="Email(Cannot be changed in future)" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)}></input>
                        <input type="date" placeholder="Student DOB" name="DOB" value={this.state.DOB} onChange={(e) => this.handleChange(e)}></input>
                        <input type="number" placeholder="Mobile No" name="mobileno" value={this.state.mobileno} onChange={(e) => this.handleChange(e)}></input>
                        <input type="text" placeholder="Department" name="department" value={this.state.department} onChange={(e) => this.handleChange(e)}></input>
                        <input type="text" placeholder="Address" name="address" value={this.state.address} onChange={(e) => this.handleChange(e)}></input>
                        <button className="btn waves-effect waves-light" onClick={this.handleSubmit} type="submit" name="action">Create</button>
                    </div>
                </div>
            </>
        )
    }
}

export default CreateStudent;