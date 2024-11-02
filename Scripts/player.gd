extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -600.0

var DOUBLE = 0

@onready var animated_sprite = $AnimatedSprite2D
@onready var audio_stream = $AudioStreamPlayer2D

func _physics_process(delta):
	# Add the gravity.
	if not is_on_floor():
		velocity += get_gravity() * delta

	# Handle jump.
	if Input.is_action_just_pressed("Jump") and is_on_floor():
		velocity.y = JUMP_VELOCITY
		animated_sprite.play("Jump")
		audio_stream.playing = true
		DOUBLE += 1
		
	var direction = Input.get_axis("Left", "Right")
	
	# Player direction
	if direction > 0:
		animated_sprite.flip_h = false
	elif direction < 0:
		animated_sprite.flip_h = true
		
	# Play animations
	if is_on_floor():
		if direction == 0:
			animated_sprite.play("Idle")
		else:
			animated_sprite.play("Run")
	else:
		if Input.is_action_just_pressed("Jump") and DOUBLE > 0:
			velocity.y = JUMP_VELOCITY + 200
			animated_sprite.play("Double")
			audio_stream.playing = true
			DOUBLE = 0
	
	if direction:
		velocity.x = direction * SPEED
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)

	move_and_slide()
