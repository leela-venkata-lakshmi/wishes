
document.addEventListener("DOMContentLoaded", () => {
    const hi = document.getElementById("hi");
    

    hi.addEventListener("click", () => {
        
        const audio = new Audio();
        
        audio.src="happy-birthday-music-box(chosic.com).mp3";
        audio.loop = true;
        
        audio.volume = 1;
        
        setTimeout(() => {
           
            audio.play();
        }, 2000);
        const audio2 = new Audio();
        audio2.src = "new-year-fireworks-sound3-180204.mp3"; // Replace with the actual file path
        audio2.loop = true;
        audio2.volume = 0.5;
        audio2.play();

        const birthdayText = document.createElement("div");
        birthdayText.id = "birthdayText";
        birthdayText.innerText = "Happy Birthday to You";
        birthdayText.style.position = "absolute";
        birthdayText.style.top = "50%";
        birthdayText.style.left = "50%";
        birthdayText.style.transform = "translate(-50%, -50%)";
        
        
        birthdayText.style.fontWeight = "bold";
        birthdayText.style.textAlign = "center";
        birthdayText.style.zIndex = "1000";
        document.body.appendChild(birthdayText);

        let iterationCount = 0;
        
        birthdayText.addEventListener('animationiteration', () => {
            iterationCount++;
            if (iterationCount === 3) {
                
                birthdayText.innerText = " Dear Jay, Happy Bithday to you🥳🥳🎉🎉";
            }
        });
        
        hi.classList.add("hidden");
        createFireworks();
        
    });
    
    hi.classList.remove("hidden");
    
    function createFireworks() {
        let canvas, ctx, w, h;
        const particles = [];
        const probability = 0.04;
        let xPoint, yPoint;

        window.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };

        function initCanvas() {
            canvas = document.createElement("canvas");
            canvas.id = "canvas";
            document.body.appendChild(canvas);
            ctx = canvas.getContext("2d");
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas, false);
            window.requestAnimationFrame(updateWorld);
        }

        function resizeCanvas() {
            if (canvas) {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            }
        }

        function updateWorld() {
            update();
            paint();
            window.requestAnimationFrame(updateWorld);
        }

        function update() {
            if (particles.length < 500 && Math.random() < probability) {
                createFirework();
            }
            const alive = [];
            for (let i = 0; i < particles.length; i++) {
                if (particles[i].move()) {
                    alive.push(particles[i]);
                }
            }
            particles.length = 0;
            particles.push(...alive);
        }

        function paint() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = "rgba(0,0,0,0.2)";
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw(ctx);
            }
        }

        function createFirework() {
            xPoint = Math.random() * (w - 200) + 100;
            yPoint = Math.random() * (h - 200) + 100;
            const nFire = Math.random() * 50 + 100;
            const c = "rgb(" + (~~(Math.random() * 200 + 55)) + "," +
                (~~(Math.random() * 200 + 55)) + "," + (~~(Math.random() * 200 + 55)) + ")";
            for (let i = 0; i < nFire; i++) {
                const particle = new Particle();
                particle.color = c;
                const vy = Math.sqrt(25 - particle.vx * particle.vx);
                if (Math.abs(particle.vy) > vy) {
                    particle.vy = particle.vy > 0 ? vy : -vy;
                }
                particles.push(particle);
            }
        }

        function Particle() {
            this.w = this.h = Math.random() * 4 + 1;
            this.x = xPoint - this.w / 2;
            this.y = yPoint - this.h / 2;
            this.vx = (Math.random() - 0.5) * 10;
            this.vy = (Math.random() - 0.5) * 10;
            this.alpha = Math.random() * 0.5 + 0.5;
            this.color = '';
        }

        Particle.prototype = {
            gravity: 0.05,
            move: function() {
                this.x += this.vx;
                this.vy += this.gravity;
                this.y += this.vy;
                this.alpha -= 0.01;
                if (this.x <= -this.w || this.x >= window.innerWidth ||
                    this.y >= window.innerHeight || this.alpha <= 0) {
                    return false;
                }
                return true;
            },
            draw: function(c) {
                c.save();
                c.beginPath();
                c.translate(this.x + this.w / 2, this.y + this.h / 2);
                c.arc(0, 0, this.w, 0, Math.PI * 2);
                c.fillStyle = this.color;
                c.globalAlpha = this.alpha;
                c.closePath();
                c.fill();
                c.restore();
            }
        };

        initCanvas();
    }
});
