package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/ajvideira/imersao-fsfc/codebank/domain"
	"github.com/ajvideira/imersao-fsfc/codebank/infrastructure/repository"
	"github.com/ajvideira/imersao-fsfc/codebank/usecase"
	_ "github.com/lib/pq"
)


func main() {
	db := setupDB()
	defer db.Close()

	creditCard := domain.NewCreditCard()
	creditCard.Name = "Jonathan"
	creditCard.Number = "123456"
	creditCard.ExpirationMonth = 10
	creditCard.ExpirationYear = 2028
	creditCard.CVV = 123
	creditCard.Limit = 100
	creditCard.Balance = 0

	repository := repository.NewTransactionRepositoryDb(db)
	err := repository.CreateCreditCard(*creditCard)
	if err != nil {
		fmt.Println(err)
	}
}

func setupUseCaseTransaction(db *sql.DB) usecase.UseCaseTransaction {
	repository := repository.NewTransactionRepositoryDb(db)
	useCase := usecase.NewUseCaseTransaction(repository)
	return useCase
}

func setupDB() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", 
		"db", 5432, "postgres", "root", "codebank")

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		log.Fatal("Error connecting to database", err)
	}

	return db
}