import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private getBalanceByType(type: string): number {
    return this.transactions.reduce((accumulator, transaction) => {
      if (transaction.type === type) return accumulator + transaction.value;
      return accumulator;
    }, 0);
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeBalance = this.getBalanceByType('income');
    const outcomeBalance = this.getBalanceByType('outcome');
    const totalBalance = incomeBalance - outcomeBalance;

    const balance = {
      income: incomeBalance,
      outcome: outcomeBalance,
      total: totalBalance,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
