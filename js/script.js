const cards = document.querySelectorAll(".tm-gallery-item"),
    input = document.querySelector('[name="search-input"]'),
    filterSelect = document.querySelector(".filters-select"),
    filterButtons = document.querySelectorAll(".filter-panel__btns button");

function filteredInputCard(data) {
    let value = data.toLowerCase()

    cards.forEach(card => {
        if (card.children[0].children[1].children[0].innerHTML.toLocaleLowerCase().indexOf(value) > -1) {
            card.style.display = ""
        } else {
            card.style.display = "none"

        }
    })
}

input.addEventListener("keyup", () => {
    let inputValue = input.value;
    filteredInputCard(inputValue)
})


function filteredCard(data) {
    let value = data.toLowerCase()

    cards.forEach(card => {
        if (card.children[0].children[1].children[1].innerHTML.toLocaleLowerCase().indexOf(value) > -1 || value === "усі") {
            card.style.display = ""
        } else {
            card.style.display = "none"
        }
    })
}


filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filteredCard(btn.innerHTML)
    })
})


filterSelect.addEventListener("change", () => {
    filteredCard(filterSelect.value)
})


//form

const TOKEN = "6179662572:AAGs8e2j23w7gdc-IsjjlOQVm_mwRKQ8PQo",
    CHAT_ID = "-1001895041399",
    URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`,
    successAlert = document.querySelector("#suc-alert"),
    form = document.querySelector("#telegram-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let message = `<b>Order from website:</b>\n`;
    message += `<b>Client name: ${this.name.value}</b>\n`;
    message += `<b>Client phone: ${this.phone.value}</b>\n`;
    message += `<b>Client message: ${this.message.value}</b>\n`;
    message += `<b>Time: ${new Date().toJSON()}</b>`;

    axios.post(URL, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message
    })
        .then((res) => {
            this.name.value = ""
            this.phone.value = ""
            this.message.value = ""
            successAlert.innerHTML = "MESSAGE WAS SENDED !"
            successAlert.style.display = "block"
        })
        .catch((error) => {
            console.log(error);
            successAlert.innerHTML = "some error,try again !"
            successAlert.style.display = "block"
        })

})
