#! /usr/bin/env node
import inquirer from "inquirer";
class bankAcount {
    acountNumber;
    balance;
    constructor(acountNumber, balance) {
        this.acountNumber = acountNumber;
        this.balance = balance;
    }
    // debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawel of $${amount} successful. Remaining balace : $${this.balance}`);
        }
        else {
            console.log(`Insufficianr Balance `);
        }
    }
    // creadit money
    deposit(amount) {
        if (amount > 100) {
            this.balance -= 1; // charged 1$ if amount is more then 100$
        }
        this.balance += amount;
        console.log(`Deposit  of $${amount} successful. Remaining Balance :$${this.balance}`);
    }
    chackBalance() {
        console.log(`Current balance :$${this.balance}`);
    }
}
// costumer detailes class
class costumer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    accounnt;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.accounnt = account;
    }
}
// banck Acounts
const accounts = [
    new bankAcount(1001, 600),
    new bankAcount(1002, 2000),
    new bankAcount(1003, 6000)
];
const costumers = [
    new costumer('Zohaib', 'Shah', 'Male', 30, 3198251617, accounts[0]),
    new costumer('Irfan', 'Shah', 'Male', 29, 3338251617, accounts[1]),
    new costumer('Naria', 'Shah', 'Female', 26, 3428251617, accounts[2])
];
// function to intract with bank account
async function service() {
    do {
        const acountNumberInput = await inquirer.prompt({
            name: "acountNmuber",
            type: "number",
            message: "Enter your acount number "
        });
        const costumer = costumers.find(costumer => costumer.accounnt.acountNumber === acountNumberInput.acountNmuber);
        if (costumer) {
            console.log(`Welcome , ${costumer.firstName} ${costumer.lastName} ! \n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select your options",
                    choices: ["Deposit", "Withdraw", "Chack balance", "Customer Detailes", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit"
                    });
                    costumer.accounnt.deposit(depositAmount.amount);
                    break;
                case "Customer Detailes":
                    console.log(`First Name      :${costumer.firstName}`);
                    console.log(`Last Name       :${costumer.lastName}`);
                    console.log(`Age             :${costumer.age}`);
                    console.log(`Gender          :${costumer.gender}`);
                    console.log(`Mobile No       :${costumer.mobileNumber}`);
                    console.log(`Account No      :${acountNumberInput.acountNmuber}`);
                    console.log(`   :${costumer.accounnt.chackBalance()}`);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw"
                    });
                    costumer.accounnt.withdraw(withdrawAmount.amount);
                    break;
                case "Chack balance":
                    costumer.accounnt.chackBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank ...... ");
                    console.log("\nThank you for using our serivices");
                    return;
            }
        }
        else {
            console.log("Invalid Account Number ");
        }
    } while (true);
}
service();
