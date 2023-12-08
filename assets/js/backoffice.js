window.addEventListener("DOMContentLoaded", () => {
    const URL = "https://striveschool-api.herokuapp.com/api/product/";

    const params = new URLSearchParams(window.location.search);
    console.log("params", params);

    const id = params.get("resourseId");
    console.log(" id ", id);

    if (id) {
        getRequest(URL, id);
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

const getRequest = (URL, id) => {
    fetch(URL + id, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2JhMDBkOGEyMDAwMThhNDhhNDAiLCJpYXQiOjE3MDE5NTY1MTIsImV4cCI6MTcwMzE2NjExMn0.xs47A595YQnVKzRty8Y-lGk4pGGqTQGMcCmqVCfeSIY",
        },
    })
        .then((response) => {
            console.log(response);

            if (response.ok) {
                return response.json();
            }
        })
        .then((obj) => {
            console.log(obj); /* Qui ho l'obj selezionato dall'Id */
            modifyPropObj(obj, id);
        })
        .catch((error) => console.log("PROBLEMA NELLA GET", error));
};

const modifyPropObj = (obj, id) => {
    const name = document.getElementById("name");
    name.value = obj.name;

    const description = document.getElementById("description");
    description.value = obj.description;

    const brand = document.getElementById("brand");
    brand.value = obj.brand;

    const price = document.getElementById("price");
    price.value = obj.price;

    const indirizzoImg = document.getElementById("imgURL");
    indirizzoImg.value = obj.imageUrl;

    const btn_backOffice = document.getElementById("btn-backOffice");
    btn_backOffice.classList.add("btn-success");
    btn_backOffice.textContent = "modifica Informazioni";
    btn_backOffice.type = "button";
    console.log(btn_backOffice);

    const sottotitoloPage = document.getElementById("sottotitolo");
    sottotitoloPage.textContent = "modifica-Oggetto";

    btn_backOffice.addEventListener("click", () => {
        putRequest(id, name, description, brand, price, indirizzoImg);
        cleanInputFields(name, description, brand, price, indirizzoImg);
    });
};

const putRequest = (id, name, description, brand, price, indirizzoImg) => {
    const URL = "https://striveschool-api.herokuapp.com/api/product/";

    fetch(URL + id, {
        method: "PUT",
        headers: {
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2JhMDBkOGEyMDAwMThhNDhhNDAiLCJpYXQiOjE3MDE5NTY1MTIsImV4cCI6MTcwMzE2NjExMn0.xs47A595YQnVKzRty8Y-lGk4pGGqTQGMcCmqVCfeSIY",

            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name.value,
            description: description.value,
            brand: brand.value,
            price: price.value,
            imageUrl: indirizzoImg.value,
        }),
    })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
        })
        .then((updatedObj) => {
            console.log(updatedObj);
        })

        .catch((error) => console.log(error));
};

const cleanInputFields = (name, description, brand, price, indirizzoImg) => {
    name.value = "";
    description.value = "";
    brand.value = "";
    price.value = "";
    indirizzoImg.value = "";
};
