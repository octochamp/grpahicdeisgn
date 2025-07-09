// Draggable & Resizable Floating Boxes
(function() {
    const minWidth = 120;
    const minHeight = 80;

    document.querySelectorAll('.floating-box').forEach(box => {
        // Dragging logic
        const header = box.querySelector('.box-header');
        let dragActive = false, resizeActive = false;
        let offsetX = 0, offsetY = 0, startWidth = 0, startHeight = 0, startLeft = 0, startTop = 0;

        header.addEventListener('mousedown', function(e) {
            dragActive = true;
            box.classList.add('dragging');
            offsetX = e.clientX - box.offsetLeft;
            offsetY = e.clientY - box.offsetTop;
            document.body.style.userSelect = 'none';
        });
        
        // Add touchstart for mobile devices
        header.addEventListener('touchstart', function(e) {
            dragActive = true;
            box.classList.add('dragging');
            let rect = e.target.getBoundingClientRect();
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
            document.body.style.userSelect = 'none';
        }, { passive: false });

        const resizeHandle = box.querySelector('.resize-handle');
        resizeHandle.addEventListener('mousedown', function(e) {
            resizeActive = true;
            box.classList.add('dragging');
            startWidth = box.offsetWidth;
            startHeight = box.offsetHeight;
            startLeft = box.offsetLeft;
            startTop = box.offsetTop;
            offsetX = e.clientX;
            offsetY = e.clientY;
            e.stopPropagation();
            document.body.style.userSelect = 'none';
        });
        
        // Add touchstart for resizeHandle on mobile devices
        resizeHandle.addEventListener('touchstart', function(e) {
            resizeActive = true;
            box.classList.add('dragging');
            let rect = e.target.getBoundingClientRect();
            startWidth = box.offsetWidth;
            startHeight = box.offsetHeight;
            startLeft = box.offsetLeft;
            startTop = box.offsetTop;
            offsetX = e.touches[0].clientX;
            offsetY = e.touches[0].clientY;
            document.body.style.userSelect = 'none';
        }, { passive: false });

        document.addEventListener('mousemove', function(e) {
            if (dragActive) {
                box.style.left = (e.clientX - offsetX) + 'px';
                box.style.top = (e.clientY - offsetY) + 'px';
            } else if (resizeActive) {
                let newW = Math.max(minWidth, startWidth + (e.clientX - offsetX));
                let newH = Math.max(minHeight, startHeight + (e.clientY - offsetY));
                box.style.width = newW + 'px';
                box.style.height = newH + 'px';
            }
        });
        
        // Add touchmove for mobile devices
        document.addEventListener('touchmove', function(e) {
            if (dragActive || resizeActive) {
                e.preventDefault(); // Prevent swipe/scroll gestures during drag or resize
            }
            if (dragActive) {
                box.style.left = (e.touches[0].clientX - offsetX) + 'px';
                box.style.top = (e.touches[0].clientY - offsetY) + 'px';
            } else if (resizeActive) {
                let newW = Math.max(minWidth, startWidth + (e.touches[0].clientX - offsetX));
                let newH = Math.max(minHeight, startHeight + (e.touches[0].clientY - offsetY));
                box.style.width = newW + 'px';
                box.style.height = newH + 'px';
            }
        }, { passive: false });
        
        document.addEventListener('mouseup', function() {
            dragActive = false;
            resizeActive = false;
            box.classList.remove('dragging');
            document.body.style.userSelect = '';
        });

        // Add touchend for mobile devices
        document.addEventListener('touchend', function() {
            dragActive = false;
            resizeActive = false;
            box.classList.remove('dragging');
            document.body.style.userSelect = '';
        }, { passive: false });
        
        // Let clicking inside content area select text as normal
        box.querySelector('.box-content').addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
    });
})();

// Obfuscate email address
function sendEmail() {
    const encodedEmail = 'bmF0aGFuQGdycGFoaWNkZWlzZ24uY29t';
    const emailDecoded = atob(encodedEmail);
    location.href = "mailto:" + emailDecoded;
}