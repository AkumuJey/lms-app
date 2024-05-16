function populateCheckBox(coursesData) {
  const optionsHolder = document.getElementById("course-options");
  optionsHolder.innerHTML = "";
  // Loop through the data and create options
  coursesData.forEach((course) => {
    const checkboxLabel = document.createElement("label");
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.name = "courses";
    checkboxInput.value = course.id;
    checkboxLabel.appendChild(checkboxInput);
    checkboxLabel.appendChild(document.createTextNode(course.name));
    optionsHolder.appendChild(checkboxLabel);
    optionsHolder.appendChild(document.createElement("br"));
  });
}

const coursesForm = document.getElementById("courses-selection");

coursesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(coursesForm);
  console.log(formData.getAll("courses"));
});

const showName = async () => {
  const coursesData = await fetch("/courses").then((response) =>
    response.json()
  );
  fetchFullName();
  populateCheckBox(coursesData.data);
};
