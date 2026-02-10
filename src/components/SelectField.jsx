import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const SelectField = ({
    id,
    label,
    value,
    onChange,
    options = [],
    className = "",
    placeholder,
    children,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const triggerId = id || `select-${label?.replace(/\s+/g, '-').toLowerCase()}`;

    // Initial check for options/children
    const getOptions = () => {
        if (children) {
            return React.Children.toArray(children).map(child => {
                if (child.type === 'option') {
                    return {
                        value: child.props.value,
                        label: child.props.children,
                        disabled: child.props.disabled,
                        className: child.props.className
                    };
                }
                return null;
            }).filter(Boolean);
        }
        return options;
    };

    const items = getOptions();
    const selectedItem = items.find(item => String(item.value) === String(value));

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (itemValue) => {
        // Mock event object for compatibility with existing onChange handlers
        const event = {
            target: {
                value: itemValue,
                name: props.name || id
            }
        };
        onChange(event);
        setIsOpen(false);
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`} ref={containerRef}>
            {label && (
                <label
                    htmlFor={triggerId}
                    className="text-[9px] font-bold text-white/40 uppercase tracking-widest"
                >
                    {label}
                </label>
            )}
            <div className="relative group">
                {/* Trigger */}
                <div
                    id={triggerId}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls={`${triggerId}-listbox`}
                    aria-label={label}
                    tabIndex={0}
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setIsOpen(!isOpen);
                        }
                    }}
                    className={`
                        w-full bg-[#1A1A1A] border rounded-xl px-4 py-3 text-xs font-bold text-white 
                        outline-none cursor-pointer flex items-center justify-between transition-all duration-300 ease-out
                        ${isOpen
                            ? 'border-purple-500/50 bg-[#202020] shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                            : 'border-white/5 hover:border-white/20 hover:bg-[#202020]'}
                    `}
                >
                    <span className={!selectedItem ? 'text-white/30' : ''}>
                        {selectedItem ? selectedItem.label : (placeholder || 'Select...')}
                    </span>
                    <div className={`text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : 'group-hover:text-white/60'}`}>
                        <ChevronDown size={14} />
                    </div>
                </div>

                {/* Dropdown Menu */}
                <div
                    id={`${triggerId}-listbox`}
                    role="listbox"
                    className={`
                        absolute top-[calc(100%+8px)] left-0 w-full z-50 bg-[#1A1A1A] border border-white/10 
                        rounded-xl shadow-2xl overflow-hidden transition-all duration-200 origin-top
                        ${isOpen ? 'opacity-100 scale-y-100 translate-y-0 visible' : 'opacity-0 scale-y-95 -translate-y-2 invisible pointer-events-none'}
                    `}
                >
                    <div className="max-h-[240px] overflow-y-auto custom-scrollbar p-1.5 flex flex-col gap-0.5">
                        {items.map((item, idx) => {
                            const isSelected = String(item.value) === String(value);
                            return (
                                <button
                                    key={`${item.value}-${idx}`}
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => !item.disabled && handleSelect(item.value)}
                                    disabled={item.disabled}
                                    className={`
                                        w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center justify-between group/item
                                        ${item.disabled ? 'text-white/20 cursor-not-allowed' : ''}
                                        ${isSelected
                                            ? 'bg-purple-500/10 text-purple-400'
                                            : 'text-white/70 hover:bg-white/5 hover:text-white'}
                                    `}
                                >
                                    <span>{item.label}</span>
                                    {isSelected && <Check size={12} className="text-purple-400" />}
                                </button>
                            );
                        })}
                        {items.length === 0 && (
                            <div className="px-3 py-3 text-white/30 text-xs text-center" role="status">
                                No options available
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectField;
