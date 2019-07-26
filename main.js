"use strict";

// Guardar inputs
const questionInput1 = $("#question-input-1");
const questionInput2 = $("#question-input-2");
const questionInput3 = $("#question-input-3");
const questionInput4 = $("#question-input-4");
const questionGroup5 = $("#question-group-select-5");
const questionInput6 = $("#question-input-6");
const questionInput7 = $("#question-input-7");
const questionInput8 = $("#question-input-8");
const questionGroup9 = $("#question-group-select-9");
const questionGroup10 = $("#question-group-select-10");
const questionGroup11 = $("#question-group-select-11");
const questionGroup12 = $("#question-group-select-12");
const questionGroup13 = $("#question-group-select-13");
const questionGroup14 = $("#question-group-select-14");
const questionGroup15 = $("#question-group-select-15");
const questionGroup16 = $("#question-group-select-16");
const questionGroup17 = $("#question-group-select-17");
const questionGroup18 = $("#question-group-select-18");
const questionGroup19 = $("#question-group-select-19");
const questionGroup20 = $("#question-group-select-20");
const questionGroup21 = $("#question-group-select-21");

const question12OtherInput = $("#question-group-select-12-other");
const question13OtherInput = $("#question-group-select-13-other");
const question14OtherInput = $("#question-group-select-14-other");
const question17OtherInput = $("#question-group-select-17-other");
const question18OtherInput = $("#question-group-select-18-other");

// Escuchar cuando el usuario da click al botón para enviar la encuesta
$("#submit-button").click(() => {
  if (areFieldsComplete()) {
    // TODO: Enviar cuestionario
    if (checkPhotoInputs()) {
      if (!isThereMoreThanOneMe()) {
        // Obtener los datos de la encuesta
        const ingreso_mensual = parseInt(
          questionInput1.val().replace(/ /g, "")
        );
        const direccion = questionInput2.val().replace(/ /g, "");
        const lugar_nacimiento = questionInput3.val().replace(/ /g, "");
        const dinero_semanal = questionInput4.val().replace(/ /g, "");
        const complicaciones_con_la_cuota =
          questionGroup5.find(":selected").text() == "Sí";
        const amigos = parseInt(questionInput6.val().replace(/ /g, ""));
        const personas_en_casa = parseInt(
          questionInput7.val().replace(/ /g, "")
        );
        const automoviles_en_casa = parseInt(
          questionInput8.val().replace(/ /g, "")
        );
        const internet = questionGroup9.find(":selected").text() == "Sí";
        const computadora_propia =
          questionGroup10.find(":selected").text() == "Sí";
        const necesitas_trabajar =
          questionGroup11.find(":selected").text() == "Sí";
        const como_conociste_inviertete =
          questionGroup12.find(":selected").text() == "Otro"
            ? $("#question-group-select-12-other").val()
            : questionGroup12.find(":selected").text();
        const por_que_entraste_a_inviertete =
          questionGroup13.find(":selected").text() == "Otro"
            ? $("#question-group-select-13-other").val()
            : questionGroup13.find(":selected").text();
        const que_querias_aprender =
          questionGroup14.find(":selected").text() == "Otro"
            ? $("#question-group-select-14-other").val()
            : questionGroup13.find(":selected").text();
        const como_aprendes_mejor = questionGroup15.find(":selected").text();
        const area_estudiar = questionGroup16.find(":selected").text();
        const materia_favorita_antes_de_inviertate = questionGroup17
          .find(":selected")
          .text();
        const materia_favorita_ahora = questionGroup18.find(":selected").text();
        const deporte = questionGroup19.find(":selected").text() == "Sí";
        const vas_a_inviertete_por_alguien_que_te_gusta =
          questionGroup20.find(":selected").text() == "Sí";
        const ocupado = questionGroup21.find(":selected").text();
        const names = [
          "ivan",
          "jose",
          "ximena",
          "genaro",
          "alejandra",
          "megan",
          "katia",
          "daniel_pineda",
          "daniel_rosales",
          "perla",
          "josue",
          "sahori",
          "miriam"
        ];

        let puntuaciones = [];

        for (let i = 1; i <= 13; i++) {
          const formId = "#photo-form-" + i;
          const checkboxName = "photo-checkbox-" + i;
          const inputId = "#photo-input-" + i;
          const inputValue = parseInt($(inputId).val());
          const name = names[i - 1];

          if (inputValue >= 0) {
            puntuaciones.push({ key: name, value: inputValue });
          } else {
            const checkedValue = $(
              `input[name=${checkboxName}]:checked`,
              formId
            ).val();

            if (checkedValue == "soy-yo") {
              puntuaciones.push({ key: name, value: -1 });
            } else if (checkedValue == "no-lo-conozco") {
              puntuaciones.push({ key: name, value: -2 });
            }
          }
        }

        axios
          .post("https://inviertete-poll.herokuapp.com/", {
            ingreso_mensual,
            direccion,
            lugar_nacimiento,
            dinero_semanal,
            complicaciones_con_la_cuota,
            amigos,
            personas_en_casa,
            automoviles_en_casa,
            internet,
            computadora_propia,
            necesitas_trabajar,
            como_conociste_inviertete,
            por_que_entraste_a_inviertete,
            que_querias_aprender,
            como_aprendes_mejor,
            area_estudiar,
            materia_favorita_antes_de_inviertate,
            materia_favorita_ahora,
            deporte,
            vas_a_inviertete_por_alguien_que_te_gusta,
            ocupado,
            puntuaciones
          })
          .then(function(response) {
            alert(response.data.message);
          })
          .catch(function(response) {
            alert(
              "Ocurrió un error al guardar tu respuesta a la encuesta, asegúrate de que contestaste todos los campos de manera correcta y de que tienes conexión a internet."
            );
          });
      } else {
        alert("No puedes seleccionar más de una vez la opción 'soy yo'.");
      }
    } else {
      alert(
        "Por favor revisa que los campos en las fotografías estén rellenados correctamente."
      );
    }
  } else {
    alert(
      "Por favor completa todas las preguntas correctamente antes de enviar el formulario."
    );
  }
});

