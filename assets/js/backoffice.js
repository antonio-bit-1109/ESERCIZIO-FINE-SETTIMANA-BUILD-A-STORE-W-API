window.addEventListener("DOMContentLoaded", () => {
    const URL = "https://striveschool-api.herokuapp.com/api/product/";

    const params = new URLSearchParams(window.location.search);
    console.log("params", params);

    const id = params.get("resourseId");
    console.log(" id ", id);

    if (id) {
        putRequest();
    } else {
        const form = document.getElementById("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            postRequest();
            form.reset();
        });
    }
});

const postRequest = () => {
    const nome = document.getElementById("name");
    const description = document.getElementById("description");
    const brand = document.getElementById("brand");
    const price = document.getElementById("price");
    const imgUrl = document.getElementById("imgURL");

    URL = "https://striveschool-api.herokuapp.com/api/product/";

    const obj = {
        name: nome.value,
        description: description.value,
        brand: brand.value,
        price: price.value,
        imageUrl: imgUrl.value,
    };

    fetch(URL, {
        method: "POST",
        headers: {
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2JhMDBkOGEyMDAwMThhNDhhNDAiLCJpYXQiOjE3MDE5NTY1MTIsImV4cCI6MTcwMzE2NjExMn0.xs47A595YQnVKzRty8Y-lGk4pGGqTQGMcCmqVCfeSIY",

            "Content-Type": "application/json",
        },

        body: JSON.stringify(obj),
    })
        .then((databaseResponse) => {
            if (databaseResponse.ok) {
                return databaseResponse.json();
            }
        })
        .catch((error) => console.log("AMICO MIO, GUAI IN VISTA CON ", error));
};

const putRequest = () => {};
