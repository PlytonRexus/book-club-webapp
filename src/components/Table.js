import React, { Component } from 'react';
import '../css/Table.css';

const TableBody = props => {
    const body = props.employees.map((employee, index) => {
        return (
            <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.job}</td>
                <td>
                    <button 
                        onClick={() => props.removeEmployee(index)} 
                        className="icon-btn add-btn"
                    >
                        <div className="btn-txt">Delete</div>
                    </button>
                </td>
            </tr>
        );
    });
    return <tbody>{body}</tbody>
};

const TableHead = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Actions</th>
            </tr>
        </thead>
    );
};

class Table extends Component {
    render() {
        const {employees, removeEmployee} = this.props;
        return (
            <div className="table-wrapper">
                <table className="fl-table">
                    <TableHead />
                    <TableBody 
                        employees={employees} 
                        removeEmployee={removeEmployee}
                    />
                </table>
            </div>
        );
    }
}

export default Table;