document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.gallery-track');
    
    if (track) {
        // Get all original items
        const items = [...track.querySelectorAll('.gallery-item')];
        
        // Clone all items to ensure smooth infinite scroll
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });

        // Calculate total width for animation
        const totalItems = items.length;
        track.style.setProperty('--total-items', totalItems);

        // Function to restart animation when it ends
        const restartAnimation = () => {
            track.style.animation = 'none';
            track.offsetHeight; // Trigger reflow
            track.style.animation = 'scroll 180s linear infinite';
        };

        // Add event listener for animation end
        track.addEventListener('animationend', restartAnimation);

        // Optional: Pause animation on hover
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
            
        });
    }
});