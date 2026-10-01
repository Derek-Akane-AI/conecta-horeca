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

  // ========================================
  // PASO 4 - COMPLETAR PERFIL
  // ========================================

  const finalProfileForm =
    document.getElementById("finalProfileForm");

  if (finalProfileForm) {

    finalProfileForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        // OTROS PUESTOS

        const otrosPuestos =
          Array.from(
            document.querySelectorAll(
              'input[name="otrosPuestos"]:checked'
            )
          ).map(function (item) {
            return item.value;
          });


        // HABILIDADES

        const habilidades =
          Array.from(
            document.querySelectorAll(
              'input[name="habilidades"]:checked'
            )
          ).map(function (item) {
            return item.value;
          });


        // DATOS GUARDADOS DE PASOS ANTERIORES

        const datosGuardados =
          JSON.parse(
            sessionStorage.getItem(
              "conectaHorecaProfesional"
            )
          ) || {};


        // DATOS DEL PASO 4

        const datosPaso4 = {

          otrosPuestos: otrosPuestos,

          habilidades: habilidades,

          idiomaAdicional:
            document.getElementById(
              "idiomaAdicional"
            ).value,

          nivelIdiomaAdicional:
            document.getElementById(
              "nivelIdiomaAdicional"
            ).value,

          certificaciones:
            document.getElementById(
              "certificaciones"
            ).value,

          sobreMi:
            document.getElementById(
              "sobreMi"
            ).value

        };


        // UNIR TODO EL PERFIL

        const perfilCompleto = {
          ...datosGuardados,
          ...datosPaso4
        };


        sessionStorage.setItem(
          "conectaHorecaProfesional",
          JSON.stringify(perfilCompleto)
        );


        // IR AL PERFIL

        window.location.href =
          "perfil.html";

      }
    );

  }



  // ========================================
  // MOSTRAR PERFIL PROFESIONAL
  // ========================================

  const profileName =
    document.getElementById("profileName");

  if (profileName) {

    const perfil =
      JSON.parse(
        sessionStorage.getItem(
          "conectaHorecaProfesional"
        )
      );


    if (perfil) {


      // NOMBRE

      const nombreCompleto =
        `${perfil.nombre || ""} ${perfil.apellido || ""}`.trim();

      profileName.textContent =
        nombreCompleto || "Profesional HORECA";


      // INICIALES

      const profileInitials =
        document.getElementById(
          "profileInitials"
        );

      if (profileInitials && nombreCompleto) {

        const partesNombre =
          nombreCompleto.split(" ");

        const iniciales =
          partesNombre
            .slice(0, 2)
            .map(function (parte) {
              return parte.charAt(0).toUpperCase();
            })
            .join("");

        profileInitials.textContent =
          iniciales;

      }


      // PUESTO

      const profileRole =
        document.getElementById(
          "profileRole"
        );

      if (profileRole) {

        profileRole.textContent =
          perfil.puestoPrincipal ||
          "Profesional HORECA";

      }


      // UBICACIÓN

      const profileLocation =
        document.getElementById(
          "profileLocation"
        );

      if (profileLocation) {

        profileLocation.textContent =
          perfil.ubicacion ||
          "Costa Rica";

      }


      // EXPERIENCIA

      const profileExperience =
        document.getElementById(
          "profileExperience"
        );

      if (profileExperience) {

        profileExperience.textContent =
          perfil.experiencia ||
          "Experiencia no especificada";

      }


      // IDIOMAS

      const idiomas = [];

      if (perfil.idiomaPrincipal) {
        idiomas.push(
          perfil.idiomaPrincipal
        );
      }

     if (
  perfil.segundoIdioma &&
  perfil.nivelSegundoIdioma
) {

  idiomas.push(
    `${perfil.segundoIdioma} (${perfil.nivelSegundoIdioma})`
  );

}

if (
  perfil.idiomaAdicional &&
  perfil.nivelIdiomaAdicional
) {

  idiomas.push(
    `${perfil.idiomaAdicional} (${perfil.nivelIdiomaAdicional})`
  );

}
      }


      const profileLanguages =
        document.getElementById(
          "profileLanguages"
        );

      if (profileLanguages) {

        profileLanguages.textContent =
          idiomas.length
            ? idiomas.join(" · ")
            : "No especificado";

      }


      // DISPONIBILIDAD

      const availabilityBadge =
        document.getElementById(
          "availabilityBadge"
        );

      if (availabilityBadge) {

        availabilityBadge.textContent =
          perfil.disponibleAhora
            ? "Disponible ahora"
            : "Disponibilidad futura";

      }


      // SOBRE MÍ

      const profileAbout =
        document.getElementById(
          "profileAbout"
        );

      if (profileAbout) {

        profileAbout.textContent =
          perfil.sobreMi ||
          "Este profesional todavía no ha agregado una presentación.";

      }


      // HABILIDADES

      const profileSkills =
        document.getElementById(
          "profileSkills"
        );

      if (profileSkills) {

        profileSkills.innerHTML = "";

        if (
          perfil.habilidades &&
          perfil.habilidades.length
        ) {

          perfil.habilidades.forEach(
            function (habilidad) {

              const tag =
                document.createElement("span");

              tag.className =
                "profile-tag";

              tag.textContent =
                habilidad;

              profileSkills.appendChild(tag);

            }
          );

        } else {

          profileSkills.textContent =
            "No se han agregado habilidades.";

        }

      }


      // OTROS PUESTOS

      const profileOtherRoles =
        document.getElementById(
          "profileOtherRoles"
        );

      if (profileOtherRoles) {

        profileOtherRoles.innerHTML = "";

        if (
          perfil.otrosPuestos &&
          perfil.otrosPuestos.length
        ) {

         perfil.otrosPuestos
  .filter(function (puesto) {

    return puesto !== perfil.puestoPrincipal;

  })
  .forEach(function (puesto) {

    const tag =
      document.createElement("span");

    tag.className =
      "profile-tag";

    tag.textContent =
      puesto;

    profileOtherRoles.appendChild(tag);

  });

        } else {

          profileOtherRoles.textContent =
            "No se han agregado otros puestos.";

        }

      }


      // TIPOS DE TRABAJO

      const profileWorkTypes =
        document.getElementById(
          "profileWorkTypes"
        );

      if (profileWorkTypes) {

        profileWorkTypes.textContent =
          perfil.tiposTrabajo &&
          perfil.tiposTrabajo.length
            ? perfil.tiposTrabajo.join(", ")
            : "No especificado";

      }


      // FECHA DISPONIBLE

      const profileStartDate =
        document.getElementById(
          "profileStartDate"
        );

      if (profileStartDate) {

        profileStartDate.textContent =
          perfil.disponibleAhora
            ? "Inmediata"
            : (
                perfil.fechaDisponible ||
                "No especificada"
              );

      }


      // CERTIFICACIONES

      const profileCertifications =
        document.getElementById(
          "profileCertifications"
        );

      if (profileCertifications) {

        profileCertifications.textContent =
          perfil.certificaciones ||
          "No se han agregado certificaciones.";

      }


      // EXPECTATIVAS DE PAGO

      const profilePayment =
        document.getElementById(
          "profilePayment"
        );

      if (profilePayment) {

        profilePayment.innerHTML = "";


        function agregarPago(
          titulo,
          monto
        ) {

          if (!monto) return;

          const item =
            document.createElement("div");

          item.className =
            "payment-profile-item";

          const numero =
            Number(monto);

          const montoFormateado =
            numero.toLocaleString(
              "es-CR"
            );

          item.innerHTML =
            `<span>${titulo}</span>
             <strong>₡${montoFormateado}</strong>`;

          profilePayment.appendChild(
            item
          );

        }


        if (perfil.pagoPorHora) {
          agregarPago(
            "Por hora",
            perfil.tarifaHora
          );
        }

        if (perfil.pagoSemanal) {
          agregarPago(
            "Semanal",
            perfil.tarifaSemanal
          );
        }

        if (perfil.pagoMensual) {
          agregarPago(
            "Mensual",
            perfil.tarifaMensual
          );
        }

        if (perfil.pagoEvento) {
          agregarPago(
            "Por evento",
            perfil.tarifaEvento
          );
        }


        if (
          profilePayment.children.length === 0
        ) {

          profilePayment.textContent =
            "No se especificaron expectativas de pago.";

        }

      }

    }

  }
  
});

// ========================================
// EMPRESA - PASO 1
// REGISTRO INICIAL
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  const companyForm =
    document.getElementById("companyForm");

  if (companyForm) {

    companyForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        const companyData = {

          nombreEmpresa:
            document.getElementById(
              "nombreEmpresa"
            ).value,

          tipoNegocio:
            document.getElementById(
              "tipoNegocio"
            ).value,

          ubicacionEmpresa:
            document.getElementById(
              "ubicacionEmpresa"
            ).value,

          nombreContacto:
            document.getElementById(
              "nombreContacto"
            ).value,

          apellidoContacto:
            document.getElementById(
              "apellidoContacto"
            ).value,

          cargoContacto:
            document.getElementById(
              "cargoContacto"
            ).value,

          emailEmpresa:
            document.getElementById(
              "emailEmpresa"
            ).value,

          codigoPaisEmpresa:
            document.getElementById(
              "codigoPaisEmpresa"
            ).value,

          telefonoEmpresa:
            document.getElementById(
              "telefonoEmpresa"
            ).value

        };


        sessionStorage.setItem(
          "conectaHorecaEmpresa",
          JSON.stringify(companyData)
        );


        window.location.href =
          "perfil-empresa.html";

      }
    );

  }

});
