function fetchLeaderboardData() {
  // Make AJAX request to fetch leaderboard data from server
  fetch("/leaderboard")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Display leaderboard data on the page
      displayLeaderboardData(data);
    })
    .catch((error) => {
      console.error("Error fetching leaderboard data:", error);
    });
}
