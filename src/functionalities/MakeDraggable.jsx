import { useEffect, useState } from 'react';

export default function MakeDraggable({id, svgOnClick, svg}) {
    const draggable = document.getElementById(id);

    console.log("drag",draggable)

    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    if (draggable) {
        draggable.addEventListener('mousedown', dragStart);
        draggable.addEventListener('mouseup', dragEnd);
        draggable.addEventListener('mousemove', drag);
        draggable.addEventListener('touchstart', dragStart);
        draggable.addEventListener('touchend', dragEnd);
        draggable.addEventListener('touchmove', drag);
    }
        
    function dragStart(e) {
    if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === draggable) {
        isDragging = true;
    }
    }

    function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    isDragging = false;
    }

    function drag(e) {
    if (isDragging) {
        e.preventDefault();

        if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
        } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, draggable);
    }
    }

    function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    return (
        <div className="m-2 p-2 bg-light border">
            <p>Class Editor: </p>
            <div onClick={svgOnClick} ref={svg} />
        </div>
    );

}

