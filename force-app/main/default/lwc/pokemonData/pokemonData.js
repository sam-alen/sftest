import { LightningElement, track } from 'lwc';
//llamar al metodo para llamar la informacion de APEX
import getPokemon from '@salesforce/apex/PokemonService.getPokemon';

export default class PokemonData extends LightningElement {
    //Trackear variables
    //Nombre del pokemon
    @track pokemonName = '';
    //Pokemon Data
    @track pokemonData;
    //Errores
    @track error;

    nameInputHandler(event) {
        this.pokemonName = event.target.value;
    }

    // Search Pokemon
    searchPokemonHandler() {
        if(this.pokemonName) {
            getPokemon({ name: this.pokemonName})
             .then(result => {
                 this.pokemonData = JSON.parse(result);
                 this.error = undefined;
             })
             .catch(error => {
                 this.error = error;
                 this.pokemonData = undefined;
             });
        }
    }

    
    //Implementar Handling
    get hasData() {
        //si esto tiene data mostrar la data si no es ta indefinido
        return this.pokemonData !== undefined;
    }
}