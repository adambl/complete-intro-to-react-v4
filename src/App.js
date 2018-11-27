import { Link, Router } from '@reach/router'

import Details from './Details'
import React from 'react'
import Results from './Results'
import { render } from 'react-dom'

class App extends React.Component {
    onClickTitle() {
        alert("Title clicked");
    }

    render() {
        return (
            <div id="main-div">
                <header>
                    <Link to="/">Adopt Me!</Link>
                </header>
                <Router>
                    <Results path="/"/>
                    <Details path="/details/:id" />
                </Router>
            </div>
        );
    }
}

render(<App />, document.getElementById("root"))
