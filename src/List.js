import React from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Link, Route } from "react-router-dom";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    getUsersList = (searchUser) => {
        axios({
            url: "https://api.github.com/search/users",
            params: {
                q: (searchUser ? searchUser : 'a')
            },
            method: 'get',
            headers: { Authorization: `bearer 91d9f2623970acd6d74d74f9ad36628094ad8668` },

        }).then(response => {
            console.log(response.data.items[1])
            this.setState({ filtered: response.data.items });
        })
    };

    componentDidMount() {
        this.getUsersList();
    }

    handleChange(e) {
        if (e.target.value !== "") {
            this.getUsersList(e.target.value);
        } else {
            this.setState({
                filtered: []
            });
        }
    }

    render() {
        return (
            <div className="list-container">
                <div>
                    <i className="fa fa-search"></i>
                    <input type="search" className="input" value={this.state.searchUser} onChange={this.handleChange} placeholder="Find a member..." />
                </div>
                {this.state.filtered.length > 0 ?
                    <ul className="table-list">
                        {this.state.filtered.map(item => (
                            <li key={item.id}>
                                <Link to={`/user/${item.login}`}>
                                    <img src={item.avatar_url} className="avatar"/>
                                    <div>
                                        <p>{item.login}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    :
                    <div>
                        <br />
                        <span>No users found with the above username.</span>
                    </div>
                }
            </div>
        )
    }
}

export default List;