import React, { useState, useEffect } from 'react'
import pet, { ANIMALS } from '@frontendmasters/pet'
import useDropdown from './useDropdown'
import Results from './Results'
//import { async } from 'q'

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA')
  //const [animal, setAnimal] = useState('All')
  //const [breed, setBreed] = useState('')
  const [breeds, setBreeds] = useState([])

  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS)
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)

  const [petResults, setPetResults] = useState([])

  async function requestPets() {
    //go out to the pet api, get the location, breed, type
    //wait for that result if it comes back stick it in results
    const { animals } = await pet.animals({ location, breed, type: animal })
    //give me animals OR send me an empty array if ya cant
    setPetResults(animals || [])
  }

  useEffect(() => {
    setBreeds([])
    setBreed('')

    pet.breeds(animal).then(result => {
      const catNames = result.breeds.map(catObj => catObj.name)
      setBreeds(catNames)
    })
  }, [animal])

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault()
          requestPets()
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          ></input>
        </label>
        <AnimalDropdown />
        <BreedDropdown />

        <button>Submit</button>
      </form>

      <Results pets={petResults} />
    </div>
  )
}

export default SearchParams
