if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)

} else {
    ready()
}

function ready() {
    let rateRegister = document.getElementById('rateInput')
    let quantityRegister = document.getElementById('quantityInput')
    let tableButton = document.getElementsByClassName('table__button')[0]
    let rowsContainer = document.getElementById('rowsContainer')[0]


    rateRegister.addEventListener('keyup', function () {
        let quantity = document.getElementById('quantityInput').value
        let price = document.getElementById('priceInput')
        let rate = event.target.value
        price.value = quantity * rate
    })


    quantityRegister.addEventListener('keyup', function () {
        let quantity = event.target.value
        let price = document.getElementById('priceInput')
        let rate = document.getElementById('rateInput').value
        price.value = quantity * rate
    })




    tableButton.addEventListener('click', function () {
        let rowsContainer = document.getElementById('rowsContainer')
        let identity = document.getElementById('brandIdentity')
        let rate = document.getElementById('rateInput').value
        let quantity = document.getElementById('quantityInput').value
        let price = document.getElementById('priceInput').value
        let needsValidation = document.getElementsByClassName('needs__validation')[0]


        if (identity.value == "") {
            identity.classList.add('field__invalid')
            needsValidation.classList.add("invalid-container")
          
            setTimeout(() => {
                identity.classList.remove('field__invalid')
                needsValidation.classList.remove("invalid-container")

             }, 1500);

        } else {
            let row = `
                     <div class=" row table__info  mx-auto  mb-3 px-1 px-lg-5  d-flex justify-content-center">
                     <div class="table__item col-lg-6 col-12 description pt-3 pt-lg-0 invoiceCreation__info">
                        ${identity.value}
                     </div>
                     <div class="table__item col-lg-2 col-12 rate invoiceCreation__info">
                     ${rate}
                     </div>
                     <div class=" table__item col-lg-2 col-12 quantity invoiceCreation__info">
                         ${quantity}
                     </div>
                     <div class=" table__item col-lg-2 col-12 price pb-3 pb-lg-0 invoiceCreation__info"> ${price} </div>
                     <div class="close__container">
                     <img class="close__item" src="./assets/images/closeButton.png" alt="close__button">
                     </div>
                 </div>
                    `

            rowsContainer.innerHTML += row
            document.getElementById('brandIdentity').value = ''
            document.getElementById('rateInput').value = '0'
            document.getElementById('quantityInput').value = '1'
            document.getElementById('priceInput').value = '0'

            addEventListenerButton()
            updateTotal()
        }
    })

    addEventListenerButton()


    validate()
}



function validate() {
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

}


function addEventListenerButton() {
    let removeRegister = document.getElementsByClassName('close__container');
    for (let i = 0; i < removeRegister.length; i++) {
        let button = removeRegister[i]
        button.addEventListener('click', function () {
            removeRow()
        })
    }
}


function removeRow() {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateTotal()
}

function updateTotal() {
    let rows = document.getElementsByClassName('table__info')
    let totalElement = document.getElementById('total')
    let subTotalElement = document.getElementById('subTotal')
    let taxElement = document.getElementById('taxes')

    let total = 0
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i]
        let priceElement = row.getElementsByClassName('price')[0]

        let price = priceElement.innerHTML
        total = parseFloat(total) + parseFloat(price)
    }

    subTotalElement.innerHTML = total
    let tax = total * 0.10
    taxElement.innerHTML = parseFloat(tax).toFixed(2)
    totalElement.innerHTML = total + (total * 0.10)
}