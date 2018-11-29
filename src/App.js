import { Link, Router } from '@reach/router'

import Details from './Details'
import { Provider } from './SearchContext'
import React from 'react'
import Results from './Results'
import SearchParams from './SearchParams'
import pf from 'petfinder-client'
import { render } from 'react-dom'

const petfinder = pf({key: process.env.API_KEY, secret: process.env.API_SECRET});

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            location: 'Seattle, WA',
            animal: "",
            breed: "",
            breeds: [],
            handleAnimalChange: this.handleAnimalChange,
            handleLocationChange: this.handleLocationChange,
            handleBreedChange: this.handleBreedChange,
            getBreeds: this.getBreeds
        }

    }

    handleLocationChange = event => {
        this.setState({
            location: event.target.value
        })    
    }

    handleAnimalChange = event => {
        this.setState({
            animal: event.target.value, 
            breed: ""
        }, this.getBreeds)            
    }

    handleBreedChange = event => {
        this.setState({
            breed: event.target.value, 
        })            
    }

    getBreeds() {
        if (this.state.animal) {
            petfinder.breed.list({animal: this.state.animal})
            .then(data => {
                if (data.petfinder && data.petfinder.breeds && Array.isArray(data.petfinder.breeds.breed)) {
                    this.setState({
                        breeds: data.petfinder.breeds.breed
                    })
                }
                else {
                    this.setState({
                        breeds: []
                    })
                }
            })
        } else {
            this.setState({breeds: []})
        }
    }
    
    onClickTitle() {
        alert("Title clicked");
    }

    render() {
        return (
            <div id="main-div">
                <header>
                    <Link to="/">Adopt Me!</Link>
                </header>
                <Provider value={this.state} >
                    <Router>
                        <Results path="/"/>
                        <Details path="/details/:id" />
                        <SearchParams path="/search-params" />
                    </Router>
                </Provider>
            </div>
        );
    }
}

render(<App />, document.getElementById("root"))
