package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Student struct {
	ID    uint   `json:"id" gorm:"primaryKey"`
	Name  string `json:"name"`
	Grade int    `json:"grade"`
}

func main() {
	dsn := "host=localhost user=postgres password=postgres dbname=studentdb port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	db.AutoMigrate(&Student{})

	r := gin.Default()

	// ✅ CORS habilitado para frontend en puerto 5173
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	r.GET("/students", func(c *gin.Context) {
		var students []Student
		db.Find(&students)
		c.JSON(http.StatusOK, students)
	})

	r.POST("/students", func(c *gin.Context) {
		var student Student
		if err := c.BindJSON(&student); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&student)
		c.JSON(http.StatusCreated, student)
	})

	r.PUT("/students/:id", func(c *gin.Context) {
		id := c.Param("id")
		var student Student
		if err := db.First(&student, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
			return
		}
		if err := c.BindJSON(&student); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Save(&student)
		c.JSON(http.StatusOK, student)
	})

	r.DELETE("/students/:id", func(c *gin.Context) {
		id := c.Param("id")
		db.Delete(&Student{}, id)
		c.Status(http.StatusNoContent)
	})

	r.Run(":8080")
}
