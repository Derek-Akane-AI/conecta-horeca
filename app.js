document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // PASO 1 - DATOS BÁSICOS
  // ========================================

  const professionalForm =
    document.getElementById("professionalForm");

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


  // ========================================
  // PASO 2 - PUESTOS POR ÁREA
  // ========================================

  const puestosPorArea = {

    restaurante: [
      "Salonero/a",
      "Anfitrión/a",
      "Cajero/a",
      "Capitán/a de salón",
      "Supervisor/a de restaurante",
      "Gerente de restaurante"
    ],

    bar: [
     "Bartender",
     "Mixólogo/a",
     "Barback",
     "Sommelier",
     "Especialista en vinos",
     "Jefe/a de bar",
     "Gerente de bar"
    ],

    cocina: [
      "Chef ejecutivo/a",
      "Sous chef",
      "Cocinero/a",
      "Ayudante de cocina",
      "Repostero/a - Pastelero/a",
      "Panadero/a",
      "Steward - Lavaplatos"
    ],

    hoteleria: [
      "Recepcionista",
      "Conserje",
      "Botones",
      "Agente de reservas",
      "Servicio al huésped",
      "Auditor/a nocturno",
      "Supervisor/a de recepción",
      "Gerente de recepción"
    ],

    habitaciones: [
      "Camarero/a de habitaciones",
      "Supervisor/a de habitaciones",
      "Personal de limpieza",
      "Personal de lavandería",
      "Supervisor/a de limpieza"
    ],

    eventos: [
      "Salonero/a de eventos",
      "Bartender de eventos",
      "Coordinador/a de eventos",
      "Supervisor/a de eventos",
      "Personal de montaje",
      "Personal de desmontaje",
      "Anfitrión/a de eventos"
    ],

    administracion: [
      "Gerente general",
      "Gerente de Alimentos y Bebidas",
      "Recursos Humanos",
      "Ventas",
      "Compras",
      "Contabilidad",
      "Administración"
    ],

    operaciones: [
      "Mantenimiento",
      "Seguridad",
      "Jardinería",
      "Chofer",
      "Supervisor/a de operaciones",
      "Gerente de operaciones"
    ]

  };


  // ========================================
  // CAMBIAR PUESTOS SEGÚN ÁREA
  // ========================================

  const areaPrincipal =
    document.getElementById("areaPrincipal");

  const puestoPrincipal =
    document.getElementById("puestoPrincipal");

  if (areaPrincipal && puestoPrincipal) {

    areaPrincipal.addEventListener("change", function () {

      const areaSeleccionada = areaPrincipal.value;

      puestoPrincipal.innerHTML = "";

      if (!areaSeleccionada) {

        puestoPrincipal.innerHTML =
          '<option value="">Primero selecciona un área</option>';

        puestoPrincipal.disabled = true;

        return;
      }

      puestoPrincipal.disabled = false;

      const opcionInicial =
        document.createElement("option");

      opcionInicial.value = "";
      opcionInicial.textContent =
        "Selecciona tu puesto";

      puestoPrincipal.appendChild(opcionInicial);

      puestosPorArea[areaSeleccionada].forEach(
        function (puesto) {

          const opcion =
            document.createElement("option");

          opcion.value = puesto;
          opcion.textContent = puesto;

          puestoPrincipal.appendChild(opcion);

        }
      );

    });

  }


  // ========================================
  // MOSTRAR NOMBRE DEL CV
  // ========================================

  const cvInput =
    document.getElementById("cv");

  const cvFileName =
    document.getElementById("cvFileName");

  if (cvInput && cvFileName) {

    cvInput.addEventListener("change", function () {

      if (cvInput.files.length > 0) {

        cvFileName.textContent =
          "Archivo seleccionado: " +
          cvInput.files[0].name;

      } else {

        cvFileName.textContent = "";

      }

    });

  }


  // ========================================
  // GUARDAR PASO 2
  // ========================================

  const professionalProfileForm =
    document.getElementById(
      "professionalProfileForm"
    );

  if (professionalProfileForm) {

    professionalProfileForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        const datosGuardados =
          JSON.parse(
            sessionStorage.getItem(
              "conectaHorecaProfesional"
            )
          ) || {};

        const datosPaso2 = {

          areaPrincipal:
            document.getElementById(
              "areaPrincipal"
            ).value,

          puestoPrincipal:
            document.getElementById(
              "puestoPrincipal"
            ).value,

          experiencia:
            document.getElementById(
              "experiencia"
            ).value,

          idiomaPrincipal:
            document.getElementById(
              "idiomaPrincipal"
            ).value,

          segundoIdioma:
            document.getElementById(
              "segundoIdioma"
            ).value,

          nivelSegundoIdioma:
            document.getElementById(
              "nivelSegundoIdioma"
            ).value

        };

        const perfilCompleto = {
          ...datosGuardados,
          ...datosPaso2
        };

        sessionStorage.setItem(
          "conectaHorecaProfesional",
          JSON.stringify(perfilCompleto)
        );

        window.location.href =
          "disponibilidad-profesional.html";

      }
    );

  }

  // ========================================
  // PASO 3 - DISPONIBILIDAD Y PAGO
  // ========================================

  const paymentCheckboxes =
    document.querySelectorAll(".payment-checkbox");

  paymentCheckboxes.forEach(function (checkbox) {

    checkbox.addEventListener("change", function () {

      const targetId =
        checkbox.getAttribute("data-target");

      const target =
        document.getElementById(targetId);

      if (!target) return;

      if (checkbox.checked) {

        target.classList.remove("hidden");

      } else {

        target.classList.add("hidden");

      }

    });

  });


  const availabilityForm =
    document.getElementById("availabilityForm");

  if (availabilityForm) {

    availabilityForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        const tiposSeleccionados =
          Array.from(
            document.querySelectorAll(
              'input[name="tipoTrabajo"]:checked'
            )
          ).map(function (item) {
            return item.value;
          });


        if (tiposSeleccionados.length === 0) {

          alert(
            "Selecciona al menos un tipo de trabajo."
          );

          return;

        }


        const datosGuardados =
          JSON.parse(
            sessionStorage.getItem(
              "conectaHorecaProfesional"
            )
          ) || {};


        const datosPaso3 = {

          disponibleAhora:
            document.getElementById(
              "disponibleAhora"
            ).checked,

          fechaDisponible:
            document.getElementById(
              "fechaDisponible"
            ).value,

          tiposTrabajo:
            tiposSeleccionados,

          pagoPorHora:
            document.getElementById(
              "pagoHora"
            ).checked,

          tarifaHora:
            document.getElementById(
              "tarifaHora"
            ).value,

          pagoSemanal:
            document.getElementById(
              "pagoSemanal"
            ).checked,

          tarifaSemanal:
            document.getElementById(
              "tarifaSemanal"
            ).value,

          pagoMensual:
            document.getElementById(
              "pagoMensual"
            ).checked,

          tarifaMensual:
            document.getElementById(
              "tarifaMensual"
            ).value,

          pagoEvento:
            document.getElementById(
              "pagoEvento"
            ).checked,

          tarifaEvento:
            document.getElementById(
              "tarifaEvento"
            ).value

        };


        const perfilActualizado = {
          ...datosGuardados,
          ...datosPaso3
        };


        sessionStorage.setItem(
          "conectaHorecaProfesional",
          JSON.stringify(perfilActualizado)
        );


        window.location.href =
          "finalizar-perfil.html";

      }
    );

  }
  
});
