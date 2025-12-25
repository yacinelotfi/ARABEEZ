/**
 * Certificate Generator
 * Handles the generation and download of course completion certificates.
 * Dependencies: html2canvas, jspdf
 */
class CertificateManager {
    constructor() {
        this.modal = null;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Initialize Bootstrap modal
        const modalEl = document.getElementById('certificateModal');
        if (modalEl) {
            this.modal = new bootstrap.Modal(modalEl);
        }

        // Start observing progress
        this.observeProgress();
        
        // Set current date in the template
        const dateEl = document.getElementById('certDate');
        if (dateEl) {
            const now = new Date();
            // Format date in Arabic locale
            dateEl.innerText = now.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
        }
    }

    observeProgress() {
        const progressBar = document.getElementById('progress');
        const btn = document.getElementById('certificateBtn');
        
        if (!progressBar || !btn) return;

        // Function to check progress status
        const check = () => {
            const width = progressBar.style.width;
            const percent = parseInt(width) || 0;
            
            if (percent >= 100) {
                btn.classList.remove('d-none');
                btn.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
            } else {
                btn.classList.add('d-none');
                btn.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
            }
        };

        // Initial check
        check();

        // Observe changes to the progress bar style attribute
        const observer = new MutationObserver(check);
        observer.observe(progressBar, { attributes: true, attributeFilter: ['style'] });
    }

    openModal() {
        if (this.modal) this.modal.show();
    }

    updateName() {
        const input = document.getElementById('studentNameInput');
        const display = document.getElementById('certStudentName');
        if (input && display) {
            display.innerText = input.value || 'اسم الطالب';
        }
    }

    async download(type) {
        const element = document.getElementById('certificateElement');
        if (!element) return;

        // Ensure fonts are loaded before capturing
        await document.fonts.ready;

        try {
            // Generate canvas from DOM element
            const canvas = await html2canvas(element, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            if (type === 'png') {
                // Download as Image
                const link = document.createElement('a');
                link.download = 'Arabeez-Certificate.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            } else if (type === 'pdf') {
                // Download as PDF
                const { jsPDF } = window.jspdf;
                // Landscape A4 orientation
                const pdf = new jsPDF('l', 'mm', 'a4');
                
                const imgData = canvas.toDataURL('image/png');
                
                // Calculate dimensions to fit A4 page
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('Arabeez-Certificate.pdf');
            }
        } catch (err) {
            console.error('Certificate generation failed:', err);
            alert('حدث خطأ أثناء إنشاء الشهادة. يرجى المحاولة مرة أخرى.');
        }
    }
}

// Initialize the manager
const certificateManager = new CertificateManager();