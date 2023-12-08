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
};
