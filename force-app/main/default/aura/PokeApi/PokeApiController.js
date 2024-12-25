({
    searchPokemon : function(component, event, helper) {
        var action = component.get("c.getPokemonByName");
        action.setParams({ pokemonName : component.get("v.searchTerm") });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.pokemon", response.getReturnValue());
                console.log('pokemon', response.getReturnValue());
            } else {
                console.error("Error al buscar Pokémon");
            }
        });
        
        $A.enqueueAction(action);
    },
    
    getRandomPokemon : function(component, event, helper) {
        var action = component.get("c.getRandomPokemon");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.pokemon", response.getReturnValue());
            } else {
                console.error("Error al obtener Pokémon aleatorio");
            }
        });
        
        $A.enqueueAction(action);
    }
})