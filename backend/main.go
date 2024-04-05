package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

var ctx = context.Background()
var client *redis.Client

func main() {
	// Initialize Redis client
	client = redis.NewClient(&redis.Options{
		Addr:     "redis-14279.c305.ap-south-1-1.ec2.cloud.redislabs.com:14279",
		Password: "xVrg8gJBE2v7aHFfpenfVsasRLUUxoRK",
	})

	// Ping the Redis server
	_, err := client.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Could not connect to Redis: %v", err)
	}
	fmt.Println("Connected to Redis server successfully!")

	// Initialize the router
	router := mux.NewRouter()

	// Routes
	router.HandleFunc("/login", loginHandler).Methods("POST")
	router.HandleFunc("/signup", signupHandler).Methods("POST")
	router.HandleFunc("/logout", logoutHandler).Methods("GET")
	router.HandleFunc("/getSession", getSessionHandler).Methods("GET")
	router.HandleFunc("/won", wonHandler).Methods("GET")
	router.HandleFunc("/redis", redisHandler).Methods("GET")

	// CORS middleware
	corsHandler := cors.Default().Handler(router)

	// Start the server
	port := ":3001"
	fmt.Printf("Server is running on port %s\n", port)
	log.Fatal(http.ListenAndServe(port, corsHandler))
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	// Parse request body
	var credentials map[string]string
	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	username, ok := credentials["username"]
	if !ok {
		http.Error(w, "Username is required", http.StatusBadRequest)
		return
	}

	password, ok := credentials["password"]
	if !ok {
		http.Error(w, "Password is required", http.StatusBadRequest)
		return
	}

	// Fetch stored password from Redis
	storedPassword, err := client.Get(ctx, username).Result()
	if err != nil {
		http.Error(w, "Incorrect username or password.", http.StatusUnauthorized)
		return
	}

	// Compare passwords
	if storedPassword == password {
		// Set current user in Redis
		err := client.Set(ctx, "current", username, 0).Err()
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusAccepted)
		w.Write([]byte("Login was successful."))
	} else {
		http.Error(w, "Incorrect username or password.", http.StatusUnauthorized)
	}
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
	// Parse request body
	var credentials map[string]string
	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	username, ok := credentials["username"]
	if !ok {
		http.Error(w, "Username is required", http.StatusBadRequest)
		return
	}

	password, ok := credentials["password"]
	if !ok {
		http.Error(w, "Password is required", http.StatusBadRequest)
		return
	}

	// Check if user already exists
	exists, err := client.Exists(ctx, username).Result()
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	if exists == 1 {
		http.Error(w, "User already exists with the same username.", http.StatusUnauthorized)
		return
	}

	// Register new user
	err = client.Set(ctx, username, password, 0).Err()
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User registered successfully."))
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	// Delete current user from Redis
	err := client.Del(ctx, "current").Err()
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Completed"))
}

func getSessionHandler(w http.ResponseWriter, r *http.Request) {
	// Get current user from Redis
	username, err := client.Get(ctx, "current").Result()
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Get IP address
	ip := strings.Split(r.RemoteAddr, ":")[0]

	sessionData := username + " " + ip
	w.Write([]byte(sessionData))
}

func wonHandler(w http.ResponseWriter, r *http.Request) {
	// Get current user from Redis
	username, err := client.Get(ctx, "current").Result()
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Increment wins count for the user
	key := "leader" + username
	_, err = client.Incr(ctx, key).Result()
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func redisHandler(w http.ResponseWriter, r *http.Request) {
	// Get all keys with "leader" prefix
	keys, err := client.Keys(ctx, "leader*").Result()
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Get values for each key
	var data []map[string]string
	for _, key := range keys {
		value, err := client.Get(ctx, key).Result()
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		data = append(data, map[string]string{
			"key":   key,
			"value": value,
		})
	}

	// Convert data to JSON and send response
	jsonData, err := json.Marshal(data)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}
