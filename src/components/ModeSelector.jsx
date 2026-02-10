import React from 'react';
import { Square, Layers, LayoutGrid } from 'lucide-react';

const ModeSelector = ({ id, mode, onChange, activeColor = 'emerald', ariaLabel }) => {
    const accentBg = activeColor === 'emerald' ? 'bg-emerald-500/10' :
        activeColor === 'purple' ? 'bg-purple-500/10' :
            activeColor === 'orange' ? 'bg-orange-500/10' : 'bg-white/10';

    const accentText = activeColor === 'emerald' ? 'text-emerald-400' :
        activeColor === 'purple' ? 'text-purple-400' :
            activeColor === 'orange' ? 'text-orange-400' : 'text-white';

    const accentBorder = activeColor === 'emerald' ? 'border-emerald-500/20' :
        activeColor === 'purple' ? 'border-purple-500/20' :
            activeColor === 'orange' ? 'border-orange-500/20' : 'border-white/20';

    const modes = [
        { id: 'solid', label: 'Solid', icon: Square },
        { id: 'gradient', label: 'Gradient', icon: Layers },
        { id: 'pattern', label: 'Pattern', icon: LayoutGrid }
    ];

    return (
        <div
            id={id}
            role="group"
            aria-label={ariaLabel || "Selection Mode"}
            className="flex bg-white/5 rounded-2xl p-1 border border-white/5"
        >
            {modes.map((m) => {
                const Icon = m.icon;
                const isActive = mode === m.id;
                return (
                    <button
                        key={m.id}
                        type="button"
                        onClick={() => onChange(m.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`
                            flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300
                            ${isActive
                                ? `${accentBg} ${accentText} ${accentBorder} border shadow-lg`
                                : 'bg-transparent border-transparent text-white/30 hover:text-white/60 hover:bg-white/5'}
                        `}
                    >
                        <Icon size={14} className={isActive ? accentText : 'text-white/20'} aria-hidden="true" />
                        {m.label}
                    </button>
                );
            })}
        </div>
    );
};

export default ModeSelector;
