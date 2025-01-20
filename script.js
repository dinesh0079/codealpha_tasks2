const expenseForm = document.getElementById('expense-form');
        const expenseList = document.getElementById('expense-list');

        // Load expenses from local storage
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        // Render expenses
        function renderExpenses() {
            expenseList.innerHTML = '';
            expenses.forEach((expense, index) => {
                const expenseItem = document.createElement('div');
                expenseItem.classList.add('expense-item');
                expenseItem.innerHTML = `
                    <span>${expense.name} - $${expense.amount}</span>
                    <div>
                        <button onclick="editExpense(${index})">Edit</button>
                        <button onclick="deleteExpense(${index})">Delete</button>
                    </div>
                `;
                expenseList.appendChild(expenseItem);
            });
        }

        // Add new expense
        expenseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('expense-name').value;
            const amount = document.getElementById('expense-amount').value;

            expenses.push({ name, amount });
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();

            expenseForm.reset();
        });

        // Edit expense
        function editExpense(index) {
            const expense = expenses[index];
            document.getElementById('expense-name').value = expense.name;
            document.getElementById('expense-amount').value = expense.amount;
            deleteExpense(index);
        }

        // Delete expense
        function deleteExpense(index) {
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
        }

        // Initial render
        renderExpenses();