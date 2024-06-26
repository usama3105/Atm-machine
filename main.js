#!/usr/bin/env ts-node
import inquirer from 'inquirer';
// Initialize account balance
let balance = 1000;
// Function to handle withdrawal
const withdraw = async () => {
    const { amount } = await inquirer.prompt([
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount to withdraw:',
            validate: (value) => {
                const parsedAmount = parseFloat(value);
                if (isNaN(parsedAmount) || parsedAmount <= 0) {
                    return 'Please enter a valid positive amount.';
                }
                return true;
            },
        },
    ]);
    const parsedAmount = parseFloat(amount);
    if (balance >= parsedAmount) {
        balance -= parsedAmount;
        console.log(`Withdrawal successful! New balance: $${balance.toFixed(2)}`);
    }
    else {
        console.log('Insufficient funds.');
    }
};
// Main menu
const mainMenu = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Choose an option:',
            choices: ['Withdraw', 'Exit'],
        },
    ]);
    if (choice === 'Withdraw') {
        await withdraw();
    }
    else {
        console.log('Thank you for using our ATM!');
    }
};
// Start the ATM
mainMenu();
