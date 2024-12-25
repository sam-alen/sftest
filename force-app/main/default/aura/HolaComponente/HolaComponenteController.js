({
    actualizarSaludo: function(component, event, helper) {
        var nuevoSaludo = component.get("v.nuevoSaludo");
        console.log("Nuevo saludo capturado: '" + nuevoSaludo + "'"); // Verificar el valor

         // Si no está vacío, llamamos al helper para actualizar el saludo
         helper.actualizarSaludoHelper(component, nuevoSaludo);
    }
})
