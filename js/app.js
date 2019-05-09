// Variables
const form = document.getElementById("request-form");

const html = new HTMLUI();

// Event Listener

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", function() {
    // Create the <option> for the years
    html.displayYears();
  });

  // When the form is submitted
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Read the values from the form
    const make = document.getElementById("make").value;
    const year = document.getElementById("year").value;
    // Read the radio buttons
    const level = document.querySelector('input[name="level"]:checked').value;

    // Check that all the fields have something
    if (make === "" || year === "" || level === "") {
      html.displayError("All the fields are mandatory");
    } else {
      // Clear the previous quotes
      const prevResult = document.querySelector("#result div");
      if (prevResult != null) {
        prevResult.remove();
      }

      // Make the quotation
      const insurance = new Insurance(make, year, level);
      const price = insurance.calculateQuotation(insurance);

      // Print the result from HTMLUI();
      html.showResults(price, insurance);
    }
  });
}

// Objects

// Everything related to the quotation and calculations is Insurance
function Insurance(make, year, level) {
  this.make = make;
  this.year = year;
  this.level = level;
}
// Calculate the price the current quotation
Insurance.prototype.calculateQuotation = function(insurance) {
  let price;
  const base = 2000;

  // Get the make
  const make = insurance.make;

  /*
  1 = American 15%
  2= Asian 05%
  3 = European 35%
  */
  switch (make) {
    case "1":
      price = base * 1.15;
      break;
    case "2":
      price = base * 1.05;
      break;
    case "3":
      price = base * 1.35;
      break;
  }

  // Get the year
  const year = insurance.year;

  const difference = this.getYearDifference(year);

  // Each year the cost of insurance is going to be 3% cheaper
  price = price - (difference * 3 * price) / 100;

  // Get the years difference
};

// Returns the difference between years
Insurance.prototype.getYearDifference = function(year) {
  return new Date().getFullYear() - year;
};

// Everything related to HTML
function HTMLUI() {}

// Displace the latest 20 years in select
HTMLUI.prototype.displayYears = function() {
  // Max and min years
  const max = new Date().getFullYear();
  min = max - 20;

  // Generate the list with the latest 20 years
  const selectYears = document.getElementById("year");

  // Print the values
  for (let i = max; i > min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYears.appendChild(option);
  }
};
// Print an error
HTMLUI.prototype.displayError = function(message) {
  // Create a div
  const div = document.createElement("div");
  div.classList = "error";

  // Insert the message
  div.innerHTML = `
  <p>${message}</p>
  `;

  form.insertBefore(div, document.querySelector(".form-group"));

  // Remove the error
  setTimeout(function() {
    document.querySelctor(".error").remove();
  }, 3000);
};

// Prints the result in the HTML
HTMLUI.prototype.showResult = function(price, insurance) {
  // Print the result
  const result = document.getElementById("result");

  // Create a div with the result
  const div = document.createElement("div");

  // Get make form the objewct and assign readable name
  const make = insurance.make;

  switch (make) {
    case "1":
      make = "American";
      break;
    case "2":
      make = "Asian";
      break;
    case "3":
      make = "European";
      break;
  }

  div.innerHTML = `
  <p> class="header">Summary</p>
  <p>Make: ${make}</p>
  <p>Year: ${insurance.year}</p>
  <p>Level: ${insurance.level}</p>
  <p> class="total">Total: $ ${price}</p>
  `;

  document.querySelector("#loading img");
  spinner.style.display = "block";

  setTimeout(function() {
    spinner.style.display = "none";
    result.appendChild(div);
  }, 3000);

  // Insert into HTML
  result.appendChild(div);
};
