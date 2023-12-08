window.addEventListener("DOMContentLoaded", () => {
    const URL = "https://striveschool-api.herokuapp.com/api/product/";

    const params = new URLSearchParams(window.location.search);
    console.log("params", params);

    const id = params.get("resourseId");
    console.log(" id ", id);

    getInfo(URL, id);
});

const getInfo = (URL, id) => {
    fetch(URL + id, {
        method: "GET",
        headers: {
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2JhMDBkOGEyMDAwMThhNDhhNDAiLCJpYXQiOjE3MDE5NTY1MTIsImV4cCI6MTcwMzE2NjExMn0.xs47A595YQnVKzRty8Y-lGk4pGGqTQGMcCmqVCfeSIY",
        },
    })
        .then((response) => {
            console.log(response);

            if (!response.ok) {
                throw new Error("C'è QALQUADRA CHE NON COSA ");
            }

            if (response.ok) {
                return response.json();
            }
        })
        .then((objInfos) => {
            /* qui ricavo le mie info */
            createInfoPage(objInfos);
        })

        .catch((error) => {
            console.log(error);
        });
};

const createInfoPage = (GETobj) => {
    console.log(GETobj);

    const imgBox = document.getElementById("imgBox");
    const imgProduct = document.createElement("img");
    imgProduct.src = GETobj.imageUrl;
    imgProduct.classList.add("aspect-details");
    imgBox.appendChild(imgProduct);

    const infoBox = document.getElementById("infoBox");
    infoBox.innerHTML += `
    
    <div>
        <h3 class="list-group-item fs-5">${GETobj.brand}</h3>
        <h1 class="list-group-item fs-2">${GETobj.name}</h1>
        <h3 class="list-group-item fs-4">${GETobj.description}</h3>
        <h2 class="list-group-item text-primary display-2">${GETobj.price} &#8364; </h2>
        <div>
            <h4> Informazioni dal Server </h4>
            <p> creato il: <span class="text-secondary fw-bold"> ${new Date(
                GETobj.createdAt
            ).toLocaleDateString()}</span></p>
            <p>modificato il: <span class="text-secondary fw-bold"> ${new Date(
                GETobj.updatedAt
            ).toLocaleDateString()}</span></p>
            <p> id prodotto: <span class="text-secondary fw-bold">${GETobj._id}</span></p>
        </div>
        <div>
        <a href="./backoffice.html?resourseId=${GETobj._id}">
        <button class="btn primary-modify text-light"> Modifica Dettagli </button></a>
        </div>
    </div>`;
};
