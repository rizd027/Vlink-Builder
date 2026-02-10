import React, { memo } from 'react';
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
import TikTok from './TikTok';

const ICON_MAP = {
    PanelLeft, Palette, Settings, LogOut, ExternalLink,
    Plus, Search, Github, Twitter, Instagram, Youtube, Linkedin,
    MoreHorizontal, Share2, PanelRight, Smartphone, Eye, Layout, Type,
    Image, Zap, Bell, QrCode, Globe, Clock, Shield, Trash2, Edit2, Link2,
    Check, ChevronRight, ChevronLeft, X, Star, BarChart2, Calendar, Lock, Upload, Copy, Heart,
    ArrowRight, GripVertical, Edit3, LayoutGrid, Monitor, ShoppingBag, Music,
    FileText, Lightbulb, Tag, Link: LinkIcon,
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
    History, Timer, TimerReset, Hourglass, FileVideo, FileAudio, FileImage, Camera,
    TikTok
};

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const LinkItem = memo(function LinkItem({ link, i, layoutType, theme }) {
    // ... rest of the component
    const getBackgroundAndBorder = () => {
        // ... (unchanged)
        if (theme.btnStyle === 'glass') {
            return {
                className: 'bg-white/5 backdrop-blur-md border border-white/10 shadow-lg',
                style: { backgroundColor: theme.btnColor ? `${theme.btnColor}1A` : 'rgba(255,255,255,0.05)' }
            };
        }

        if (theme.btnStyle === 'outline') {
            return {
                className: 'bg-transparent border-2',
                style: { borderColor: theme.btnColor || '#ffffff', color: theme.btnColor || '#ffffff' }
            };
        }

        let bgStyle = { backgroundColor: theme.btnColor || '#ffffff' };
        let bgClass = 'border-none';

        if (theme.btnColorType === 'gradient') {
            bgStyle = {
                backgroundImage: `linear-gradient(135deg, ${theme.btnColorGradient1 || '#8228d9'}, ${theme.btnColorGradient2 || '#6366f1'})`
            };
        } else if (theme.btnColorType === 'pattern') {
            if (theme.btnColorPattern === 'dots') {
                bgStyle = {
                    backgroundColor: theme.btnColor || '#ffffff',
                    backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1.5px, transparent 1.5px)`,
                    backgroundSize: '12px 12px'
                };
            } else if (theme.btnColorPattern === 'stripes') {
                bgStyle = {
                    backgroundColor: theme.btnColor || '#ffffff',
                    backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)`,
                    backgroundSize: '24px 24px'
                };
            } else if (theme.btnColorPattern === 'noise') {
                bgStyle = {
                    backgroundColor: theme.btnColor || '#ffffff',
                    backgroundImage: NOISE_TEXTURE,
                    backgroundBlendMode: 'overlay'
                };
            } else if (theme.btnColorPattern === 'custom' && theme.btnColorCustomPattern) {
                bgStyle = {
                    backgroundColor: theme.btnColor || '#ffffff',
                    backgroundImage: `url(${theme.btnColorCustomPattern})`,
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'overlay'
                };
            }
        }

        return { className: bgClass, style: bgStyle };
    };

    const { className: bgClassName, style: bgStyle } = getBackgroundAndBorder();

    const getTextStyle = () => {
        if (theme.btnStyle === 'outline') {
            return { color: 'inherit' };
        }

        if (theme.btnTextColorType === 'solid') {
            return { color: theme.btnTextColor || (theme.btnStyle === 'solid' ? '#000000' : '#ffffff') };
        }

        const textGradient = theme.btnTextColorType === 'gradient'
            ? `linear-gradient(135deg, ${theme.btnTextColorGradient1 || '#ffffff'}, ${theme.btnTextColorGradient2 || '#cbd5e1'})`
            : theme.btnTextColorType === 'pattern'
                ? theme.btnTextColorPattern === 'custom' && theme.btnTextColorCustomPattern
                    ? `url(${theme.btnTextColorCustomPattern}) center/cover`
                    : `radial-gradient(circle, ${theme.btnTextColor || '#ffffff'} 2px, transparent 2px)`
                : 'none';

        const patternSize = theme.btnTextColorType === 'pattern' ? '8px 8px' : 'auto';

        return {
            backgroundImage: textGradient,
            backgroundSize: patternSize,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent'
        };
    };

    const textStyle = getTextStyle();

    const getShadowStyle = () => {
        if (!theme.btnShadowType || theme.btnShadowType === 'none') return null;

        if (theme.btnShadowType === 'solid') return null;

        let shadowBg = { backgroundColor: theme.btnShadowColor || 'rgba(0,0,0,0.5)' };

        if (theme.btnShadowType === 'gradient') {
            shadowBg = {
                backgroundImage: `linear-gradient(135deg, ${theme.btnShadowColorGradient1 || '#000'}, ${theme.btnShadowColorGradient2 || '#000'})`
            };
        } else if (theme.btnShadowType === 'pattern') {
            if (theme.btnShadowPattern === 'dots') {
                shadowBg = {
                    backgroundImage: `radial-gradient(${theme.btnShadowColor} 1.5px, transparent 1.5px)`,
                    backgroundSize: '12px 12px'
                };
            } else if (theme.btnShadowPattern === 'stripes') {
                shadowBg = {
                    backgroundImage: `linear-gradient(45deg, ${theme.btnShadowColor} 25%, transparent 25%, transparent 50%, ${theme.btnShadowColor} 50%, ${theme.btnShadowColor} 75%, transparent 75%, transparent)`,
                    backgroundSize: '24px 24px'
                };
            } else if (theme.btnShadowPattern === 'noise') {
                shadowBg = {
                    backgroundImage: NOISE_TEXTURE,
                    backgroundBlendMode: 'overlay'
                };
            } else if (theme.btnShadowPattern === 'custom' && theme.btnShadowCustomPattern) {
                shadowBg = {
                    backgroundImage: `url(${theme.btnShadowCustomPattern})`,
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'overlay'
                };
            }
        }

        const spread = theme.btnShadowSpread || 0;
        return {
            position: 'absolute',
            zIndex: 5,
            top: `${-spread}px`,
            bottom: `${-spread}px`,
            left: `${-spread}px`,
            right: `${-spread}px`,
            transform: `translate(${theme.btnShadowX || 0}px, ${theme.btnShadowY || 0}px)`,
            filter: `blur(${theme.btnShadowBlur || 0}px)`,
            opacity: theme.btnShadowOpacity ?? 0.5,
            borderRadius: `${theme.btnRadius}px`,
            pointerEvents: 'none',
            ...shadowBg
        };
    };

    const shadowStyle = getShadowStyle();

    // Render Thumbnail or Icon
    const renderMedia = () => {
        if (link.thumbnail) {
            return (
                <div className={`shrink-0 overflow-hidden ${layoutType === 'grid' ? 'w-12 h-12 rounded-2xl mb-2' :
                    (layoutType === 'showcase' && i === 0) || layoutType === 'featured' ? 'w-20 h-20 rounded-2xl mr-4' :
                        'w-10 h-10 rounded-xl mr-3'
                    }`}>
                    <img src={link.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
            );
        }
        if (link.icon) {
            const Icon = ICON_MAP[link.icon] || ExternalLink;
            return (
                <div
                    className={`shrink-0 flex items-center justify-center bg-white/10 ${layoutType === 'grid' ? 'w-10 h-10 rounded-xl mb-2' :
                        (layoutType === 'showcase' && i === 0) || layoutType === 'featured' ? 'w-14 h-14 rounded-2xl mr-4' :
                            'w-9 h-9 rounded-lg mr-3'
                        }`}
                    style={{ color: theme.btnTextColorType === 'solid' ? theme.btnTextColor : '#ffffff' }}
                >
                    <Icon size={layoutType === 'grid' ? 20 : (layoutType === 'showcase' && i === 0) || layoutType === 'featured' ? 28 : Math.max(16, (theme.btnHeight || 14) * 1.2)} />
                </div>
            );
        }
        return null;
    };

    const getInteractionEffects = () => {
        const hoverEffect = theme.btnHoverEffect || 'lift';
        const pressEffect = theme.btnPressEffect || 'push';

        // Base transition - shorter for responsiveness
        let baseClasses = 'transition-all duration-150 ease-out';
        let hoverClasses = '';
        let activeClasses = '';

        // Hover effects
        switch (hoverEffect) {
            case 'lift':
                hoverClasses = 'hover:-translate-y-1.5';
                break;
            case 'scale':
                hoverClasses = 'hover:scale-[1.03]';
                break;
            case 'glow':
                hoverClasses = 'hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]';
                break;
            case 'shine':
                hoverClasses = '';
                break;
            case 'none':
                hoverClasses = '';
                break;
        }

        // Press effects
        switch (pressEffect) {
            case 'push':
                activeClasses = 'active:scale-95';
                break;
            case 'inset':
                activeClasses = 'active:brightness-75 active:scale-[0.96]';
                break;
            case 'none':
                activeClasses = '';
                break;
        }

        return {
            classes: `${baseClasses} ${hoverClasses} ${activeClasses}`.trim(),
            hoverEffect,
            pressEffect
        };
    };

    const interactionEffects = getInteractionEffects();

    return (
        <div
            className={`relative ${layoutType === 'carousel' ? 'min-w-[85%] snap-center' : ''}`}
            style={{
                width: layoutType !== 'grid' && layoutType !== 'carousel' ? `${theme.btnWidth || 100}%` : '100%',
                marginLeft: layoutType !== 'grid' && layoutType !== 'carousel' ? 'auto' : undefined,
                marginRight: layoutType !== 'grid' && layoutType !== 'carousel' ? 'auto' : undefined,
            }}
        >
            {shadowStyle && (
                <div
                    className={theme.btnShadowAnimation && theme.btnShadowAnimation !== 'none' ? `animate-${theme.btnShadowAnimation}` : ''}
                    style={shadowStyle}
                />
            )}
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-between overflow-hidden z-10
                    w-full
                    ${(layoutType === 'showcase' && i === 0) || layoutType === 'featured' ? 'p-4 min-h-[100px]' : ''}
                    ${layoutType === 'grid' ? 'flex-col items-center gap-1 p-4 aspect-square justify-center text-center' : ''}
                    ${bgClassName}
                    ${interactionEffects.classes}
                    ${theme.btnAnimation && theme.btnAnimation !== 'none' ? `animate-${theme.btnAnimation}` : ''}
                `}
                style={{
                    padding: (layoutType === 'showcase' && i === 0) || layoutType === 'featured' || layoutType === 'grid' ? undefined : `${(theme.btnHeight || 14) * 0.85}px 12px`,
                    width: '100%',
                    borderRadius: `${theme.btnRadius}px`,
                    boxShadow: theme.btnShadowType === 'solid' && theme.btnShadowColor
                        ? `${theme.btnShadowX || 0}px ${theme.btnShadowY || 0}px 0px ${theme.btnShadowSpread || 0}px ${theme.btnShadowColor}`
                        : 'none',
                    ...bgStyle
                }}
            >
                {theme.btnHoverEffect === 'shine' && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]" style={{ zIndex: 50 }}>
                        <div
                            className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine"
                            style={{
                                width: '100%',
                                height: '100%',
                                left: 0,
                                top: 0
                            }}
                        />
                    </div>
                )}

                {link.priority && (
                    <div
                        className="absolute inset-x-0 bottom-0 h-1 bg-white/30 z-0 pointer-events-none"
                        style={{ background: `linear-gradient(90deg, transparent, ${theme.btnTextColor || '#fff'}, transparent)` }}
                    />
                )}

                <div className={`flex flex-1 ${layoutType === 'grid' ? 'flex-col justify-center items-center' : 'flex-row items-center'} ${(layoutType === 'featured' && !link.thumbnail && !link.icon) ? 'justify-center text-center' : ''}`}>
                    {renderMedia()}
                    <div className={`flex flex-col ${layoutType === 'grid' ? 'items-center' : 'flex-1 min-w-0 pr-8'} ${(layoutType === 'featured' && !link.thumbnail && !link.icon) ? 'items-center' : ''}`}>
                        <span
                            className={`transition-all truncate ${(layoutType === 'showcase' && i === 0) || layoutType === 'featured' ? 'text-lg leading-tight' : layoutType === 'grid' ? 'text-[11px] leading-tight line-clamp-2 mt-1' : 'text-sm'}`}
                            style={{
                                ...textStyle,
                                fontFamily: theme.btnFont || 'Inter',
                                fontWeight: theme.btnTextWeight || 600,
                                textTransform: theme.btnTextTransform || 'none',
                                fontSize: (layoutType === 'showcase' && i === 0) || layoutType === 'featured' ? undefined : layoutType === 'grid' ? '11px' : `${theme.btnFontSize || 14}px`
                            }}
                        >
                            {link.title}
                        </span>
                        {link.url && layoutType !== 'grid' && (
                            <span
                                className={`transition-all opacity-60 font-medium truncate ${(layoutType === 'showcase' && i === 0) || layoutType === 'featured' ? 'text-xs mt-1' : ''}`}
                                style={{
                                    ...textStyle,
                                    fontFamily: theme.btnFont || 'Inter',
                                    fontSize: (layoutType === 'showcase' && i === 0) || layoutType === 'featured' ? undefined : `${Math.max(10, (theme.btnFontSize || 14) * 0.85)}px`
                                }}
                            >
                                {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                            </span>
                        )}
                    </div>
                </div>

                {layoutType !== 'grid' && (
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors z-20 shrink-0">
                        <ChevronRight size={layoutType === 'featured' ? 18 : Math.max(10, (theme.btnHeight || 14) * 0.75)} style={{ color: theme.btnTextColorType === 'solid' ? theme.btnTextColor : '#ffffff' }} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}
            </a>
        </div >

    );
});

export default LinkItem;
