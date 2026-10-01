document.addEventListener("DOMContentLoaded", function () {

  const professionalForm = document.getElementById("professionalForm");

  if (professionalForm) {

    professionalForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const professionalData = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        codigoPais: document.getElementById("codigoPais").value,
        telefono: document.getElementById("telefono").value,
        ubicacion: document.getElementById("ubicacion").value
      };

      sessionStorage.setItem(
        "conectaHorecaProfesional",
        JSON.stringify(professionalData)
      );

      window.location.href = "perfil-profesional.html";

    });

  }

});
