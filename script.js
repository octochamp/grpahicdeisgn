// d:\Projects\Grpahic Deisgn\Website\grpahicdeisgn\script.js

// Draggable & Resizable Floating Boxes (single global handlers for mobile/desktop)
(function() {
    const minWidth = 120;
    const minHeight = 80;
    let dragActive = false, resizeActive = false;
    let activeBox = null, startX = 0, startY = 0;
    let offsetX = 0, offsetY = 0, startWidth = 0, startHeight = 0, startLeft = 0, startTop = 0;

    // Helper to get touch or mouse coords
    function getClient(e) {
        if (e.touches && e.touches.length) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else {
            return { x: e.clientX, y: e.clientY };
        }
    }

    // Setup per-box handlers to start drag/resize on mousedown/touchstart
    document.querySelectorAll('.floating-box').forEach(box => {
        const header = box.querySelector('.box-header');
        const resizeHandle = box.querySelector('.resize-handle');

        // DRAG start
        function dragStart(e) {
            e.preventDefault();
            const { x, y } = getClient(e);
            dragActive = true;
            activeBox = box;
            offsetX = x - box.offsetLeft;
            offsetY = y - box.offsetTop;
            document.body.style.userSelect = 'none';
            box.classList.add('dragging');
        }
        // RESIZE start
        function resizeStart(e) {
            e.preventDefault();
            const { x, y } = getClient(e);
            resizeActive = true;
            activeBox = box;
            startWidth = box.offsetWidth;
            startHeight = box.offsetHeight;
            startLeft = box.offsetLeft;
            startTop = box.offsetTop;
            startX = x;
            startY = y;
            document.body.style.userSelect = 'none';
            box.classList.add('dragging');
        }
        header.addEventListener('mousedown', dragStart);
        header.addEventListener('touchstart', dragStart, { passive: false });
        resizeHandle.addEventListener('mousedown', resizeStart);
        resizeHandle.addEventListener('touchstart', resizeStart, { passive: false });

        // Let clicking inside content area select text as normal
        box.querySelector('.box-content').addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
    });

    // GLOBAL MOVE/END HANDLERS
    function moveHandler(e) {
        if (!(dragActive || resizeActive) || !activeBox) return;
        if (e.cancelable) e.preventDefault();

        const { x, y } = getClient(e);
        if (dragActive) {
            activeBox.style.left = (x - offsetX) + 'px';
            activeBox.style.top  = (y - offsetY) + 'px';
        } else if (resizeActive) {
            let newW = Math.max(minWidth, startWidth + (x - startX));
            let newH = Math.max(minHeight, startHeight + (y - startY));
            activeBox.style.width  = newW + 'px';
            activeBox.style.height = newH + 'px';
        }
    }
    function endHandler(e) {
        if (dragActive || resizeActive) {
            dragActive = resizeActive = false;
            if (activeBox) activeBox.classList.remove('dragging');
            activeBox = null;
            document.body.style.userSelect = '';
        }
    }

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', moveHandler, { passive: false });
    document.addEventListener('mouseup', endHandler);
    document.addEventListener('touchend', endHandler, { passive: false });

})();

// Obfuscate email address
function sendEmail() {
    const encodedEmail = 'bmF0aGFuQGdycGFoaWNkZWlzZ24uY29t';
    const emailDecoded = atob(encodedEmail);
    location.href = "mailto:" + emailDecoded;
}