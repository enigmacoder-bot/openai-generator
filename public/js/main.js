let dataa;
function onSubmit(e) {
  e.preventDefault();

  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please add some text");
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    const data = await response.json();
    // console.log(data);

    const imageUrl = data.data;
    dataa = imageUrl;
    document.querySelector("#image").src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

const btn = document.querySelector(".bn30");
const url = dataa;

async function downloadImage(url) {
  fetch(url, {
    mode: "no-cors",
  })
    .then((response) => response.blob())
    .then((blob) => {
      let a = document.createElement("a");
      // a.crossOrigin = "Anonymous";

      a.download = url;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  downloadImage(dataa);
});

document.querySelector("#image-form").addEventListener("submit", onSubmit);
