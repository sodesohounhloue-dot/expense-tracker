const form = document.getElementById("TransactionForm");
const type = document.getElementById("transactionType");
const amount = document.getElementById("amount");
const nameInput = document.getElementById("name");

const balance = document.getElementById("currentBalance");
const history = document.getElementById("historyList");

let transactions = [];

form.addEventListener("submit", function(e){
    e.preventDefault();

    transactions.push({
        name: nameInput.value,
        amount: Number(amount.value),
        type: type.value
    });

    updateUI();
    form.reset();
});

function updateUI(){
    history.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        const li = document.createElement("li");
        li.textContent = `${t.name} : ${t.amount.toFixed(2)} €`;
        history.appendChild(li);

        if(t.type === "income"){
            income += t.amount;
        }else{
            expense += t.amount;
        }
    });

    balance.textContent = (income - expense).toFixed(2) + " €";
}