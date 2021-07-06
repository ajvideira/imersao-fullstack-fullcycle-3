package repository

import (
	"database/sql"
	"errors"

	"github.com/ajvideira/imersao-fsfc/codebank/domain"
)

type TransactionRepositoryDb struct {
	db *sql.DB
}

func NewTransactionRepositoryDb(db *sql.DB) *TransactionRepositoryDb {
	repository := &TransactionRepositoryDb{
		db: db,
	}
	return repository;
}

func (repository *TransactionRepositoryDb) SaveTransaction(transaction domain.Transaction, creditCard domain.CreditCard) error {
	stmt, err := repository.db.Prepare(`
		INSERT INTO transactions(id, credit_card_id, amount, status, description, store, created_at) 
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`)

	if err != nil {
		return err
	}

	_, err = stmt.Exec(
		transaction.ID, 
		transaction.CreditCardId, 
		transaction.Amount, 
		transaction.Status, 
		transaction.Description, 
		transaction.Status, 
		transaction.CreatedAt,
	)
	if err != nil {
		return err
	}

	if transaction.Status == "approved" {
		err = repository.updateBalance(creditCard)
		if err != nil {
			return err
		}
	}

	err = stmt.Close()
	if err != nil {
		return err
	}

	return nil
}

func (repository *TransactionRepositoryDb) updateBalance(creditCard domain.CreditCard) error {
	_, err := repository.db.Exec("UPDATE credit_cards SET balance = $1 WHERE id = $2", creditCard.Balance, creditCard.ID)

	if err != nil {
		return err
	}

	return nil;
}

func (repository *TransactionRepositoryDb) CreateCreditCard(creditCard domain.CreditCard) error {
	stmt, err := repository.db.Prepare(`
		INSERT INTO credit_cards(id, name, number, expiration_month, expiration_year, cvv, balance, balance_limit, created_at) 
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
	`)

	if err != nil {
		return err
	}

	_, err = stmt.Exec(
		creditCard.ID, 
		creditCard.Name, 
		creditCard.Number, 
		creditCard.ExpirationMonth, 
		creditCard.ExpirationYear, 
		creditCard.CVV, 
		creditCard.Balance, 
		creditCard.Limit,
		creditCard.CreatedAt,
	)
	if err != nil {
		return err
	}

	err = stmt.Close()
	if err != nil {
		return err
	}

	return nil
}

func (transaction *TransactionRepositoryDb) GetCreditCard(creditCard domain.CreditCard) (domain.CreditCard, error) {
	var creditCardDB domain.CreditCard

	stmt, err := transaction.db.Prepare("SELECT id, balance, balance_limit FROM credit_cards WHERE number=$1")
	if err != nil {
		return creditCardDB, err
	}

	if err = stmt.QueryRow(creditCard.Number).Scan(&creditCardDB.ID, &creditCardDB.Balance, &creditCardDB.Limit); err != nil {
		return creditCardDB, errors.New("credit card does not exists")
	}

	return creditCardDB, nil
}