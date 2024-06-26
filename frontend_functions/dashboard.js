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

coursesForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(coursesForm);
  console.log(formData.getAll("courses"));
  const selectedCoursesIds = formData.getAll("courses");
  console.log(selectedCoursesIds);
  try {
    const response = await fetch("/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedCoursesIds,
      }),
    });
    window.location.href = "/leaderboard";
  } catch (error) {
    alert("failed");
    console.log(error);
  }
});

const showName = async () => {
  const coursesData = await fetch("/courses").then((response) =>
    response.json()
  );
  fetchFullName();
  populateCheckBox(coursesData.data);
};

const fetchUserCourses = () => {
  fetch("/courses/user-courses")
    .then((response) => response.json())
    .then((data) => {
      console.log("This: ", data);
      const courses = data.rows;
      console.log(courses);
      displayUserCourses(courses);
    });
};

const displayUserCourses = (courses) => {
  const courseListDiv = document.getElementById("user_courses");
  // Iterate over the courses and create links
  courses.forEach((course) => {
    const courseDiv = document.createElement("user_courses");
    courseDiv.innerHTML = `
        <li><a href="dashboard/${course.id}"> ${course.name} </a></li>
      `;
    courseListDiv.appendChild(courseDiv);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const coursesData = await fetch("/courses").then((response) =>
    response.json()
  );
  fetchFullName();
  populateCheckBox(coursesData.data);
  await fetchUserCourses();
});