// Validar que los campos estén completos
function areFieldsComplete() {
  const firstCondition =
    questionInput1.val().replace(/ /g, "") !== "" &&
    questionInput2.val().replace(/ /g, "") !== "" &&
    questionInput3.val().replace(/ /g, "") !== "" &&
    questionInput4.val().replace(/ /g, "") !== "" &&
    questionGroup5.find(":selected").text() !== "Selecciona" &&
    questionInput6.val().replace(/ /g, "") !== "" &&
    questionInput7.val().replace(/ /g, "") !== "" &&
    questionInput8.val().replace(/ /g, "") !== "" &&
    questionGroup9.find(":selected").text() !== "Selecciona" &&
    questionGroup10.find(":selected").text() !== "Selecciona" &&
    questionGroup11.find(":selected").text() !== "Selecciona" &&
    questionGroup15.find(":selected").text() !== "Selecciona" &&
    questionGroup16.find(":selected").text() !== "Selecciona" &&
    questionGroup19.find(":selected").text() !== "Selecciona" &&
    questionGroup20.find(":selected").text() !== "Selecciona" &&
    questionGroup21.find(":selected").text() !== "Selecciona";

  const secondCondition =
    (questionGroup12.find(":selected").text() !== "Selecciona" &&
      questionGroup12.find(":selected").text() !== "Otro") ||
    (questionGroup12.find(":selected").text() === "Otro" &&
      question12OtherInput.val().replace(/ /g, "") !== "");

  const thirtCondition =
    (questionGroup13.find(":selected").text() !== "Selecciona" &&
      questionGroup13.find(":selected").text() !== "Otro") ||
    (questionGroup13.find(":selected").text() === "Otro" &&
      question13OtherInput.val().replace(/ /g, "") !== "");

  const fourthCondition =
    (questionGroup14.find(":selected").text() !== "Selecciona" &&
      questionGroup14.find(":selected").text() !== "Otro") ||
    (questionGroup14.find(":selected").text() === "Otro" &&
      question14OtherInput.val().replace(/ /g, "") !== "");

  const sixthCondition =
    (questionGroup17.find(":selected").text() !== "Selecciona" &&
      questionGroup17.find(":selected").text() !== "Otro") ||
    (questionGroup17.find(":selected").text() === "Otro" &&
      question17OtherInput.val().replace(/ /g, "") !== "");

  const seventhCondition =
    (questionGroup18.find(":selected").text() !== "Selecciona" &&
      questionGroup18.find(":selected").text() !== "Otro") ||
    (questionGroup18.find(":selected").text() === "Otro" &&
      question18OtherInput.val().replace(/ /g, "") !== "");

  const condition8 = parseInt(questionInput1.val().replace(/ /g, "")) >= 0;
  const condition9 = parseInt(questionInput4.val().replace(/ /g, "")) >= 0;
  const condition10 = parseInt(questionInput6.val().replace(/ /g, "")) >= 0;
  const condition11 = parseInt(questionInput7.val().replace(/ /g, "")) >= 0;
  const condition12 = parseInt(questionInput8.val().replace(/ /g, "")) >= 0;

  return (
    firstCondition &&
    secondCondition &&
    thirtCondition &&
    fourthCondition &&
    sixthCondition &&
    seventhCondition &&
    condition8 &&
    condition9 &&
    condition10 &&
    condition11 &&
    condition12
  );
}

