document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tipForm');
    const errorsList = document.getElementById('errors');
    const calculatedMessage = document.getElementById('calculationMessage');

    const bill = form.elements['bill'];
    const tip = form.elements['tip'];
    const guests = form.elements['guests'];

    function addError(message) {
        const li = document.createElement('li');
        li.textContent = message;
        errorsList.appendChild(li);
    }

    function clearErrors() {
        errorsList.innerHTML = '';
        errorsList.style.display = 'none';
    }

    function addMessage(message) {
        const div = document.createElement('div');
        div.textContent = message;
        calculatedMessage.appendChild(div);
    }

    function clearMessage() {
        calculatedMessage.innerHTML = '';
        calculatedMessage.style.display = 'none';
    }

    function calculateTip(tipAmt, billAmt) {
        let numStr = tipAmt.toString();
        numStr = '0.' + numStr;
        let newTip = parseFloat(numStr);
        newTip = billAmt * newTip;
        return (billAmt + newTip).toFixed(2);
    }

    guests.addEventListener('change', function() {
        const guestCount = parseInt(guests.value);

        if (guestCount > 7) {
            tip.value = 25;
            tip.setAttribute('readonly', '');
        }
        else {
            tip.removeAttribute('readonly');
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        clearErrors();
        clearMessage();

        let isValid = true;

        const billValue = parseInt(bill.value);
        if (isNaN(billValue) || billValue < 0) {
            addError("Please enter a valid bill amount.");
            isValid = false;
        }

        const tipValue = parseInt(tip.value);
        if (isNaN(tipValue) || tipValue < 0 || tipValue > 100) {
            addError("Please enter a tip percentage from 0 to 100.");
            isValid = false;
        }

        const guestNum = parseInt(guests.value);
        if (isNaN(guestNum) || guestNum < 1 || guestNum > 20) {
            addError("Guests can only range from 1 to 20.");
            isValid = false;
        }

        if (isValid) {
            console.log("Valid form, ready to submit!");
            addMessage(`For a bill of $${billValue} with ${guestNum} guests and a ${tipValue}% tip, the total due will be $${calculateTip(tipValue, billValue)}`);
            calculatedMessage.style.display = 'block';
        }
        else {
            errorsList.style.display = 'block';
        }
    });
});
