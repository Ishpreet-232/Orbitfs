/**
 * FILE: wave_animation.js
 * Manages the animated background canvas drawing.
 */
class WaveEngine {
    constructor() {
        this.canvas = document.getElementById('wave-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.time = 0;
        this.waves = [
            { y: 2, amp: 50, freq: 0.01, speed: 0.02, color: 'rgba(0, 242, 96, 0.3)' }, 
            { y: 2, amp: 80, freq: 0.005, speed: 0.03, color: 'rgba(5, 117, 230, 0.3)' }, 
            { y: 2, amp: 100, freq: 0.002, speed: 0.01, color: 'rgba(255, 0, 204, 0.25)' }, 
            { y: 2, amp: 150, freq: 0.008, speed: 0.04, color: 'rgba(255, 75, 31, 0.25)' } 
        ];
        this.loop();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.time += 0.01; 

        this.waves.forEach(w => {
            this.ctx.fillStyle = w.color;
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.canvas.height);
            for (let i = 0; i < this.canvas.width; i++) {
                const y = Math.sin(i * w.freq + this.time) * w.amp * Math.sin(this.time * w.speed * 5);
                this.ctx.lineTo(i, (this.canvas.height / 2) + y);
            }
            this.ctx.lineTo(this.canvas.width, this.canvas.height);
            this.ctx.closePath();
            this.ctx.fill();
        });
        requestAnimationFrame(() => this.loop());
    }
}