import React, { useEffect, useState } from 'react'
import Page from './Page'
import Pagination from './Pagination';
import axios from 'axios'
import Filters from './Filters';
import {Button} from 'react-bootstrap';

function DefaultPage() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(10);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    setFilteredPokemons(pokemons)
      ;
  }, [pokemons]
  );

  // pokemon types
  const types = ['Normal', 'Fighting','Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy']

  useEffect(() => {
    try {
      axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
        .then(res => res.data)
        .then(res => {
          setPokemons(res)
          localStorage.setItem('pokemons', JSON.stringify(res))
        })
        .catch(err => console.log("err", err))
    } catch (error) {
      console.log("error", error)
      setPokemons(localStorage.getItem('pokemons'))
    }
  }, [])  

  const indexOfLastRecord = currentPage * pokemonsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstRecord, indexOfLastRecord)
  const numberOfPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  const MoveLogin = () => {
    window.location.href = "/login"
    }

  return (
    <>
  
    <button 
      style={{ fontSize: "30",textAlign:"center", width: "20%", height: "50px",  alignItems: 'center',}}
      onClick={MoveLogin}>
        Sign out
    </button>

      < Filters
        setCurrentPage={setCurrentPage}
        pokemons={pokemons}
        setFilteredPokemon={setFilteredPokemons}
        setSelectedTypes={setSelectedTypes}
        selectedTypes={selectedTypes}
        types={types}
      />

      < Page currentPokemons={currentPokemons} currentPage={currentPage}
      />
      <div style={{margin:'40px', display:'flex', justifyContent:'center', alignContent:'center'}}>
      < Pagination numberOfPages={numberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage}
      />
      </div>
    </>
  )
}

export default DefaultPage