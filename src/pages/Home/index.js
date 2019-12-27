import React, {Component} from 'react';
import styled from 'styled-components'

const CenteredContainer = styled.div`
    text-align: center;
`

class Home extends Component{

    state = { username: null };
    
    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }

    render() {
        const { username } = this.state;
        return (
            <CenteredContainer>
                <h2>
                    Amazing Replay UI for ESports games!
                </h2>
                <div>
                    {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
                </div>
            </CenteredContainer>
        );
    }
}

export default Home;
