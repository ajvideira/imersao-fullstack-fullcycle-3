package domain

import (
	"time"

	uuid "github.com/satori/go.uuid"
)

type TransactionRepository interface {
	SaveTransaction(transaction Transaction, creditCard CreditCard) error
	GetCreditCard(creditCard CreditCard) (CreditCard, error)
	CreateCreditCard(creditCard CreditCard) error
}

type Transaction struct {
	ID          string
	Amount      float64
	Status      string
	Description string
	Store       string
	CreditCardId  string
	CreatedAt   time.Time
}

func NewTransaction() *Transaction {
	transaction := &Transaction{
		ID: uuid.NewV4().String(),
		CreatedAt: time.Now(),
	}
	return transaction;
}

func (transaction *Transaction) ProcessAndValidate(creditCard *CreditCard) {
	if (transaction.Amount+creditCard.Balance > creditCard.Limit) {
		transaction.Status = "rejected"
	} else {
		transaction.Status = "approved"
		creditCard.Balance = creditCard.Balance + transaction.Amount
	}
}