// Configurar un simple 'validador' para asegurarse de que un input tenga un valor mayor o igual a 0
function setSimpleValueValidator(questionInput) {
  questionInput.keyup(() => {
    if (parseInt(questionInput.val()) < 0) {
      // Agregar color al input para denotar que no es un valor válido
      questionInput.css({ border: "1px solid red" });
    } else {
      // Agregar color para denotar que el valor sí es válido :)
      questionInput.css({ border: "1px solid green" });
    }
  });
}

// Muestra el campo otro cuando el valor de cierto input es seleccionado como 'otro'
function setSimpleFieldShower(questionInputId) {
  $(`#${questionInputId}`).change(() => {
    // Verificar si el campo 'otro' fue seleccionado
    if ($(`#${questionInputId}`).val() === "other") {
      $(`#${questionInputId}` + "-other").removeAttr("hidden");
    } else {
      $(`#${questionInputId}` + "-other").attr("hidden", true);
    }
  });
}

// Se asegura de que todos los inputs de las fotos sean válidos
function checkPhotoInputs() {
  for (let i = 1; i <= 13; i++) {
    const formId = "#photo-form-" + i;
    const checkboxName = "photo-checkbox-" + i;
    const inputId = "#photo-input-" + i;

    const checkedValue = $(`input[name=${checkboxName}]:checked`, formId).prop(
      "checked"
    );
    const inputValue = parseInt($(inputId).val());

    return (
      (inputValue >= 0 && !checkedValue) ||
      ($(inputId)
        .val()
        .replace(/ /g, "") == "" &&
        checkedValue)
    );
  }
}

function setValidatorsForPhotoInputs() {
  for (let i = 1; i <= 13; i++) {
    const inputId = "#photo-input-" + i;
    setSimpleValueValidator($(inputId));
  }
}

function setValueValidatorForPhotoInputsAndCheckboxes() {
  for (let i = 1; i <= 13; i++) {
    const formId = "#photo-form-" + i;
    const checkboxName = "photo-checkbox-" + i;
    const inputId = "#photo-input-" + i;

    // Remover el valor 'checked' cuando el usuario ingrese un número
    $(inputId).keyup(() => {
      $(`input[name=${checkboxName}]:checked`, formId).prop("checked", false);
    });

    // Remover el texto cuando el suario seleccione una opción
    $(`input[name=${checkboxName}]`, formId).change(() => {
      if ($(inputId).val().length != 0) {
        $(inputId).val("");
      }
    });
  }
}

function isThereMoreThanOneMe() {
  let me = 0;

  for (let i = 1; i <= 13; i++) {
    const formId = "#photo-form-" + i;
    const checkboxName = "photo-checkbox-" + i;
    const checkedValue = $(`input[name=${checkboxName}]:checked`, formId).val();

    if (checkedValue == "soy-yo") {
      me += 1;
    }
  }

  return me > 1;
}

setSimpleValueValidator(questionInput1);
setSimpleValueValidator(questionInput4);
setSimpleValueValidator(questionInput6);
setSimpleValueValidator(questionInput7);
setSimpleValueValidator(questionInput8);

setSimpleFieldShower("question-group-select-12");
setSimpleFieldShower("question-group-select-13");
setSimpleFieldShower("question-group-select-14");
setSimpleFieldShower("question-group-select-17");
setSimpleFieldShower("question-group-select-18");

setValidatorsForPhotoInputs();
setValueValidatorForPhotoInputsAndCheckboxes();
