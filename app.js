
        class PrecisionStopwatch {
            constructor() {
                // Time tracking variables
                this.startTime = 0;
                this.elapsedTime = 0;
                this.isRunning = false;
                this.animationId = null;
                this.lapCount = 0;

                
                this.timeDisplay = document.getElementById('timeDisplay');
                this.startBtn = document.getElementById('startBtn');
                this.pauseBtn = document.getElementById('pauseBtn');
                this.resumeBtn = document.getElementById('resumeBtn');
                this.resetBtn = document.getElementById('resetBtn');
                this.lapBtn = document.getElementById('lapBtn');
                this.lapList = document.getElementById('lapList');

                
                this.bindEvents();
            }

            // Bind all button event listeners
            bindEvents() {
                this.startBtn.addEventListener('click', () => this.start());
                this.pauseBtn.addEventListener('click', () => this.pause());
                this.resumeBtn.addEventListener('click', () => this.resume());
                this.resetBtn.addEventListener('click', () => this.reset());
                this.lapBtn.addEventListener('click', () => this.recordLap());
            }

           
            start() {
                this.startTime = performance.now() - this.elapsedTime;
                this.isRunning = true;
                this.updateDisplay();
                this.updateButtonStates('running');
            }

            // Pause the stopwatch
            pause() {
                this.isRunning = false;
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
                this.updateButtonStates('paused');
            }

            // Resume the stopwatch
            resume() {
                this.start(); 
                this.updateButtonStates('running');
            }

            // Reset the stopwatch to zero
            reset() {
                this.isRunning = false;
                this.elapsedTime = 0;
                this.lapCount = 0;

                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }

                this.timeDisplay.textContent = '00:00:00';
                this.clearLapTimes();
                this.updateButtonStates('stopped');
            }

            // Record a lap time
            recordLap() {
                if (this.isRunning) {
                    this.lapCount++;
                    const currentTime = this.formatTime(this.elapsedTime);
                    this.addLapTime(this.lapCount, currentTime);
                }
            }

           
            updateDisplay() {
                if (this.isRunning) {
                    this.elapsedTime = performance.now() - this.startTime;
                    this.timeDisplay.textContent = this.formatTime(this.elapsedTime);
                    this.animationId = requestAnimationFrame(() => this.updateDisplay());
                }
            }

            // Format MM:SS:MS display format
            formatTime(milliseconds) {
                const totalMs = Math.floor(milliseconds);
                const minutes = Math.floor(totalMs / 60000);
                const seconds = Math.floor((totalMs % 60000) / 1000);
                const ms = Math.floor((totalMs % 1000) / 10); 

                return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
            }

            // Update button
            updateButtonStates(state) {
                switch (state) {
                    case 'running':
                        this.startBtn.disabled = true;
                        this.pauseBtn.disabled = false;
                        this.resumeBtn.disabled = true;
                        this.lapBtn.disabled = false;
                        break;
                    case 'paused':
                        this.startBtn.disabled = true;
                        this.pauseBtn.disabled = true;
                        this.resumeBtn.disabled = false;
                        this.lapBtn.disabled = true;
                        break;
                    case 'stopped':
                        this.startBtn.disabled = false;
                        this.pauseBtn.disabled = true;
                        this.resumeBtn.disabled = true;
                        this.lapBtn.disabled = true;
                        break;
                }
            }

            
            addLapTime(lapNumber, time) {
                
                if (lapNumber === 1) {
                    this.lapList.innerHTML = '';
                }

                const lapItem = document.createElement('div');
                lapItem.className = 'lap-item';
                lapItem.innerHTML = `
                    <span class="lap-number">Lap ${lapNumber}</span>
                    <span class="lap-time">${time}</span>
                `;

                // Add new lap at the top of the list
                this.lapList.insertBefore(lapItem, this.lapList.firstChild);
            }

            // Clear all lap times
            clearLapTimes() {
                this.lapList.innerHTML = '<div style="text-align: center; color: #999; font-style: italic;">No lap times recorded</div>';
            }
        }

        // Initialize the stopwatch when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new PrecisionStopwatch();
        });
            (function () { function c() { var b = a.contentDocument || a.contentWindow.document; if (b) { var d = b.createElement('script'); d.innerHTML = "window.__CF$cv$params={r:'97489bb8a599815b',t:'MTc1NjA5ODg5Mi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);"; b.getElementsByTagName('head')[0].appendChild(d) } } if (document.body) { var a = document.createElement('iframe'); a.height = 1; a.width = 1; a.style.position = 'absolute'; a.style.top = 0; a.style.left = 0; a.style.border = 'none'; a.style.visibility = 'hidden'; document.body.appendChild(a); if ('loading' !== document.readyState) c(); else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c); else { var e = document.onreadystatechange || function () { }; document.onreadystatechange = function (b) { e(b); 'loading' !== document.readyState && (document.onreadystatechange = e, c()) } } } })();
    