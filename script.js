const form=document.getElementById("transactionForm");
const history=document.getElementById("history");

const balance=document.getElementById("balance");
const income=document.getElementById("income");
const expense=document.getElementById("expense");

let transactions=JSON.parse(localStorage.getItem("transactions"))||[];

const ctx=document.getElementById("expenseChart");

let chart=new Chart(ctx,{
type:"doughnut",
data:{
labels:["Revenus","Dépenses"],
datasets:[{
data:[0,0]
}]
}
});

form.addEventListener("submit",e=>{

e.preventDefault();

transactions.push({

name:document.getElementById("name").value,
amount:Number(document.getElementById("amount").value),
type:document.getElementById("type").value

});

save();
render();
form.reset();

});

function render(){

history.innerHTML="";

let totalIncome=0;
let totalExpense=0;

transactions.forEach((t,index)=>{

const li=document.createElement("li");

li.innerHTML=`
<span>${t.name} - GH₵${t.amount}</span>
<button onclick="removeTransaction(${index})">✖</button>
`;

history.appendChild(li);

if(t.type==="income")
totalIncome+=t.amount;
else
totalExpense+=t.amount;

});

balance.textContent="GH₵"+(totalIncome-totalExpense).toFixed(2);
income.textContent="GH₵"+totalIncome.toFixed(2);
expense.textContent="GH₵"+totalExpense.toFixed(2);

chart.data.datasets[0].data=[totalIncome,totalExpense];
chart.update();

}

function removeTransaction(index){

transactions.splice(index,1);
save();
render();

}

function save(){

localStorage.setItem("transactions",JSON.stringify(transactions));

}

render();