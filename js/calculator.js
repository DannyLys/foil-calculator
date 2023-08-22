const foilTypeRadios = document.querySelectorAll('[name="foil"]');
const palletsNumberInput = document.getElementById("palletsNumberSlider");
const foilWeightInput = document.getElementById("foilWeight");
const foilWeightUltraInput = document.getElementById("foilWeightUltra");
const resultDayElements = document.querySelectorAll(".resultDay");
const resultWeekElements = document.querySelectorAll(".resultWeek");
const resultMonthElements = document.querySelectorAll(".resultMonth");
const resultYearElements = document.querySelectorAll(".resultYear");

function animateResults(resultElements, value) {
  const interval = 10;
  const steps = 30;

  resultElements.forEach(resultElement => {
    const stepValue = (value - parseFloat(resultElement.textContent)) / steps;

    let currentValue = parseFloat(resultElement.textContent);
    let currentStep = 0;
    const intervalId = setInterval(() => {
      currentValue += stepValue;
      resultElement.textContent = currentValue.toFixed(1) + " kg";
      currentStep++;

      if (currentStep >= steps) {
        clearInterval(intervalId);
        resultElement.textContent = value.toFixed(1) + " kg";
      }
    }, interval);
  });
}

function calculate() {
  const foilType = parseFloat(document.querySelector('[name="foil"]:checked').value);
  const palletsNumber = parseInt(palletsNumberInput.noUiSlider.get());
  const result2 = foilType === 17 ? 0.4 : foilType === 20 ? 0.47 : 0.54;
  const result3 = 0.23;

  const foilWeight = (result2 * palletsNumber).toFixed(1);
  foilWeightInput.value = foilWeight + " kg";
  const foilWeightUltra = (result3 * palletsNumber).toFixed(1);
  foilWeightUltraInput.value = foilWeightUltra + " kg";

  const resultDayValue = Math.max(parseFloat(foilWeight) - parseFloat(foilWeightUltra), 0);
  animateResults(resultDayElements, resultDayValue);

  const resultMonthValue = Math.max(30 * (parseFloat(foilWeight) - parseFloat(foilWeightUltra)), 0);
  animateResults(resultMonthElements, resultMonthValue);

  const resultWeekValue = Math.max(7 * (parseFloat(foilWeight) - parseFloat(foilWeightUltra)), 0);
  animateResults(resultWeekElements, resultWeekValue);

  const resultYearValue = Math.max(365 * (parseFloat(foilWeight) - parseFloat(foilWeightUltra)), 0);
  animateResults(resultYearElements, resultYearValue);
}

  noUiSlider.create(palletsNumberInput, {
    start: 0,
    step: 1,
    range: {
      min: 0,
      max: 3
    },
    pips: {
      mode: 'values',
      values: [0, 1, 2, 3],
      density: 4,
      format: {
        to: value => ['10', '100', '500', '1000'][value]
      }
    },
    format: {
      to: value => ['10', '100', '500', '1000'][value],
      from: value => ['10', '100', '500', '1000'].indexOf(value.toString())
    }
  });


palletsNumberInput.noUiSlider.on("update", function (values, handle, unencoded) {
  calculate();
});

foilTypeRadios.forEach(radio => {
  radio.addEventListener("change", calculate);
});

calculate();