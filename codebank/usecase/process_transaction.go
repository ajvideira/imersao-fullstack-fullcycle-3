package usecase

import (
	"github.com/ajvideira/imersao-fsfc/codebank/domain"
	"github.com/ajvideira/imersao-fsfc/codebank/dto"
)


type UseCaseTransaction struct {
	TransactionRepository domain.TransactionRepository
}

func NewUseCaseTransaction(transactionRepository domain.TransactionRepository) UseCaseTransaction {
	return UseCaseTransaction{TransactionRepository: transactionRepository}
}

func (useCase UseCaseTransaction) ProcessTransaction(transactionDTO dto.Transaction) (domain.Transaction, error) {
	creditCard := useCase.hydrateCreditCard(transactionDTO)

	creditCardDB, err := useCase.TransactionRepository.GetCreditCard(*creditCard)
	if err != nil {
		return domain.Transaction{}, err
	}

	creditCard.ID = creditCardDB.ID
	creditCard.Limit = creditCardDB.Limit
	creditCard.Balance = creditCardDB.Balance

	transaction := useCase.hydrateTransaction(transactionDTO, *creditCard)
	transaction.ProcessAndValidate(creditCard)

	err = useCase.TransactionRepository.SaveTransaction(*transaction, *creditCard)
	if err != nil {
		return domain.Transaction{}, err
	}
	
	return *transaction, nil
}

func (useCase UseCaseTransaction) hydrateCreditCard(transactionDTO dto.Transaction) *domain.CreditCard {
	creditCard := domain.NewCreditCard()
	creditCard.Name = transactionDTO.Name
	creditCard.Number = transactionDTO.Number
	creditCard.ExpirationMonth = transactionDTO.ExpirationMonth
	creditCard.ExpirationYear = transactionDTO.ExpirationYear
	creditCard.CVV = transactionDTO.CVV
	return creditCard;
}

func (useCase UseCaseTransaction) hydrateTransaction(transactionDTO dto.Transaction, creditCard domain.CreditCard) *domain.Transaction {
	transaction := domain.NewTransaction()
	transaction.CreditCardId = creditCard.ID
	transaction.Amount = transactionDTO.Amount
	transaction.Store = transactionDTO.Store
	transaction.Description = transactionDTO.Description
	return transaction;
}