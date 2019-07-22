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

// Escuchar cuando el usuario da click al botón para enviar la encuesta
$("#submit-button").click(() => {
  console.log(questionGroup5.find(":selected").text());
  if (areFieldsComplete()) {
    // TODO: Enviar cuestionario
  } else {
    alert("Por favor completa todos los campos antes de enviar el formulario.");
  }
});

// Validar que los campos estén completos
function areFieldsComplete() {
  return (
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
    questionGroup12.find(":selected").text() !== "Selecciona" &&
    questionGroup13.find(":selected").text() !== "Selecciona" &&
    questionGroup14.find(":selected").text() !== "Selecciona" &&
    questionGroup15.find(":selected").text() !== "Selecciona" &&
    questionGroup16.find(":selected").text() !== "Selecciona" &&
    questionGroup17.find(":selected").text() !== "Selecciona" &&
    questionGroup18.find(":selected").text() !== "Selecciona" &&
    questionGroup19.find(":selected").text() !== "Selecciona" &&
    questionGroup20.find(":selected").text() !== "Selecciona" &&
    questionGroup21.find(":selected").text() !== "Selecciona"
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

setSimpleValueValidator(questionInput1);
setSimpleValueValidator(questionInput4);
setSimpleValueValidator(questionInput6);
setSimpleValueValidator(questionInput7);
setSimpleValueValidator(questionInput8);
