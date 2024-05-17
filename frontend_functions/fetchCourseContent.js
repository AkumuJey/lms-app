function fetchCourseContent() {
  // Get course ID from URL parameter (assuming course ID is passed in the URL)
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("id");

  // Make AJAX request to fetch course content from server
  fetch(`/courses/${courseId}`)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Display course content on the page
      displayCourseContent(data[0]);
    })
    .catch((error) => {
      console.error("Error fetching course content:", error);
    });
}

const trial = () => {
  console.log("Hellow World");
};
function displayCourseContent(courseContent) {
  // Get the course name element
  const courseNameElement = document.getElementById("course-name");
  // Set the course name
  console.log(courseContent)
  courseNameElement.textContent = courseContent.name;

  // Get the course content element
  const courseContentElement = document.getElementById("course-content");
  // Clear previous content
  // courseContentElement.innerHTML = "";

  // // Loop through the modules and display them
  // courseContent.forEach((module) => {
  //   const moduleSection = document.createElement("section");
  //   moduleSection.innerHTML = `
  //           <h2>${module.title}</h2>
  //           <p>${module.description}</p>
  //           <!-- Add more elements as needed (e.g., videos, quizzes) -->
  //       `;
  //   courseContentElement.appendChild(moduleSection);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchCourseContent();
});
