package service

import (
	"context"

	"github.com/ajvideira/imersao-fsfc/codebank/dto"
	"github.com/ajvideira/imersao-fsfc/codebank/infrastructure/grpc/pb"
	"github.com/ajvideira/imersao-fsfc/codebank/usecase"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)


type TransactionService struct {
	UseCaseTransaction usecase.UseCaseTransaction
	pb.UnimplementedPaymentServiceServer
}

func NewTransactionService() *TransactionService {
	return &TransactionService{}
}

func (service *TransactionService) Payment(ctx context.Context, in *pb.PaymentRequest) (*empty.Empty, error) {
	transactionDTO := dto.Transaction{
		Name: in.CreditCard.Name,
		Number: in.CreditCard.Number,
		ExpirationMonth: in.CreditCard.ExpirationMonth,
		ExpirationYear: in.CreditCard.ExpirationYear,
		CVV: in.CreditCard.Cvv,
		Amount: in.Amount,
		Store: in.Store,
		Description: in.Description,
	}

	transaction, err := service.UseCaseTransaction.ProcessTransaction(transactionDTO)
	if err != nil {
		return &empty.Empty{}, status.Error(codes.FailedPrecondition, err.Error())
	}

	if transaction.Status != "approved" {
		return &empty.Empty{}, status.Error(codes.FailedPrecondition, "transaction rejected by the bank")
	}

	return &empty.Empty{}, nil
}