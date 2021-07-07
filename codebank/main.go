package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/ajvideira/imersao-fsfc/codebank/infrastructure/grpc/server"
	"github.com/ajvideira/imersao-fsfc/codebank/infrastructure/kafka"
	"github.com/ajvideira/imersao-fsfc/codebank/infrastructure/repository"
	"github.com/ajvideira/imersao-fsfc/codebank/usecase"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading env file")
	}
}

func main() {
	db := setupDB()
	defer db.Close()
	producer := setupKafkaProducer()
	transactionUseCase := setupUseCaseTransaction(db, producer)
	serveGRPC(transactionUseCase)

	/*creditCard := domain.NewCreditCard()
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
	}*/
}

func setupUseCaseTransaction(db *sql.DB, producer kafka.KafkaProducer) usecase.UseCaseTransaction {
	repository := repository.NewTransactionRepositoryDb(db)
	useCase := usecase.NewUseCaseTransaction(repository)
	useCase.KafkaProducer = producer
	return useCase
}

func setupKafkaProducer() kafka.KafkaProducer {
	producer := kafka.NewKafkaProducer()
	producer.SetupProducer(os.Getenv("kafka.bootstrap.servers"))
	fmt.Println("kafka producer is running")
	return producer
}

func setupDB() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", 
	os.Getenv("host"), os.Getenv("port"), os.Getenv("user"), os.Getenv("password"), os.Getenv("dbname"))

	db, err := sql.Open(os.Getenv("driver"), psqlInfo)

	if err != nil {
		log.Fatal("Error connecting to database", err)
	}

	return db
}

func serveGRPC(transactionUseCase usecase.UseCaseTransaction) {
	grpcServer := server.NewGRPCServer()
	grpcServer.TransactionUseCase = transactionUseCase
	fmt.Println("gRPC server is running")
	grpcServer.Serve()
}