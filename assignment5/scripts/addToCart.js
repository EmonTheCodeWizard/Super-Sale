let total = 0;
let couponAlertShown = false;

function addToCart(target) {
    const selectedItemsContainer = document.getElementById('selected-items');
    const itemName = target.childNodes[3].childNodes[3].innerText;

    const li = document.createElement('li');

    let listItemNumber = selectedItemsContainer.getElementsByTagName('li').length + 1;

    li.innerText = `${listItemNumber}. ${itemName}`;

    selectedItemsContainer.appendChild(li);

    const price = target.childNodes[3].childNodes[5].childNodes[1].innerText;

    total = parseFloat(total) + parseFloat(price);

    let totalPrice = document.getElementById('total-price');
    totalPrice.innerText = total.toFixed(2);

    let subTotal = document.getElementById('total');
    subTotal.innerText = total.toFixed(2);

    if (total > 0) {
        const makeBtn = document.getElementById('make-purchase');
        makeBtn.removeAttribute('disabled');
    }
    if (total >= 200) {
        const applyBtn = document.getElementById('btn-apply');
        applyBtn.removeAttribute('disabled');
    }

    document.getElementById('btn-apply').addEventListener('click', () => {
        const applyFieldValue = document.getElementById('coupon-field').value;
        if (applyFieldValue === "SELL200") {
            const discountTk = 0.20 * total;
            const setDiscount = document.getElementById('discount');
            setDiscount.innerText = discountTk.toFixed(2);

            const subTotalFinal = total - discountTk;
            subTotal.innerText = subTotalFinal.toFixed(2);
        } else {
            if (!couponAlertShown) {
                couponAlertShown = true; 
                alert('Wrong Coupon');
            }
        }
    });

    document.getElementById('make-purchase').addEventListener('click', () => {
        while (selectedItemsContainer.firstChild) {
            selectedItemsContainer.removeChild(selectedItemsContainer.firstChild);
        }
        total = 0;
        document.getElementById('total-price').innerText = total;
        document.getElementById('discount').innerText = total;
        document.getElementById('total').innerText = total;
        const makeBtn = document.getElementById('make-purchase');
        makeBtn.setAttribute('disabled', true);
        const applyBtn = document.getElementById('btn-apply');
        applyBtn.setAttribute('disabled', true);
        const applyFieldValue = document.getElementById('coupon-field').value = '';
    })
}
