import React from 'react';
import axios from 'axios';
import './User.css';
import star from './star.png';
import forks from './forks.png';
import license from './license.png';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            userRepos: []
        };
    }

    getUserDetails = (username) => {
        axios({
            url: "https://api.github.com/users/" + username,
            method: 'get',
            headers: { Authorization: `bearer 91d9f2623970acd6d74d74f9ad36628094ad8668` }
        }).then(response => {
            this.setState({ userData: response.data });
            this.getUserRepos(username);
        })
    };

    getUserRepos = (username) => {
        axios({
            url: "https://api.github.com/users/" + username + "/repos",
            method: 'get',
            headers: { Authorization: `bearer 91d9f2623970acd6d74d74f9ad36628094ad8668` }
        }).then(response => {
            console.log('response')
            response.data.map(item => {
                item.lastUpdatedOn = this.getDate(item.updated_at)
            });
            console.log(response.data)
            this.setState({ userRepos: response.data });
        })
    }

    getDate = (dateString) => {
        var dateObj = new Date(dateString);
        return dateObj.toDateString();
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            this.getUserDetails(this.props.match.params.username);
        }
    }

    render() {
        const { url } = this.props.match
        return (
            <div className="user-profile-page">
                <div className="user-profile-container">
                    <img className="user-img" src={this.state.userData.avatar_url} />
                    <br />
                    <h2 className="user-name">{this.state.userData.name}</h2>
                    <p className="user-desc">{this.state.userData.login}</p>
                </div>
                <div className="user-repos">
                    <ul className="table-list">
                        {this.state.userRepos.map(item => (
                            <li key={item.id}>
                                <h3>{item.name}</h3>
                                <p><small>{item.description}</small></p>
                                <div>
                                    <ul>
                                        <li>
                                            <span className="lang-color"></span>
                                            <span>{item.language}</span>
                                        </li>
                                        {item.stargazers_count > 0 ?
                                            <li>
                                                <span>
                                                    <img src={star} className="star-gazers" />
                                                    {item.stargazers_count}
                                                </span>
                                            </li>
                                            : ''}
                                        {item.forks_count > 0 ?
                                            <li>
                                                <span>
                                                    <img src={forks} className="forks" />
                                                    {item.forks_count}
                                                </span>
                                            </li>
                                            : ''}
                                        {item.license ?
                                            <li>
                                                <span>
                                                    <img src={license} className="star-gazers" />
                                                    {item.license.name}
                                                </span>
                                            </li>
                                            : ''}
                                        <li>
                                            Updated on {item.lastUpdatedOn}
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default User;