window.addEventListener("DOMContentLoaded", () => {
    getRequest();
});

const getRequest = () => {
    const URL = "https://striveschool-api.herokuapp.com/api/product/";

    fetch(URL, {
        method: "GET",
        headers: {
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2JhMDBkOGEyMDAwMThhNDhhNDAiLCJpYXQiOjE3MDE5NTY1MTIsImV4cCI6MTcwMzE2NjExMn0.xs47A595YQnVKzRty8Y-lGk4pGGqTQGMcCmqVCfeSIY",
        },
    })
        .then((response) => {
            console.log(response);

            /* condizioni di guardia  */
            if (response.status >= 400 && response.status < 500) {
                throw new Error("HAI SBAGLIATO QUALCOSA AMICO MIO");
            }
            if (response.status >= 500 && response.status < 600) {
                throw new Error("FORSE NON è PROPRIO TUTTA COLPA TUA");
            }

            /* condizione di success */
            if (response.status >= 200 && response.status < 300) {
                if (response.ok) {
                    return response.json();
                }
            }
        })
        .then((collection) => {
            /* implemento obj del GET nel DOM  */
            console.log(collection);
            buildTheStore(collection);
        })
        .catch((error) => {
            console.error(" QUALCOSA NON VA", error);
        });
};

const buildTheStore = (arrayObjs) => {
    const row = document.getElementById("main-row");

    for (let i = 0; i < arrayObjs.length; i++) {
        let singleObj = arrayObjs[i];

        const col = document.createElement("div");
        col.classList.add("col", "m-3", "mt-7");
        row.appendChild(col);

        col.innerHTML += `
                    <div class="this">
                        <div class= "d-flex justify-content-center align-items-center h-100 w-100">  
                            <div class="h-100">
                                <img src="${singleObj.imageUrl}" class="card-img-top p-3 img-prop" alt="cellulare">
                            </div>
                            <div class=" d-flex flex-column justify-content-center h-100 p-3 max-w-200 max-h-400">
                                <h4 class="card-title">${singleObj.name}</h4>
                                <h5 class="card-title">${singleObj.brand}</h5>
                                <p class="card-text mt-1 overflow-auto">${singleObj.description}</p>
                                <p class="card-text text-primary fw-bold fs-1">${singleObj.price} €</p>
                            </div>
                            <div class="p-2 d-flex flex-column terzoDiv h-100 justify-content-center">
                                <a href="./phone-details.html?resourseId=${singleObj._id}"><button type="button" class="btn success-modify text-light w-50 moreInfo mb-2"> Scopri di più </button></a>
                                <a href="./deletePage.html?resourseId=${singleObj._id}"><button type="button" class="btn danger-modify text-light w-50 moreInfo"> Cancella Item </button></a>
                            </div>
                        </div>
                    </div>
                    `;
    }
};
