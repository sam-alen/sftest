({
    afterRender: function(component, helper) {
        // Llamar a la implementación base de afterRender
        this.superAfterRender();
        
        // Lógica personalizada después del renderizado
        console.log("El componente SaludoAura se ha renderizado.");
    }
})
