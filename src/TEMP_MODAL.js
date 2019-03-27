import React, { Component } from "react";
import "./App.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=80&offset=80";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemonlist: [],
            sortBy: "name",
            filterInput: '',
            showModal: false,
        }
    }

    fetchPokemons() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => this.setState({
                pokemonlist: data.results
            })
            );
    }

    componentDidMount() {
        this.fetchPokemons();
    }

    getIdFromUrl(url) {
        return url.split("/")[6];
    }

    handleTextInput(event) {
        this.setState({
            filterInput: event.target.value
        });
        //OnChange
        //input nås genom event.target.value.
    }


    //--------------------------------------MODAL-----------------
    handleShowModal(event) {
        this.setState({
            showModal: true,
        });
    }

    handleCloseModal(event) {
        if (event.target !== event.currentTarget) {
            return;
        }
        console.log(event.target);
        console.log(event.currentTarget);
        this.setState({
            showModal: false,
        });
    }
    //--------------------------------------MODAL-----------------


    render() {
        const pokemons = this.state.pokemonlist
            .slice()
            .filter(pokemon =>
                this.state.filterInput === '' ? pokemon : pokemon.name.startsWith(this.state.filterInput))
            //om sökrutan är tom så laddas pokemon, om söktext matas in så körs includes().
            //alt. startsWith().
            .map((pokemon, i) => (
                <ul key={i} className="pokemons">
                    <li>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getIdFromUrl(pokemon.url)}.png`} alt="a collection of pokemons" />
                    </li>
                    <li>{pokemon.name}</li>
                </ul>
            ));


        //--------------------------------------MODAL-----------------
        const { showModal } = this.state;

        const containerStyles = {
            height: '100vh',
            width: '100vw'
        };

        const overlayStyles = {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgb(0, 0, 0, 0.3)',
        }

        const modalStyles = {
            backgroundColor: 'white',
            borderRadius: '5px',
            maxWidth: '200px',
            height: '200px',
            margin: '0 auto',
        };
        //--------------------------------------MODAL-----------------


        return (
            <div>
                <h1>Pokedex</h1>
                <input
                    type="text"
                    placeholder="Search"
                    value={this.state.filterInput}
                    onChange={this.handleTextInput.bind(this)}
                />
                <div>{pokemons}</div>
            </div>
        );
    }
}

export default App;




/*
getPokemons(){
  return fetch(API_URL + '/pokemon')
  .then((response => response.json())
  .then((data)=>data.results)
}

getPokemonsWithTypeId(){
  return fetch(API_URL + '/pokemon' + typeId)
  .then((response => response.json())
  .then((data)=>data.results)
}

componentDidMount(){
  getpokemons(
    .then((pokemons => this.setState({ pokemons })));
  )
}

handleFIlterByType(typeId, event){
  getPokemonsByTuypeId(typeId)
  .then((pokemons)=> this.setstate({pokemons}))
}


*/