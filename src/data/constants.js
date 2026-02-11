import { User, Layout, Image, Type, Square, Star, Paintbrush, LayoutGrid, Monitor, Share2, Instagram, Twitter, Youtube, Github, Linkedin, Mail, PaintRoller, Scan, Footprints } from 'lucide-react';
import CustomTikTok from '../components/TikTok';

export const LAYOUT_OPTIONS = [
    { id: 'stack', name: 'Stack', icon: Layout, description: 'Display links in a compact list.' },
    { id: 'grid', name: 'Grid', icon: LayoutGrid, description: 'Display links in a grid layout.' },
    { id: 'carousel', name: 'Carousel', icon: Image, description: 'Display links in a carousel.' },
    { id: 'showcase', name: 'Showcase', icon: Monitor, description: 'Display links in showcase mode.' }
];

export const SIDEBAR_ITEMS = [
    { id: 'header', icon: User, label: 'Header' },
    { id: 'theme', icon: PaintRoller, label: 'Theme' },
    { id: 'wallpaper', icon: Scan, label: 'Wallpaper' },
    { id: 'buttons', icon: Square, label: 'Button' },
    { id: 'footer', icon: Footprints, label: 'Footer' },
    { id: 'socials', icon: Share2, label: 'Social Icon' },
];

export const PLATFORMS = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-400', placeholder: 'https://instagram.com/username' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400', placeholder: 'https://twitter.com/username' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500', placeholder: 'https://youtube.com/c/yourchannel' },
    { id: 'github', name: 'GitHub', icon: Github, color: 'text-white', placeholder: 'https://github.com/username' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600', placeholder: 'https://linkedin.com/in/username' },
    { id: 'tiktok', name: 'TikTok', icon: CustomTikTok, color: 'text-white', placeholder: 'https://tiktok.com/@username' },
    { id: 'mail', name: 'Email', icon: Mail, color: 'text-gray-400', placeholder: 'mailto:your@email.com' },
];

export const FONTS = [
    'Inter', 'DM Sans', 'Outfit', 'Roboto', 'Playfair Display', 'Bento',
    'Open Sans', 'Montserrat', 'Lato', 'Poppins', 'Raleway', 'Nunito', 'Ubuntu',
    'Merriweather', 'Lora', 'Oswald', 'Lobster', 'Pacifico'
];

export const ANIMATION_OPTIONS = [
    { id: 'none', label: 'None' },
    { id: 'pulse-custom', label: 'Pulse' },
    { id: 'glow-custom', label: 'Glow' },
    { id: 'sweep', label: 'Light Sweep' },
    { id: 'teeter', label: 'Teeter' },
    { id: 'color-pulse', label: 'Color Pulse' },
    { id: 'float', label: 'Float' },
    { id: 'bounce-custom', label: 'Bounce' }
];

export const THEMES = [
    { id: 'custom', name: 'Custom', icon: Paintbrush, bg: '#ffffff', btnStyle: 'outline', color: '#000000' },
    { id: 'agate', name: 'Agate', bg: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)', btnStyle: 'solid', color: '#ffffff', accentColor: '#34d399' },
    { id: 'air', name: 'Air', bg: '#ffffff', btnStyle: 'solid', color: '#000000', accentColor: '#f3f4f6' },
    { id: 'astrid', name: 'Astrid', bg: '#111827', btnStyle: 'glass', color: '#ffffff', accentColor: '#ffffff' },
    { id: 'aura', name: 'Aura', bg: '#d1d5db', btnStyle: 'glass', color: '#000000', accentColor: '#ffffff' },
    { id: 'bliss', name: 'Bliss', bg: '#f3f4f6', btnStyle: 'solid', color: '#000000', accentColor: '#ffffff' },
    { id: 'blocks', name: 'Blocks', bg: '#a855f7', btnStyle: 'solid', color: '#ffffff', accentColor: '#ec4899' },
    { id: 'bloom', name: 'Bloom', bg: 'linear-gradient(135deg, #f43f5e 0%, #881337 100%)', btnStyle: 'glass', color: '#ffffff', accentColor: '#ffffff' },
    { id: 'breeze', name: 'Breeze', bg: 'linear-gradient(135deg, #ec4899 0%, #fbcfe8 100%)', btnStyle: 'glass', color: '#ffffff', accentColor: '#ffffff' },
    { id: 'encore', name: 'Encore', bg: '#000000', btnStyle: 'outline', color: '#ffffff', accentColor: '#fbbf24' },
    { id: 'grid', name: 'Grid', bg: '#fef9c3', btnStyle: 'solid', color: '#000000', accentColor: '#ffffff' },
    { id: 'groove', name: 'Groove', bg: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', btnStyle: 'glass', color: '#ffffff', accentColor: '#ffffff' },
    { id: 'haven', name: 'Haven', bg: '#e5e7eb', btnStyle: 'solid', color: '#000000', accentColor: '#ffffff' },
    { id: 'lake', name: 'Lake', bg: '#0f172a', btnStyle: 'solid', color: '#ffffff', accentColor: '#1e293b' },
    { id: 'mineral', name: 'Mineral', bg: '#fff7ed', btnStyle: 'glass', color: '#000000', accentColor: '#ffffff' },
    { id: 'nourish', name: 'Nourish', bg: '#4d7c0f', btnStyle: 'solid', color: '#ffffff', accentColor: '#bef264' },
    { id: 'rise', name: 'Rise', bg: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)', btnStyle: 'glass', color: '#ffffff', accentColor: '#ffffff' },
    { id: 'sweat', name: 'Sweat', bg: '#3b82f6', btnStyle: 'solid', color: '#ffffff', accentColor: '#60a5fa' }
];
