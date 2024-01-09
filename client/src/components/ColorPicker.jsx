import React from 'react';
import "./../styles/colorpalette.css"
const ColorPaletteModal = ({ isOpen, selectedColor, onColorSelect, onClose }) => {
  const colors = ['#FFFFFF', '#FFD700', '#90EE90', '#FFA07A', '#AFEEEE', '#B0C4DE'];

  return (
    isOpen && (
      <div className="color-palette-modal">
        {colors.map((color) => (
          <div
            key={color}
            className={`color-option ${color === selectedColor ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
          ></div>
        ))}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    )
  );
};

export default ColorPaletteModal;
