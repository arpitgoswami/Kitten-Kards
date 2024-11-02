extends Area2D

@onready var game_controller = %Game_Controller

func _on_body_entered(body):
	game_controller.POINTS += 1
	queue_free()
