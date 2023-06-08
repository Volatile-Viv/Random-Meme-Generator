document.addEventListener("DOMContentLoaded", function () {
  // Get the generate button and meme container elements
  const generateButton = document.getElementById("generate-button");
  const memeContainer = document.getElementById("meme-container");

  // Add a click event listener to the generate button
  generateButton.addEventListener("click", generateMeme);

  // Function to generate a random meme
  function generateMeme() {
    // Clear the meme container
    memeContainer.innerHTML = "";

    // Make a request to fetch meme data from the Reddit API
    fetch("https://www.reddit.com/r/memes.json")
      .then((response) => response.json())
      .then((data) => {
        // Get an array of meme posts from the response data
        const memePosts = data.data.children;

        // Choose a random meme post
        const randomPost =
          memePosts[Math.floor(Math.random() * memePosts.length)].data;

        // Create an image element for the meme
        const memeImage = document.createElement("img");

        // Resize the image to a specific width (e.g., 500px)
        memeImage.onload = function () {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = 500;
          canvas.height = (500 * memeImage.height) / memeImage.width;
          context.drawImage(memeImage, 0, 0, canvas.width, canvas.height);
          memeImage.src = canvas.toDataURL();
        };

        memeImage.src = randomPost.url;
        memeImage.alt = randomPost.title;

        // Append the meme image to the meme container
        memeContainer.appendChild(memeImage);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
});
