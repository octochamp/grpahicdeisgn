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
        document.addEventListener('mouseup', function() {
            dragActive = false;
            resizeActive = false;
            box.classList.remove('dragging');
            document.body.style.userSelect = '';
        });
        // Let clicking inside content area select text as normal
        box.querySelector('.box-content').addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
    });
})();