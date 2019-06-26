import React from 'react';
import './App.css';
import List from './List';

class App extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="container">
                    <section className="section">
                        <List />
                    </section>
                </div>
            </div>
        );
    }
}

export default App;