extends Node

var POINTS = 0
var LIFE = 0

@onready var points = $"../Points"
@onready var player = %Player

func _process(delta):
	points.text = str(POINTS)
	
	if Input.is_action_just_pressed("Use") and POINTS > 0:
		POINTS -= 1
		
	if Input.is_action_just_pressed("Menu"):
		get_tree().change_scene_to_file("res://Scenes/menu.tscn")
