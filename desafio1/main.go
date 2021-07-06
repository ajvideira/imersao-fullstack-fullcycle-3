package main

import (
	"fmt"
	"net/http"
)

func main() {
    http.HandleFunc("/", HelloServer)
    http.ListenAndServe(":8000", nil)
}

func HelloServer(w http.ResponseWriter, r *http.Request) {
	content := `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Document</title>
			</head>
			<style>
				body {
					background-image: url('https://images8.alphacoders.com/441/441994.jpg');
					text-align: center;
					color: white;
					font-size: 32px;
				}
			</style>
			<body>
				<h1>Imersão Full Cycle</h1>
			</body>
		</html>	
	`
  fmt.Fprintf(w, content)
}