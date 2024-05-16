function fetchFullName() {
  // Make AJAX request to fetch the user's full name from the server
  fetch("/get-fullname")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Display the user's full name on the dashboard
      displayFullName(data.fullName);
    })
    .catch((error) => {
      console.error("Error fetching user full name:", error);
    });
}

function displayFullName(fullName) {
  // Get the element where the full name will be displayed
  const fullNameElement = document.getElementById("user-fullname");
  // Set the inner HTML of the element to the user's full name
  fullNameElement.textContent = fullName;
}

module.exports = fetchFullName;
