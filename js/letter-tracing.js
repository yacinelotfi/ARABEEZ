/**
 * LetterTracing Class
 * 
 * A canvas-based component for practicing letter writing.
 * Supports mouse and touch events for mobile/tablet compatibility.
 */
class LetterTracing {
  /**
   * @param {string} canvasId - The ID of the canvas element.
   * @param {string} clearBtnId - The ID of the clear button.
   * @param {object} options - Configuration options.
   */
  constructor(canvasId, clearBtnId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
        console.error(`Canvas element with id '${canvasId}' not found.`);
        return;
    }
    this.ctx = this.canvas.getContext('2d');
    this.clearBtn = document.getElementById(clearBtnId);

    // Configuration with defaults
    this.letter = options.letter || '';
    this.strokeColor = options.strokeColor || '#0d6efd'; // Bootstrap primary blue
    this.strokeWidth = options.strokeWidth || 15;
    this.templateColor = options.templateColor || '#e9ecef'; // Light gray
    this.fontFamily = options.fontFamily || '"Kufam", "Amiri", sans-serif'; // Use project fonts

    // State
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;

    // Bind methods to ensure 'this' context
    this.startDrawing = this.startDrawing.bind(this);
    this.draw = this.draw.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);

    this.init();
  }

  init() {
    // Handle high-DPI displays for sharper text
    this.handleHighDPI();

    // Mouse Events
    this.canvas.addEventListener('mousedown', this.startDrawing);
    this.canvas.addEventListener('mousemove', this.draw);
    this.canvas.addEventListener('mouseup', this.stopDrawing);
    this.canvas.addEventListener('mouseout', this.stopDrawing);

    // Touch Events (Mobile/Tablet)
    // passive: false is required to prevent scrolling while drawing
    this.canvas.addEventListener('touchstart', this.startDrawing, { passive: false });
    this.canvas.addEventListener('touchmove', this.draw, { passive: false });
    this.canvas.addEventListener('touchend', this.stopDrawing);

    // Clear Button
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', this.clearCanvas);
    }

    // Initial Draw
    this.drawTemplate();
  }

  handleHighDPI() {
    const dpr = window.devicePixelRatio || 1;
    // Get the CSS size of the canvas
    const rect = this.canvas.getBoundingClientRect();
    
    // Set the internal size (width/height attributes) to match CSS size * DPR
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    // Scale the context so drawing operations use CSS units
    this.ctx.scale(dpr, dpr);

    // Reset style width/height to ensure it doesn't grow
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  getCoordinates(e) {
    const rect = this.canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Since we scaled the context in handleHighDPI, we can just return relative coords
    // The context scale handles the mapping to internal pixels
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  startDrawing(e) {
    e.preventDefault();
    this.isDrawing = true;
    const coords = this.getCoordinates(e);
    this.lastX = coords.x;
    this.lastY = coords.y;
    
    // Draw a single dot in case it's just a tap
    this.ctx.beginPath();
    this.ctx.arc(this.lastX, this.lastY, this.strokeWidth / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.strokeColor;
    this.ctx.fill();
  }

  draw(e) {
    if (!this.isDrawing) return;
    e.preventDefault();
    const coords = this.getCoordinates(e);
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(coords.x, coords.y);
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.lineWidth = this.strokeWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();
    
    this.lastX = coords.x;
    this.lastY = coords.y;
  }

  stopDrawing() { 
    this.isDrawing = false; 
  }

  clearCanvas() {
    // Clear the entire canvas (using internal dimensions)
    // We need to reset the transform to clear everything, then restore it
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
    
    this.drawTemplate();
  }

  setLetter(char) {
    this.letter = char;
    this.clearCanvas();
  }

  drawTemplate() {
    if (!this.letter) return;

    const width = this.canvas.getBoundingClientRect().width;
    const height = this.canvas.getBoundingClientRect().height;

    // Draw the letter
    this.ctx.font = `bold ${height * 0.6}px ${this.fontFamily}`;
    this.ctx.fillStyle = this.templateColor;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    
    // Center of canvas
    const x = width / 2;
    // Adjust y slightly for baseline centering of Arabic text
    const y = height / 2 + (height * 0.05); 
    
    this.ctx.fillText(this.letter, x, y);

    // Draw "Start" indicator (Green Dot)
    // Heuristic: For most Arabic letters, start is top-right or top-center.
    // Without path data, we'll place a generic "Start" hint at the top-right quadrant
    // This is a visual cue, not a strict rule enforcement
    /*
    this.ctx.beginPath();
    this.ctx.arc(width * 0.7, height * 0.3, 8, 0, Math.PI * 2);
    this.ctx.fillStyle = '#28a745'; // Green
    this.ctx.fill();
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = '#28a745';
    this.ctx.fillText('Start', width * 0.7, height * 0.3 - 15);
    */
  }
}