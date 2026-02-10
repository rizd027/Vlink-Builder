import React, { useState, useEffect, useRef, useDeferredValue, memo, useCallback } from 'react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import PreviewSection from './components/PreviewSection';
import ExportModal from './components/ExportModal';
import TikTok from './components/TikTok';
import { LAYOUT_OPTIONS, SIDEBAR_ITEMS, FONTS, THEMES, PLATFORMS, ANIMATION_OPTIONS } from './data/constants';
import ColorPickerRow from './components/ColorPickerRow';
import ModeSelector from './components/ModeSelector';
import SelectField from './components/SelectField';
import {
    PanelLeft, Palette, Settings, LogOut, ExternalLink,
    Plus, Search, Github, Twitter, Instagram, Youtube, Linkedin,
    MoreHorizontal, Share2, PanelRight, Smartphone, Eye, Layout, Type,
    Image, Zap, Bell, QrCode, Globe, Clock, Shield, Trash2, Edit2, Link2,
    Check, ChevronRight, ChevronLeft, X, Star, BarChart2, Calendar, Lock, Upload, Copy, Heart,
    ArrowRight, GripVertical, Edit3, LayoutGrid, Monitor, ShoppingBag, Music,
    FileText, Lightbulb, Tag, Link as LinkIcon,
    ArrowUp, ArrowDown, Circle, ChevronDown, Video, User, Square, Paintbrush,
    LayoutTemplate, MousePointer2, Droplets, Footprints, Wand2, AlignLeft,
    AlignCenter, AlignRight, Layers, Maximize, Box, Share, Wand, FileCode, Download,
    Rss, Laptop, Tablet,
    AtSign, Hash, MessageCircle, Send, Mail, MessageSquare, Wallet, Landmark, PiggyBank, CreditCard, Banknote,
    Receipt, DollarSign, Coins, ShoppingCart, Store, Package, Truck, Ticket, Code, FileJson,
    Terminal, Database, Server, Cpu, HardDrive, Keyboard, Mouse, Speaker, Cast, Tv,
    Headphones, Mic, Aperture, Brush, Contrast, Move, Scissors, Eraser, Columns, Grid,
    Minimize, Scaling, Pencil, Highlighter, PenTool, Book, BookOpen, Briefcase, Award,
    Trophy, Medal, Target, Flag, GraduationCap, Activity, HeartPulse, Thermometer, Gem,
    Crown, Sparkles, Rocket, Telescope, Microscope, Atom, FlaskConical, Brain, Fingerprint,
    Scan, Barcode, Coffee, Pizza, Utensils, GlassWater, Beer, Wine, Cake,
    Ghost, Gamepad2, Puzzle, Sun, Moon, Cloud, CloudRain, CloudSnow,
    CloudLightning, Umbrella, Plane, Train, Bus, Car, Bike, Flame, Leaf, TreeDeciduous,
    PawPrint, Dog, Cat, Bird, Fish, Bug, Mountain, Waves, Wind, Map, Navigation, Pin,
    ThumbsUp, ThumbsDown, Laugh, Smile, Frown, Meh, Angry, Annoyed, CheckCircle2, HelpCircle,
    Info, AlertCircle, AlertTriangle, ShieldCheck, ShieldAlert, ShieldQuestion, Unlock, Key,
    Sliders, Filter, Home, Building, Hotel, MapPin, Archive, FolderOpen, Clipboard,
    History, Timer, TimerReset, Hourglass, FileVideo, FileAudio, FileImage, Camera
} from 'lucide-react';
const ICON_LIST = [
    { name: 'Instagram', icon: Instagram },
    { name: 'Twitter', icon: Twitter },
    { name: 'Github', icon: Github },
    { name: 'Youtube', icon: Youtube },
    { name: 'TikTok', icon: TikTok },
    { name: 'Linkedin', icon: Linkedin },
    { name: 'Mail', icon: Mail },
    { name: 'AtSign', icon: AtSign },
    { name: 'MessageSquare', icon: MessageSquare },
    { name: 'MessageCircle', icon: MessageCircle },
    { name: 'Send', icon: Send },
    { name: 'Globe', icon: Globe },
    { name: 'Rss', icon: Rss },

    { name: 'Music', icon: Music },
    { name: 'Headphones', icon: Headphones },
    { name: 'Mic', icon: Mic },
    { name: 'Video', icon: Video },
    { name: 'Camera', icon: Camera },
    { name: 'Image', icon: Image },
    { name: 'Aperture', icon: Aperture },

    { name: 'ShoppingCart', icon: ShoppingCart },
    { name: 'ShoppingBag', icon: ShoppingBag },
    { name: 'Store', icon: Store },
    { name: 'Package', icon: Package },
    { name: 'Truck', icon: Truck },
    { name: 'Tag', icon: Tag },
    { name: 'Ticket', icon: Ticket },

    { name: 'Wallet', icon: Wallet },
    { name: 'CreditCard', icon: CreditCard },
    { name: 'Banknote', icon: Banknote },
    { name: 'Coins', icon: Coins },
    { name: 'DollarSign', icon: DollarSign },
    { name: 'Landmark', icon: Landmark },
    { name: 'PiggyBank', icon: PiggyBank },
    { name: 'Receipt', icon: Receipt },

    { name: 'Briefcase', icon: Briefcase },
    { name: 'Award', icon: Award },
    { name: 'Trophy', icon: Trophy },
    { name: 'Medal', icon: Medal },
    { name: 'Target', icon: Target },
    { name: 'Flag', icon: Flag },

    { name: 'GraduationCap', icon: GraduationCap },
    { name: 'Book', icon: Book },
    { name: 'BookOpen', icon: BookOpen },
    { name: 'Lightbulb', icon: Lightbulb },
    { name: 'Brain', icon: Brain },
    { name: 'Rocket', icon: Rocket },

    { name: 'Coffee', icon: Coffee },
    { name: 'Utensils', icon: Utensils },
    { name: 'Pizza', icon: Pizza },
    { name: 'GlassWater', icon: GlassWater },
    { name: 'Beer', icon: Beer },
    { name: 'Wine', icon: Wine },
    { name: 'Cake', icon: Cake },

    { name: 'Gamepad2', icon: Gamepad2 },
    { name: 'Puzzle', icon: Puzzle },
    { name: 'Ghost', icon: Ghost },

    { name: 'User', icon: User },
    { name: 'Heart', icon: Heart },
    { name: 'Star', icon: Star },
    { name: 'Zap', icon: Zap },
    { name: 'Sparkles', icon: Sparkles },
    { name: 'Wand2', icon: Wand2 },

    { name: 'ThumbsUp', icon: ThumbsUp },
    { name: 'ThumbsDown', icon: ThumbsDown },
    { name: 'Smile', icon: Smile },
    { name: 'Laugh', icon: Laugh },
    { name: 'Frown', icon: Frown },
    { name: 'Meh', icon: Meh },
    { name: 'Angry', icon: Angry },

    { name: 'Sun', icon: Sun },
    { name: 'Moon', icon: Moon },
    { name: 'Cloud', icon: Cloud },
    { name: 'CloudRain', icon: CloudRain },
    { name: 'CloudSnow', icon: CloudSnow },
    { name: 'CloudLightning', icon: CloudLightning },
    { name: 'Umbrella', icon: Umbrella },
    { name: 'Flame', icon: Flame },
    { name: 'Leaf', icon: Leaf },
    { name: 'TreeDeciduous', icon: TreeDeciduous },
    { name: 'Mountain', icon: Mountain },
    { name: 'Waves', icon: Waves },
    { name: 'Wind', icon: Wind },

    { name: 'Dog', icon: Dog },
    { name: 'Cat', icon: Cat },
    { name: 'Bird', icon: Bird },
    { name: 'Fish', icon: Fish },
    { name: 'Bug', icon: Bug },
    { name: 'PawPrint', icon: PawPrint },
    { name: 'Footprints', icon: Footprints },

    { name: 'Home', icon: Home },
    { name: 'MapPin', icon: MapPin },
    { name: 'Map', icon: Map },
    { name: 'Navigation', icon: Navigation },
    { name: 'Pin', icon: Pin },
    { name: 'Building', icon: Building },
    { name: 'Hotel', icon: Hotel },

    { name: 'Smartphone', icon: Smartphone },
    { name: 'Tablet', icon: Tablet },
    { name: 'Laptop', icon: Laptop },
    { name: 'Monitor', icon: Monitor },
    { name: 'Tv', icon: Tv },
    { name: 'Speaker', icon: Speaker },
    { name: 'Cast', icon: Cast },
    { name: 'Gamepad2', icon: Gamepad2 },

    { name: 'Code', icon: Code },
    { name: 'Terminal', icon: Terminal },
    { name: 'Database', icon: Database },
    { name: 'Server', icon: Server },
    { name: 'Cpu', icon: Cpu },
    { name: 'HardDrive', icon: HardDrive },
    { name: 'Keyboard', icon: Keyboard },
    { name: 'Mouse', icon: Mouse },
    { name: 'FileCode', icon: FileCode },
    { name: 'FileJson', icon: FileJson },

    { name: 'FileText', icon: FileText },
    { name: 'FileVideo', icon: FileVideo },
    { name: 'FileAudio', icon: FileAudio },
    { name: 'FileImage', icon: FileImage },
    { name: 'Archive', icon: Archive },
    { name: 'FolderOpen', icon: FolderOpen },
    { name: 'Clipboard', icon: Clipboard },

    { name: 'Clock', icon: Clock },
    { name: 'History', icon: History },
    { name: 'Timer', icon: Timer },
    { name: 'TimerReset', icon: TimerReset },
    { name: 'Hourglass', icon: Hourglass },

    { name: 'Pencil', icon: Pencil },
    { name: 'PenTool', icon: PenTool },
    { name: 'Brush', icon: Brush },
    { name: 'Palette', icon: Palette },
    { name: 'Contrast', icon: Contrast },
    { name: 'Scissors', icon: Scissors },
    { name: 'Eraser', icon: Eraser },
    { name: 'Highlighter', icon: Highlighter },

    { name: 'Bell', icon: Bell },
    { name: 'Shield', icon: Shield },
    { name: 'ShieldCheck', icon: ShieldCheck },
    { name: 'ShieldAlert', icon: ShieldAlert },
    { name: 'Lock', icon: Lock },
    { name: 'Unlock', icon: Unlock },
    { name: 'Key', icon: Key },
    { name: 'Scan', icon: Scan },
    { name: 'QrCode', icon: QrCode },
    { name: 'Barcode', icon: Barcode },
    { name: 'Eye', icon: Eye },

    { name: 'Activity', icon: Activity },
    { name: 'HeartPulse', icon: HeartPulse },
    { name: 'Thermometer', icon: Thermometer },

    { name: 'Settings', icon: Settings },
    { name: 'Sliders', icon: Sliders },
    { name: 'Filter', icon: Filter },
    { name: 'Search', icon: Search },
    { name: 'ExternalLink', icon: ExternalLink },
    { name: 'Plus', icon: Plus },
    { name: 'Check', icon: Check },
    { name: 'CheckCircle2', icon: CheckCircle2 },
    { name: 'HelpCircle', icon: HelpCircle },
    { name: 'Info', icon: Info },
    { name: 'AlertCircle', icon: AlertCircle },
    { name: 'AlertTriangle', icon: AlertTriangle }
];

