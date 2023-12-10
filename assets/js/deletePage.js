const spinnerLoading = () => {
    const spinner = document.querySelector("#spinner");
    spinner.innerHTML += `
    <span class="visually-hidden">Loading...</span>
    `;
};

const removeSpinner = () => {
    const spinner = document.querySelector("#spinner");
    spinner.classList.add("d-none");
};

const loadingDOMStart = new Date().getTime();
console.log("tempo iniziale", loadingDOMStart);

window.addEventListener("DOMContentLoaded", () => {
    spinnerLoading();

    URL = "https://striveschool-api.herokuapp.com/api/product/";

    const params = new URLSearchParams(window.location.search);
    console.log("params", params);

    const id = params.get("resourseId");
    console.log(" id ", id);

    fetch(URL + id, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization:
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2JhMDBkOGEyMDAwMThhNDhhNDAiLCJpYXQiOjE3MDE5NTY1MTIsImV4cCI6MTcwMzE2NjExMn0.xs47A595YQnVKzRty8Y-lGk4pGGqTQGMcCmqVCfeSIY",
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((selectedObj) => {
            deleteTheItem(selectedObj, id);
            /* deleteItemSurely(selectedObj); */
        })
        .catch((error) => {
            console.error(error);
        });
});

const deleteTheItem = (selectedObj, id) => {
    console.log(selectedObj);

    const boxImg = document.getElementById("box-Img");
    const img = document.createElement("img");
    img.src = selectedObj.imageUrl;
    img.classList.add("aspect-details-back-office", "p-3");
    boxImg.appendChild(img);

    const sottotitolo = document.getElementById("sottotitolo");
    sottotitolo.innerHTML = `Stai per cancellare: <div class="fw-bold ms-1" > ${selectedObj.name} </div>`;

    const nameInput = document.getElementById("name");
    nameInput.value = selectedObj.name;

    const descriptionInput = document.getElementById("description");
    descriptionInput.value = selectedObj.description;

    const brandInput = document.getElementById("brand");
    brandInput.value = selectedObj.brand;

    const priceInput = document.getElementById("price");
    priceInput.value = selectedObj.price;

    const imgURLInput = document.getElementById("imgURL");
    imgURLInput.value = selectedObj.imageUrl;

    const btnConfirmDelete = document.getElementById("btn-ConfirmDelete");

    btnConfirmDelete.addEventListener("click", () => {
        confirmDeleting(id);
        setTimeout(() => {
            window.location.href = "homepage.html?alertId=100"; /* me lo riporta in homepage con alertId?? */
        }, time(tempoCaricamento));
    });

    removeSpinner();

    const loadingDOMEnd = new Date().getTime();
    console.log("tempo finale", loadingDOMEnd);

    const tempoCaricamento = loadingDOMEnd - loadingDOMStart;
    console.log("tempo caricamento", tempoCaricamento);

    const time = (tempoCaricamento) => {
        return tempoCaricamento + 500;
    };
};

const confirmDeleting = (id) => {
    URL = "https://striveschool-api.herokuapp.com/api/product/";

    fetch(URL + id, {
        method: "DELETE",
        headers: {
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2JhMDBkOGEyMDAwMThhNDhhNDAiLCJpYXQiOjE3MDE5NTY1MTIsImV4cCI6MTcwMzE2NjExMn0.xs47A595YQnVKzRty8Y-lGk4pGGqTQGMcCmqVCfeSIY",
            "content-type": "application/json",
        },
    })
        .then((response) => {
            response.json();
        })
        .then((response) => {
            if (response.ok) {
                console.log(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
