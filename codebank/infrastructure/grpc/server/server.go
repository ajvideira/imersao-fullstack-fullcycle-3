package server

import (
	"log"
	"net"

	"github.com/ajvideira/imersao-fsfc/codebank/infrastructure/grpc/pb"
	"github.com/ajvideira/imersao-fsfc/codebank/infrastructure/service"
	"github.com/ajvideira/imersao-fsfc/codebank/usecase"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)


type GRPCServer struct {
	TransactionUseCase usecase.UseCaseTransaction
}

func NewGRPCServer() GRPCServer {
	return GRPCServer{}
}

func (g *GRPCServer) Serve() {
	lis, err := net.Listen("tcp", "0.0.0.0:50052")
	if err != nil {
		log.Fatalf("could not listen tcp port")
	}

	transactionService := service.NewTransactionService()
	transactionService.UseCaseTransaction = g.TransactionUseCase

	grpcServer := grpc.NewServer()
	reflection.Register(grpcServer)
	pb.RegisterPaymentServiceServer(grpcServer, transactionService)
	err = grpcServer.Serve(lis)
	if err != nil {
		log.Fatalf("could not serve grpc server")
	}
}