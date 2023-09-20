AFRAME.registerComponent('move', {
    schema: {
        radius: { default: 5 }, // Adjust the radius of the circular path
        maxSpeed: { default: 5 }, // Adjust the maximum speed
        accelerationTime: { default: 2 } // Adjust the time to reach max speed
    },
    init: function () {
        this.angle = 0; // Initialize the angle
        this.speed = 0; // Initialize the speed
        this.acceleration = this.data.maxSpeed / this.data.accelerationTime; // Calculate acceleration
        this.maxSpeedReached = false;
    },
    tick: function (time, timeDelta) {
        if (!this.maxSpeedReached) {
            // Accelerate until max speed is reached
            this.speed += this.acceleration * timeDelta / 1000;
            if (this.speed >= this.data.maxSpeed) {
                this.speed = this.data.maxSpeed;
                this.maxSpeedReached = true;
            }
        } else {
            // Decelerate to a standstill
            this.speed -= this.acceleration * timeDelta / 1000;
            if (this.speed <= 0) {
                this.speed = 0;
            }
        }
        this.angle += this.speed * timeDelta / 1000; // Increase the angle over time
        const x = this.data.radius * Math.cos(this.angle); // Calculate x-coordinate
        const z = this.data.radius * Math.sin(this.angle); // Calculate z-coordinate
        this.el.setAttribute('position', { x, y: 0, z }); // Set the new position
        this.el.object3D.lookAt(0, 0, 0); // Make the box face the center (0, 0, 0)
    }
});

// Attach the 'move' component to the box
const box = document.getElementById('moving-box');
box.setAttribute('move', { radius: 5, maxSpeed: 50, accelerationTime: 60 }); 