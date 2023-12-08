window.addEventListener("DOMContentLoaded", () => {
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
            window.location.href = "homepage.html";
        }, 2000);
    });
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
