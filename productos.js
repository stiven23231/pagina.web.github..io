document.addEventListener("DOMContentLoaded", function() {
    const comprarPlanButtons = document.querySelectorAll(".btn-comprar");

    comprarPlanButtons.forEach(function(button) {
      button.addEventListener("click", function(event) {
        event.preventDefault();

        Swal.fire({
          icon: 'info',
          title: 'Lo sentimos',
          text: 'No hay planes disponibles aún, funcionalidad en construccion.'
        });
      });
    });
  });