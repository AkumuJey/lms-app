function fetchCourseContent() {
  // Get course ID from URL parameter (assuming course ID is passed in the URL)
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("id");

  // Make AJAX request to fetch course content from server
  fetch(`/course/${courseId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Display course content on the page
      displayCourseContent(data);
    })
    .catch((error) => {
      console.error("Error fetching course content:", error);
    });
}
