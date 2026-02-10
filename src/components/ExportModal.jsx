import React, { useState, useEffect } from 'react';
import { X, Copy, Download, Check, FileCode, FileJson, FileType, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const ExportModal = ({ isOpen, onClose, profile, links, socials, theme }) => {
    const [activeTab, setActiveTab] = useState('html');
    const [copied, setCopied] = useState(false);
    const [generatedCode, setGeneratedCode] = useState({ html: '', css: '', js: '' });

    useEffect(() => {
        if (isOpen) {
            generateCode();
        }
    }, [isOpen, profile, links, socials, theme]);

    const generateCode = () => {
        // --- CSS Generation ---
        const cssContent = `/* 
* VLink Builder Exported Styles
* Generated on ${new Date().toLocaleDateString()}
*/

:root {
    --bg-color: ${theme.bg || '#000000'};
    --text-color: ${theme.pageColor || '#ffffff'};
    --font-heading: '${theme.titleFont || 'Inter'}', sans-serif;
    --font-body: '${theme.pageFont || 'Inter'}', sans-serif;
}

body {
    margin: 0;
    padding: 0;
    font-family: var(--font-body);
    background: var(--bg-color);
    color: var(--text-color);
    min-height: 100vh;
    overflow-x: hidden;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* Animations */
@keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
}

/* Add more custom CSS here based on theme if needed */
`;

        // --- JS Generation ---
        const jsContent = `/* 
* VLink Builder Exported Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('VLink Builder page loaded');
    
    // Add any interactive logic here
    const links = document.querySelectorAll('.link-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Optional JS hover effects
        });
    });
});
`;

        // --- HTML Generation ---
        const socialIconsHtml = socials.filter(s => s.url).map(s => `
                    <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-icon">
                        ${s.platform}
                    </a>`).join('\n');

        const linksHtml = links.filter(l => l.active).map(l => `
                    <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="link-item group">
                        ${l.thumbnail ? `<img src="${l.thumbnail}" alt="" class="link-thumb" />` : ''}
                        <div class="link-content">
                            <span class="link-title">${l.title}</span>
                            ${l.url ? `<span class="link-url">${l.url.replace(/^https?:\/\/(www\.)?/, '')}</span>` : ''}
                        </div>
                    </a>`).join('\n');

        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profile.username} | VLink Builder</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['${theme.pageFont || 'Inter'}', 'sans-serif'],
                        heading: ['${theme.titleFont || 'Inter'}', 'sans-serif'],
                    },
                    colors: {
                        custom: {
                            bg: '${theme.bg || '#000000'}',
                            primary: '${theme.btnColor || '#ffffff'}',
                        }
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="styles.css">
    <style>
        /* Inline critical styles for background */
        .wallpaper-bg {
            ${theme.wallpaperStyle === 'fill' ? `background-color: ${theme.bg};` :
                theme.wallpaperStyle === 'gradient' ? `background-image: linear-gradient(180deg, ${theme.gradientColor1 || '#FF512F'} 0%, ${theme.gradientColor2 || '#DD2476'} 100%);` :
                    ''
            }
        }
        
        .link-item {
             /* Base Link Styles */
             background-color: ${theme.btnColor || 'rgba(255,255,255,0.1)'};
             border-radius: ${theme.btnRadius || 12}px;
             padding: 16px;
             margin-bottom: ${theme.btnSpacing || 12}px;
             display: flex;
             align-items: center;
             text-decoration: none;
             transition: transform 0.2s ease;
             color: ${theme.btnTextColor || '#ffffff'};
        }
        
        .link-item:hover {
            transform: scale(1.02);
        }

        .social-icon {
            color: ${theme.socialColorType === 'custom' ? theme.socialCustomColor : 'white'};
            opacity: 0.8;
            transition: opacity 0.2s;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: bold;
            padding: 8px;
        }
        .social-icon:hover {
            opacity: 1;
        }
    </style>
</head>
<body class="antialiased wallpaper-bg">
    <div class="min-h-screen flex flex-col items-center py-12 px-4">
        
        <!-- Profile Header -->
        <header class="flex flex-col items-center text-center mb-8 max-w-md w-full animate-fade-in">
            ${profile.avatar ? `<img src="${profile.avatar}" alt="${profile.username}" class="w-24 h-24 rounded-full border-2 border-white/10 shadow-lg mb-4 object-cover" />` : ''}
            <h1 class="text-xl font-bold mb-2 font-heading" style="color: ${theme.titleColor || '#ffffff'}">${profile.username}</h1>
            <p class="text-sm opacity-80 font-body" style="color: ${theme.pageColor || 'rgba(255,255,255,0.7)'}">${profile.bio}</p>
            
            <!-- Socials (Top) -->
            ${theme.socialPosition === 'top' ? `
            <div class="flex flex-wrap justify-center gap-4 mt-4">
                ${socialIconsHtml}
            </div>` : ''}
        </header>

        <!-- Links Container -->
        <main class="w-full max-w-md flex flex-col animate-fade-in" style="animation-delay: 0.1s;">
            ${linksHtml}
        </main>

        <!-- Socials (Bottom) -->
        ${theme.socialPosition === 'bottom' ? `
        <footer class="mt-12 flex flex-wrap justify-center gap-4 animate-fade-in" style="animation-delay: 0.2s;">
            ${socialIconsHtml}
        </footer>` : ''}

        <!-- VLink Builder Branding -->
        ${theme.showVlink ? `
        <div class="mt-8 opacity-40 text-xs font-medium">
            Made with VLink.id
        </div>` : ''}

    </div>
    <script src="script.js"></script>
</body>
</html>`;

        setGeneratedCode({ html: htmlContent, css: cssContent, js: jsContent });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = async () => {
        const zip = new JSZip();
        zip.file("index.html", generatedCode.html);
        zip.file("styles.css", generatedCode.css);
        zip.file("script.js", generatedCode.js);

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `${profile.username || 'vlinktree'}-export.zip`);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <div
                className="relative bg-[#121212] border border-white/10 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/5 bg-[#121212]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Code className="text-blue-400" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Export Code</h2>
                            <p className="text-xs text-white/40">Download your VLink Builder as static HTML/CSS/JS</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar Tabs */}
                    <div className="w-56 bg-[#0f0f0f] border-r border-white/5 flex flex-col p-3 gap-1">
                        {['html', 'css', 'js'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-3 p-2.5 rounded-lg transition-all text-sm ${activeTab === tab
                                    ? tab === 'html' ? 'bg-orange-500/10 text-orange-400'
                                        : tab === 'css' ? 'bg-blue-500/10 text-blue-400'
                                            : 'bg-yellow-500/10 text-yellow-400'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab === 'html' && <FileCode size={16} />}
                                {tab === 'css' && <FileType size={16} />}
                                {tab === 'js' && <FileJson size={16} />}
                                <span className="font-medium capitalize">{tab === 'css' ? 'styles.css' : tab === 'js' ? 'script.js' : 'index.html'}</span>
                            </button>
                        ))}
                    </div>

                    {/* Code Editor Preview */}
                    <div className="flex-1 flex flex-col bg-[#0c0c0c] relative group">
                        <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-medium text-white/70 transition-colors backdrop-blur-md"
                            >
                                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-6 custom-scrollbar">
                            <pre className="font-mono text-xs sm:text-sm leading-relaxed text-white/70 whitespace-pre-wrap select-text font-light">
                                <code>{generatedCode[activeTab]}</code>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-white/5 bg-[#121212] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white font-medium hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg shadow-white/5"
                    >
                        <Download size={16} />
                        Download ZIP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;
