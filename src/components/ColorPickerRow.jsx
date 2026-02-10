import React from 'react';

const ColorPickerRow = ({ label, value, onChange, colorId, activeColor = 'emerald' }) => {
    const accentColor = activeColor === 'emerald' ? 'emerald-500' :
        activeColor === 'purple' ? 'purple-500' :
            activeColor === 'orange' ? 'orange-500' : 'white';

    const safeColorId = colorId || `color-${label?.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className={`flex items-center justify-between p-3.5 rounded-2xl bg-black/20 border border-white/5 group focus-within:border-${accentColor}/20 transition-all duration-300`}>
            <div className="flex flex-col gap-1 flex-1">
                <label htmlFor={safeColorId} className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{label || 'Color Hex'}</label>
                <input
                    id={safeColorId}
                    name={safeColorId}
                    type="text"
                    value={value || '#ffffff'}
                    onChange={(e) => onChange(e.target.value)}
                    className="bg-transparent border-none outline-none font-mono text-sm uppercase w-full text-white placeholder:text-white/10"
                    placeholder="#FFFFFF"
                />
            </div>
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg group-hover:border-white/20 transition-all duration-300">
                <input
                    id={`${safeColorId}-picker`}
                    name={`${safeColorId}-picker`}
                    type="color"
                    value={value || '#ffffff'}
                    onChange={(e) => onChange(e.target.value)}
                    aria-label={`${label || 'Color'} picker`}
                    className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                />
            </div>
        </div>
    );
};

export default ColorPickerRow;
