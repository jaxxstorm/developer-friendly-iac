package main

import (
    "encoding/json"
    "github.com/gin-gonic/gin"
    "net/http"
)

type Response struct {
    Name     string
    Projects []string
}

func main() {
    r := gin.New()
    r.Use(gin.Logger())
    r.Use(gin.Recovery())

    r.GET("/", gin.WrapF(func(w http.ResponseWriter, req *http.Request) {
        profile := Response{"CNCF", []string{"kubernetes", "prometheus"}}

        js, err := json.Marshal(profile)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        w.Write(js)
    }))

    r.Run("0.0.0.0:80")

}

func respond(w http.ResponseWriter, r *http.Request) {

}
