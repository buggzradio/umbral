  // Redirect if not logged in
  if(localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "/umbral"; // change path to your login page
  }
