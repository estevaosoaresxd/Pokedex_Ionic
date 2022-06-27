import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseURL = 'https://pokeapi.co/api/v2'
  imageURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

  constructor(private http: HttpClient) { }

  getPokemon(offset = 0){
      return this.http.get(`${this.baseURL}/pokemon?offset=${offset}&limit=25`).pipe(
        map(result =>{
          return result ['results']
        }),
        map(pokemons => {
          return pokemons.map( (poke, index) => {
            poke.image = this.getPokeImage(index + offset + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          })
        })
      )
  }

  getPokeImage(index){
    return `${this.imageURL}${index}.png`
  }

  findPokemon(search){
    return this.http.get(`${this.baseURL}/pokemon/${search}`).pipe(
      map( pokemon =>{
        pokemon['image'] = this.getPokeImage(pokemon['id'])
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon
      })
    )
  }

  getPokeDetails(index){
    return this.http.get(`${this.baseURL}/pokemon/${index}`).pipe(
      map(pokemon => {
        let sprites = Object.keys(pokemon['sprites']);
        pokemon['images'] = sprites
        .map( spriteKey => pokemon['sprites'] [spriteKey])
        .filter(img => img);
      return pokemon
      })
    )
  }
}
