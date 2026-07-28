import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import './CustomSelect.css';

const CustomSelect = ({ 
  options = [], 
  value = '', 
  onChange, 
  placeholder = 'Select an option...', 
  name, 
  required = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    if (onChange) {
      // Support both direct value or synth target event
      const event = {
        target: {
          name: name,
          value: optionValue
        }
      };
      onChange(event);
    }
    setIsOpen(false);
  };

  // Find label for current value
  const selectedOption = options.find(opt => 
    typeof opt === 'object' ? opt.value === value : opt === value
  );

  const displayLabel = selectedOption 
    ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption) 
    : placeholder;

  return (
    <div className={`custom-select-container ${isOpen ? 'is-open' : ''} ${className}`} ref={containerRef}>
      {/* Hidden input for form submission & HTML validation */}
      {name && (
        <input 
          type="hidden" 
          name={name} 
          value={value} 
          required={required} 
        />
      )}

      {/* Trigger Button */}
      <button
        type="button"
        className={`custom-select-trigger ${!value ? 'is-placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="custom-select-label">{displayLabel}</span>
        <FaChevronDown className={`custom-select-arrow ${isOpen ? 'open' : ''}`} />
      </button>

      {/* Options Menu - ALWAYS POSITIONED DOWNWARDS (top: 100%) */}
      {isOpen && (
        <ul className="custom-select-menu" role="listbox">
          {placeholder && (
            <li
              className={`custom-select-option placeholder-option ${value === '' ? 'selected' : ''}`}
              onClick={() => handleSelect('')}
              role="option"
              aria-selected={value === ''}
            >
              <span>{placeholder}</span>
              {value === '' && <FaCheck className="check-icon" />}
            </li>
          )}
          {options.map((opt, idx) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            const isSelected = value === optVal;

            return (
              <li
                key={idx}
                className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(optVal)}
                role="option"
                aria-selected={isSelected}
              >
                <span>{optLabel}</span>
                {isSelected && <FaCheck className="check-icon" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
