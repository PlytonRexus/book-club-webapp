import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import Counter from './Counter';
import { lread } from '../middleware/localStorage';
import Header from './Header';

class Home extends Component {
    state = {
        employees: [
            {
              name: 'Charlie',
              job: 'Janitor',
            },
            {
              name: 'Mac',
              job: 'Bouncer',
            },
            {
              name: 'Dee',
              job: 'Aspring actress',
            },
            {
              name: 'Dennis',
              job: 'Bartender',
            },
        ]
    }

    componentDidMount = () => {
        // useEffect(() => {
        //     if(auth()) {
        //         if (this.state.toLoad != <this.HomeXML />)
        //         this.setState({ toLoad: <this.HomeXML /> });
        //     }
        //     else {
        //         if (this.state.toLoad != <AuthWarning redirectTo={0}/>)
        //         this.setState({ toLoad: <AuthWarning redirectTo={0}/> })
        //     }
        // });
    }

    HomeXML = () => {
        return (
            <div>
                {/* <Burger /> */}
                <Header header={`Hello, ${lread('bkclbSid').split(',')[1]}!`}/>
                <div>
                    <Table 
                        employees={this.state.employees} 
                        removeEmployee={this.removeEmployee}
                    />
                    <Form
                        handleSubmit={this.addEmployee}
                    />
                </div>
                <Counter />
            </div>
        );
    }

    removeEmployee = index => {
		const { employees } = this.state;
		
		var filtered = employees.filter((character, i) => { 
			return i !== index;
		});

        this.setState({
            employees: filtered
        });
    }

    addEmployee = (name, job) => {
		var employees = this.state['employees'];
        const employee = {
            name,
            job
        };
        const newList = [...employees, employee];
        this.setState({ employees: newList });
    }
    
    render = () => { 
        return <this.HomeXML />;
    }
}

export default Home;