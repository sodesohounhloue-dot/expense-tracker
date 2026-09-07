const transactions = [];

function addTransaction(name, amount, type){
    transactions.push({name, amount, type});

}



const revenus = transactions
.filter(t => t.type === "Revenu")
.reduce((a,b)=>a+b.amount,0);


localStorage.setItem("transactions", JSON.stringify(transactions));
const saved = JSON.parse(localStorage.getItem("transactions"));