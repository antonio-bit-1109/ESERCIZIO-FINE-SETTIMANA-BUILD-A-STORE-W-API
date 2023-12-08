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
            deleteTheItem(selectedObj);
            /* deleteItemSurely(selectedObj); */
        })
        .catch((error) => {
            console.error(error);
        });
});

const deleteTheItem = (selectedObj) => {
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
};
/* prendi i valori negli input e crea una DELETE request al click del bottone "si" nel modale  */

/* const deleteItemSurely = (selectedObj) => {
    const confirmDeletebtn = document.getElementById("btn-ConfirmDelete");

    confirmDeletebtn.addEventListener("click", () => {
        console.log("ciao");
    });
}; */