const ReorderLinkItem = memo(({
    link,
    updateLink,
    openLinkModal,
    activeLinkLayoutDropdown,
    setActiveLinkLayoutDropdown
}) => {
    const controls = useDragControls();

    return (
        <Reorder.Item
            value={link}
            id={link.id}
            layout="position"
            dragListener={false}
            dragControls={controls}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 1,
                opacity: { duration: 0.2 }
            }}
            whileDrag={{
                scale: 1.02,
                zIndex: 100,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                userSelect: "none"
            }}
            className={`flex flex-col bg-[#1a1a1a] rounded-[1rem] border border-white/10 relative group/card ${activeLinkLayoutDropdown === link.id ? 'z-50' : 'z-auto'} hover:border-white/20`}
        >
            <div className="flex">
                {/* Drag Handle Column */}
                <div
                    onPointerDown={(e) => {
                        e.preventDefault();
                        controls.start(e);
                    }}
                    className="w-10 flex items-center justify-center border-r border-white/5 text-white/20 hover:text-white/60 rounded-l-[inherit] cursor-grab active:cursor-grabbing transition-all select-none active:bg-white/5"
                >
                    <motion.div whileTap={{ scale: 1.2 }}>
                        <GripVertical size={16} />
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-5 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                        {/* Title and URL Inputs */}
                        <div className="flex-1 flex items-start gap-4">
                            {/* Thumbnail Preview */}
                            <div
                                onClick={() => openLinkModal(link.id, 'thumbnail')}
                                className="w-12 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0 cursor-pointer hover:bg-white/10 transition-all overflow-hidden group/thumb"
                            >
                                {link.thumbnail ? (
                                    <img src={link.thumbnail} alt="" className="w-full h-full object-cover" />
                                ) : link.icon ? (
                                    (() => {
                                        const Icon = ICON_LIST.find(i => i.name === link.icon)?.icon || Image;
                                        return <Icon size={20} className="text-white/40 group-hover/thumb:text-white transition-colors" />;
                                    })()
                                ) : (
                                    <Image size={20} className="text-white/20 group-hover/thumb:text-white/40 transition-colors" />
                                )}
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                {/* Title Row */}
                                <div className="flex items-center gap-2 group/title">
                                    <label htmlFor={`link-title-${link.id}`} className="sr-only">Link title</label>
                                    <input
                                        id={`link-title-${link.id}`}
                                        name={`link-title-${link.id}`}
                                        value={link.title}
                                        onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                                        className="font-bold text-white text-base bg-transparent border-none outline-none focus:ring-0 p-0 w-full placeholder:text-white/20"
                                        placeholder="Link title"
                                    />
                                </div>

                                {/* URL Row */}
                                <div className="flex items-center gap-2 group/url">
                                    <label htmlFor={`link-url-${link.id}`} className="sr-only">Link URL</label>
                                    <input
                                        id={`link-url-${link.id}`}
                                        name={`link-url-${link.id}`}
                                        value={link.url}
                                        onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                                        className="text-xs text-white/40 bg-transparent border-none outline-none focus:ring-0 p-0 w-full placeholder:text-white/10 font-mono"
                                        placeholder="https://your-link.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Top Right Controls: Share + Toggle */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => openLinkModal(link.id, 'share')}
                                className="text-white/40 hover:text-white"
                            >
                                <Share2 size={16} />
                            </button>
                            <button
                                onClick={() => updateLink(link.id, 'active', !link.active)}
                                className={`w-11 h-6 rounded-full relative transition-colors duration-300 ease-in-out ${link.active ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                <div className={`
                                    absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm 
                                    transition-transform duration-500 
                                    ease-[cubic-bezier(0.2,0.8,0.2,1)] 
                                    ${link.active ? 'translate-x-5' : 'translate-x-0'}
                                `} />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1">
                            <div className="relative">
                                <button
                                    onClick={() => setActiveLinkLayoutDropdown(activeLinkLayoutDropdown === link.id ? null : link.id)}
                                    className={`p-2 rounded-lg ${activeLinkLayoutDropdown === link.id ? 'bg-[#8228d9] text-white shadow-[0_0_15px_rgba(130,40,217,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                    title="Layout"
                                >
                                    <Layout size={16} />
                                </button>

                                {activeLinkLayoutDropdown === link.id && (
                                    <div className="absolute bottom-[calc(100%+12px)] left-0 w-[420px] p-6 rounded-[2rem] bg-[#121212] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] z-50">
                                        <h4 className="text-sm font-medium text-white/40 mb-5 px-1">Choose a layout for your link</h4>

                                        <div className="flex flex-col gap-3 mb-6">
                                            {[
                                                {
                                                    id: 'classic', name: 'Classic', desc: 'Efficient, direct and compact.', preview: (
                                                        <div className="w-24 h-12 rounded-lg bg-[#274d4d] flex items-center px-2 gap-2">
                                                            <div className="w-5 h-5 rounded-full bg-orange-500 shrink-0" />
                                                            <div className="h-1.5 w-full bg-white/10 rounded-full" />
                                                        </div>
                                                    )
                                                },
                                                {
                                                    id: 'featured', name: 'Featured', desc: 'Make your link stand out with a larger, more attractive display.', preview: (
                                                        <div className="w-24 h-12 rounded-lg bg-linear-to-r from-orange-400 to-orange-600 relative overflow-hidden">
                                                            <div className="absolute bottom-1 left-1 right-1 h-3 bg-black/20 rounded-sm" />
                                                        </div>
                                                    )
                                                }
                                            ].map(option => {
                                                const isActive = link.layout === option.id || (!link.layout && option.id === 'classic');

                                                return (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => {
                                                            updateLink(link.id, 'layout', option.id);
                                                            setActiveLinkLayoutDropdown(null);
                                                        }}
                                                        className={`flex items-center gap-4 p-4 rounded-2xl w-full text-left border-2 transition-all
                                                            ${isActive ? 'bg-white/3 border-white/20' : 'bg-transparent border-transparent hover:bg-white/2'}`}
                                                    >
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-white bg-white' : 'border-white/20'}`}>
                                                            {isActive && <div className="w-2 h-2 rounded-full bg-black" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-bold text-white text-sm">{option.name}</div>
                                                            <div className="text-[11px] text-white/40 leading-tight">{option.desc}</div>
                                                        </div>
                                                        {option.preview}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => openLinkModal(link.id, 'thumbnail')}
                                className="p-2 rounded-lg text-white/40 hover:text-purple-400 hover:bg-white/5" title="Thumbnail"
                            >
                                <Image size={16} />
                            </button>
                            <button
                                onClick={() => openLinkModal(link.id, 'priority')}
                                className={`p-2 rounded-lg hover:bg-white/5 ${link.priority ? 'text-yellow-400' : 'text-white/40 hover:text-yellow-400'}`} title="Priority"
                            >
                                <Star size={16} fill={link.priority ? "currentColor" : "none"} />
                            </button>
                        </div>

                        <button
                            onClick={() => openLinkModal(link.id, 'delete')}
                            className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/5"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </Reorder.Item>
    );
});

function App() {
    const [links, setLinks] = useState(() => {
        const saved = localStorage.getItem('vlinktree_links');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'Instagram', url: 'https://instagram.com/', active: true }
        ];
    });

    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('vlinktree_profile');
        return saved ? JSON.parse(saved) : {
            username: 'Your Username',
            bio: 'Your Bio',
            avatar: null, // Default to null for icon
            headerLayout: 'classic',
            headerSize: 'small',
            showAvatar: true,
            showTitle: true,
            showBio: true
        };
    });

    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('vlinktree_theme');
        const defaultTheme = {
            bg: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
            wallpaperStyle: 'gradient',
            gradientColor1: '#FF512F',
            gradientColor2: '#DD2476',
            gradientDirection: 'linear-up',
            blurColor: '#ffffff',
            blurIntensity: 20,
            patternColor: '#000000',
            patternOpacity: 0.1,
            patternBlur: 0,
            backgroundImage: null,
            imageOpacity: 1,
            imageBlur: 0,
            backgroundVideo: null,
            videoOpacity: 1,
            videoBlur: 0,
            noise: false,
            btnStyle: 'glass',
            btnRadius: 12,
            btnShadowX: 0,
            btnShadowY: 4,
            btnShadowBlur: 10,
            btnShadowSpread: 0,
            btnShadowOpacity: 0.2,
            showFooter: true,
            footerGreetingTitle: 'Terima kasih sudah berkunjung!',
            footerGreetingDesc: 'Senang sekali bisa berbagi perjalanan ini denganmu. Jangan ragu untuk terhubung kembali di lain waktu!',
            footerBtnStyle: 'glass',
            footerBtnRadius: 16,
            footerBtnColor: '#ffffff',
            footerBtnColorType: 'solid',
            footerBtnColorGradient1: '#8228d9',
            footerBtnColorGradient2: '#6366f1',
            footerBtnColorPattern: 'dots',
            footerBtnColorCustomPattern: null,
            footerBtnTextColor: '#ffffff',
            footerBtnTextColorType: 'solid',
            footerBtnTextColorGradient1: '#ffffff',
            footerBtnTextColorGradient2: '#cbd5e1',
            footerBtnTextColorPattern: 'dots',
            footerBtnTextColorCustomPattern: null,
            footerShadowType: 'solid',
            footerShadowColor: '#000000',
            footerShadowX: 0,
            footerShadowY: 4,
            footerShadowBlur: 15,
            footerShadowSpread: 0,
            footerShadowOpacity: 0.1,
            footerShadowColorGradient1: '#000000',
            footerShadowColorGradient2: '#000000',
            footerShadowPattern: 'dots',
            btnFont: 'Inter',
            btnFontSize: 14,
            btnTextWeight: 600,
            btnTextTransform: 'none',
            footerFont: 'Inter',
            footerFontSize: 12,
            footerWeight: 400,
            footerTransform: 'none',
            pageFont: 'Inter',
            pageWeight: 400,
            pageTransform: 'none',
            pageColor: '#ffffff',
            titleWeight: 700,
            titleTransform: 'none',
            footerShadowCustomPattern: null,
            showVlink: true,
            btnShadowColor: '#000000',
            btnShadowType: 'solid',
            btnShadowColorGradient1: '#000000',
            btnShadowColorGradient2: '#000000',
            btnShadowPattern: 'dots',
            btnShadowCustomPattern: null,
            btnColor: '#8228d9',
            btnColorType: 'solid',
            btnColorGradient1: '#8228d9',
            btnColorGradient2: '#6366f1',
            btnColorPattern: 'dots',
            btnColorCustomPattern: null,
            btnTextColor: '#ffffff',
            btnTextColorType: 'solid',
            btnTextColorGradient1: '#ffffff',
            btnTextColorGradient2: '#cbd5e1',
            btnTextColorPattern: 'dots',
            btnTextColorCustomPattern: null,
            color: '#ffffff',
            accentColor: '#8228d9',
            titleColor: '#FFFFFF',
            pageSize: 14,
            titleSize: 20,
            titleFont: 'Inter',
            titleStyle: 'text',
            btnHeight: 14,
            btnWidth: 100,
            btnSpacing: 12,
            socialSize: 20,
            socialStyle: 'icons-only',
            socialPosition: 'bottom',
            socialColorType: 'auto',
            socialCustomColor: '#ffffff',
            socialAlignment: 'center',
            socialFont: 'Inter',
            socialTextWeight: 700,
            socialHover: 'lift',
            socialSpacing: 16,
            btnHoverEffect: 'lift',
            btnPressEffect: 'push',
            btnAnimation: 'none',
            titleAnimation: 'none',
            headerAnimation: 'none',
            footerAnimation: 'none',
            socialAnimation: 'none',
            pageAnimation: 'none',
        };
        if (saved) {
            const parsed = JSON.parse(saved);
            return { ...defaultTheme, ...parsed };
        }
        return defaultTheme;
    });

    const [socials, setSocials] = useState(() => {
        const saved = localStorage.getItem('vlinktree_socials');
        return saved ? JSON.parse(saved) : [
            { platform: 'instagram', url: 'https://instagram.com/' },
            { platform: 'twitter', url: '' },
            { platform: 'youtube', url: '' },
            { platform: 'github', url: '' },
            { platform: 'linkedin', url: '' },
            { platform: 'mail', url: '' }
        ];
    });

    const [layoutType, setLayoutType] = useState('stack');
    const [previewDevice, setPreviewDevice] = useState('mobile');

    // Defer heavy updates for PreviewSection
    const deferredLinks = useDeferredValue(links);
    const deferredProfile = useDeferredValue(profile);
    const deferredTheme = useDeferredValue(theme);
    const deferredSocials = useDeferredValue(socials);
    const deferredLayoutType = useDeferredValue(layoutType);

    useEffect(() => {
        localStorage.setItem('vlinktree_links', JSON.stringify(links));
        localStorage.setItem('vlinktree_profile', JSON.stringify(profile));
        localStorage.setItem('vlinktree_theme', JSON.stringify(theme));
        localStorage.setItem('vlinktree_socials', JSON.stringify(socials));
    }, [links, profile, theme, socials]);

    const [activeTab, setActiveTab] = useState('links');
    const [appearanceSubTab, setAppearanceSubTab] = useState('header');
    const [isEditorHidden, setIsEditorHidden] = useState(false);
    const [isMobilePreview, setIsMobilePreview] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    const handleTabClick = (tabId) => {
        if (activeTab === tabId) {
            setIsEditorHidden(!isEditorHidden);
        } else {
            setActiveTab(tabId);
            setIsEditorHidden(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-[#050505] text-white/90 selection:bg-purple-500/30 overflow-hidden relative">
            {/* Solid Background for better performance */}
            <div className="fixed inset-0 bg-[#050505] -z-10" />

            {/* Sidebar Navigation - Permanent Bar on Desktop, Bottom Bar on Mobile */}
            <aside className={`fixed bottom-0 left-0 right-0 h-20 md:relative md:h-full transition-all duration-500 ease-in-out border-t md:border-t-0 md:border-r border-white/5 flex flex-row md:flex-col items-center justify-around md:justify-start md:py-8 md:gap-8 bg-[#080808]/95 backdrop-blur-lg md:bg-[#080808] z-50 shrink-0 overflow-hidden
                ${isEditorHidden ? 'md:w-0 md:opacity-0 md:-translate-x-full md:pointer-events-none' : 'md:w-24 md:opacity-100 md:translate-x-0 translate-y-0 opacity-100'}`}
            >
                <button
                    onClick={() => setIsEditorHidden(!isEditorHidden)}
                    className="hidden md:flex w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500 to-indigo-600 items-center justify-center font-black text-2xl shadow-xl shadow-purple-500/20 hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0 group relative"
                    title="Hide Editor"
                >
                    <span>V</span>
                    <PanelLeft size={20} className="absolute transition-all opacity-0 group-hover:opacity-100" />
                </button>

                <nav className="flex flex-row md:flex-col shrink-0 items-center w-full md:w-auto justify-around md:justify-start px-4 md:px-0">
                    <NavItem icon={<PanelLeft size={24} />} active={activeTab === 'links'} onClick={() => { handleTabClick('links'); setIsMobilePreview(false); }} />
                    <NavItem icon={<Palette size={24} />} active={activeTab === 'appearance'} onClick={() => { handleTabClick('appearance'); setIsMobilePreview(false); }} />
                    <NavItem icon={<Settings size={24} />} active={activeTab === 'settings'} onClick={() => { handleTabClick('settings'); setIsMobilePreview(false); }} />

                    {/* Mobile Only: Preview Toggle */}
                    <button
                        onClick={() => setIsMobilePreview(!isMobilePreview)}
                        className={`md:hidden flex flex-col items-center gap-1 transition-all duration-300 ${isMobilePreview ? 'text-purple-500' : 'text-white/20'}`}
                    >
                        <div className={`p-3 rounded-xl ${isMobilePreview ? 'bg-purple-500/10' : ''}`}>
                            {isMobilePreview ? <Edit3 size={24} /> : <Eye size={24} />}
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest">{isMobilePreview ? 'Edit' : 'View'}</span>
                    </button>
                </nav>
            </aside>

            {/* Premium Floating Toggle - Always accessible but subtle when editor is hidden */}
            <button
                onClick={() => setIsEditorHidden(!isEditorHidden)}
                className={`fixed top-6 left-6 w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500/80 to-indigo-600/80 backdrop-blur-md items-center justify-center text-white shadow-2xl shadow-purple-500/20 hover:scale-110 active:scale-95 transition-all cursor-pointer z-100 md:flex hidden
                    ${isEditorHidden ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}
                title="Show Editor"
            >
                <PanelLeft size={20} />
            </button>

            {/* Editor Panel */}
            <main className={`flex flex-col overflow-hidden bg-[#0a0a0a] z-10 transition-all duration-500 ease-in-out 
                ${isMobilePreview ? 'hidden md:flex w-0 opacity-0' : (isEditorHidden ? 'flex-none md:flex-none' : 'flex-1 opacity-100')}
                ${isEditorHidden ? 'md:w-0 md:opacity-0 md:pointer-events-none' : 'md:flex-1 md:opacity-100'}
                pb-20 md:pb-0`}
            >
                {/* Editor Header */}
                <header className="h-16 md:h-20 px-6 md:px-8 border-b border-white/5 flex items-center justify-between bg-transparent shrink-0">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex flex-col gap-0.5 md:gap-1">
                            <h1 className="text-lg md:text-xl font-bold capitalize flex items-center gap-2 text-white/90">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                {activeTab}
                            </h1>
                            <p className="text-[10px] md:text-xs text-white/40">Manage your {activeTab}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsExportModalOpen(true)}
                            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-xs md:text-sm transition-all"
                        >
                            <FileCode size={14} className="md:size-[16px] text-purple-400" />
                            <span className="hidden xs:inline">Export</span>
                        </button>
                    </div>
                </header>

                <div className={`flex-1 ${activeTab === 'appearance' ? 'overflow-hidden p-0' : 'overflow-y-auto p-4 md:p-8 pb-24 md:pb-8'} custom-scrollbar gpu-scroll scroll-smooth`}>
                    {activeTab === 'links' && <LinkEditor links={links} setLinks={setLinks} layoutType={layoutType} setLayoutType={setLayoutType} profile={profile} setProfile={setProfile} theme={theme} setTheme={setTheme} socials={socials} setSocials={setSocials} setAppearanceSubTab={setAppearanceSubTab} setActiveTab={setActiveTab} />}
                    {activeTab === 'appearance' && <AppearanceEditor theme={theme} setTheme={setTheme} profile={profile} setProfile={setProfile} socials={socials} setSocials={setSocials} subTab={appearanceSubTab} setSubTab={setAppearanceSubTab} />}
                    {activeTab === 'settings' && <SettingsEditor links={links} setLinks={setLinks} profile={profile} setProfile={setProfile} theme={theme} setTheme={setTheme} socials={socials} setSocials={setSocials} />}
                </div>
            </main>

            {/* Preview Panel */}
            <div className={`transition-all duration-500 ease-in-out ${isMobilePreview || isEditorHidden ? 'flex-1' : 'md:flex-none hidden md:flex'}`}>
                <PreviewSection
                    theme={deferredTheme}
                    profile={deferredProfile}
                    links={deferredLinks}
                    socials={deferredSocials}
                    layoutType={deferredLayoutType}
                    previewDevice={previewDevice}
                    setPreviewDevice={setPreviewDevice}
                    isEditorHidden={isEditorHidden}
                    isMobileView={isMobilePreview}
                />
            </div>

            <ExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                profile={deferredProfile}
                links={deferredLinks}
                socials={deferredSocials}
                theme={deferredTheme}
            />
        </div>
    );
}

function NavItem({ icon, active, onClick, label }) {
    return (
        <button
            onClick={onClick}
            className={`group relative flex flex-col items-center gap-2 transition-all duration-300 hover-scale press-down ${active ? 'text-purple-500' : 'text-white/20 hover:text-white/40'}`}
        >
            <div className={`p-4 rounded-2xl transition-all duration-300 ${active ? 'bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'group-hover:bg-white/5'}`}>
                {icon}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}>
                {label}
            </span>
        </button>
    );

}


const AddLinkModal = memo(function AddLinkModal({ isOpen, onClose, addLink }) {
    const [url, setUrl] = useState('');

    if (!isOpen) return null;

    const handleAdd = () => {
        if (url) {
            addLink(url);
            setUrl('');
            onClose();
        }
    };

    const suggestedLinks = [
        { name: 'Instagram', url: 'https://instagram.com/', icon: <Instagram size={20} className="text-purple-400" /> },
        { name: 'TikTok', url: 'https://tiktok.com/', icon: <TikTok size={20} className="text-white" /> },
        { name: 'YouTube', url: 'https://youtube.com/', icon: <Youtube size={20} className="text-red-500" /> },
        { name: 'Spotify', url: 'https://spotify.com/', icon: <Music size={20} className="text-green-500" /> },
    ];

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div
                className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-black text-white italic tracking-tight">Enter URL</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-white/20 hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="relative group">
                    <input
                        autoFocus
                        id="modal-link-url"
                        name="modal-link-url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        placeholder="https://example.com"
                        className="w-full h-14 pl-6 pr-16 rounded-2xl bg-white/5 border border-white/5 focus:border-purple-500/30 focus:bg-white/8 text-white outline-none transition-all placeholder:text-white/20 font-medium"
                    />
                    <button
                        onClick={handleAdd}
                        disabled={!url}
                        className="absolute right-2 top-2 h-10 px-4 rounded-xl bg-purple-600 text-white font-black text-xs uppercase tracking-widest disabled:opacity-30 disabled:grayscale transition-all active:scale-95"
                    >
                        Add
                    </button>
                </div>

                <div className="flex flex-col gap-4 px-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Quick presets</span>
                    <div className="grid grid-cols-2 gap-3">
                        {suggestedLinks.map(link => (
                            <button
                                key={link.name}
                                onClick={() => { addLink({ title: link.name, url: link.url }); onClose(); }}
                                className="flex items-center gap-3 p-3 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-left"
                            >
                                <div className="p-2 rounded-lg bg-white/5">
                                    {link.icon}
                                </div>
                                <span className="text-sm font-bold text-white/70">{link.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

const ShareCollectionModal = memo(function ShareCollectionModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black text-white italic tracking-tight">Share Mode</h2>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 pt-2 flex flex-col gap-6">
                    {/* URL Field */}
                    <div className="relative group">
                        <label htmlFor="collection-url" className="absolute top-2.5 left-5 text-[9px] font-black uppercase tracking-widest text-white/20">Short URL</label>
                        <input
                            id="collection-url"
                            name="collection-url"
                            type="text"
                            readOnly
                            value="vlink.id/tr.ee/link"
                            className="w-full h-15 pl-5 pr-14 rounded-2xl border border-white/5 bg-white/2 text-white outline-none pt-4 text-sm font-bold"
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/5 rounded-xl p-2 border border-white/5">
                            <Lock size={14} className="text-white/40" />
                        </div>
                    </div>

                    {/* Actions List */}
                    <div className="flex flex-col gap-1">
                        {[
                            { icon: Copy, label: 'Copy link', action: 'copy' },
                            { icon: QrCode, label: 'QR code', extra: <ArrowRight size={14} className="text-white/10" /> },
                            { icon: Bell, label: 'Notify subscribers', extra: <ArrowRight size={14} className="text-white/10" /> },
                            { icon: Upload, label: 'Share to socials', extra: <ArrowRight size={14} className="text-white/10" /> },
                            { icon: Globe, label: 'Open in Browser', extra: <ExternalLink size={14} className="text-white/10" /> }
                        ].map((item, idx) => (
                            <button key={idx} className="flex items-center justify-between p-3.5 -mx-2 rounded-2xl hover:bg-white/5 transition-all group">
                                <div className="flex items-center gap-4">
                                    <item.icon size={18} className="text-white/20 group-hover:text-purple-400 transition-colors" />
                                    <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{item.label}</span>
                                </div>
                                {item.extra}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

const ProfileImageModal = memo(function ProfileImageModal({ isOpen, onClose, profile, setProfile }) {
    if (!isOpen) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, avatar: reader.result });
                onClose();
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {
        setProfile({ ...profile, avatar: null });
        onClose();
    };

    const fileInputRef = useRef(null);

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black text-white italic tracking-tight">Avatar Editor</h2>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 pt-2 flex flex-col gap-3">
                    {/* Select Image or GIF */}
                    {/* Select Image or GIF */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-between p-4 -mx-2 rounded-2xl hover:bg-white/5 transition-all text-left group cursor-pointer border border-transparent hover:border-white/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-all">
                                <Image size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white text-sm">Upload Image</span>
                                <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">Supports JPG, PNG, GIF</span>
                            </div>
                        </div>
                        <ArrowRight size={18} className="text-white/10 group-hover:text-purple-400 transition-all" />
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,.gif"
                            onChange={handleImageUpload}
                            className="hidden"
                            onClick={(e) => e.target.value = null}
                        />
                    </div>

                    {/* Delete Current Profile Image */}
                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-between p-4 -mx-2 rounded-2xl hover:bg-red-500/5 transition-all text-left group border border-transparent hover:border-red-500/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-500/20 transition-all">
                                <Trash2 size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white text-sm">Remove Avatar</span>
                                <span className="text-[10px] text-red-500/40 font-black uppercase tracking-widest">Revert to default</span>
                            </div>
                        </div>
                        <ArrowRight size={18} className="text-white/10 group-hover:text-red-500 transition-all" />
                    </button>
                </div>
            </div>
        </div>
    );
});

const TitleBioModal = memo(function TitleBioModal({ isOpen, onClose, profile, setProfile }) {
    const [title, setTitle] = useState(profile?.username || '');
    const [bio, setBio] = useState(profile?.bio || '');

    useEffect(() => {
        if (isOpen) {
            setTitle(profile?.username || '');
            setBio(profile?.bio || '');
        }
    }, [isOpen, profile]);

    const handleSave = () => {
        setProfile({ ...profile, username: title, bio: bio });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black text-white italic tracking-tight">Profile Style</h2>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 pt-2 flex flex-col gap-5">
                    {/* Title Input */}
                    <div className="bg-white/3 border border-white/5 rounded-2xl px-5 py-4 relative group focus-within:border-purple-500/30 transition-all">
                        <label htmlFor="modal-profile-title" className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-2">Profile Title</label>
                        <input
                            id="modal-profile-title"
                            name="modal-profile-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={30}
                            className="w-full bg-transparent text-white font-bold outline-none text-base placeholder:text-white/10"
                            placeholder="@username"
                        />
                        <div className="text-right text-[9px] font-black text-white/20 mt-2 uppercase tracking-widest">{title.length} / 30</div>
                    </div>

                    {/* Bio Input */}
                    <div className="bg-white/3 border border-white/5 rounded-2xl px-5 py-4 relative group focus-within:border-purple-500/30 transition-all">
                        <label htmlFor="modal-profile-bio" className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-2">Short Bio</label>
                        <textarea
                            id="modal-profile-bio"
                            name="modal-profile-bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            maxLength={80}
                            className="w-full bg-transparent text-white font-medium outline-none text-sm resize-none h-24 placeholder:text-white/10 leading-relaxed"
                            placeholder="Tell your story..."
                        />
                        <div className="text-right text-[9px] font-black text-white/20 mt-2 uppercase tracking-widest">{bio.length} / 80</div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="w-full py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest text-xs transition-all shadow-[0_10px_20px_-5px_rgba(147,51,234,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(147,51,234,0.4)] hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Apply Changes
                    </button>
                </div>
            </div>
        </div>
    );
});


const LinkActionModal = memo(function LinkActionModal({ isOpen, onClose, title, children, dark = true }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className={`w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 border ${dark ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-transparent'}`} onClick={e => e.stopPropagation()}>
                <div className="px-8 pt-8 pb-2 flex items-center justify-between">
                    <h2 className={`text-[11px] font-black uppercase tracking-[0.2em] ${dark ? 'text-white/30' : 'text-gray-400'}`}>{title}</h2>
                    <button onClick={onClose} className={`p-2.5 rounded-xl transition-all ${dark ? 'hover:bg-white/5 text-white/30 hover:text-white' : 'hover:bg-gray-100 text-gray-500'}`}>
                        <X size={18} />
                    </button>
                </div>
                <div className="p-8 pt-4">
                    {children}
                </div>
            </div>
        </div>
    );
});



const ThumbnailModal = memo(function ThumbnailModal({ isOpen, onClose, link, onUpdate }) {
    const [view, setView] = useState('main'); // 'main' or 'icons'
    const [search, setSearch] = useState('');
    const fileInputRef = useRef(null);

    if (!link) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdate(link.id, { thumbnail: reader.result, icon: null });
                onClose();
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIconSelect = (iconName) => {
        onUpdate(link.id, { icon: iconName, thumbnail: null });
        onClose();
    };

    const handleRemove = () => {
        onUpdate(link.id, { icon: null, thumbnail: null });
        onClose();
    };

    const filteredIcons = ICON_LIST.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <LinkActionModal isOpen={isOpen} onClose={() => { setView('main'); onClose(); }} title="Thumbnail">
            {view === 'main' ? (
                <div className="flex flex-col gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors border border-purple-500/10"><Upload size={20} /></div>
                        <div className="flex-1">
                            <div className="font-bold text-white">Upload Image</div>
                            <div className="text-xs text-white/40">For custom thumbnails</div>
                        </div>
                    </button>
                    <button
                        onClick={() => setView('icons')}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors border border-blue-500/10"><Search size={20} /></div>
                        <div className="flex-1">
                            <div className="font-bold text-white">Choose from Icons</div>
                            <div className="text-xs text-white/40">Select a vector icon</div>
                        </div>
                    </button>
                    {(link.thumbnail || link.icon) && (
                        <button
                            onClick={handleRemove}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors text-left group mt-2"
                        >
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500/20 transition-colors border border-red-500/10"><Trash2 size={20} /></div>
                            <div className="flex-1">
                                <div className="font-bold text-red-400">Remove</div>
                                <div className="text-xs text-red-400/40">Clear thumbnail or icon</div>
                            </div>
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/5 focus-within:border-white/10 transition-all">
                        <Search size={16} className="text-white/20" />
                        <input
                            autoFocus
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search icons..."
                            className="bg-transparent border-none outline-none text-sm text-white w-full"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto custom-scrollbar p-1">
                        {filteredIcons.map((i) => (
                            <button
                                key={i.name}
                                onClick={() => handleIconSelect(i.name)}
                                className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
                            >
                                <div className="text-white/40 group-hover:text-white transition-colors">
                                    <i.icon size={20} />
                                </div>
                                <span className="text-[8px] text-white/20 group-hover:text-white/40 truncate w-full text-center">{i.name}</span>
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setView('main')}
                        className="text-xs text-white/40 hover:text-white transition-colors py-2"
                    >
                        Back to options
                    </button>
                </div>
            )}
        </LinkActionModal>
    );
});

const PrioritizeModal = memo(function PrioritizeModal({ isOpen, onClose, link, onUpdate }) {
    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Prioritize">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group focus-within:border-purple-500/20 transition-all">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100/10 flex items-center justify-center text-yellow-600 border border-yellow-500/20"><Star size={20} /></div>
                    <div>
                        <div id={`spotlight-label-${link.id}`} className="font-bold text-white">Spotlight Link</div>
                        <div className="text-xs text-white/40">Highlight this link with animation</div>
                    </div>
                </div>
                <button
                    aria-labelledby={`spotlight-label-${link.id}`}
                    aria-pressed={link.priority}
                    onClick={() => onUpdate(link.id, 'priority', !link.priority)}
                    className={`w-11 h-6 rounded-full relative transition-all duration-300 ${link.priority ? 'bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-white/10'}`}
                >
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${link.priority ? 'left-5' : 'left-0.5'}`} />
                </button>
            </div>
        </LinkActionModal>
    );
});

const ScheduleModal = memo(function ScheduleModal({ isOpen, onClose, link, onUpdate }) {
    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Schedule">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="schedule-start" className="text-xs font-bold text-white/40 uppercase">Start Time</label>
                    <input
                        id="schedule-start"
                        name="schedule-start"
                        type="datetime-local"
                        className="w-full bg-white/5 border-none rounded-lg text-sm p-3 outline-none focus:ring-2 focus:ring-purple-500/20 text-white invert-[0.9] brightness-[1.5]"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="schedule-end" className="text-xs font-bold text-white/40 uppercase">End Time</label>
                    <input
                        id="schedule-end"
                        name="schedule-end"
                        type="datetime-local"
                        className="w-full bg-white/5 border-none rounded-lg text-sm p-3 outline-none focus:ring-2 focus:ring-purple-500/20 text-white invert-[0.9] brightness-[1.5]"
                    />
                </div>
            </div>
        </LinkActionModal>
    );
});

const LockModal = memo(function LockModal({ isOpen, onClose, link, onUpdate }) {
    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Lock">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <Lock size={18} className="text-white/40 group-hover:text-white" />
                        <span id="sensitive-toggle-label" className="font-medium text-white">Sensitive Content</span>
                    </div>
                    <button
                        aria-labelledby="sensitive-toggle-label"
                        className="w-11 h-6 rounded-full relative bg-white/10 transition-colors"
                    >
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
                    </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-white/40 group-hover:text-white" />
                        <span id="age-gate-label" className="font-medium text-white">Age Gate</span>
                    </div>
                    <button
                        aria-labelledby="age-gate-label"
                        className="w-11 h-6 rounded-full relative bg-white/10 transition-colors"
                    >
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
                    </button>
                </div>
            </div>
        </LinkActionModal>
    );
});

const AnalyticsModal = memo(function AnalyticsModal({ isOpen, onClose, link }) {
    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Analytics">
            <div className="flex flex-col gap-4 text-center py-4">
                <div className="w-full h-32 bg-white/5 rounded-xl flex items-center justify-center border border-dashed border-white/10">
                    <BarChart2 size={32} className="text-white/20" />
                </div>
                <div>
                    <div className="text-3xl font-black text-white">0</div>
                    <div className="text-xs font-bold text-white/40 uppercase tracking-wider">Total Clicks</div>
                </div>
            </div>
        </LinkActionModal>
    );
});


const DeleteConfirmationModal = memo(function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Delete Link">
            <div className="flex flex-col gap-4">
                <p className="text-white/60 text-sm">Are you sure you want to delete this link? This action cannot be undone.</p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors">Cancel</button>
                    <button onClick={onDelete} className="flex-1 py-3 rounded-xl bg-red-500/80 text-white font-bold hover:bg-red-500 transition-colors">Delete</button>
                </div>
            </div>
        </LinkActionModal>
    );
});

const ShareLinkModal = memo(function ShareLinkModal({ isOpen, onClose, link }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link?.url || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOptions = [
        { name: 'WhatsApp', icon: '📱', url: `https://wa.me/?text=${encodeURIComponent('Check this out: ' + (link?.url || ''))}` },
        { name: 'Twitter', icon: '🐦', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check this out: ' + (link?.url || ''))}` },
        { name: 'Facebook', icon: '👥', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link?.url || '')}` }
    ];

    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Share Link">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="share-link-url" className="text-[10px] font-black uppercase tracking-widest text-white/40">Link URL</label>
                    <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5">
                        <input
                            id="share-link-url"
                            name="share-link-url"
                            readOnly
                            value={link?.url || ''}
                            className="bg-transparent border-none focus:ring-0 text-sm flex-1 outline-none text-white font-mono overflow-hidden text-ellipsis"
                        />
                        <button
                            onClick={handleCopy}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg ${copied ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-white text-black hover:bg-white/90'}`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Share via</span>
                    <div className="grid grid-cols-3 gap-3">
                        {shareOptions.map(option => (
                            <a
                                key={option.name}
                                href={option.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
                            >
                                <span className="text-2xl group-hover:scale-110 transition-transform">{option.icon}</span>
                                <span className="text-[10px] font-bold text-gray-500 group-hover:text-purple-600 uppercase tracking-widest">{option.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </LinkActionModal>
    );
});

const LinkEditor = memo(function LinkEditor({ links, setLinks, layoutType, setLayoutType, profile, setProfile, theme, setTheme, socials, setSocials, setAppearanceSubTab, setActiveTab }) {
    const [layoutDropdownOpen, setLayoutDropdownOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [titleBioModalOpen, setTitleBioModalOpen] = useState(false);
    const [quickUrl, setQuickUrl] = useState('');

    // Link Action Modals State
    const [activeLinkModal, setActiveLinkModal] = useState({ id: null, type: null });
    const [activeLinkLayoutDropdown, setActiveLinkLayoutDropdown] = useState(null);

    const openLinkModal = React.useCallback((id, type) => {
        setActiveLinkLayoutDropdown(null);
        setActiveLinkModal({ id, type });
    }, []);
    const closeLinkModal = React.useCallback(() => setActiveLinkModal({ id: null, type: null }), []);

    const addLink = React.useCallback((data = '') => {
        let title = '';
        let url = '';

        if (typeof data === 'string') {
            url = data;
        } else if (typeof data === 'object') {
            title = data.title || '';
            url = data.url || '';
        }

        const newLink = { id: Date.now(), title, url, active: true };
        setLinks(prevLinks => [newLink, ...prevLinks]);
    }, [setLinks]);

    const updateLink = React.useCallback((id, field, value) => {
        setLinks(prevLinks => prevLinks.map(link => {
            if (link.id === id) {
                if (typeof field === 'object') {
                    return { ...link, ...field };
                }
                return { ...link, [field]: value };
            }
            return link;
        }));
    }, [setLinks]);

    const deleteLink = React.useCallback((id) => {
        setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
    }, [setLinks]);

    const handleQuickAdd = React.useCallback(() => {
        if (quickUrl) {
            addLink(quickUrl);
            setQuickUrl('');
        }
    }, [quickUrl, addLink]);



    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-12 pb-32 md:pb-24 px-2 md:px-0">
            <AddLinkModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} addLink={addLink} />
            <ShareCollectionModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} />
            <ProfileImageModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} profile={profile} setProfile={setProfile} />
            <TitleBioModal isOpen={titleBioModalOpen} onClose={() => setTitleBioModalOpen(false)} profile={profile} setProfile={setProfile} />

            {/* Header Section */}
            <header className="p-4 md:p-8 rounded-3xl bg-white/5 border border-white/5 flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 text-center sm:text-left">
                    <div
                        onClick={() => setProfileModalOpen(true)}
                        className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 shrink-0 cursor-pointer hover:opacity-80 transition-opacity ring-4 ring-purple-500/20 flex items-center justify-center bg-white/5"
                    >
                        {profile?.avatar ? (
                            <img
                                src={profile.avatar}
                                alt={profile?.username}
                                loading="lazy"
                                decoding="async"
                                width="96"
                                height="96"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                        ) : null}
                        {(!profile?.avatar) || (profile?.avatar === '') ? (
                            <User size={32} className="text-white/20" />
                        ) : (
                            <User size={32} className="text-white/20 hidden" />
                        )}
                    </div>
                    <div className="flex flex-col gap-2 pt-2 flex-1">
                        <div
                            onClick={() => setTitleBioModalOpen(true)}
                            className="cursor-pointer hover:opacity-80 transition-opacity group"
                        >
                            <h2 className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors tracking-tight">{profile?.username}</h2>
                            <p className="text-base text-white/60 font-medium leading-relaxed max-w-xl">{profile?.bio}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <button
                                onClick={() => { setActiveTab('appearance'); setAppearanceSubTab('socials'); }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white border border-white/5 active:scale-[0.98]"
                            >
                                <Share2 size={14} className="text-purple-400" />
                                <span>Social Footer</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Isi (Content) Section */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 bg-white/3 border border-white/5 p-1.5 rounded-2xl w-fit mb-4">
                    <button
                        onClick={() => setAddModalOpen(true)}
                        className="h-11 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-500/20"
                    >
                        <Plus size={18} />
                        Add Link
                    </button>

                    <div className="w-px h-6 bg-white/10 mx-1"></div>

                    {/* Layout Button with Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setLayoutDropdownOpen(!layoutDropdownOpen)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-bold text-[11px] uppercase tracking-wider ${layoutDropdownOpen ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                            <Layout size={18} />
                            <span>Layout</span>
                        </button>

                        {/* Layout Dropdown Panel */}
                        {layoutDropdownOpen && (
                            <div className="absolute top-[calc(100%+12px)] left-0 w-[340px] p-6 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] z-50 animate-in fade-in zoom-in duration-200">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30 mb-6 px-1">Display as</h4>

                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    {LAYOUT_OPTIONS.map(option => {
                                        const IconComponent = option.icon;
                                        const isActive = layoutType === option.id;
                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    setLayoutType(option.id);
                                                    setLayoutDropdownOpen(false);
                                                }}
                                                className="flex flex-col items-center gap-3 group"
                                            >
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${isActive
                                                    ? 'bg-white/10 border-white/20 shadow-inner'
                                                    : 'bg-white/3 border-transparent group-hover:bg-white/5'}`}
                                                >
                                                    <IconComponent size={24} className={`transition-colors ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`} />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-white' : 'text-white/40'}`}>
                                                    {option.name}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="pt-5 border-t border-white/5">
                                    <p className="text-xs text-white/30 leading-relaxed font-medium italic">
                                        {LAYOUT_OPTIONS.find(opt => opt.id === layoutType)?.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <Reorder.Group
                    axis="y"
                    values={links}
                    onReorder={setLinks}
                    className="flex flex-col gap-4"
                >
                    {links.map((link) => (
                        <ReorderLinkItem
                            key={link.id}
                            link={link}
                            updateLink={updateLink}
                            openLinkModal={openLinkModal}
                            activeLinkLayoutDropdown={activeLinkLayoutDropdown}
                            setActiveLinkLayoutDropdown={setActiveLinkLayoutDropdown}
                        />
                    ))}
                </Reorder.Group>
            </div>

            {/* Compact Footer Section */}
            <footer className="mt-8 flex flex-col gap-4">
                <div className="p-6 rounded-2xl bg-white/3 border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col gap-5 w-full">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                    <Heart size={16} className="text-purple-400 fill-purple-400/10" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-bold text-white tracking-tight">Greeting Card</h3>
                                    <p className="text-[10px] text-white/30 font-medium">Appears at the very bottom of your live page.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setTheme({ ...theme, showFooter: !theme.showFooter })}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${theme.showFooter ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-white/5 border-white/10 text-white/40'}`}
                            >
                                {theme.showFooter ? 'Active' : 'Hidden'}
                            </button>
                        </div>

                        {theme.showFooter && (
                            <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="preview-greeting-title" className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-1">Greeting Title</label>
                                    <input
                                        id="preview-greeting-title"
                                        name="preview-greeting-title"
                                        type="text"
                                        value={theme.footerGreetingTitle}
                                        onChange={(e) => setTheme({ ...theme, footerGreetingTitle: e.target.value })}
                                        placeholder="e.g. Terima kasih sudah berkunjung!"
                                        className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-medium text-white outline-none focus:border-purple-500/30 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="preview-greeting-desc" className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-1">Message Description</label>
                                    <textarea
                                        id="preview-greeting-desc"
                                        name="preview-greeting-desc"
                                        value={theme.footerGreetingDesc}
                                        onChange={(e) => setTheme({ ...theme, footerGreetingDesc: e.target.value })}
                                        placeholder="Enter your message..."
                                        rows={2}
                                        className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm text-white/70 font-medium outline-none focus:border-purple-500/30 transition-all resize-none leading-relaxed"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Minimalist Branding Toggle */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <Zap size={16} className="text-indigo-400" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-bold text-white tracking-tight">Vlink Branding</h3>
                                    <p className="text-[10px] text-white/30 font-medium italic">"Made with Vlink.id x rizddf" link.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setTheme({ ...theme, showVlink: !theme.showVlink })}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${theme.showVlink ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-white/40'}`}
                            >
                                {theme.showVlink ? 'Visible' : 'Hidden'}
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Render Active Link Modal */}
            {
                activeLinkModal.id && (
                    <>
                        <ThumbnailModal
                            isOpen={activeLinkModal.type === 'thumbnail'}
                            onClose={closeLinkModal}
                            link={links.find(l => l.id === activeLinkModal.id)}
                            onUpdate={updateLink}
                        />
                        <PrioritizeModal
                            isOpen={activeLinkModal.type === 'priority'}
                            onClose={closeLinkModal}
                            link={links.find(l => l.id === activeLinkModal.id)}
                            onUpdate={updateLink}
                        />
                        <ShareLinkModal
                            isOpen={activeLinkModal.type === 'share'}
                            onClose={closeLinkModal}
                            link={links.find(l => l.id === activeLinkModal.id)}
                        />
                        <DeleteConfirmationModal
                            isOpen={activeLinkModal.type === 'delete'}
                            onClose={closeLinkModal}
                            onDelete={() => { deleteLink(activeLinkModal.id); closeLinkModal(); }}
                        />
                    </>
                )
            }
        </div>
    );
}
);

const AppearanceEditor = memo(function AppearanceEditor({ theme, setTheme, profile, setProfile, socials, setSocials, subTab, setSubTab }) {
    const [buttonDesignSubTab, setButtonDesignSubTab] = useState('body');
    const [footerDesignSubTab, setFooterDesignSubTab] = useState('body');
    const [profileImageModalOpen, setProfileImageModalOpen] = useState(false);
    const [isSubSidebarCollapsed, setIsSubSidebarCollapsed] = useState(false);



    const randomizeTheme = () => {
        const presets = THEMES.filter(t => t.id !== 'custom');
        const randomPreset = presets[Math.floor(Math.random() * presets.length)];

        // Random Wallpaper Logic
        const wallpaperStyles = ['fill', 'gradient', 'blur', 'pattern'];
        const randomStyle = wallpaperStyles[Math.floor(Math.random() * wallpaperStyles.length)];

        const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

        const wallpaperSettings = {
            wallpaperStyle: randomStyle,
            bg: randomStyle === 'fill' ? randomHex() : undefined,
            gradientColor1: randomStyle === 'gradient' ? randomHex() : undefined,
            gradientColor2: randomStyle === 'gradient' ? randomHex() : undefined,
            gradientDirection: randomStyle === 'gradient' ? ['linear-up', 'linear-down', 'radial'][Math.floor(Math.random() * 3)] : undefined,
            blurColor: randomStyle === 'blur' ? randomHex() : undefined,
            blurIntensity: randomStyle === 'blur' ? Math.floor(Math.random() * 50) + 10 : undefined,
            patternColor: randomStyle === 'pattern' ? randomHex() : undefined,
        };

        setTheme({
            ...theme,
            ...randomPreset,
            pageColor: randomPreset.color,
            titleColor: randomPreset.color,
            ...wallpaperSettings
        });
    };

    return (
        <>
            <div className="flex flex-col md:flex-row overflow-hidden h-full text-white">
                {/* Appearance Sub-Sidebar - Vertical on Desktop, Horizontal on Mobile */}
                <aside className={`relative bg-white/5 border-b md:border-b-0 md:border-r border-white/5 py-2 md:py-8 flex flex-row md:flex-col gap-2 transition-all duration-300 ease-in-out shrink-0 overflow-x-auto md:overflow-x-visible no-scrollbar ${isSubSidebarCollapsed ? 'md:w-16' : 'md:w-48'}`}>
                    {/* Desktop Collapse Toggle */}
                    <button
                        onClick={() => setIsSubSidebarCollapsed(!isSubSidebarCollapsed)}
                        className="hidden md:flex absolute -right-3 top-2 w-6 h-6 rounded-full bg-[#1a1a1a] border border-white/10 items-center justify-center text-white/40 hover:text-white hover:border-purple-500/50 transition-all z-50 shadow-lg"
                    >
                        <ChevronLeft size={12} className={`transition-transform duration-300 ${isSubSidebarCollapsed ? 'rotate-180' : 'rotate-0'}`} />
                    </button>

                    {SIDEBAR_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSubTab(item.id)}
                            className={`flex items-center gap-3 px-4 md:px-6 py-2.5 md:py-3 transition-all duration-300 group whitespace-nowrap ${subTab === item.id ? 'bg-purple-500/10 text-purple-400 border-b-2 md:border-b-0 md:border-r-2 border-purple-500' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                            title={isSubSidebarCollapsed ? item.label : ''}
                        >
                            <div className="shrink-0">
                                <item.icon size={18} />
                            </div>
                            <span className={`text-[11px] md:text-sm font-bold truncate transition-all duration-300 ${isSubSidebarCollapsed ? 'md:opacity-0 md:w-0 md:invisible' : 'opacity-100 w-auto visible'}`}>
                                {item.label}
                            </span>
                        </button>
                    ))}
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-12 pb-24 md:pb-12 bg-[#0a0a0a] flex flex-col gap-8 md:gap-12 overflow-y-auto custom-scrollbar gpu-scroll">
                    <>
                        {subTab === 'header' && (
                            <div className="flex flex-col gap-10">
                                <div className="flex items-center justify-between px-2">
                                    <div className="flex items-center gap-4 px-1">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-xl shadow-purple-500/5">
                                            <User size={24} className="text-purple-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="text-xl font-bold text-white tracking-tight">Header</h2>
                                            <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">Update your profile info</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={randomizeTheme}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/3 hover:bg-white/10 rounded-xl border border-white/5 text-[11px] font-bold text-white/60 transition-all hover:text-white"
                                    >
                                        <Wand2 size={14} />
                                        Enhance Style
                                    </button>
                                </div>

                                {/* Profile Image Section */}
                                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-6 rounded-3xl md:rounded-[2rem] bg-white/3 border border-white/5">
                                    <div className="relative group">
                                        <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                                            {profile.avatar ? (
                                                <img
                                                    src={profile.avatar}
                                                    alt="Avatar"
                                                    loading="lazy"
                                                    decoding="async"
                                                    width="80"
                                                    height="80"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                            ) : null}
                                            {(!profile.avatar) || (profile.avatar === '') ? (
                                                <User size={32} className="text-white/20" />
                                            ) : (
                                                <User size={32} className="text-white/20 hidden" />
                                            )}
                                            <div className="absolute inset-0 bg-white/10 rounded-[2rem] opacity-0 group-hover:opacity-100" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Profile Avatar</span>
                                            <button
                                                onClick={() => setProfile({ ...profile, showAvatar: profile.showAvatar === false ? true : false })}
                                                className={`w-8 h-4 rounded-full relative transition-colors duration-300 ease-in-out ${profile.showAvatar !== false ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20'}`}
                                                title={profile.showAvatar !== false ? "Hide Avatar" : "Show Avatar"}
                                            >
                                                <div className={`
                                                    absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow-sm 
                                                    transition-transform duration-500 
                                                    ease-[cubic-bezier(0.2,0.8,0.2,1)] 
                                                    ${profile.showAvatar !== false ? 'translate-x-4' : 'translate-x-0'}
                                                `} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setProfileImageModalOpen(true)}
                                            className="px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-[11px] font-bold flex items-center gap-2 text-white transition-all hover:scale-105 shadow-xl shadow-white/5"
                                        >
                                            <Edit3 size={12} />
                                            Change Image
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                    <div className="flex items-center gap-2 px-1">
                                        <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/10">
                                            <User size={12} className="text-purple-400" />
                                        </div>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Profile image layout</span>
                                    </div>
                                    <div className="flex p-1 bg-black/20 rounded-xl border border-white/5">
                                        {[
                                            { id: 'classic', label: 'Classic', icon: User },
                                            { id: 'hero', label: 'Hero', icon: LayoutGrid }
                                        ].map(option => {
                                            const Icon = option.icon;
                                            return (
                                                <button
                                                    key={option.id}
                                                    onClick={() => setProfile({ ...profile, headerLayout: option.id })}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${profile.headerLayout === option.id ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/40 hover:text-white/60'}`}
                                                >
                                                    <Icon size={14} />
                                                    {option.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Title Section */}
                                <div className="flex flex-col gap-2 px-2">
                                    <div className="flex items-center justify-between px-1">
                                        <label htmlFor="editor-profile-title" className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Display Title</label>
                                        <button
                                            onClick={() => setProfile({ ...profile, showTitle: profile.showTitle === false ? true : false })}
                                            className={`w-8 h-4 rounded-full relative transition-colors duration-300 ease-in-out ${profile.showTitle !== false ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20'}`}
                                            title={profile.showTitle !== false ? "Hide Title" : "Show Title"}
                                        >
                                            <div className={`
                                                absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow-sm 
                                                transition-transform duration-500 
                                                ease-[cubic-bezier(0.2,0.8,0.2,1)] 
                                                ${profile.showTitle !== false ? 'translate-x-4' : 'translate-x-0'}
                                            `} />
                                        </button>
                                    </div>
                                    <input
                                        id="editor-profile-title"
                                        name="editor-profile-title"
                                        value={profile.username}
                                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                        className="w-full bg-white/3 border border-white/5 rounded-xl px-5 py-3 text-sm font-bold text-white outline-none focus:border-purple-500/20 focus:bg-white/5 transition-all placeholder:text-white/10"
                                        placeholder="@username"
                                    />
                                </div>

                                {/* Title Style Section */}
                                <div className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                    <div className="flex items-center gap-2 px-1">
                                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/10">
                                            <Layers size={12} className="text-blue-400" />
                                        </div>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Title style</span>
                                    </div>
                                    <div className="flex p-1 bg-black/20 rounded-xl border border-white/5">
                                        {[
                                            { id: 'text', label: 'Text', icon: Type },
                                            { id: 'logo', label: 'Logo', icon: Image }
                                        ].map(option => {
                                            const Icon = option.icon;
                                            return (
                                                <button
                                                    key={option.id}
                                                    onClick={() => setTheme({ ...theme, titleStyle: option.id })}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.titleStyle === option.id ? 'bg-blue-500/20 border-blue-500/40 text-white shadow-xl shadow-blue-500/5' : 'bg-transparent border-transparent text-white/40 hover:text-white/60'}`}
                                                >
                                                    <Icon size={14} />
                                                    {option.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Size Section */}
                                <div className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                    <div className="flex items-center justify-between px-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/10">
                                                <LayoutGrid size={12} className="text-orange-400" />
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Header Size</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-white/40 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                            {typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'small' ? 80 : 100)}%
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 px-1">
                                        <span className="text-[10px] font-bold text-white/30">20%</span>
                                        <input
                                            type="range"
                                            min="20"
                                            max="150"
                                            step="5"
                                            value={typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'small' ? 80 : (profile.headerSize === 'large' ? 120 : 100))}
                                            onChange={(e) => setProfile({ ...profile, headerSize: parseInt(e.target.value) })}
                                            className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400 transition-all"
                                        />
                                        <span className="text-[10px] font-bold text-white/30">150%</span>
                                    </div>

                                    <div className="flex gap-2">
                                        {[80, 100, 120].map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setProfile({ ...profile, headerSize: size })}
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${(typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'small' ? 80 : (profile.headerSize === 'large' ? 120 : 100))) === size
                                                    ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                                                    : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
                                                    }`}
                                            >
                                                {size === 80 ? 'Small' : size === 100 ? 'Normal' : 'Large'}
                                            </button>
                                        ))}
                                        <div className="flex-1"></div>
                                        <input
                                            type="number"
                                            min="20"
                                            max="150"
                                            value={typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'small' ? 80 : (profile.headerSize === 'large' ? 120 : 100))}
                                            onChange={(e) => {
                                                let val = parseInt(e.target.value);
                                                if (val > 150) val = 150;
                                                if (val < 20) val = 20;
                                                setProfile({ ...profile, headerSize: val });
                                            }}
                                            className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-center text-xs font-bold text-white outline-none focus:border-orange-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Animation Section */}
                                <div className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                    <div className="flex items-center gap-3 px-1">
                                        <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                                            <Wand2 size={16} className="text-pink-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white">Profile Animation</span>
                                            <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Visual Effects</span>
                                        </div>
                                    </div>
                                    <div className="p-1 bg-black/20 rounded-xl border border-white/5">
                                        <SelectField
                                            id="header-animation-select"
                                            label=""
                                            value={theme.headerAnimation || 'none'}
                                            onChange={(e) => setTheme({ ...theme, headerAnimation: e.target.value })}
                                            className="bg-transparent border-none text-[11px] font-bold"
                                        >
                                            {ANIMATION_OPTIONS.map(opt => (
                                                <option key={opt.id} value={opt.id} className="bg-[#121212]">{opt.label}</option>
                                            ))}
                                        </SelectField>
                                    </div>
                                </div>

                                {/* Typography Section */}
                                <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                    <div className="flex items-center gap-3 px-1">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                            <Type size={16} className="text-blue-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white">Typography</span>
                                            <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Font & Style</span>
                                        </div>
                                    </div>

                                    {/* Profile Title Settings */}
                                    <div className="flex flex-col gap-6 pt-4 border-t border-white/5">
                                        <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-1">Title Text Appearance</label>

                                        <div className="grid grid-cols-1 gap-4">
                                            <SelectField
                                                label="Font Family"
                                                value={theme.titleFont || 'Inter'}
                                                onChange={(e) => setTheme({ ...theme, titleFont: e.target.value })}
                                            >
                                                {FONTS.map(font => (
                                                    <option key={font} value={font} className="bg-[#121212]">{font}</option>
                                                ))}
                                            </SelectField>

                                            <div className="grid grid-cols-2 gap-3">
                                                <SelectField
                                                    label="Weight"
                                                    value={theme.titleWeight || 700}
                                                    onChange={(e) => setTheme({ ...theme, titleWeight: parseInt(e.target.value) })}
                                                >
                                                    <option value="300" className="bg-[#121212]">Light</option>
                                                    <option value="400" className="bg-[#121212]">Regular</option>
                                                    <option value="500" className="bg-[#121212]">Medium</option>
                                                    <option value="600" className="bg-[#121212]">Semibold</option>
                                                    <option value="700" className="bg-[#121212]">Bold</option>
                                                    <option value="800" className="bg-[#121212]">Extra Bold</option>
                                                    <option value="900" className="bg-[#121212]">Black</option>
                                                </SelectField>
                                                <SelectField
                                                    label="Transform"
                                                    value={theme.titleTransform || 'none'}
                                                    onChange={(e) => setTheme({ ...theme, titleTransform: e.target.value })}
                                                >
                                                    <option value="none" className="bg-[#121212]">None</option>
                                                    <option value="uppercase" className="bg-[#121212]">Uppercase</option>
                                                    <option value="lowercase" className="bg-[#121212]">Lowercase</option>
                                                    <option value="capitalize" className="bg-[#121212]">Capitalize</option>
                                                </SelectField>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 px-1">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="title-size-slider" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Font Size</label>
                                                <span className="text-[10px] font-bold text-white">{theme.titleSize || 20}px</span>
                                            </div>
                                            <input
                                                id="title-size-slider"
                                                name="title-size"
                                                type="range"
                                                min="12"
                                                max="64"
                                                value={theme.titleSize || 20}
                                                onChange={(e) => setTheme({ ...theme, titleSize: parseInt(e.target.value) })}
                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                            />
                                        </div>

                                        {/* Title Animation */}
                                        <div className="flex flex-col gap-2">
                                            <SelectField
                                                id="title-animation-select"
                                                label="Title Animation"
                                                value={theme.titleAnimation || 'none'}
                                                onChange={(e) => setTheme({ ...theme, titleAnimation: e.target.value })}
                                            >
                                                {ANIMATION_OPTIONS.map(opt => (
                                                    <option key={opt.id} value={opt.id} className="bg-[#121212]">{opt.label}</option>
                                                ))}
                                            </SelectField>
                                        </div>


                                        {/* Title Color Mode Selector */}
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between px-1">
                                                <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Title Color Mode</label>
                                            </div>
                                            <ModeSelector
                                                mode={theme.titleColorType || 'solid'}
                                                onChange={(mode) => setTheme({ ...theme, titleColorType: mode })}
                                                activeColor="purple"
                                            />
                                        </div>

                                        {/* Title Color Controls */}
                                        {(!theme.titleColorType || theme.titleColorType === 'solid') && (
                                            <ColorPickerRow
                                                label="Title Color"
                                                value={theme.titleColor || '#ffffff'}
                                                onChange={(val) => setTheme({ ...theme, titleColor: val })}
                                                colorId="title-color"
                                                activeColor="purple"
                                            />
                                        )}

                                        {theme.titleColorType === 'gradient' && (
                                            <div className="flex flex-col gap-4">
                                                <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-1">Gradient Colors</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-black/20 border border-white/5">
                                                        <input
                                                            type="color"
                                                            value={theme.titleColorGradient1 || '#8228d9'}
                                                            onChange={(e) => setTheme({ ...theme, titleColorGradient1: e.target.value })}
                                                            className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer border border-white/10"
                                                        />
                                                        <span className="text-[10px] font-mono font-bold text-white uppercase">{theme.titleColorGradient1 || '#8228d9'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-black/20 border border-white/5">
                                                        <input
                                                            type="color"
                                                            value={theme.titleColorGradient2 || '#6366f1'}
                                                            onChange={(e) => setTheme({ ...theme, titleColorGradient2: e.target.value })}
                                                            className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer border border-white/10"
                                                        />
                                                        <span className="text-[10px] font-mono font-bold text-white uppercase">{theme.titleColorGradient2 || '#6366f1'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {theme.titleColorType === 'pattern' && (
                                            <div className="flex flex-col gap-4">
                                                <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-1">Pattern Style</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {['dots', 'stripes', 'custom'].map((p) => (
                                                        <button
                                                            key={p}
                                                            disabled={p === 'custom' && !theme.titleColorCustomPattern}
                                                            onClick={() => setTheme({ ...theme, titleColorPattern: p })}
                                                            className={`py-2.5 px-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${theme.titleColorPattern === p
                                                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20'
                                                                : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5'
                                                                } ${p === 'custom' && !theme.titleColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                        >
                                                            {p}
                                                        </button>
                                                    ))}
                                                </div>
                                                <ColorPickerRow
                                                    label="Pattern Color"
                                                    value={theme.titleColor || '#ffffff'}
                                                    onChange={(val) => setTheme({ ...theme, titleColor: val })}
                                                    colorId="title-pattern-color"
                                                    activeColor="purple"
                                                />
                                                {theme.titleColorPattern === 'custom' && (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="file"
                                                            id="title-pattern-upload"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                if (file) {
                                                                    const reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        setTheme({ ...theme, titleColorCustomPattern: reader.result, titleColorPattern: 'custom' });
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor="title-pattern-upload"
                                                            className="w-full text-center px-4 py-3 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-purple-500/40 text-[10px] font-bold text-white/40 uppercase cursor-pointer transition-all"
                                                        >
                                                            Upload Pattern +
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Bio Settings */}
                                    {/* Bio Input Section */}
                                    <div className="flex flex-col gap-2 px-2 pb-6">
                                        <div className="flex items-center justify-between px-1">
                                            <label htmlFor="editor-profile-bio" className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Bio Description</label>
                                            <button
                                                onClick={() => setProfile({ ...profile, showBio: profile.showBio === false ? true : false })}
                                                className={`w-8 h-4 rounded-full relative transition-colors duration-300 ease-in-out ${profile.showBio !== false ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20'}`}
                                                title={profile.showBio !== false ? "Hide Bio" : "Show Bio"}
                                            >
                                                <div className={`
                                                    absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow-sm 
                                                    transition-transform duration-500 
                                                    ease-[cubic-bezier(0.2,0.8,0.2,1)] 
                                                    ${profile.showBio !== false ? 'translate-x-4' : 'translate-x-0'}
                                                `} />
                                            </button>
                                        </div>
                                        <textarea
                                            id="editor-profile-bio"
                                            name="editor-profile-bio"
                                            value={profile.bio}
                                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                            rows={2}
                                            className="w-full bg-white/3 border border-white/5 rounded-xl px-5 py-3 text-sm font-medium text-white outline-none focus:border-purple-500/20 focus:bg-white/5 transition-all placeholder:text-white/10 resize-none"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>

                                    <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
                                        <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-1">Bio Text Appearance</label>

                                        <div className="flex flex-col gap-2">
                                            <SelectField
                                                id="header-layout-select"
                                                label="Header Layout"
                                                value={profile.headerLayout || 'classic'}
                                                onChange={(e) => setProfile({ ...profile, headerLayout: e.target.value })}
                                            >
                                                <option value="classic" className="bg-[#121212]">Classic</option>
                                                <option value="modern" className="bg-[#121212]">Modern</option>
                                                <option value="minimal" className="bg-[#121212]">Minimal</option>
                                            </SelectField>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <SelectField
                                                id="header-size-select"
                                                label="Header Size"
                                                value={profile.headerSize || 'small'}
                                                onChange={(e) => setProfile({ ...profile, headerSize: e.target.value })}
                                            >
                                                <option value="small" className="bg-[#121212]">Small</option>
                                                <option value="medium" className="bg-[#121212]">Medium</option>
                                                <option value="large" className="bg-[#121212]">Large</option>
                                            </SelectField>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <SelectField
                                                id="bio-font-select"
                                                label="Font Family"
                                                value={theme.pageFont || 'Inter'}
                                                onChange={(e) => setTheme({ ...theme, pageFont: e.target.value })}
                                            >
                                                {FONTS.map(font => (
                                                    <option key={font} value={font} className="bg-[#121212]">{font}</option>
                                                ))}
                                            </SelectField>

                                            <div className="grid grid-cols-2 gap-3">
                                                <SelectField
                                                    id="bio-weight-select"
                                                    label="Weight"
                                                    value={theme.pageWeight || 400}
                                                    onChange={(e) => setTheme({ ...theme, pageWeight: parseInt(e.target.value) })}
                                                >
                                                    <option value="300" className="bg-[#121212]">Light</option>
                                                    <option value="400" className="bg-[#121212]">Regular</option>
                                                    <option value="500" className="bg-[#121212]">Medium</option>
                                                    <option value="600" className="bg-[#121212]">Semibold</option>
                                                    <option value="700" className="bg-[#121212]">Bold</option>
                                                </SelectField>
                                                <SelectField
                                                    id="bio-transform-select"
                                                    label="Transform"
                                                    value={theme.pageTransform || 'none'}
                                                    onChange={(e) => setTheme({ ...theme, pageTransform: e.target.value })}
                                                >
                                                    <option value="none" className="bg-[#121212]">None</option>
                                                    <option value="uppercase" className="bg-[#121212]">Uppercase</option>
                                                    <option value="lowercase" className="bg-[#121212]">Lowercase</option>
                                                    <option value="capitalize" className="bg-[#121212]">Capitalize</option>
                                                </SelectField>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 px-1">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="bio-size-slider" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Bio Size</label>
                                                <span className="text-[10px] font-bold text-white">{theme.pageSize || 14}px</span>
                                            </div>
                                            <input
                                                id="bio-size-slider"
                                                name="bio-size"
                                                type="range"
                                                min="10"
                                                max="32"
                                                value={theme.pageSize || 14}
                                                onChange={(e) => setTheme({ ...theme, pageSize: parseInt(e.target.value) })}
                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between px-1">
                                                <label htmlFor="header-spacing-input" className="text-[10px] font-black text-white/20 uppercase tracking-widest">Header Spacing</label>
                                                <span className="text-[10px] font-bold text-white">{profile.headerSpacing || 24}px</span>
                                            </div>
                                            <input
                                                id="header-spacing-input"
                                                name="header-spacing"
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={profile.headerSpacing || 24}
                                                onChange={(e) => setProfile({ ...profile, headerSpacing: parseInt(e.target.value) })}
                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                            />
                                        </div>

                                        {/* Bio Animation */}
                                        <div className="flex flex-col gap-2">
                                            <SelectField
                                                id="bio-animation-select"
                                                label="Bio Animation"
                                                value={theme.pageAnimation || 'none'}
                                                onChange={(e) => setTheme({ ...theme, pageAnimation: e.target.value })}
                                            >
                                                {ANIMATION_OPTIONS.map(opt => (
                                                    <option key={opt.id} value={opt.id} className="bg-[#121212]">{opt.label}</option>
                                                ))}
                                            </SelectField>
                                        </div>


                                        {/* Bio Color Mode Selector */}
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between px-1">
                                                <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Bio Color Mode</label>
                                            </div>
                                            <ModeSelector
                                                mode={theme.pageColorType || 'solid'}
                                                onChange={(mode) => setTheme({ ...theme, pageColorType: mode })}
                                                activeColor="purple"
                                            />
                                        </div>

                                        {/* Bio Color Controls */}
                                        {(!theme.pageColorType || theme.pageColorType === 'solid') && (
                                            <ColorPickerRow
                                                label="Bio Color"
                                                value={theme.pageColor || '#ffffff'}
                                                onChange={(val) => setTheme({ ...theme, pageColor: val })}
                                                colorId="bio-color"
                                                activeColor="purple"
                                            />
                                        )}

                                        {theme.pageColorType === 'gradient' && (
                                            <div className="flex flex-col gap-4">
                                                <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-1">Gradient Colors</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-black/20 border border-white/5">
                                                        <input
                                                            type="color"
                                                            value={theme.pageColorGradient1 || '#8228d9'}
                                                            onChange={(e) => setTheme({ ...theme, pageColorGradient1: e.target.value })}
                                                            className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer border border-white/10"
                                                        />
                                                        <span className="text-[10px] font-mono font-bold text-white uppercase">{theme.pageColorGradient1 || '#8228d9'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-black/20 border border-white/5">
                                                        <input
                                                            type="color"
                                                            value={theme.pageColorGradient2 || '#6366f1'}
                                                            onChange={(e) => setTheme({ ...theme, pageColorGradient2: e.target.value })}
                                                            className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer border border-white/10"
                                                        />
                                                        <span className="text-[10px] font-mono font-bold text-white uppercase">{theme.pageColorGradient2 || '#6366f1'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {theme.pageColorType === 'pattern' && (
                                            <div className="flex flex-col gap-4">
                                                <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-1">Pattern Style</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {['dots', 'stripes', 'custom'].map((p) => (
                                                        <button
                                                            key={p}
                                                            disabled={p === 'custom' && !theme.pageColorCustomPattern}
                                                            onClick={() => setTheme({ ...theme, pageColorPattern: p })}
                                                            className={`py-2.5 px-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${theme.pageColorPattern === p
                                                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20'
                                                                : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5'
                                                                } ${p === 'custom' && !theme.pageColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                        >
                                                            {p}
                                                        </button>
                                                    ))}
                                                </div>
                                                <ColorPickerRow
                                                    label="Pattern Color"
                                                    value={theme.pageColor || '#ffffff'}
                                                    onChange={(val) => setTheme({ ...theme, pageColor: val })}
                                                    colorId="bio-pattern-color"
                                                    activeColor="purple"
                                                />
                                                {theme.pageColorPattern === 'custom' && (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="file"
                                                            id="bio-pattern-upload"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                if (file) {
                                                                    const reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        setTheme({ ...theme, pageColorCustomPattern: reader.result, pageColorPattern: 'custom' });
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor="bio-pattern-upload"
                                                            className="w-full text-center px-4 py-3 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-purple-500/40 text-[10px] font-bold text-white/40 uppercase cursor-pointer transition-all"
                                                        >
                                                            Upload Pattern +
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {subTab === 'theme' && (
                            <div className="flex flex-col gap-10">
                                <div className="flex items-center gap-4 px-1">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shadow-xl shadow-orange-500/5">
                                        <Palette size={24} className="text-orange-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-bold text-white tracking-tight">Themes</h2>
                                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">Select a visual preset</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                                    {THEMES.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTheme({ ...theme, ...t, pageColor: t.color, titleColor: t.color })}
                                            className="flex flex-col items-center gap-4 group relative"
                                        >
                                            <div
                                                className={`w-full aspect-4/5 rounded-[2rem] border-2 p-4 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${theme.id === t.id ? 'border-orange-500/40 bg-orange-500/5 shadow-2xl shadow-orange-500/10' : 'border-white/5 bg-white/2 group-hover:border-white/10 group-hover:bg-white/5 group-hover:scale-[1.02]'}`}
                                                style={{
                                                    background: theme.id === t.id ? undefined : t.bg,
                                                    backgroundImage: t.bg.includes('gradient') ? t.bg : undefined
                                                }}
                                            >
                                                {t.id === 'custom' ? (
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                                            <Paintbrush size={24} className="text-white/40" />
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Create Custom</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center w-full gap-4">
                                                        <span className="text-3xl font-black mb-2 filter drop-shadow-lg" style={{ color: t.color }}>Aa</span>
                                                        <div className="w-full flex flex-col gap-2 p-2 rounded-xl bg-black/20 border border-white/5 backdrop-blur-sm">
                                                            <div className="w-full h-4 rounded-lg shadow-sm" style={{ backgroundColor: t.accentColor, border: t.btnStyle === 'outline' ? `1px solid ${t.color}` : 'none' }} />
                                                            <div className="w-2/3 h-1.5 rounded-full bg-white/10" />
                                                            <div className="w-1/2 h-1.5 rounded-full bg-white/10" />
                                                        </div>
                                                    </div>
                                                )}

                                                {theme.id === t.id && (
                                                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-orange-500 border border-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/50 scale-110 active:scale-95 transition-transform">
                                                        <Zap size={12} className="text-white fill-white" />
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${theme.id === t.id ? 'text-orange-400' : 'text-white/20 group-hover:text-white/40'}`}>{t.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {subTab === 'wallpaper' && (
                            <div className="flex flex-col gap-10">
                                <div className="flex items-center gap-4 px-1">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-xl shadow-emerald-500/5">
                                        <Image size={24} className="text-emerald-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-bold text-white tracking-tight">Wallpaper</h2>
                                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">Customize your background</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 p-6 rounded-3xl bg-white/3 border border-white/5">
                                    <div className="flex items-center gap-2 px-1">
                                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                                            <Layers size={12} className="text-emerald-400" />
                                        </div>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Wallpaper Style</span>
                                    </div>

                                    <div className="grid grid-cols-6 gap-3">
                                        {[
                                            { id: 'fill', label: 'Fill', icon: Square },
                                            { id: 'gradient', label: 'Gradient', icon: Layers },
                                            { id: 'blur', label: 'Blur', icon: Wand2 },
                                            { id: 'pattern', label: 'Pattern', icon: LayoutGrid },
                                            { id: 'image', label: 'Image', icon: Image, premium: true },
                                            { id: 'video', label: 'Video', icon: Video, premium: true }
                                        ].map(style => {
                                            const Icon = style.icon;
                                            return (
                                                <div key={style.id} className="flex flex-col items-center gap-2">
                                                    <button
                                                        onClick={() => setTheme({ ...theme, wallpaperStyle: style.id })}
                                                        className={`w-full aspect-square rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-300 ${theme.wallpaperStyle === style.id ? 'border-emerald-500/40 bg-emerald-500/10 shadow-lg shadow-emerald-500/5' : 'border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/5'}`}
                                                    >
                                                        {style.id === 'fill' && <div className="w-6 h-6 rounded-lg bg-gray-400/50 shadow-sm" />}
                                                        {style.id === 'gradient' && <div className="w-6 h-6 rounded-lg bg-linear-to-br from-gray-300/50 to-gray-600/50 shadow-sm" />}
                                                        {style.id === 'blur' && (
                                                            <div className="relative w-6 h-6 flex items-center justify-center">
                                                                <div className="w-5 h-5 rounded-full bg-gray-400/40 blur-[2px]" />
                                                            </div>
                                                        )}
                                                        {style.id === 'pattern' && (
                                                            <div className="grid grid-cols-2 gap-0.5 opacity-40">
                                                                {[1, 2, 3, 4].map(i => <div key={i} className="w-2.5 h-2.5 bg-gray-300 rounded-[1px]" />)}
                                                            </div>
                                                        )}
                                                        {(style.id === 'image' || style.id === 'video') && <Icon size={20} className="text-white/20" />}

                                                        {style.premium && (
                                                            <div className="absolute top-1.5 right-1.5 p-1 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20">
                                                                <Zap size={6} className="text-white fill-white" />
                                                            </div>
                                                        )}
                                                    </button>
                                                    <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${theme.wallpaperStyle === style.id ? 'text-emerald-400' : 'text-white/10'}`}>{style.label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Fill Specific Controls */}
                                {theme.wallpaperStyle === 'fill' && (
                                    <div className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                        <div className="flex items-center gap-2 px-1">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                                                <Square size={12} className="text-emerald-400" />
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Solid Background</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 group focus-within:border-emerald-500/20 transition-all">
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="bg-fill-color" className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Color Hex</label>
                                                <input
                                                    id="bg-fill-color"
                                                    name="bg-fill-color"
                                                    type="text"
                                                    value={theme.bg || '#ffffff'}
                                                    onChange={(e) => setTheme({ ...theme, bg: e.target.value })}
                                                    className="bg-transparent border-none outline-none font-mono text-sm uppercase w-full text-white"
                                                />
                                            </div>
                                            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                                                <input
                                                    id="bg-fill-color-picker"
                                                    name="bg-fill-color-picker"
                                                    type="color"
                                                    value={theme.bg || '#ffffff'}
                                                    onChange={(e) => setTheme({ ...theme, bg: e.target.value })}
                                                    className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Gradient Specific Controls */}
                                {theme.wallpaperStyle === 'gradient' && (
                                    <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                        <div className="flex items-center gap-2 px-1">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                                                <Layers size={12} className="text-emerald-400" />
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Gradient Config</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { id: 'start', key: '1', val: theme.gradientColor1 || '#ffffff', label: 'Start' },
                                                { id: 'end', key: '2', val: theme.gradientColor2 || '#000000', label: 'End' }
                                            ].map(c => (
                                                <div key={c.key} className="flex items-center justify-between p-3 rounded-xl bg-black/10 border border-white/5">
                                                    <div className="flex flex-col gap-0.5">
                                                        <label htmlFor={`gradient-${c.id}-color`} className="text-[8px] font-black text-white/20 uppercase tracking-widest">{c.label}</label>
                                                        <span className="text-[10px] font-mono text-white/60 uppercase">{c.val}</span>
                                                    </div>
                                                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10">
                                                        <input
                                                            id={`gradient-${c.id}-color`}
                                                            name={`gradient-${c.id}-color`}
                                                            type="color"
                                                            value={c.val}
                                                            onChange={(e) => setTheme({ ...theme, [`gradientColor${c.key}`]: e.target.value })}
                                                            className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between px-1">
                                                <label htmlFor="gradient-angle-slider" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Direction / Angle</label>
                                                <span className="text-[10px] font-bold text-white">{theme.gradientAngle || 135}°</span>
                                            </div>
                                            <input
                                                id="gradient-angle-slider"
                                                name="gradient-angle"
                                                type="range"
                                                min="0"
                                                max="360"
                                                value={theme.gradientAngle || 135}
                                                onChange={(e) => setTheme({ ...theme, gradientAngle: parseInt(e.target.value) })}
                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Blur Specific Controls */}
                                {theme.wallpaperStyle === 'blur' && (
                                    <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                        <div className="flex items-center gap-2 px-1">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                                                <Wand2 size={12} className="text-emerald-400" />
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Aurora Design</span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 group focus-within:border-emerald-500/20 transition-all">
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="aurora-tint-color" className="text-[8px] font-black text-white/20 uppercase tracking-widest">Base Tint</label>
                                                <span className="text-[10px] font-mono text-white/60 uppercase">{theme.blurColor || '#ffffff'}</span>
                                            </div>
                                            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                                <input
                                                    id="aurora-tint-color"
                                                    name="aurora-tint-color"
                                                    type="color"
                                                    value={theme.blurColor || '#ffffff'}
                                                    onChange={(e) => setTheme({ ...theme, blurColor: e.target.value })}
                                                    className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between px-1">
                                                <label htmlFor="aurora-intensity-slider" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Intensity</label>
                                                <span className="text-[10px] font-bold text-white">{theme.blurIntensity}%</span>
                                            </div>
                                            <input
                                                id="aurora-intensity-slider"
                                                name="aurora-intensity"
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={theme.blurIntensity}
                                                onChange={(e) => setTheme({ ...theme, blurIntensity: parseInt(e.target.value) })}
                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Pattern Specific Controls */}
                                {theme.wallpaperStyle === 'pattern' && (
                                    <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                        <div className="flex items-center gap-2 px-1">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                                                <LayoutGrid size={12} className="text-emerald-400" />
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Pattern Config</span>
                                        </div>

                                        {/* Pattern Style Selector */}
                                        <div className="flex flex-col gap-4">
                                            <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-1">Pattern Style</label>
                                            <div className="grid grid-cols-5 gap-2">
                                                {[
                                                    { id: 'dots', label: 'Dots' },
                                                    { id: 'stripes', label: 'Stripes' },
                                                    { id: 'grid', label: 'Grid' },
                                                    { id: 'diagonal', label: 'Diagonal' },
                                                    { id: 'waves', label: 'Waves' },
                                                    { id: 'circles', label: 'Circles' },
                                                    { id: 'hexagon', label: 'Hexagon' },
                                                    { id: 'triangles', label: 'Triangles' },
                                                    { id: 'zigzag', label: 'Zigzag' },
                                                    { id: 'checkerboard', label: 'Checker' },
                                                    { id: 'custom', label: 'Custom' }
                                                ].map((p) => (
                                                    <button
                                                        key={p.id}
                                                        disabled={p.id === 'custom' && !theme.customPatternImage}
                                                        onClick={() => setTheme({ ...theme, patternType: p.id })}
                                                        className={`py-2.5 px-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${theme.patternType === p.id
                                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-lg'
                                                            : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5'
                                                            } ${p.id === 'custom' && !theme.customPatternImage ? 'opacity-30 cursor-not-allowed' : ''}`}
                                                    >
                                                        {p.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Upload Custom Pattern */}
                                        {theme.patternType === 'custom' ? (
                                            <div className="flex flex-col gap-3">
                                                <input
                                                    type="file"
                                                    id="wallpaper-pattern-upload"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setTheme({ ...theme, customPatternImage: reader.result, patternType: 'custom' });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                                {theme.customPatternImage ? (
                                                    <div className="relative rounded-xl overflow-hidden border border-emerald-500/20 group">
                                                        <img src={theme.customPatternImage} alt="Custom pattern" className="w-full h-24 object-cover" />
                                                        <button
                                                            onClick={() => setTheme({ ...theme, customPatternImage: null, patternType: 'dots' })}
                                                            className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-red-500/80 text-white rounded-full transition-all flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <label
                                                        htmlFor="wallpaper-pattern-upload"
                                                        className="w-full text-center px-4 py-6 rounded-xl bg-white/5 border-2 border-dashed border-emerald-500/30 hover:border-emerald-500/60 text-[10px] font-bold text-white/40 uppercase cursor-pointer transition-all flex flex-col items-center gap-2"
                                                    >
                                                        <Upload size={20} className="text-emerald-400" />
                                                        Upload Custom Pattern
                                                    </label>
                                                )}
                                            </div>
                                        ) : null}

                                        <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 group focus-within:border-emerald-500/20 transition-all">
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="pattern-base-color" className="text-[8px] font-black text-white/20 uppercase tracking-widest">Base Color</label>
                                                <span className="text-[10px] font-mono text-white/60 uppercase">{theme.patternColor || '#000000'}</span>
                                            </div>
                                            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                                <input
                                                    id="pattern-base-color"
                                                    name="pattern-base-color"
                                                    type="color"
                                                    value={theme.patternColor || '#000000'}
                                                    onChange={(e) => setTheme({ ...theme, patternColor: e.target.value })}
                                                    className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 group focus-within:border-emerald-500/20 transition-all">
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="pattern-bg-color" className="text-[8px] font-black text-white/20 uppercase tracking-widest">Background Color</label>
                                                <span className="text-[10px] font-mono text-white/60 uppercase">{theme.patternBackgroundColor || theme.bg || '#000000'}</span>
                                            </div>
                                            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                                <input
                                                    id="pattern-bg-color"
                                                    name="pattern-bg-color"
                                                    type="color"
                                                    value={theme.patternBackgroundColor || theme.bg || '#000000'}
                                                    onChange={(e) => setTheme({ ...theme, patternBackgroundColor: e.target.value })}
                                                    className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center justify-between px-1">
                                                    <label htmlFor="pattern-opacity-slider" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Opacity</label>
                                                    <span className="text-[10px] font-bold text-white">{Math.round((theme.patternOpacity ?? 0.1) * 100)}%</span>
                                                </div>
                                                <input
                                                    id="pattern-opacity-slider"
                                                    name="pattern-opacity"
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.01"
                                                    value={theme.patternOpacity ?? 0.1}
                                                    onChange={(e) => setTheme({ ...theme, patternOpacity: parseFloat(e.target.value) })}
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center justify-between px-1">
                                                    <label htmlFor="pattern-blur-slider" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Blur</label>
                                                    <span className="text-[10px] font-bold text-white">{theme.patternBlur ?? 0}px</span>
                                                </div>
                                                <input
                                                    id="pattern-blur-slider"
                                                    name="pattern-blur"
                                                    type="range"
                                                    min="0"
                                                    max="20"
                                                    value={theme.patternBlur ?? 0}
                                                    onChange={(e) => setTheme({ ...theme, patternBlur: parseInt(e.target.value) })}
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Image Specific Controls */}


                                {/* Image Specific Controls */}
                                {theme.wallpaperStyle === 'image' && (
                                    <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                        <div className="flex items-center gap-2 px-1">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                                                <Image size={12} className="text-emerald-400" />
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Background Image</span>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            {theme.backgroundImage ? (
                                                <div className="flex flex-col gap-6">
                                                    <div className="relative aspect-video rounded-2xl overflow-hidden group border border-white/10">
                                                        <img src={theme.backgroundImage} className="w-full h-full object-cover" alt="Wallpaper" />
                                                        <button
                                                            onClick={() => setTheme({ ...theme, backgroundImage: null })}
                                                            className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-red-500/80 text-white rounded-full transition-all flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center justify-between px-1">
                                                                <label htmlFor="wallpaper-image-opacity" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Opacity</label>
                                                                <span className="text-[10px] font-bold text-white">{Math.round((theme.imageOpacity ?? 1) * 100)}%</span>
                                                            </div>
                                                            <input
                                                                id="wallpaper-image-opacity"
                                                                name="wallpaper-image-opacity"
                                                                type="range"
                                                                min="0"
                                                                max="1"
                                                                step="0.01"
                                                                value={theme.imageOpacity ?? 1}
                                                                onChange={(e) => setTheme({ ...theme, imageOpacity: parseFloat(e.target.value) })}
                                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center justify-between px-1">
                                                                <label htmlFor="wallpaper-image-blur" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Blur</label>
                                                                <span className="text-[10px] font-bold text-white">{theme.imageBlur ?? 0}px</span>
                                                            </div>
                                                            <input
                                                                id="wallpaper-image-blur"
                                                                name="wallpaper-image-blur"
                                                                type="range"
                                                                min="0"
                                                                max="100"
                                                                value={theme.imageBlur ?? 0}
                                                                onChange={(e) => setTheme({ ...theme, imageBlur: parseInt(e.target.value) })}
                                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <label htmlFor="bg-image-upload" className="flex flex-col items-center justify-center aspect-video rounded-[2rem] border-2 border-dashed border-white/5 bg-white/2 hover:bg-white/5 hover:border-emerald-500/20 transition-all cursor-pointer group">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 mb-3 group-hover:scale-110 group-hover:border-emerald-500/20 transition-all">
                                                        <Upload size={20} className="text-white/20 group-hover:text-emerald-400" />
                                                    </div>
                                                    <span className="text-xs font-bold text-white/60">Choose Wallpaper Image</span>
                                                    <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mt-1">PNG, JPG up to 10MB</span>
                                                    <input
                                                        id="bg-image-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const url = URL.createObjectURL(file);
                                                                setTheme({ ...theme, backgroundImage: url });
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Video Specific Controls */}
                                {theme.wallpaperStyle === 'video' && (
                                    <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                        <div className="flex items-center gap-2 px-1">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                                                <Video size={12} className="text-emerald-400" />
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Background Video</span>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            {theme.backgroundVideo ? (
                                                <div className="flex flex-col gap-6">
                                                    <div className="relative aspect-video rounded-2xl overflow-hidden group border border-white/10">
                                                        <video src={theme.backgroundVideo} className="w-full h-full object-cover" autoPlay muted loop />
                                                        <button
                                                            onClick={() => setTheme({ ...theme, backgroundVideo: null })}
                                                            className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-red-500/80 text-white rounded-full transition-all flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center justify-between px-1">
                                                                <label htmlFor="wallpaper-video-opacity" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Opacity</label>
                                                                <span className="text-[10px] font-bold text-white">{Math.round((theme.videoOpacity ?? 1) * 100)}%</span>
                                                            </div>
                                                            <input
                                                                id="wallpaper-video-opacity"
                                                                name="wallpaper-video-opacity"
                                                                type="range"
                                                                min="0"
                                                                max="1"
                                                                step="0.01"
                                                                value={theme.videoOpacity ?? 1}
                                                                onChange={(e) => setTheme({ ...theme, videoOpacity: parseFloat(e.target.value) })}
                                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center justify-between px-1">
                                                                <label htmlFor="wallpaper-video-blur" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Blur</label>
                                                                <span className="text-[10px] font-bold text-white">{theme.videoBlur ?? 0}px</span>
                                                            </div>
                                                            <input
                                                                id="wallpaper-video-blur"
                                                                name="wallpaper-video-blur"
                                                                type="range"
                                                                min="0"
                                                                max="100"
                                                                value={theme.videoBlur ?? 0}
                                                                onChange={(e) => setTheme({ ...theme, videoBlur: parseInt(e.target.value) })}
                                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <label htmlFor="bg-video-upload" className="flex flex-col items-center justify-center aspect-video rounded-[2rem] border-2 border-dashed border-white/5 bg-white/2 hover:bg-white/5 hover:border-emerald-500/20 transition-all cursor-pointer group">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 mb-3 group-hover:scale-110 group-hover:border-emerald-500/20 transition-all">
                                                        <Video size={20} className="text-white/20 group-hover:text-emerald-400" />
                                                    </div>
                                                    <span className="text-xs font-bold text-white/60">Choose Wallpaper Video</span>
                                                    <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mt-1">MP4, MOV up to 50MB</span>
                                                    <input
                                                        id="bg-video-upload"
                                                        type="file"
                                                        accept="video/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const url = URL.createObjectURL(file);
                                                                setTheme({ ...theme, backgroundVideo: url });
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Noise Toggle */}
                                <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 mt-4">
                                    <div className="flex flex-col gap-1">
                                        <span id="noise-toggle-label" className="text-sm font-bold text-white">Noise</span>
                                        <span className="text-xs text-white/40">Add a subtle grain texture</span>
                                    </div>
                                    <button
                                        id="noise-toggle"
                                        aria-labelledby="noise-toggle-label"
                                        onClick={() => setTheme({ ...theme, noise: !theme.noise })}
                                        className={`w-12 h-6 rounded-full relative ${theme.noise ? 'bg-white' : 'bg-white/10'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full ${theme.noise ? 'left-7 bg-black' : 'left-1 bg-white/40'}`} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {subTab === 'buttons' && (
                            <div className="flex flex-col gap-8">
                                {/* Tab Title */}
                                <div className="flex items-center gap-4 px-1">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-xl shadow-purple-500/5">
                                        <MousePointer2 size={24} className="text-purple-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-bold text-white tracking-tight">Buttons</h2>
                                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">Styles & Appearance</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                        <div className="flex items-center gap-3 px-1">
                                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                                <LayoutGrid size={16} className="text-purple-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white">Button Design</span>
                                                <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Base Styles</span>
                                            </div>
                                        </div>

                                        {/* Style Presets */}
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { id: 'solid', label: 'Solid', icon: <div className="w-8 h-4 bg-current rounded-sm shadow-sm" /> },
                                                { id: 'glass', label: 'Glass', icon: <div className="w-8 h-4 bg-current/20 rounded-sm border border-current/20 shadow-sm" /> },
                                                { id: 'outline', label: 'Outline', icon: <div className="w-8 h-4 bg-transparent border-2 border-current rounded-sm shadow-sm" /> }
                                            ].map(opt => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setTheme({ ...theme, btnStyle: opt.id })}
                                                    className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-300 ${theme.btnStyle === opt.id
                                                        ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/10'
                                                        : 'bg-black/20 border-white/5 text-white/20 hover:border-white/10 hover:text-white/40'
                                                        }`}
                                                >
                                                    {opt.icon}
                                                    <span className="text-[9px] font-black uppercase tracking-[0.15em]">{opt.label}</span>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Corner Roundness Slider */}
                                        <div className="flex flex-col gap-4 py-6 border-y border-white/5">
                                            <div className="flex items-center justify-between px-1">
                                                <label htmlFor="btn-corner-roundness" className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Corner Roundness</label>
                                                <span className="text-[10px] font-bold text-white">{theme.btnRadius}px</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <input
                                                    id="btn-corner-roundness"
                                                    name="btn-corner-roundness"
                                                    type="range"
                                                    min="0"
                                                    max="50"
                                                    value={typeof theme.btnRadius === 'number' ? theme.btnRadius : 12}
                                                    onChange={(e) => setTheme({ ...theme, btnRadius: parseInt(e.target.value) })}
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                                />
                                                <div className="flex justify-between px-0.5">
                                                    <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">Square</span>
                                                    <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">Pill</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Body / Text Toggle */}
                                        <div className="flex flex-col gap-4 pt-4">
                                            <div className="flex bg-black/20 rounded-xl p-1 w-fit border border-white/5">
                                                <button
                                                    onClick={() => setButtonDesignSubTab('body')}
                                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${buttonDesignSubTab === 'body' ? 'bg-purple-500/20 text-white border border-purple-500/20 shadow-lg shadow-purple-500/5' : 'text-white/30 hover:text-white/50 border border-transparent'}`}
                                                >
                                                    Body
                                                </button>
                                                <button
                                                    onClick={() => setButtonDesignSubTab('text')}
                                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${buttonDesignSubTab === 'text' ? 'bg-purple-500/20 text-white border border-purple-500/20 shadow-lg shadow-purple-500/5' : 'text-white/30 hover:text-white/50 border border-transparent'}`}
                                                >
                                                    Text
                                                </button>
                                            </div>

                                            {/* Mode Selector (Solid/Gradient/Pattern) */}
                                            {/* Mode Selector (Solid/Gradient/Pattern) */}
                                            <div className="flex items-center justify-between p-2 rounded-2xl bg-black/20 border border-white/5">
                                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] px-2">Mode</span>
                                                <div className="flex bg-white/5 rounded-xl p-0.5">
                                                    {['solid', 'gradient', 'pattern'].map((type) => (
                                                        <button
                                                            key={type}
                                                            onClick={() => {
                                                                const key = buttonDesignSubTab === 'body' ? 'btnColorType' : 'btnTextColorType';
                                                                setTheme({ ...theme, [key]: type });
                                                            }}
                                                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${(buttonDesignSubTab === 'body' ? theme.btnColorType : theme.btnTextColorType) === type
                                                                ? 'bg-purple-500/30 text-white shadow-xl shadow-purple-500/10 border border-purple-500/20'
                                                                : 'text-white/20 hover:text-white'
                                                                }`}
                                                        >
                                                            {type}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Sub-tab Content: BODY */}
                                            {buttonDesignSubTab === 'body' && (
                                                <div className="flex flex-col gap-4">
                                                    {theme.btnColorType === 'solid' && (
                                                        <ColorPickerRow
                                                            label="Button Color"
                                                            value={theme.btnColor || theme.accentColor}
                                                            onChange={(color) => setTheme({ ...theme, btnColor: color })}
                                                            colorId="btn-body-color"
                                                            activeColor="purple"
                                                        />
                                                    )}

                                                    {theme.btnColorType === 'gradient' && (
                                                        <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                                            <ColorPickerRow
                                                                label="Gradient Start"
                                                                value={theme.btnColorGradient1 || '#8228d9'}
                                                                onChange={(color) => setTheme({ ...theme, btnColorGradient1: color })}
                                                                colorId="btn-body-gradient1"
                                                                activeColor="purple"
                                                            />
                                                            <ColorPickerRow
                                                                label="Gradient End"
                                                                value={theme.btnColorGradient2 || '#6366f1'}
                                                                onChange={(color) => setTheme({ ...theme, btnColorGradient2: color })}
                                                                colorId="btn-body-gradient2"
                                                                activeColor="purple"
                                                            />
                                                            <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                                                                <div className="flex items-center justify-between px-1">
                                                                    <label htmlFor="btn-body-gradient-angle" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Gradient Angle</label>
                                                                    <span className="text-[10px] font-bold text-white">{theme.btnGradientAngle || 135}°</span>
                                                                </div>
                                                                <input
                                                                    id="btn-body-gradient-angle"
                                                                    name="btn-body-gradient-angle"
                                                                    type="range"
                                                                    min="0"
                                                                    max="360"
                                                                    value={theme.btnGradientAngle || 135}
                                                                    onChange={(e) => setTheme({ ...theme, btnGradientAngle: parseInt(e.target.value) })}
                                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {theme.btnColorType === 'pattern' && (
                                                        <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                                            <div className="flex flex-col gap-3">
                                                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest px-1">Pattern Type</span>
                                                                <div className="grid grid-cols-4 gap-2">
                                                                    {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                                                        <button
                                                                            key={p}
                                                                            disabled={p === 'custom' && !theme.btnColorCustomPattern}
                                                                            onClick={() => setTheme({ ...theme, btnColorPattern: p })}
                                                                            className={`py-3 px-1 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${theme.btnColorPattern === p
                                                                                ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/10'
                                                                                : 'bg-black/20 border-white/5 text-white/20 hover:border-white/10 hover:text-white/40'
                                                                                } ${p === 'custom' && !theme.btnColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                                        >
                                                                            {p === 'custom' && theme.btnColorCustomPattern ? (
                                                                                <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.btnColorCustomPattern}) center/cover` }} />
                                                                            ) : p}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <ColorPickerRow
                                                                label="Pattern Color"
                                                                value={theme.btnColor || theme.accentColor}
                                                                onChange={(color) => setTheme({ ...theme, btnColor: color })}
                                                                colorId="btn-body-pattern-color"
                                                                activeColor="purple"
                                                            />

                                                            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                                                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest px-1">Upload Custom Pattern</span>
                                                                <label htmlFor="btn-body-pattern-upload" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-black/20 border border-white/10 cursor-pointer hover:bg-white/5 hover:border-purple-500/20 transition-all group">
                                                                    <Upload size={16} className="text-white/20 group-hover:text-purple-400" />
                                                                    <span className="text-[10px] font-bold text-white/40 group-hover:text-white">Choose Image</span>
                                                                    <input
                                                                        type="file"
                                                                        id="btn-body-pattern-upload"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                const reader = new FileReader();
                                                                                reader.onloadend = () => {
                                                                                    setTheme({ ...theme, btnColorCustomPattern: reader.result, btnColorPattern: 'custom' });
                                                                                };
                                                                                reader.readAsDataURL(file);
                                                                            }
                                                                        }}
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Button Dimensions */}
                                                    <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                                        <div className="flex items-center gap-3 px-1">
                                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                                                <Maximize size={16} className="text-emerald-400" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-white">Sizing & Scale</span>
                                                                <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Dimensions</span>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-6">
                                                            {/* Width Control */}
                                                            <div className="flex flex-col gap-4">
                                                                <div className="flex items-center justify-between px-1">
                                                                    <label htmlFor="btn-width-slider" className="text-[10px] font-black text-white/20 uppercase tracking-widest">Width</label>
                                                                    <span className="text-[10px] font-bold text-white">{theme.btnWidth || 100}%</span>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex-1">
                                                                        <input
                                                                            id="btn-width-slider"
                                                                            name="btn-width"
                                                                            type="range"
                                                                            min="50"
                                                                            max="100"
                                                                            value={theme.btnWidth || 100}
                                                                            onChange={(e) => setTheme({ ...theme, btnWidth: parseInt(e.target.value) })}
                                                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                                        />
                                                                    </div>
                                                                    <div className="w-16 h-10 rounded-xl bg-black/20 border border-white/5 flex items-center justify-center">
                                                                        <input
                                                                            id="btn-width-number"
                                                                            name="btn-width-number"
                                                                            type="number"
                                                                            min="50"
                                                                            max="100"
                                                                            value={theme.btnWidth || 100}
                                                                            onChange={(e) => setTheme({ ...theme, btnWidth: parseInt(e.target.value) })}
                                                                            className="w-full bg-transparent text-center text-xs font-bold text-white outline-none"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Height Control */}
                                                            <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                                                                <div className="flex items-center justify-between px-1">
                                                                    <label htmlFor="btn-height-slider" className="text-[10px] font-black text-white/20 uppercase tracking-widest">Height (Vertical Padding)</label>
                                                                    <span className="text-[10px] font-bold text-white">{theme.btnHeight || 14}px</span>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex-1">
                                                                        <input
                                                                            id="btn-height-slider"
                                                                            name="btn-height"
                                                                            type="range"
                                                                            min="8"
                                                                            max="32"
                                                                            value={theme.btnHeight || 14}
                                                                            onChange={(e) => setTheme({ ...theme, btnHeight: parseInt(e.target.value) })}
                                                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                                        />
                                                                    </div>
                                                                    <div className="w-16 h-10 rounded-xl bg-black/20 border border-white/5 flex items-center justify-center">
                                                                        <input
                                                                            id="btn-height-number"
                                                                            name="btn-height-number"
                                                                            type="number"
                                                                            min="8"
                                                                            max="32"
                                                                            value={theme.btnHeight || 14}
                                                                            onChange={(e) => setTheme({ ...theme, btnHeight: parseInt(e.target.value) })}
                                                                            className="w-full bg-transparent text-center text-xs font-bold text-white outline-none"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Spacing Control */}
                                                    <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                                                        <div className="flex items-center justify-between px-1">
                                                            <label htmlFor="btn-spacing-slider" className="text-[10px] font-black text-white/20 uppercase tracking-widest">Button Spacing (Gap)</label>
                                                            <span className="text-[10px] font-bold text-white">{theme.btnSpacing || 12}px</span>
                                                        </div>
                                                        <input
                                                            id="btn-spacing-slider"
                                                            name="btn-spacing"
                                                            type="range"
                                                            min="8"
                                                            max="40"
                                                            value={theme.btnSpacing || 12}
                                                            onChange={(e) => setTheme({ ...theme, btnSpacing: parseInt(e.target.value) })}
                                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Sub-tab Content: TEXT */}
                                            {buttonDesignSubTab === 'text' && (
                                                <div className="flex flex-col gap-4 mt-2">
                                                    {/* Helper / Info */}
                                                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                                                        <Type size={14} className="text-white/40" />
                                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Button Typography</span>
                                                    </div>

                                                    {/* Font Family */}
                                                    <SelectField
                                                        label="Font Family"
                                                        value={theme.btnFont || 'Inter'}
                                                        onChange={(e) => setTheme({ ...theme, btnFont: e.target.value })}
                                                    >
                                                        {FONTS.map(font => (
                                                            <option key={font} value={font} className="bg-[#121212]">{font}</option>
                                                        ))}
                                                    </SelectField>

                                                    <div className="grid grid-cols-2 gap-3">
                                                        {/* Font Weight */}
                                                        <SelectField
                                                            label="Weight"
                                                            value={theme.btnTextWeight || 600}
                                                            onChange={(e) => setTheme({ ...theme, btnTextWeight: parseInt(e.target.value) })}
                                                        >
                                                            <option value="300" className="bg-[#121212]">Light</option>
                                                            <option value="400" className="bg-[#121212]">Regular</option>
                                                            <option value="500" className="bg-[#121212]">Medium</option>
                                                            <option value="600" className="bg-[#121212]">Semibold</option>
                                                            <option value="700" className="bg-[#121212]">Bold</option>
                                                            <option value="800" className="bg-[#121212]">Extra Bold</option>
                                                        </SelectField>

                                                        {/* Text Transform */}
                                                        <SelectField
                                                            label="Transform"
                                                            value={theme.btnTextTransform || 'none'}
                                                            onChange={(e) => setTheme({ ...theme, btnTextTransform: e.target.value })}
                                                        >
                                                            <option value="none" className="bg-[#121212]">None</option>
                                                            <option value="uppercase" className="bg-[#121212]">Uppercase</option>
                                                            <option value="lowercase" className="bg-[#121212]">Lowercase</option>
                                                            <option value="capitalize" className="bg-[#121212]">Capitalize</option>
                                                        </SelectField>
                                                    </div>

                                                    {/* Font Size */}
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center justify-between">
                                                            <label htmlFor="btn-font-size" className="text-[9px] font-bold text-white/30 uppercase tracking-wider">Size</label>
                                                            <span className="text-[9px] font-bold text-white">{theme.btnFontSize || 14}px</span>
                                                        </div>
                                                        <input
                                                            id="btn-font-size"
                                                            name="btn-font-size"
                                                            type="range"
                                                            min="10"
                                                            max="32"
                                                            value={theme.btnFontSize || 14}
                                                            onChange={(e) => setTheme({ ...theme, btnFontSize: parseInt(e.target.value) })}
                                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                                        />
                                                    </div>

                                                    {/* Separator */}
                                                    <div className="h-px bg-white/5 my-2"></div>

                                                    {theme.btnTextColorType === 'solid' && (
                                                        <ColorPickerRow
                                                            label="Text Color"
                                                            value={theme.btnTextColor || '#FFFFFF'}
                                                            onChange={(color) => setTheme({ ...theme, btnTextColor: color })}
                                                            colorId="btn-text-color"
                                                            activeColor="purple"
                                                        />
                                                    )}

                                                    {theme.btnTextColorType === 'gradient' && (
                                                        <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                                            <ColorPickerRow
                                                                label="Gradient Start"
                                                                value={theme.btnTextColorGradient1 || '#ffffff'}
                                                                onChange={(color) => setTheme({ ...theme, btnTextColorGradient1: color })}
                                                                colorId="btn-text-gradient1"
                                                                activeColor="purple"
                                                            />
                                                            <ColorPickerRow
                                                                label="Gradient End"
                                                                value={theme.btnTextColorGradient2 || '#cbd5e1'}
                                                                onChange={(color) => setTheme({ ...theme, btnTextColorGradient2: color })}
                                                                colorId="btn-text-gradient2"
                                                                activeColor="purple"
                                                            />
                                                        </div>
                                                    )}

                                                    {theme.btnTextColorType === 'pattern' && (
                                                        <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                                            <div className="flex flex-col gap-3">
                                                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest px-1">Pattern Type</span>
                                                                <div className="grid grid-cols-4 gap-2">
                                                                    {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                                                        <button
                                                                            key={p}
                                                                            disabled={p === 'custom' && !theme.btnTextColorCustomPattern}
                                                                            onClick={() => setTheme({ ...theme, btnTextColorPattern: p })}
                                                                            className={`py-3 px-1 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${theme.btnTextColorPattern === p
                                                                                ? 'bg-white text-black shadow-lg'
                                                                                : 'text-white/30 hover:bg-white/5 hover:text-white'
                                                                                } ${p === 'custom' && !theme.btnTextColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                                        >
                                                                            {p === 'custom' && theme.btnTextColorCustomPattern ? (
                                                                                <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.btnTextColorCustomPattern}) center/cover` }} />
                                                                            ) : p}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <ColorPickerRow
                                                                label="Pattern Color"
                                                                value={theme.btnTextColor}
                                                                onChange={(color) => setTheme({ ...theme, btnTextColor: color })}
                                                                colorId="btn-text-pattern-color"
                                                                activeColor="purple"
                                                            />

                                                            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                                                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest px-1">Upload Custom Pattern</span>
                                                                <label htmlFor="btn-text-pattern-upload" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-black/20 border border-white/10 cursor-pointer hover:bg-white/5 hover:border-purple-500/20 transition-all group">
                                                                    <Upload size={16} className="text-white/20 group-hover:text-purple-400" />
                                                                    <span className="text-[10px] font-bold text-white/40 group-hover:text-white">Choose Image</span>
                                                                    <input
                                                                        type="file"
                                                                        id="btn-text-pattern-upload"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                const reader = new FileReader();
                                                                                reader.onloadend = () => {
                                                                                    setTheme({ ...theme, btnTextColorCustomPattern: reader.result, btnTextColorPattern: 'custom' });
                                                                                };
                                                                                reader.readAsDataURL(file);
                                                                            }
                                                                        }}
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Button Shadow Panel */}
                                <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5"
                                    style={{
                                        animation: 'fadeInUp 0.6s ease-out forwards',
                                        animationDelay: '0.15s',
                                        opacity: 0
                                    }}>
                                    <div className="flex items-center gap-3 px-1">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                            <Box size={16} className="text-indigo-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white">Depth & Shadow</span>
                                            <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Button Elevation</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-8">
                                        {/* Shadow Offset & Blur */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center justify-between px-1">
                                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Offset X</span>
                                                    <span className="text-[10px] font-bold text-white">{theme.btnShadowX || 0}px</span>
                                                </div>
                                                <input
                                                    type="range" min="-20" max="20"
                                                    value={theme.btnShadowX || 0}
                                                    onChange={(e) => setTheme({ ...theme, btnShadowX: parseInt(e.target.value) })}
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center justify-between px-1">
                                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Offset Y</span>
                                                    <span className="text-[10px] font-bold text-white">{theme.btnShadowY || 0}px</span>
                                                </div>
                                                <input
                                                    type="range" min="-20" max="20"
                                                    value={theme.btnShadowY || 0}
                                                    onChange={(e) => setTheme({ ...theme, btnShadowY: parseInt(e.target.value) })}
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center justify-between px-1">
                                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Blur</span>
                                                    <span className="text-[10px] font-bold text-white">{theme.btnShadowBlur || 0}px</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="50"
                                                    value={theme.btnShadowBlur || 0}
                                                    onChange={(e) => setTheme({ ...theme, btnShadowBlur: parseInt(e.target.value) })}
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center justify-between px-1">
                                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Opacity</span>
                                                    <span className="text-[10px] font-bold text-white">{Math.round((theme.btnShadowOpacity || 0) * 100)}%</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="100"
                                                    value={(theme.btnShadowOpacity || 0) * 100}
                                                    onChange={(e) => setTheme({ ...theme, btnShadowOpacity: parseInt(e.target.value) / 100 })}
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Shadow Color Mode Selector */}
                                        <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                                            <div className="flex items-center justify-between p-2 rounded-2xl bg-black/20 border border-white/5">
                                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] px-2">Shadow Mode</span>
                                                <div className="flex bg-white/5 rounded-xl p-0.5">
                                                    {['solid', 'gradient', 'pattern'].map((type) => (
                                                        <button
                                                            key={type}
                                                            onClick={() => setTheme({ ...theme, btnShadowType: type })}
                                                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${(theme.btnShadowType || 'solid') === type
                                                                ? 'bg-indigo-500/30 text-white shadow-xl shadow-indigo-500/10 border border-indigo-500/20'
                                                                : 'text-white/20 hover:text-white'
                                                                }`}
                                                        >
                                                            {type}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {(theme.btnShadowType === 'solid' || !theme.btnShadowType) && (
                                                <ColorPickerRow
                                                    label="Shadow Color"
                                                    value={theme.btnShadowColor || '#000000'}
                                                    onChange={(color) => setTheme({ ...theme, btnShadowColor: color })}
                                                    colorId="btn-shadow-color"
                                                    activeColor="purple"
                                                />
                                            )}

                                            {theme.btnShadowType === 'gradient' && (
                                                <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                                    <ColorPickerRow
                                                        label="Gradient Start"
                                                        value={theme.btnShadowColorGradient1 || '#000000'}
                                                        onChange={(color) => setTheme({ ...theme, btnShadowColorGradient1: color })}
                                                        colorId="btn-shadow-gradient1"
                                                        activeColor="purple"
                                                    />
                                                    <ColorPickerRow
                                                        label="Gradient End"
                                                        value={theme.btnShadowColorGradient2 || '#000000'}
                                                        onChange={(color) => setTheme({ ...theme, btnShadowColorGradient2: color })}
                                                        colorId="btn-shadow-gradient2"
                                                        activeColor="purple"
                                                    />
                                                </div>
                                            )}

                                            {theme.btnShadowType === 'pattern' && (
                                                <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                                    <div className="flex flex-col gap-3">
                                                        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest px-1">Pattern Type</span>
                                                        <div className="grid grid-cols-4 gap-2">
                                                            {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                                                <button
                                                                    key={p}
                                                                    disabled={p === 'custom' && !theme.btnShadowCustomPattern}
                                                                    onClick={() => setTheme({ ...theme, btnShadowPattern: p })}
                                                                    className={`py-3 px-1 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${(theme.btnShadowPattern || 'dots') === p
                                                                        ? 'bg-indigo-500/20 border-indigo-500/40 text-white shadow-xl shadow-indigo-500/10'
                                                                        : 'bg-black/20 border-white/5 text-white/20 hover:border-white/10 hover:text-white/40'
                                                                        } ${p === 'custom' && !theme.btnShadowCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                                >
                                                                    {p === 'custom' && theme.btnShadowCustomPattern ? (
                                                                        <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.btnShadowCustomPattern}) center/cover` }} />
                                                                    ) : p}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <ColorPickerRow
                                                        label="Pattern Color"
                                                        value={theme.btnShadowColor || '#000000'}
                                                        onChange={(color) => setTheme({ ...theme, btnShadowColor: color })}
                                                        colorId="btn-shadow-pattern-color"
                                                        activeColor="purple"
                                                    />

                                                    <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                                                        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest px-1">Upload Custom Pattern</span>
                                                        <label htmlFor="btn-shadow-pattern-upload" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-black/20 border border-white/10 cursor-pointer hover:bg-white/5 hover:border-indigo-500/20 transition-all group">
                                                            <Upload size={16} className="text-white/20 group-hover:text-indigo-400" />
                                                            <span className="text-[10px] font-bold text-white/40 group-hover:text-white">Choose Image</span>
                                                            <input
                                                                type="file"
                                                                id="btn-shadow-pattern-upload"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const reader = new FileReader();
                                                                        reader.onloadend = () => {
                                                                            setTheme({ ...theme, btnShadowCustomPattern: reader.result, btnShadowPattern: 'custom' });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Shadow Animation Selector */}
                                        <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest px-1">Shadow Animation</span>
                                            <div className="grid grid-cols-2 gap-2">
                                                {ANIMATION_OPTIONS.map(opt => (
                                                    <button
                                                        key={opt.id}
                                                        onClick={() => setTheme({ ...theme, btnShadowAnimation: opt.id })}
                                                        className={`py-3 px-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${(theme.btnShadowAnimation || 'none') === opt.id
                                                            ? 'bg-indigo-500/20 text-white border-indigo-500/40 shadow-xl shadow-indigo-500/10'
                                                            : 'bg-black/20 text-white/30 border-white/5 hover:border-white/10 hover:text-white/60 hover:bg-white/5'
                                                            }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Button Interactions Panel */}
                                <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                    <div className="flex items-center gap-3 px-1">
                                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                            <Zap size={16} className="text-amber-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white">Interactions</span>
                                            <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Hover & Effects</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-8">
                                        {/* Hover Effect */}
                                        <div className="flex flex-col gap-3">
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest px-1">Hover Response</span>
                                            <div className="grid grid-cols-4 gap-2">
                                                {['none', 'lift', 'scale', 'glow'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setTheme({ ...theme, btnHoverEffect: opt })}
                                                        className={`py-3 px-1 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${theme.btnHoverEffect === opt
                                                            ? 'bg-amber-500/20 text-white border-amber-500/40 shadow-xl shadow-amber-500/10'
                                                            : 'bg-black/20 text-white/20 border-white/5 hover:border-white/10 hover:text-white/40'
                                                            }`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Press Effect */}
                                        <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest px-1">Press Response</span>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['none', 'push', 'inset'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setTheme({ ...theme, btnPressEffect: opt })}
                                                        className={`py-3 px-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${theme.btnPressEffect === opt
                                                            ? 'bg-amber-500/20 text-white border-amber-500/40 shadow-xl shadow-amber-500/10'
                                                            : 'bg-black/20 text-white/20 border-white/5 hover:border-white/10 hover:text-white/40'
                                                            }`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Animation Effect */}
                                        <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest px-1">Entrance Animation</span>
                                            <div className="grid grid-cols-2 gap-2">
                                                {ANIMATION_OPTIONS.map(opt => (
                                                    <button
                                                        key={opt.id}
                                                        onClick={() => setTheme({ ...theme, btnAnimation: opt.id })}
                                                        className={`py-3 px-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${(theme.btnAnimation || 'none') === opt.id
                                                            ? 'bg-amber-500/20 text-white border-amber-500/40 shadow-xl shadow-amber-500/10'
                                                            : 'bg-black/20 text-white/30 border-white/5 hover:border-white/10 hover:text-white/60 hover:bg-white/5'
                                                            }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {subTab === 'footer' && (
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center gap-4 px-1">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-xl shadow-purple-500/5">
                                        <Footprints size={24} className="text-purple-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-bold text-white tracking-tight">Footer</h2>
                                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">Minimalist & Compact Layout</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {/* Greeting Card Section */}
                                    <div className="flex flex-col gap-6 p-6 rounded-2xl bg-white/3 border border-white/5">
                                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                                    <Heart size={16} className="text-purple-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white">Greeting Card</span>
                                                    <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Visibility Control</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setTheme({ ...theme, showFooter: !theme.showFooter })}
                                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${theme.showFooter ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-white/5 border-white/10 text-white/40'}`}
                                            >
                                                {theme.showFooter ? 'Enabled' : 'Disabled'}
                                            </button>
                                        </div>

                                        {theme.showFooter && (
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="footer-greeting-title" className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-1">Greeting Title</label>
                                                    <input
                                                        id="footer-greeting-title"
                                                        name="footer-greeting-title"
                                                        type="text"
                                                        value={theme.footerGreetingTitle}
                                                        onChange={(e) => setTheme({ ...theme, footerGreetingTitle: e.target.value })}
                                                        placeholder="Enter title..."
                                                        className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-purple-500/30"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="footer-greeting-desc" className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-1">Message Description</label>
                                                    <textarea
                                                        id="footer-greeting-desc"
                                                        name="footer-greeting-desc"
                                                        value={theme.footerGreetingDesc}
                                                        onChange={(e) => setTheme({ ...theme, footerGreetingDesc: e.target.value })}
                                                        placeholder="Enter description..."
                                                        rows={2}
                                                        className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-medium text-white/60 outline-none focus:border-purple-500/30 resize-none leading-relaxed"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer Styling Section */}
                                    <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/10">
                                        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                                <Palette size={16} className="text-orange-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white">Appearance</span>
                                                <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Design & Aesthetics</span>
                                            </div>
                                        </div>

                                        {/* Style Presets */}
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Style</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {[
                                                    { id: 'solid', label: 'Solid', icon: <div className="w-10 h-5 bg-current rounded-sm" /> },
                                                    { id: 'glass', label: 'Glass', icon: <div className="w-10 h-5 bg-current/20 rounded-sm border border-current/20" /> },
                                                    { id: 'outline', label: 'Outline', icon: <div className="w-10 h-5 bg-transparent border-2 border-current rounded-sm" /> }
                                                ].map(opt => (
                                                    <button
                                                        key={opt.id}
                                                        onClick={() => setTheme({ ...theme, footerBtnStyle: opt.id })}
                                                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 ${theme.footerBtnStyle === opt.id
                                                            ? 'bg-white text-black border-white shadow-2xl shadow-white/10'
                                                            : 'bg-white/5 text-white/40 border-transparent hover:bg-white/10 hover:text-white'
                                                            }`}
                                                    >
                                                        {opt.icon}
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">{opt.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Corner Roundness */}
                                        <div className="flex flex-col gap-3 py-6 border-y border-white/5">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="footer-corner-roundness" className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Corner Roundness</label>
                                                <span className="text-[10px] font-bold text-white">{theme.footerBtnRadius}px</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <input
                                                    id="footer-corner-roundness"
                                                    name="footer-corner-roundness"
                                                    type="range"
                                                    min="0"
                                                    max="40"
                                                    value={theme.footerBtnRadius}
                                                    onChange={(e) => setTheme({ ...theme, footerBtnRadius: parseInt(e.target.value) })}
                                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                                />
                                                <div className="flex justify-between px-0.5">
                                                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Square</span>
                                                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Full</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Animation */}
                                        <div className="py-6 border-t border-white/5">
                                            <SelectField
                                                label="Animation"
                                                value={theme.footerAnimation || 'none'}
                                                onChange={(e) => setTheme({ ...theme, footerAnimation: e.target.value })}
                                            >
                                                {ANIMATION_OPTIONS.map(opt => (
                                                    <option key={opt.id} value={opt.id} className="bg-[#121212]">{opt.label}</option>
                                                ))}
                                            </SelectField>
                                        </div>

                                        {/* Body / Text Toggle */}
                                        <div className="flex flex-col gap-4">
                                            <div className="flex bg-white/5 rounded-2xl p-1.5 self-start">
                                                <button
                                                    onClick={() => setFooterDesignSubTab('body')}
                                                    className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${footerDesignSubTab === 'body' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                                                >
                                                    Body
                                                </button>
                                                <button
                                                    onClick={() => setFooterDesignSubTab('text')}
                                                    className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${footerDesignSubTab === 'text' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                                                >
                                                    Text
                                                </button>
                                            </div>

                                            {/* Mode Selector */}
                                            <div className="flex items-center justify-between mt-2">
                                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                                    {footerDesignSubTab === 'body' ? 'Background Mode' : 'Text Mode'}
                                                </label>
                                                <div className="flex bg-white/5 rounded-lg p-0.5">
                                                    {['solid', 'gradient', 'pattern'].map((type) => (
                                                        <button
                                                            key={type}
                                                            onClick={() => {
                                                                const key = footerDesignSubTab === 'body' ? 'footerBtnColorType' : 'footerBtnTextColorType';
                                                                setTheme({ ...theme, [key]: type });
                                                            }}
                                                            className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${(footerDesignSubTab === 'body' ? theme.footerBtnColorType : theme.footerBtnTextColorType) === type
                                                                ? 'bg-white/20 text-white shadow-sm shadow-black/20'
                                                                : 'text-white/30 hover:text-white'
                                                                }`}
                                                        >
                                                            {type}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Sub-tab Content: BODY */}
                                            {footerDesignSubTab === 'body' && (
                                                <div className="flex flex-col gap-4 mt-2">
                                                    {theme.footerBtnColorType === 'solid' && (
                                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group focus-within:border-white/10">
                                                            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                                                <input
                                                                    id="footer-body-color"
                                                                    name="footer-body-color"
                                                                    type="color"
                                                                    value={theme.footerBtnColor || '#ffffff'}
                                                                    onChange={(e) => setTheme({ ...theme, footerBtnColor: e.target.value })}
                                                                    className="absolute inset-0 w-[150%] h-[150%] -translate-x-[25%] -translate-y-[25%] cursor-pointer"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-0.5">
                                                                <input
                                                                    id="footer-body-color-hex"
                                                                    name="footer-body-color-hex"
                                                                    type="text"
                                                                    value={theme.footerBtnColor || '#ffffff'}
                                                                    onChange={(e) => setTheme({ ...theme, footerBtnColor: e.target.value })}
                                                                    className="bg-transparent text-sm font-bold text-white outline-none uppercase"
                                                                />
                                                                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Footer Base</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {theme.footerBtnColorType === 'gradient' && (
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                                                <input
                                                                    id="footer-body-gradient-1"
                                                                    name="footer-body-gradient-1"
                                                                    type="color"
                                                                    value={theme.footerBtnColorGradient1 || '#8228d9'}
                                                                    onChange={(e) => setTheme({ ...theme, footerBtnColorGradient1: e.target.value })}
                                                                    className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer"
                                                                />
                                                                <span className="text-[10px] font-bold text-white uppercase">{theme.footerBtnColorGradient1}</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                                                <input
                                                                    id="footer-body-gradient-2"
                                                                    name="footer-body-gradient-2"
                                                                    type="color"
                                                                    value={theme.footerBtnColorGradient2 || '#6366f1'}
                                                                    onChange={(e) => setTheme({ ...theme, footerBtnColorGradient2: e.target.value })}
                                                                    className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer"
                                                                />
                                                                <span className="text-[10px] font-bold text-white uppercase">{theme.footerBtnColorGradient2}</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {theme.footerBtnColorType === 'pattern' && (
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center justify-between p-1.5 rounded-2xl bg-white/5 border border-white/5">
                                                                <div className="grid grid-cols-4 gap-2 w-full">
                                                                    {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                                                        <button
                                                                            key={p}
                                                                            disabled={p === 'custom' && !theme.footerBtnColorCustomPattern}
                                                                            onClick={() => setTheme({ ...theme, footerBtnColorPattern: p })}
                                                                            className={`py-2 px-1 rounded-xl text-[9px] font-bold uppercase tracking-widest ${theme.footerBtnColorPattern === p
                                                                                ? 'bg-white text-black shadow-lg'
                                                                                : 'text-white/30 hover:bg-white/5 hover:text-white'
                                                                                } ${p === 'custom' && !theme.footerBtnColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                                        >
                                                                            {p === 'custom' && theme.footerBtnColorCustomPattern ? (
                                                                                <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.footerBtnColorCustomPattern}) center/cover` }} />
                                                                            ) : p}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                                                                <div className="flex flex-col gap-0.5">
                                                                    <span className="text-[9px] text-white/30 font-bold uppercase">Color Filter</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <input
                                                                            id="footer-body-pattern-color"
                                                                            name="footer-body-pattern-color"
                                                                            type="color"
                                                                            value={theme.footerBtnColor || '#ffffff'}
                                                                            onChange={(e) => setTheme({ ...theme, footerBtnColor: e.target.value })}
                                                                            className="w-6 h-6 rounded-md overflow-hidden cursor-pointer border border-white/10"
                                                                        />
                                                                        <span className="text-[10px] font-bold text-white uppercase">{theme.footerBtnColor}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2 border-l border-white/5 pl-4">
                                                                    <input
                                                                        type="file"
                                                                        id="footer-body-pattern-upload"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                const reader = new FileReader();
                                                                                reader.onloadend = () => {
                                                                                    setTheme({ ...theme, footerBtnColorCustomPattern: reader.result, footerBtnColorPattern: 'custom' });
                                                                                };
                                                                                reader.readAsDataURL(file);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <label
                                                                        htmlFor="footer-body-pattern-upload"
                                                                        className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[9px] font-bold text-white uppercase cursor-pointer whitespace-nowrap"
                                                                    >
                                                                        Upload +
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Sub-tab Content: TEXT */}
                                            {footerDesignSubTab === 'text' && (
                                                <div className="flex flex-col gap-4 mt-2">
                                                    {/* Footer Typography Settings */}
                                                    <div className="flex flex-col gap-4 border-b border-white/5 pb-4 mb-2">
                                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Typography</label>

                                                        {/* Font Family */}
                                                        <SelectField
                                                            label="Font Family"
                                                            value={theme.footerFont || 'Inter'}
                                                            onChange={(e) => setTheme({ ...theme, footerFont: e.target.value })}
                                                        >
                                                            {FONTS.map(font => (
                                                                <option key={font} value={font} className="bg-[#121212]">{font}</option>
                                                            ))}
                                                        </SelectField>

                                                        <div className="grid grid-cols-2 gap-3">
                                                            {/* Font Weight */}
                                                            <SelectField
                                                                label="Weight"
                                                                value={theme.footerWeight || 400}
                                                                onChange={(e) => setTheme({ ...theme, footerWeight: parseInt(e.target.value) })}
                                                            >
                                                                <option value="300" className="bg-[#121212]">Light</option>
                                                                <option value="400" className="bg-[#121212]">Regular</option>
                                                                <option value="500" className="bg-[#121212]">Medium</option>
                                                                <option value="600" className="bg-[#121212]">Semibold</option>
                                                                <option value="700" className="bg-[#121212]">Bold</option>
                                                            </SelectField>

                                                            {/* Text Transform */}
                                                            <SelectField
                                                                label="Transform"
                                                                value={theme.footerTransform || 'none'}
                                                                onChange={(e) => setTheme({ ...theme, footerTransform: e.target.value })}
                                                            >
                                                                <option value="none" className="bg-[#121212]">None</option>
                                                                <option value="uppercase" className="bg-[#121212]">Uppercase</option>
                                                                <option value="lowercase" className="bg-[#121212]">Lowercase</option>
                                                                <option value="capitalize" className="bg-[#121212]">Capitalize</option>
                                                            </SelectField>
                                                        </div>

                                                        {/* Font Size */}
                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex items-center justify-between">
                                                                <label className="text-[9px] font-bold text-white/30 uppercase tracking-wider">Size</label>
                                                                <span className="text-[9px] font-bold text-white">{theme.footerFontSize || 12}px</span>
                                                            </div>
                                                            <input
                                                                type="range"
                                                                min="10"
                                                                max="24"
                                                                value={theme.footerFontSize || 12}
                                                                onChange={(e) => setTheme({ ...theme, footerFontSize: parseInt(e.target.value) })}
                                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                                            />
                                                        </div>
                                                    </div>
                                                    {theme.footerBtnTextColorType === 'solid' && (
                                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 focus-within:border-white/10">
                                                            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                                                <input
                                                                    id="footer-text-color"
                                                                    name="footer-text-color"
                                                                    type="color"
                                                                    value={theme.footerBtnTextColor || '#ffffff'}
                                                                    onChange={(e) => setTheme({ ...theme, footerBtnTextColor: e.target.value })}
                                                                    className="absolute inset-0 w-[150%] h-[150%] -translate-x-[25%] -translate-y-[25%] cursor-pointer"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-0.5">
                                                                <input
                                                                    id="footer-text-color-hex"
                                                                    name="footer-text-color-hex"
                                                                    type="text"
                                                                    value={theme.footerBtnTextColor || '#ffffff'}
                                                                    onChange={(e) => setTheme({ ...theme, footerBtnTextColor: e.target.value })}
                                                                    className="bg-transparent text-sm font-bold text-white outline-none uppercase"
                                                                />
                                                                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Text Style</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {theme.footerBtnTextColorType === 'gradient' && (
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                                                <input
                                                                    id="footer-text-gradient-1"
                                                                    name="footer-text-gradient-1"
                                                                    type="color"
                                                                    value={theme.footerBtnTextColorGradient1 || '#ffffff'}
                                                                    onChange={(e) => setTheme({ ...theme, footerBtnTextColorGradient1: e.target.value })}
                                                                    className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer"
                                                                />
                                                                <span className="text-[10px] font-bold text-white uppercase">{theme.footerBtnTextColorGradient1}</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                                                <input
                                                                    id="footer-text-gradient-2"
                                                                    name="footer-text-gradient-2"
                                                                    type="color"
                                                                    value={theme.footerBtnTextColorGradient2 || '#cbd5e1'}
                                                                    onChange={(e) => setTheme({ ...theme, footerBtnTextColorGradient2: e.target.value })}
                                                                    className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer"
                                                                />
                                                                <span className="text-[10px] font-bold text-white uppercase">{theme.footerBtnTextColorGradient2}</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {theme.footerBtnTextColorType === 'pattern' && (
                                                        <div className="flex flex-col gap-3">
                                                            <div className="grid grid-cols-4 gap-2">
                                                                {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                                                    <button
                                                                        key={p}
                                                                        disabled={p === 'custom' && !theme.footerBtnTextColorCustomPattern}
                                                                        onClick={() => setTheme({ ...theme, footerBtnTextColorPattern: p })}
                                                                        className={`py-2 px-1 rounded-xl text-[9px] font-bold uppercase tracking-widest ${theme.footerBtnTextColorPattern === p
                                                                            ? 'bg-white text-black shadow-lg'
                                                                            : 'text-white/30 hover:bg-white/5 hover:text-white'
                                                                            } ${p === 'custom' && !theme.footerBtnTextColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                                    >
                                                                        {p === 'custom' && theme.footerBtnTextColorCustomPattern ? (
                                                                            <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.footerBtnTextColorCustomPattern}) center/cover` }} />
                                                                        ) : p}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            {theme.footerBtnTextColorPattern === 'custom' && (
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <input
                                                                        type="file"
                                                                        id="footer-text-pattern-upload"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                const reader = new FileReader();
                                                                                reader.onloadend = () => {
                                                                                    setTheme({ ...theme, footerBtnTextColorCustomPattern: reader.result, footerBtnTextColorPattern: 'custom' });
                                                                                };
                                                                                reader.readAsDataURL(file);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <label
                                                                        htmlFor="footer-text-pattern-upload"
                                                                        className="w-full text-center px-4 py-3 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-white/40 text-[10px] font-bold text-white/40 uppercase cursor-pointer"
                                                                    >
                                                                        Change Custom Pattern
                                                                    </label>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Shadow Section */}
                                        <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                                                    <Layers size={16} className="text-pink-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white">Shadow</span>
                                                    <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Depth & Dimension</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { label: 'X Offset', key: 'footerShadowX', min: -20, max: 20 },
                                                    { label: 'Y Offset', key: 'footerShadowY', min: -20, max: 20 },
                                                    { label: 'Blur', key: 'footerShadowBlur', min: 0, max: 50 },
                                                    { label: 'Spread', key: 'footerShadowSpread', min: -10, max: 20 },
                                                    { label: 'Opacity', key: 'footerShadowOpacity', min: 0, max: 1, step: 0.1 }
                                                ].map(s => (
                                                    <div key={s.key} className="flex flex-col gap-2">
                                                        <div className="flex items-center justify-between">
                                                            <label htmlFor={`footer-shadow-${s.key}`} className="text-[8px] font-bold text-white/30 uppercase">{s.label}</label>
                                                            <span className="text-[8px] font-bold text-white">{theme[s.key]}{s.label === 'Opacity' ? '' : 'px'}</span>
                                                        </div>
                                                        <input
                                                            id={`footer-shadow-${s.key}`}
                                                            name={`footer-shadow-${s.key}`}
                                                            type="range"
                                                            min={s.min}
                                                            max={s.max}
                                                            step={s.step || 1}
                                                            value={theme[s.key]}
                                                            onChange={(e) => setTheme({ ...theme, [s.key]: parseFloat(e.target.value) })}
                                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Shadow Type Selector */}
                                            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Shadow Type</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {['solid', 'gradient', 'pattern'].map((type) => (
                                                        <button
                                                            key={type}
                                                            onClick={() => setTheme({ ...theme, footerShadowType: type })}
                                                            className={`py-2 px-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${theme.footerShadowType === type
                                                                ? 'bg-white text-black border-white'
                                                                : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10'
                                                                }`}
                                                        >
                                                            {type}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Conditional Shadow Inputs */}
                                            {theme.footerShadowType === 'solid' && (
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="footer-shadow-color" className="text-[8px] font-bold text-white/30 uppercase">Color</label>
                                                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                                                        <input
                                                            id="footer-shadow-color"
                                                            name="footer-shadow-color"
                                                            type="color"
                                                            value={theme.footerShadowColor}
                                                            onChange={(e) => setTheme({ ...theme, footerShadowColor: e.target.value })}
                                                            className="w-6 h-6 rounded-md overflow-hidden cursor-pointer border border-white/10"
                                                        />
                                                        <span className="text-[10px] font-bold text-white uppercase">{theme.footerShadowColor}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {theme.footerShadowType === 'gradient' && (
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-col gap-3">
                                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Gradient Colors</label>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                                                                <input
                                                                    id="footer-shadow-gradient-1"
                                                                    name="footer-shadow-gradient-1"
                                                                    type="color"
                                                                    value={theme.footerShadowColorGradient1 || '#000000'}
                                                                    onChange={(e) => setTheme({ ...theme, footerShadowColorGradient1: e.target.value })}
                                                                    className="w-6 h-6 rounded-lg overflow-hidden cursor-pointer"
                                                                />
                                                                <span className="text-[10px] font-bold text-white uppercase">{theme.footerShadowColorGradient1}</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                                                                <input
                                                                    id="footer-shadow-gradient-2"
                                                                    name="footer-shadow-gradient-2"
                                                                    type="color"
                                                                    value={theme.footerShadowColorGradient2 || '#000000'}
                                                                    onChange={(e) => setTheme({ ...theme, footerShadowColorGradient2: e.target.value })}
                                                                    className="w-6 h-6 rounded-lg overflow-hidden cursor-pointer"
                                                                />
                                                                <span className="text-[10px] font-bold text-white uppercase">{theme.footerShadowColorGradient2}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {theme.footerShadowType === 'pattern' && (
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center justify-between">
                                                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Select Pattern</label>
                                                        </div>
                                                        <div className="grid grid-cols-4 gap-2">
                                                            {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                                                <button
                                                                    key={p}
                                                                    disabled={p === 'custom' && !theme.footerShadowCustomPattern}
                                                                    onClick={() => setTheme({ ...theme, footerShadowPattern: p })}
                                                                    className={`py-2 px-1 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${theme.footerShadowPattern === p
                                                                        ? 'bg-white/20 text-white border border-white/20'
                                                                        : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'
                                                                        } ${p === 'custom' && !theme.footerShadowCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                                >
                                                                    {p === 'custom' && theme.footerShadowCustomPattern ? (
                                                                        <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.footerShadowCustomPattern}) center/cover` }} />
                                                                    ) : p}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-3">
                                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Pattern Color</label>
                                                        <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 group focus-within:border-white/10 transition-all">
                                                            <input
                                                                id="footer-shadow-pattern-color"
                                                                name="footer-shadow-pattern-color"
                                                                type="color"
                                                                value={theme.footerShadowColor || '#000000'}
                                                                onChange={(e) => setTheme({ ...theme, footerShadowColor: e.target.value })}
                                                                className="w-6 h-6 rounded-md overflow-hidden cursor-pointer border border-white/10"
                                                            />
                                                            <span className="text-[10px] font-bold text-white uppercase">{theme.footerShadowColor}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 border-l border-white/5 pl-4">
                                                        <input
                                                            type="file"
                                                            id="footer-shadow-pattern-upload"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                if (file) {
                                                                    const reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        setTheme({ ...theme, footerShadowCustomPattern: reader.result, footerShadowPattern: 'custom' });
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor="footer-shadow-pattern-upload"
                                                            className="w-full text-center px-4 py-3 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-white/40 text-[10px] font-bold text-white/40 uppercase cursor-pointer"
                                                        >
                                                            Upload Pattern +
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Branding Section */}
                                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/3 border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                                <Zap size={16} className="text-indigo-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white">Vlink Branding</span>
                                                <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Logo Attribution</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setTheme({ ...theme, showVlink: !theme.showVlink })}
                                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${theme.showVlink ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-white/40'}`}
                                        >
                                            {theme.showVlink ? 'Visible' : 'Hidden'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {subTab === 'socials' && (
                            <div className="flex flex-col gap-10">
                                {/* Tab Title */}
                                <div className="flex items-center gap-4 px-1">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-xl shadow-purple-500/5">
                                        <Share2 size={24} className="text-purple-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-bold text-white tracking-tight">Social Icons</h2>
                                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">Platform Connections</p>
                                    </div>
                                </div>

                                {/* Style & Layout Controls */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/10">
                                                <Layers size={12} className="text-purple-400" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Display & Position</span>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <label className="text-xs font-bold text-white/60">Display Style</label>
                                            <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                                                <button
                                                    onClick={() => setTheme({ ...theme, socialStyle: 'icons-only' })}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialStyle === 'icons-only' ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/40 hover:text-white/60'}`}
                                                >
                                                    <Square size={14} />
                                                    Icons Only
                                                </button>
                                                <button
                                                    onClick={() => setTheme({ ...theme, socialStyle: 'icon-text' })}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialStyle === 'icon-text' ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/40 hover:text-white/60'}`}
                                                >
                                                    <Type size={14} />
                                                    Icon + Text
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <label className="text-xs font-bold text-white/60">Position</label>
                                            <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                                                <button
                                                    onClick={() => setTheme({ ...theme, socialPosition: 'top' })}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialPosition === 'top' ? 'bg-indigo-500/20 border-indigo-500/40 text-white shadow-xl shadow-indigo-500/5' : 'bg-transparent border-transparent text-white/40 hover:text-white/60'}`}
                                                >
                                                    <ArrowUp size={14} />
                                                    Top
                                                </button>
                                                <button
                                                    onClick={() => setTheme({ ...theme, socialPosition: 'bottom' })}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialPosition === 'bottom' ? 'bg-indigo-500/20 border-indigo-500/40 text-white shadow-xl shadow-indigo-500/5' : 'bg-transparent border-transparent text-white/40 hover:text-white/60'}`}
                                                >
                                                    <ArrowDown size={14} />
                                                    Bottom
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <label className="text-xs font-bold text-white/60">Alignment</label>
                                            <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                                                <button
                                                    onClick={() => setTheme({ ...theme, socialAlignment: 'left' })}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialAlignment === 'left' ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/40 hover:text-white/60'}`}
                                                >
                                                    <AlignLeft size={14} />
                                                    Left
                                                </button>
                                                <button
                                                    onClick={() => setTheme({ ...theme, socialAlignment: 'center' })}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialAlignment === 'center' ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/40 hover:text-white/60'}`}
                                                >
                                                    <AlignCenter size={14} />
                                                    Center
                                                </button>
                                                <button
                                                    onClick={() => setTheme({ ...theme, socialAlignment: 'right' })}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialAlignment === 'right' ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/40 hover:text-white/60'}`}
                                                >
                                                    <AlignRight size={14} />
                                                    Right
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/10">
                                                <LayoutGrid size={12} className="text-purple-400" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Size & Spacing</span>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="social-icon-size" className="text-xs font-bold text-white/60">Icon Size</label>
                                                <span className="text-[10px] font-black text-purple-400">{theme.socialSize}px</span>
                                            </div>
                                            <input
                                                id="social-icon-size"
                                                name="social-icon-size"
                                                type="range"
                                                min="16"
                                                max="48"
                                                value={theme.socialSize || 20}
                                                onChange={(e) => setTheme({ ...theme, socialSize: parseInt(e.target.value) })}
                                                className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-purple-500"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="social-icon-spacing" className="text-xs font-bold text-white/60">Spacing</label>
                                                <span className="text-[10px] font-black text-purple-400">{theme.socialSpacing}px</span>
                                            </div>
                                            <input
                                                id="social-icon-spacing"
                                                name="social-icon-spacing"
                                                type="range"
                                                min="8"
                                                max="40"
                                                value={theme.socialSpacing || 16}
                                                onChange={(e) => setTheme({ ...theme, socialSpacing: parseInt(e.target.value) })}
                                                className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-purple-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Color Section */}
                                <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Paintbrush size={14} className="text-purple-400" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Color Customization</span>
                                        </div>
                                        <div className="flex p-0.5 bg-black/40 rounded-lg border border-white/5">
                                            <button
                                                onClick={() => setTheme({ ...theme, socialColorType: 'auto' })}
                                                className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${theme.socialColorType === 'auto' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}
                                            >
                                                Auto
                                            </button>
                                            <button
                                                onClick={() => setTheme({ ...theme, socialColorType: 'brand' })}
                                                className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${theme.socialColorType === 'brand' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}
                                            >
                                                Brand
                                            </button>
                                            <button
                                                onClick={() => setTheme({ ...theme, socialColorType: 'custom' })}
                                                className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${theme.socialColorType === 'custom' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}
                                            >
                                                Custom
                                            </button>
                                        </div>
                                    </div>

                                    {theme.socialColorType === 'custom' && (
                                        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="relative group">
                                                <input
                                                    id="social-custom-color"
                                                    name="social-custom-color"
                                                    type="color"
                                                    value={theme.socialCustomColor || '#ffffff'}
                                                    onChange={(e) => setTheme({ ...theme, socialCustomColor: e.target.value })}
                                                    className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 cursor-pointer overflow-hidden"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="social-custom-color-hex" className="text-[10px] font-black uppercase tracking-widest text-white/40">Custom Hex</label>
                                                <input
                                                    id="social-custom-color-hex"
                                                    name="social-custom-color-hex"
                                                    type="text"
                                                    value={theme.socialCustomColor || '#ffffff'}
                                                    onChange={(e) => setTheme({ ...theme, socialCustomColor: e.target.value })}
                                                    className="bg-transparent border-none text-xl font-black uppercase tracking-tighter text-white/90 outline-none w-32"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Typography & Interaction */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6 shadow-xl shadow-black/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10">
                                                <Type size={12} className="text-indigo-400" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Typography</span>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <label className="text-xs font-bold text-white/60">Font Family</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {FONTS.map(f => (
                                                    <button
                                                        key={f}
                                                        onClick={() => setTheme({ ...theme, socialFont: f })}
                                                        className={`px-3 py-2.5 rounded-xl text-[10px] font-bold border transition-all ${theme.socialFont === f ? 'bg-indigo-500/10 border-indigo-500/30 text-white shadow-lg' : 'bg-white/3 border-white/5 text-white/40 hover:text-white/60'}`}
                                                        style={{ fontFamily: f }}
                                                    >
                                                        {f}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <label className="text-xs font-bold text-white/60">Text Weight</label>
                                            <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                                                {[400, 700, 900].map(weight => (
                                                    <button
                                                        key={weight}
                                                        onClick={() => setTheme({ ...theme, socialTextWeight: weight })}
                                                        className={`flex-1 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${theme.socialTextWeight === weight ? 'bg-white/10 text-white shadow-sm' : 'text-white/30 hover:text-white/50'}`}
                                                    >
                                                        {weight === 400 ? 'Regular' : weight === 700 ? 'Bold' : 'Black'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6 shadow-xl shadow-black/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/10">
                                                <Zap size={12} className="text-orange-400" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Interactions</span>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <label className="text-xs font-bold text-white/60">Hover Animation</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {[
                                                    { id: 'none', label: 'None', icon: Square },
                                                    { id: 'lift', label: 'Lift', icon: ArrowUp },
                                                    { id: 'scale', label: 'Zoom', icon: LayoutGrid },
                                                    { id: 'glow', label: 'Glow', icon: Zap }
                                                ].map(hover => (
                                                    <button
                                                        key={hover.id}
                                                        onClick={() => setTheme({ ...theme, socialHover: hover.id })}
                                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${theme.socialHover === hover.id ? 'bg-orange-500/10 border-orange-500/30 text-white shadow-lg shadow-orange-500/5' : 'bg-white/3 border-white/5 text-white/40 hover:text-white/60'}`}
                                                    >
                                                        <hover.icon size={12} className={theme.socialHover === hover.id ? 'text-orange-400' : ''} />
                                                        {hover.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-white/5">
                                            <SelectField
                                                label="Active Animation"
                                                value={theme.socialAnimation || 'none'}
                                                onChange={(e) => setTheme({ ...theme, socialAnimation: e.target.value })}
                                            >
                                                {ANIMATION_OPTIONS.map(opt => (
                                                    <option key={opt.id} value={opt.id} className="bg-[#121212]">{opt.label}</option>
                                                ))}
                                            </SelectField>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 px-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Platform Links</span>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {PLATFORMS.map((p) => {
                                        const currentSocial = socials.find(s => s.platform === p.id);
                                        const Icon = p.icon;
                                        return (
                                            <div key={p.id} className="group relative flex flex-col gap-3 p-6 rounded-3xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all shadow-xl shadow-black/5">
                                                <div className="flex items-center justify-between px-1">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-xl bg-white/2 ${p.color} border border-white/5 group-hover:bg-white/5 transition-colors shadow-inner`}>
                                                            <Icon size={16} />
                                                        </div>
                                                        <label htmlFor={`social-${p.id}`} className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-purple-400 transition-colors">
                                                            {p.name}
                                                        </label>
                                                    </div>
                                                    {currentSocial?.url && currentSocial.url.length > 0 && (
                                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 shadow-sm shadow-green-500/5">
                                                            <span className="text-[9px] font-black text-green-500/60 uppercase tracking-tighter">Active</span>
                                                            <Check size={10} className="text-green-500" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        id={`social-${p.id}`}
                                                        type="text"
                                                        value={currentSocial?.url || ''}
                                                        onChange={(e) => {
                                                            setSocials(prev => prev.map(s =>
                                                                s.platform === p.id ? { ...s, url: e.target.value } : s
                                                            ));
                                                        }}
                                                        placeholder={p.placeholder}
                                                        className="w-full bg-black/20 border border-white/5 rounded-2xl px-5 py-4 text-sm font-medium text-white outline-none focus:border-purple-500/20 focus:bg-black/30 transition-all placeholder:text-white/5"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                </main>
            </div>
            <ProfileImageModal
                isOpen={profileImageModalOpen}
                onClose={() => setProfileImageModalOpen(false)}
                profile={profile}
                setProfile={setProfile}
            />
        </>
    );
});

const SettingsEditor = memo(function SettingsEditor({ links, setLinks, profile, setProfile, theme, setTheme, socials, setSocials }) {
    const fileInputRef = useRef(null);

    const exportConfig = () => {
        const config = { links, profile, theme, socials };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "vlinktree_config.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const importConfig = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const config = JSON.parse(e.target.result);
                    if (config.links) setLinks(config.links);
                    if (config.profile) setProfile(config.profile);
                    if (config.theme) setTheme(config.theme);
                    if (config.socials) setSocials(config.socials);
                    alert('Configuration imported successfully!');
                } catch (error) {
                    console.error('Error importing config:', error);
                    alert('Error importing configuration. Invalid file format.');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-24 md:pb-0">
            <section className="p-12 rounded-[3rem] bg-linear-to-br from-purple-500/10 to-indigo-500/10 border border-white/5 flex flex-col items-center gap-8 text-center shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-purple-500 flex items-center justify-center shadow-2xl shadow-purple-500/20">
                    <Settings size={40} className="text-white" />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-black italic uppercase tracking-widest">Configuration</h2>
                    <p className="text-white/40 max-w-md">Save your current VLink Builder layout and data. You can re-import this file later or use it for backup.</p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-4">
                    <button
                        onClick={exportConfig}
                        className="px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-white/90 shadow-xl shadow-white/10 flex items-center gap-3 transition-transform active:scale-95"
                    >
                        <Download size={20} />
                        Export Config
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/10 shadow-xl shadow-black/20 flex items-center gap-3 transition-transform active:scale-95"
                    >
                        <Upload size={20} />
                        Import Config
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={importConfig}
                        accept=".json"
                        className="hidden"
                    />
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-4">
                    <span className="text-xs font-black uppercase tracking-widest text-white/20">Statistics</span>
                    <div className="text-2xl font-black">{links.length} ACTIVE LINKS</div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(links.length / 10) * 100}%` }}></div>
                    </div>
                </div>
                <div className="p-8 rounded-[2rem] bg-white/2 border border-white/5 flex flex-col gap-4">
                    <span className="text-xs font-black uppercase tracking-widest text-white/20">System Status</span>
                    <div className="text-2xl font-black flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        ALL SYSTEMS GO
                    </div>
                    <p className="text-[10px] text-white/20">VLink Builder 1.0 is running on local persistence.</p>
                </div>
            </div>

            {/* Suggestion Box & Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Suggestion Box */}
                <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Suggestion Box</h3>
                            <p className="text-xs text-white/40">Help us improve VLink Builder</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <textarea
                            id="suggestion-text"
                            placeholder="Type your suggestion here..."
                            className="w-full h-32 bg-black/20 border border-white/5 rounded-2xl p-4 text-sm text-white resize-none focus:outline-none focus:border-blue-500/30 transition-all placeholder:text-white/10"
                        ></textarea>
                        <button
                            onClick={() => {
                                const text = document.getElementById('suggestion-text').value;
                                if (text) {
                                    window.open(`mailto:alfarizd027@gmail.com?subject=Suggestion for VLink Builder&body=${encodeURIComponent(text)}`);
                                }
                            }}
                            className="py-3 rounded-xl bg-blue-500/10 text-blue-400 font-bold text-xs uppercase tracking-widest hover:bg-blue-500/20 transition-all"
                        >
                            Send Suggestion
                        </button>
                    </div>
                </div>

                {/* Support / Donation */}
                <div className="p-8 rounded-[2rem] bg-linear-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 flex flex-col gap-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex items-center gap-3 relative z-10">
                        <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-400">
                            <Heart size={24} className="fill-yellow-500/20" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Support Project</h3>
                            <p className="text-xs text-white/40">Traktir creator es teh 🍵</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-end gap-4 relative z-10">
                        <p className="text-sm text-white/60 leading-relaxed">
                            If you find VLink Builder useful, consider supporting the development. Your support helps keep the project alive!
                        </p>
                        <a
                            href="https://saweria.co/frd027"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-4 rounded-xl bg-yellow-500 text-black font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all text-center shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95"
                        >
                            <Zap size={16} className="fill-black" />
                            Traktir Es Teh
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default App;
