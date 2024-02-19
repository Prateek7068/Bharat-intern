// scripts.js
const balanceDisplay = document.getElementById('balance');
const transactionsContainer = document.getElementById('transactions');
const transactionForm = document.getElementById('transactionForm');

// Fetch transactions and update UI
function fetchTransactions() {
    fetch('/transactions')
        .then(response => response.json())
        .then(transactions => {
            transactionsContainer.innerHTML = '';
            transactions.forEach(transaction => {
                const transactionElement = document.createElement('div');
                transactionElement.classList.add('transaction');
                transactionElement.innerHTML = `
                    <strong>${transaction.description}</strong> - ${transaction.amount}$
                `;
                transactionsContainer.appendChild(transactionElement);
            });
        })
        .catch(error => console.error('Error fetching transactions:', error));
}

// Fetch balance and update UI
function fetchBalance() {
    fetch('/balance')
        .then(response => response.json())
        .then(balance => {
            balanceDisplay.innerText = `Balance: ${balance}$`;
        })
        .catch(error => console.error('Error fetching balance:', error));
}

// Add transaction
transactionForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(transactionForm);
    const amount = formData.get('amount');
    const description = formData.get('description');
    fetch('/transaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, description })
    })
    .then(() => {
        fetchTransactions();
        fetchBalance();
        transactionForm.reset();
    })
    .catch(error => console.error('Error adding transaction:', error));
});

// Initial fetch
fetchTransactions();
fetchBalance();
