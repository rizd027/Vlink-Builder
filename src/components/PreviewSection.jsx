import React, { memo } from 'react';
import {
    Instagram, Twitter, Youtube, Github, Linkedin, Mail, Heart, Zap, User,
    Smartphone, Tablet, Monitor
} from 'lucide-react';
import TikTok from './TikTok';
import { PLATFORMS } from '../data/constants';
import LinkItem from './LinkItem';

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const DEVICE_CONFIG = {
    mobile: {
        width: 320,
        height: 640,
        scale: 0.75, // Reduced to 0.75 as requested
        frameClass: 'rounded-[3.5rem] border-12 border-[#121212]',
        bezelClass: 'rounded-[2.7rem]'
    },
    tablet: {
        width: 1024,
        height: 1024,
        scale: 0.50,
        frameClass: 'rounded-[2.5rem] border-[14px] border-[#181818]',
        bezelClass: 'rounded-[1.8rem]'
    },
    desktop: {
        width: 1280,
        height: 800,
        scale: 0.5, // Adjusted from 0.55
        frameClass: 'rounded-xl border-[10px] border-[#222222]',
        bezelClass: 'rounded-lg'
    }
};

const PreviewSection = memo(({ theme, profile, links, socials, layoutType, previewDevice = 'mobile', setPreviewDevice, isEditorHidden, isMobileView }) => {
    const config = DEVICE_CONFIG[previewDevice] || DEVICE_CONFIG.mobile;

    return (
        <section className={`flex ${isMobileView || isEditorHidden ? 'flex-1 justify-center' : 'hidden xl:flex'} ${isMobileView ? 'h-screen overflow-hidden' : ''} ${!isMobileView && !isEditorHidden ? (previewDevice === 'mobile' ? 'w-[380px]' : (previewDevice === 'tablet' ? 'w-[520px]' : 'w-[750px]')) : ''} border-l border-white/5 flex-col items-center justify-center py-8 px-4 md:px-6 bg-transparent relative z-10 transition-all duration-500 ease-in-out`}>
            {/* Device Switcher */}
            <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl mb-8 backdrop-blur-md shadow-xl z-70">
                {[
                    { id: 'mobile', icon: Smartphone },
                    { id: 'tablet', icon: Tablet },
                    { id: 'desktop', icon: Monitor }
                ].map(device => {
                    const Icon = device.icon;
                    return (
                        <button
                            key={device.id}
                            onClick={() => setPreviewDevice?.(device.id)}
                            className={`p-2 rounded-xl transition-all duration-300 ${previewDevice === device.id ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                        >
                            <Icon size={18} />
                        </button>
                    );
                })}
            </div>

            <div className="flex-1 flex items-start justify-center w-full">
                {/* Device Frame */}
                <div
                    className={`relative bg-black shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${config.frameClass}`}
                    style={{
                        width: config.width,
                        height: config.height,
                        transform: `scale(${config.scale})`,
                        transformOrigin: 'top center',
                        marginBottom: `-${config.height * (1 - config.scale)}px`
                    }}
                >
                    {/* Bezel Finishing */}
                    <div className={`absolute inset-0 border border-white/10 pointer-events-none z-50 ${config.bezelClass}`}></div>

                    {/* Dynamic Island / Header Detail - Only for mobile */}
                    {previewDevice === 'mobile' && (
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-3xl z-60 flex items-center justify-center border border-white/5 shadow-md">
                            <div className="w-1 h-1 rounded-full bg-blue-500/40 absolute left-3"></div>
                            <div className="w-8 h-2 rounded-full bg-[#121212] absolute right-4"></div>
                        </div>
                    )}

                    {/* Desktop Browser Bar */}
                    {previewDevice === 'desktop' && (
                        <div className="h-10 bg-[#1a1a1a] border-b border-white/5 flex items-center px-4 gap-2 z-60">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="flex-1 max-w-md mx-auto h-6 bg-black/40 rounded-lg flex items-center px-3">
                                <div className="text-[10px] text-white/20 font-mono">vlink.tree/username</div>
                            </div>
                        </div>
                    )}

                    {/* Tablet / Mobile Home Button */}
                    {(previewDevice === 'mobile' || previewDevice === 'tablet') && (
                        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 ${previewDevice === 'mobile' ? 'w-24 h-1' : 'w-12 h-1'} bg-white/20 rounded-full z-60`}></div>
                    )}

                    {/* Scrollable Content inside Device */}
                    <div
                        className="flex-1 overflow-y-auto custom-scrollbar relative"
                        style={{
                            fontFamily: theme.pageFont || theme.fontFamily || 'Inter',
                            background: theme.wallpaperStyle === 'fill' ? theme.bg :
                                theme.wallpaperStyle === 'gradient' ? (
                                    theme.gradientDirection === 'radial' ? `radial-gradient(circle at center, ${theme.gradientColor1 || '#FF512F'}, ${theme.gradientColor2 || '#DD2476'})` :
                                        theme.gradientDirection === 'linear-up' ? `linear-gradient(0deg, ${theme.gradientColor1 || '#FF512F'} 0%, ${theme.gradientColor2 || '#DD2476'} 100%)` :
                                            `linear-gradient(180deg, ${theme.gradientColor1 || '#FF512F'} 0%, ${theme.gradientColor2 || '#DD2476'} 100%)`
                                ) : theme.wallpaperStyle === 'blur' ? theme.blurColor || theme.bg :
                                    theme.wallpaperStyle === 'pattern' ? (theme.patternBackgroundColor || theme.bg || '#000000') : 'transparent'
                        }}
                    >
                        {/* Background Video - No Blur */}
                        {theme.wallpaperStyle === 'video' && theme.backgroundVideo && (
                            <video
                                autoPlay
                                muted
                                loop
                                className="absolute inset-0 w-full h-full object-cover"
                                src={theme.backgroundVideo}
                                style={{
                                    opacity: theme.videoOpacity ?? 1,
                                    filter: theme.videoBlur ? `blur(${theme.videoBlur}px)` : 'none'
                                }}
                            />
                        )}

                        {/* Background Image - No Blur */}
                        {theme.wallpaperStyle === 'image' && theme.backgroundImage && (
                            <img
                                src={theme.backgroundImage}
                                alt="Wallpaper"
                                loading="lazy"
                                decoding="async"
                                width="320"
                                height="640"
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                    opacity: theme.imageOpacity ?? 1,
                                    filter: theme.imageBlur ? `blur(${theme.imageBlur}px)` : 'none'
                                }}
                            />
                        )}

                        {/* Blur Style Overlay */}
                        {theme.wallpaperStyle === 'blur' && (
                            <div className="absolute inset-0 overflow-hidden">
                                <div
                                    className="absolute inset-[-20%] bg-white/20"
                                    style={{
                                        filter: `blur(${theme.blurIntensity || 20}px)`,
                                        backgroundColor: theme.blurColor ? `${theme.blurColor}33` : 'rgba(255,255,255,0.2)'
                                    }}
                                />
                            </div>
                        )}

                        {/* Pattern Overlay */}
                        {theme.wallpaperStyle === 'pattern' && (() => {
                            const patternType = theme.patternType || 'dots';
                            const color = theme.patternColor || '#ffffff';

                            let backgroundStyle = {};

                            switch (patternType) {
                                case 'dots':
                                    backgroundStyle = {
                                        backgroundImage: `radial-gradient(circle, ${color} 1.5px, transparent 1.5px)`,
                                        backgroundSize: '20px 20px'
                                    };
                                    break;
                                case 'stripes':
                                    backgroundStyle = {
                                        backgroundImage: `repeating-linear-gradient(45deg, ${color} 0px, ${color} 2px, transparent 2px, transparent 8px)`,
                                    };
                                    break;
                                case 'grid':
                                    backgroundStyle = {
                                        backgroundImage: `
                                        linear-gradient(to right, ${color} 1px, transparent 1px),
                                        linear-gradient(to bottom, ${color} 1px, transparent 1px)
                                    `,
                                        backgroundSize: '20px 20px'
                                    };
                                    break;
                                case 'diagonal':
                                    backgroundStyle = {
                                        backgroundImage: `repeating-linear-gradient(45deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 8px)`,
                                    };
                                    break;
                                case 'waves':
                                    backgroundStyle = {
                                        backgroundImage: `
                                        radial-gradient(circle at 100% 50%, transparent 8px, ${color} 8px, ${color} 10px, transparent 10px),
                                        radial-gradient(circle at 0% 50%, transparent 8px, ${color} 8px, ${color} 10px, transparent 10px)
                                    `,
                                        backgroundSize: '30px 30px',
                                        backgroundPosition: '0 0, 15px 15px'
                                    };
                                    break;
                                case 'circles':
                                    backgroundStyle = {
                                        backgroundImage: `radial-gradient(circle, ${color} 3px, transparent 3px)`,
                                        backgroundSize: '30px 30px'
                                    };
                                    break;
                                case 'hexagon':
                                    backgroundStyle = {
                                        backgroundImage: `
                                        radial-gradient(circle at 50% 0, ${color} 18%, transparent 18%),
                                        radial-gradient(circle at 6.7% 75%, ${color} 18%, transparent 18%),
                                        radial-gradient(circle at 93.3% 75%, ${color} 18%, transparent 18%)
                                    `,
                                        backgroundSize: '30px 52px',
                                        backgroundPosition: '0 0, 0 0, 0 0'
                                    };
                                    break;
                                case 'triangles':
                                    backgroundStyle = {
                                        backgroundImage: `
                                        linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}),
                                        linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}),
                                        linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}),
                                        linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color})
                                    `,
                                        backgroundSize: '40px 70px',
                                        backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px'
                                    };
                                    break;
                                case 'zigzag':
                                    backgroundStyle = {
                                        backgroundImage: `
                                        linear-gradient(135deg, ${color} 25%, transparent 25%),
                                        linear-gradient(225deg, ${color} 25%, transparent 25%),
                                        linear-gradient(45deg, ${color} 25%, transparent 25%),
                                        linear-gradient(315deg, ${color} 25%, transparent 25%)
                                    `,
                                        backgroundSize: '20px 20px',
                                        backgroundPosition: '10px 0, 10px 0, 0 0, 0 0'
                                    };
                                    break;
                                case 'checkerboard':
                                    backgroundStyle = {
                                        backgroundImage: `
                                        linear-gradient(45deg, ${color} 25%, transparent 25%),
                                        linear-gradient(-45deg, ${color} 25%, transparent 25%),
                                        linear-gradient(45deg, transparent 75%, ${color} 75%),
                                        linear-gradient(-45deg, transparent 75%, ${color} 75%)
                                    `,
                                        backgroundSize: '20px 20px',
                                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                                    };
                                    break;
                                case 'custom':
                                    if (theme.customPatternImage) {
                                        backgroundStyle = {
                                            backgroundImage: `url(${theme.customPatternImage})`,
                                            backgroundSize: '100px 100px',
                                            backgroundRepeat: 'repeat'
                                        };
                                    } else {
                                        // Fallback to dots if no custom image
                                        backgroundStyle = {
                                            backgroundImage: `radial-gradient(circle, ${color} 1.5px, transparent 1.5px)`,
                                            backgroundSize: '20px 20px'
                                        };
                                    }
                                    break;
                                default:
                                    backgroundStyle = {
                                        backgroundImage: `radial-gradient(circle, ${color} 1.5px, transparent 1.5px)`,
                                        backgroundSize: '20px 20px'
                                    };
                            }

                            return (
                                <div className="absolute inset-0" style={{
                                    ...backgroundStyle,
                                    opacity: theme.patternOpacity ?? 0.1,
                                    filter: theme.patternBlur ? `blur(${theme.patternBlur}px)` : 'none'
                                }} />
                            );
                        })()}

                        <div className={`relative z-10 flex flex-col items-center px-6 py-10 gap-5 min-h-full mx-auto ${previewDevice === 'desktop' ? 'max-w-4xl' : previewDevice === 'tablet' ? 'max-w-2xl' : 'w-full'}`}>
                            {/* Profile Area */}
                            <div className={`flex flex-col items-center w-full transition-all duration-300 ${profile.headerLayout === 'hero' ? 'gap-0 mb-3' : 'gap-3.5'}`}>
                                <div className={`relative ${profile.headerLayout === 'hero' ? 'rounded-b-none' : 'rounded-full'} ${theme.headerAnimation && theme.headerAnimation !== 'none' ? `animate-${theme.headerAnimation}` : ''} ${theme.headerAnimation === 'sweep' ? 'overflow-hidden' : ''} ${profile.showAvatar === false ? 'hidden' : ''}`}>
                                    {/* Removed heavy blur-xl behind avatar */}
                                    {profile.avatar ? (
                                        <img
                                            src={profile.avatar}
                                            alt="Avatar"
                                            loading="lazy"
                                            decoding="async"
                                            width="112"
                                            height="112"
                                            style={{
                                                width: `${96 * ((typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'large' ? 120 : (profile.headerSize === 'small' ? 80 : 100))) / 100)}px`,
                                                height: `${96 * ((typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'large' ? 120 : (profile.headerSize === 'small' ? 80 : 100))) / 100)}px`
                                            }}
                                            className={`rounded-full border-2 border-white/10 shadow-md relative z-10 object-cover 
                                                ${profile.headerLayout === 'hero' ? 'rounded-b-none border-b-0' : ''}
                                            `}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <div
                                        style={{
                                            width: `${96 * ((typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'large' ? 120 : (profile.headerSize === 'small' ? 80 : 100))) / 100)}px`,
                                            height: `${96 * ((typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'large' ? 120 : (profile.headerSize === 'small' ? 80 : 100))) / 100)}px`
                                        }}
                                        className={`rounded-full border-2 border-white/10 shadow-md relative z-10 flex items-center justify-center bg-white/5 
                                            ${profile.headerLayout === 'hero' ? 'rounded-b-none border-b-0' : ''}
                                            ${profile.avatar ? 'hidden' : 'flex'}
                                        `}>
                                        <User size={40 * ((typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'large' ? 120 : (profile.headerSize === 'small' ? 80 : 100))) / 100)} className="text-white/20" />
                                    </div>
                                </div>
                                <div className={`flex flex-col items-center gap-1 text-center px-3 
                                    ${profile.headerLayout === 'hero' ? 'bg-black/20 w-full py-6 rounded-2xl -mt-2 border border-white/5' : ''}
                                `}>
                                    {theme.titleStyle === 'text' ? (
                                        <h2
                                            className={`${theme.titleAnimation && theme.titleAnimation !== 'none' ? (theme.titleAnimation === 'sweep' ? 'animate-sweep-text' : `animate-${theme.titleAnimation}`) : ''}`}
                                            style={{
                                                fontFamily: theme.titleFont || 'Inter',
                                                fontWeight: theme.titleWeight || 700,
                                                textTransform: theme.titleTransform || 'none',
                                                fontSize: theme.titleSize ? `${theme.titleSize}px` : `${1.25 * ((typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'large' ? 120 : (profile.headerSize === 'small' ? 80 : 100))) / 100)}rem`,
                                                ...(theme.titleColorType === 'gradient' ? {
                                                    backgroundImage: `linear-gradient(135deg, ${theme.titleColorGradient1 || '#8228d9'}, ${theme.titleColorGradient2 || '#6366f1'})`,
                                                    WebkitBackgroundClip: 'text',
                                                    backgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    color: 'transparent'
                                                } : theme.titleColorType === 'pattern' ? {
                                                    backgroundImage: theme.titleColorPattern === 'dots'
                                                        ? `radial-gradient(circle, ${theme.titleColor || '#ffffff'} 1px, transparent 1px)`
                                                        : theme.titleColorPattern === 'stripes'
                                                            ? `linear-gradient(45deg, ${theme.titleColor || '#ffffff'} 25%, transparent 25%, transparent 50%, ${theme.titleColor || '#ffffff'} 50%, ${theme.titleColor || '#ffffff'} 75%, transparent 75%, transparent)`
                                                            : theme.titleColorPattern === 'custom' && theme.titleColorCustomPattern
                                                                ? `url(${theme.titleColorCustomPattern})`
                                                                : 'none',
                                                    backgroundSize: theme.titleColorPattern === 'dots' ? '6px 6px' : theme.titleColorPattern === 'stripes' ? '10px 10px' : 'cover',
                                                    WebkitBackgroundClip: 'text',
                                                    backgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    color: 'transparent'
                                                } : {
                                                    color: theme.titleColor || '#ffffff'
                                                })
                                            }}
                                        >
                                            {profile.username}
                                        </h2>
                                    ) : (
                                        <div
                                            style={{
                                                width: `${110 * ((typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'large' ? 120 : (profile.headerSize === 'small' ? 80 : 100))) / 100)}px`,
                                                height: `${36 * ((typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'large' ? 120 : (profile.headerSize === 'small' ? 80 : 100))) / 100)}px`
                                            }}
                                            className={`bg-white/20 rounded-lg p-2 flex items-center justify-center`}
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Your Logo</span>
                                        </div>
                                    )}
                                </div>
                                <p
                                    className={`leading-relaxed opacity-80 ${theme.pageAnimation && theme.pageAnimation !== 'none' ? (theme.pageAnimation === 'sweep' ? 'animate-sweep-text' : `animate-${theme.pageAnimation}`) : ''} ${profile.showBio === false ? 'hidden' : ''}`}
                                    style={{
                                        fontFamily: theme.pageFont || 'Inter',
                                        fontWeight: theme.pageWeight || 400,
                                        textTransform: theme.pageTransform || 'none',
                                        fontSize: theme.pageSize ? `${theme.pageSize}px` : `${0.875 * ((typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'large' ? 120 : (profile.headerSize === 'small' ? 80 : 100))) / 100)}rem`,
                                        ...(theme.pageColorType === 'gradient' ? {
                                            backgroundImage: `linear-gradient(135deg, ${theme.pageColorGradient1 || '#8228d9'}, ${theme.pageColorGradient2 || '#6366f1'})`,
                                            WebkitBackgroundClip: 'text',
                                            backgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            color: 'transparent'
                                        } : theme.pageColorType === 'pattern' ? {
                                            backgroundImage: theme.pageColorPattern === 'dots'
                                                ? `radial-gradient(circle, ${theme.pageColor || theme.bioColor || 'rgba(255,255,255,0.7)'} 1px, transparent 1px)`
                                                : theme.pageColorPattern === 'stripes'
                                                    ? `linear-gradient(45deg, ${theme.pageColor || theme.bioColor || 'rgba(255,255,255,0.7)'} 25%, transparent 25%, transparent 50%, ${theme.pageColor || theme.bioColor || 'rgba(255,255,255,0.7)'} 50%, ${theme.pageColor || theme.bioColor || 'rgba(255,255,255,0.7)'} 75%, transparent 75%, transparent)`
                                                    : theme.pageColorPattern === 'custom' && theme.pageColorCustomPattern
                                                        ? `url(${theme.pageColorCustomPattern})`
                                                        : 'none',
                                            backgroundSize: theme.pageColorPattern === 'dots' ? '6px 6px' : theme.pageColorPattern === 'stripes' ? '10px 10px' : 'cover',
                                            WebkitBackgroundClip: 'text',
                                            backgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            color: 'transparent'
                                        } : {
                                            color: theme.pageColor || theme.bioColor || 'rgba(255,255,255,0.7)'
                                        })
                                    }}
                                >
                                    {profile.bio}
                                </p>
                            </div>

                            {/* Social Icons - Top Position */}
                            {theme.socialPosition === 'top' && (
                                <div
                                    className={`flex flex-wrap w-full ${theme.socialAlignment === 'left' ? 'justify-start' : theme.socialAlignment === 'right' ? 'justify-end' : 'justify-center'}`}
                                    style={{ gap: `${(theme.socialSpacing || 16) * 0.75}px`, marginTop: '4px' }}
                                >
                                    {socials.filter(s => s.url).map(social => {
                                        const platform = social.platform;
                                        const Icon = platform === 'instagram' ? Instagram :
                                            platform === 'twitter' ? Twitter :
                                                platform === 'youtube' ? Youtube :
                                                    platform === 'github' ? Github :
                                                        platform === 'linkedin' ? Linkedin :
                                                            platform === 'tiktok' ? TikTok :
                                                                Mail;
                                        const pData = PLATFORMS.find(p => p.id === platform);
                                        const color = theme.socialColorType === 'brand' && pData ? pData.color.replace('text-', '') :
                                            theme.socialColorType === 'custom' ? theme.socialCustomColor : (theme.pageColor || '#ffffff');

                                        const hoverClass = theme.socialHover === 'lift' ? 'hover:-translate-y-1' :
                                            theme.socialHover === 'scale' ? 'hover:scale-110' :
                                                theme.socialHover === 'glow' ? 'hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : '';

                                        return (
                                            <a
                                                key={platform}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: theme.socialColorType === 'brand' ? undefined : color,
                                                    fontFamily: theme.socialFont || 'Inter',
                                                    fontWeight: theme.socialTextWeight || 700
                                                }}
                                                className={`opacity-70 hover:opacity-100 transition-all duration-300 flex items-center gap-2 transform-gpu ${hoverClass} ${theme.socialColorType === 'brand' ? (pData?.color || '') : ''} ${theme.socialAnimation && theme.socialAnimation !== 'none' ? (theme.socialAnimation === 'sweep' ? 'animate-sweep' : `animate-${theme.socialAnimation}`) : ''}`}
                                            >
                                                <Icon size={theme.socialSize || 18} strokeWidth={2} />
                                                {theme.socialStyle === 'icon-text' && (
                                                    <span className={`text-[10px] uppercase tracking-widest ${theme.socialAnimation === 'sweep' ? 'animate-sweep-text' : ''}`}>{platform}</span>
                                                )}
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Links Area */}
                        <div className={`w-full mt-2 ${layoutType === 'grid' ? 'grid grid-cols-2' :
                            layoutType === 'carousel' ? 'flex overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar' :
                                'flex flex-col'
                            }`}
                            style={{ gap: `${theme.btnSpacing || 12}px` }}
                        >
                            {links.filter(l => l.active).map((link, i) => (
                                <LinkItem key={link.id} link={link} i={i} layoutType={link.layout || layoutType} theme={theme} />
                            ))}
                        </div>

                        {/* Social Icons - Bottom Position */}
                        {theme.socialPosition === 'bottom' && (
                            <div
                                className={`flex flex-wrap mt-auto pt-5 w-full border-t border-white/5 ${theme.socialAlignment === 'left' ? 'justify-start' : theme.socialAlignment === 'right' ? 'justify-end' : 'justify-center'}`}
                                style={{ gap: `${(theme.socialSpacing || 16) * 0.75}px` }}
                            >
                                {socials.filter(s => s.url).map(social => {
                                    const platform = social.platform;
                                    const Icon = platform === 'instagram' ? Instagram :
                                        platform === 'twitter' ? Twitter :
                                            platform === 'youtube' ? Youtube :
                                                platform === 'github' ? Github :
                                                    platform === 'linkedin' ? Linkedin :
                                                        platform === 'tiktok' ? TikTok :
                                                            Mail;
                                    const pData = PLATFORMS.find(p => p.id === platform);
                                    const color = theme.socialColorType === 'brand' && pData ? pData.color.replace('text-', '') :
                                        theme.socialColorType === 'custom' ? theme.socialCustomColor : (theme.pageColor || '#ffffff');

                                    const hoverClass = theme.socialHover === 'lift' ? 'hover:-translate-y-1' :
                                        theme.socialHover === 'scale' ? 'hover:scale-110' :
                                            theme.socialHover === 'glow' ? 'hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : '';

                                    return (
                                        <a
                                            key={platform}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: theme.socialColorType === 'brand' ? undefined : color,
                                                fontFamily: theme.socialFont || 'Inter',
                                                fontWeight: theme.socialTextWeight || 700
                                            }}
                                            className={`opacity-70 hover:opacity-100 transition-all duration-300 flex items-center gap-2 transform-gpu ${hoverClass} ${theme.socialColorType === 'brand' ? (pData?.color || '') : ''} ${theme.socialAnimation && theme.socialAnimation !== 'none' ? (theme.socialAnimation === 'sweep' ? 'animate-sweep' : `animate-${theme.socialAnimation}`) : ''}`}
                                        >
                                            <Icon size={theme.socialSize || 20} strokeWidth={2} />
                                            {theme.socialStyle === 'icon-text' && (
                                                <span className={`text-[10px] uppercase tracking-widest ${theme.socialAnimation === 'sweep' ? 'animate-sweep-text' : ''}`}>{platform}</span>
                                            )}
                                        </a>
                                    );
                                })}
                            </div>
                        )}

                        {/* Minimalist Footer Preview */}
                        <div className="w-full flex flex-col gap-4 mt-2">
                            {/* Greeting Card Preview */}
                            {theme.showFooter && (() => {
                                // Background and Border Logic (Identical to LinkItem)
                                const getFooterBg = () => {
                                    if (theme.footerBtnStyle === 'glass') {
                                        return {
                                            className: 'bg-white/5 backdrop-blur-md border border-white/10 shadow-lg',
                                            style: { backgroundColor: theme.footerBtnColor ? `${theme.footerBtnColor}1A` : 'rgba(255,255,255,0.05)' }
                                        };
                                    }
                                    if (theme.footerBtnStyle === 'outline') {
                                        return {
                                            className: 'bg-transparent border-2',
                                            style: { borderColor: theme.footerBtnColor || '#ffffff' }
                                        };
                                    }
                                    let bgStyle = { backgroundColor: theme.footerBtnColor || '#ffffff' };
                                    if (theme.footerBtnColorType === 'gradient') {
                                        bgStyle = { backgroundImage: `linear-gradient(135deg, ${theme.footerBtnColorGradient1 || '#8228d9'}, ${theme.footerBtnColorGradient2 || '#6366f1'})` };
                                    } else if (theme.footerBtnColorType === 'pattern') {
                                        if (theme.footerBtnColorPattern === 'dots') {
                                            bgStyle = {
                                                backgroundColor: theme.footerBtnColor || '#ffffff',
                                                backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1.5px, transparent 1.5px)`,
                                                backgroundSize: '12px 12px'
                                            };
                                        } else if (theme.footerBtnColorPattern === 'stripes') {
                                            bgStyle = {
                                                backgroundColor: theme.footerBtnColor || '#ffffff',
                                                backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)`,
                                                backgroundSize: '24px 24px'
                                            };
                                        }
                                    }
                                    return { className: 'border-none', style: bgStyle };
                                };

                                // Text Style Logic
                                const getFooterTextStyle = (isDesc = false) => {
                                    const baseStyle = {
                                        fontFamily: theme.footerFont || 'Inter',
                                        fontWeight: theme.footerWeight || 400,
                                        textTransform: theme.footerTransform || 'none',
                                        fontSize: isDesc ? `${Math.max(10, (theme.footerFontSize || 12) * 0.9)}px` : `${theme.footerFontSize || 12}px`
                                    };

                                    if (theme.footerBtnTextColorType === 'solid') {
                                        const color = theme.footerBtnTextColor || (theme.footerBtnStyle === 'solid' ? '#000000' : '#ffffff');
                                        return { ...baseStyle, color: isDesc ? color + '99' : color };
                                    }
                                    const textGradient = theme.footerBtnTextColorType === 'gradient'
                                        ? `linear-gradient(135deg, ${theme.footerBtnTextColorGradient1 || '#ffffff'}, ${theme.footerBtnTextColorGradient2 || '#cbd5e1'})`
                                        : theme.footerBtnTextColorType === 'pattern'
                                            ? `radial-gradient(circle, ${theme.footerBtnTextColor || '#ffffff'} 2px, transparent 2px)`
                                            : 'none';
                                    const patternSize = theme.footerBtnTextColorType === 'pattern' ? '8px 8px' : 'auto';
                                    return {
                                        ...baseStyle,
                                        backgroundImage: textGradient,
                                        backgroundSize: patternSize,
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: 'transparent',
                                        opacity: isDesc ? 0.8 : 1
                                    };
                                };

                                // Shadow Logic
                                const getFooterShadowStyle = () => {
                                    if (!theme.footerShadowType || theme.footerShadowType === 'none') return null;
                                    if (theme.footerShadowType === 'solid') return null;

                                    let shadowBg = { backgroundColor: theme.footerShadowColor || 'rgba(0,0,0,0.5)' };
                                    if (theme.footerShadowType === 'gradient') {
                                        shadowBg = { backgroundImage: `linear-gradient(135deg, ${theme.footerShadowColorGradient1 || '#000'}, ${theme.footerShadowColorGradient2 || '#000'})` };
                                    } else if (theme.footerShadowType === 'pattern') {
                                        if (theme.footerShadowPattern === 'dots') {
                                            shadowBg = {
                                                backgroundImage: `radial-gradient(${theme.footerShadowColor} 1.5px, transparent 1.5px)`,
                                                backgroundSize: '12px 12px'
                                            };
                                        } else if (theme.footerShadowPattern === 'stripes') {
                                            shadowBg = {
                                                backgroundImage: `linear-gradient(45deg, ${theme.footerShadowColor} 25%, transparent 25%, transparent 50%, ${theme.footerShadowColor} 50%, ${theme.footerShadowColor} 75%, transparent 75%, transparent)`,
                                                backgroundSize: '24px 24px'
                                            };
                                        } else if (theme.footerShadowPattern === 'noise') {
                                            shadowBg = { backgroundImage: NOISE_TEXTURE, backgroundBlendMode: 'overlay' };
                                        } else if (theme.footerShadowPattern === 'custom' && theme.footerShadowCustomPattern) {
                                            shadowBg = { backgroundImage: `url(${theme.footerShadowCustomPattern})`, backgroundSize: 'cover', backgroundBlendMode: 'overlay' };
                                        }
                                    }

                                    const spread = theme.footerShadowSpread || 0;
                                    return {
                                        position: 'absolute',
                                        zIndex: 5,
                                        top: `${-spread}px`,
                                        bottom: `${-spread}px`,
                                        left: `${-spread}px`,
                                        right: `${-spread}px`,
                                        transform: `translate(${theme.footerShadowX || 0}px, ${theme.footerShadowY || 0}px)`,
                                        filter: `blur(${theme.footerShadowBlur || 0}px)`,
                                        opacity: theme.footerShadowOpacity ?? 0.5,
                                        borderRadius: `${theme.footerBtnRadius}px`,
                                        pointerEvents: 'none', ...shadowBg
                                    };
                                };

                                const { className: bgClass, style: bgStyle } = getFooterBg();
                                const shadowStyle = getFooterShadowStyle();

                                return (
                                    <div className="relative w-full">
                                        {shadowStyle && <div style={shadowStyle} />}
                                        <div
                                            className={`p-4 flex flex-col items-start text-left gap-1.5 relative overflow-hidden group z-10 ${bgClass} ${theme.footerAnimation && theme.footerAnimation !== 'none' ? (theme.footerAnimation === 'sweep' ? 'animate-sweep' : `animate-${theme.footerAnimation}`) : ''}`}
                                            style={{
                                                borderRadius: `${theme.footerBtnRadius}px`,
                                                boxShadow: theme.footerShadowType === 'solid' && theme.footerShadowColor
                                                    ? `${theme.footerShadowX || 0}px ${theme.footerShadowY || 0}px ${theme.footerShadowBlur || 0}px ${theme.footerShadowSpread || 0}px ${theme.footerShadowColor}${Math.round((theme.footerShadowOpacity ?? 0.5) * 255).toString(16).padStart(2, '0')}`
                                                    : 'none',
                                                ...bgStyle
                                            }}
                                        >
                                            <div className="flex items-center gap-2 relative z-10">
                                                <Heart size={12} className="text-purple-400 fill-purple-400/10 shrink-0" />
                                                <h3 className={`text-xs font-bold tracking-tight leading-tight ${theme.footerAnimation === 'sweep' ? 'animate-sweep-text' : ''}`} style={getFooterTextStyle()}>
                                                    {theme.footerGreetingTitle}
                                                </h3>
                                            </div>
                                            <p className={`text-[10px] font-medium leading-relaxed relative z-10 ${theme.footerAnimation === 'sweep' ? 'animate-sweep-text' : ''}`} style={getFooterTextStyle(true)}>
                                                {theme.footerGreetingDesc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Vlink Branding Preview - Minimalist */}
                            {theme.showVlink && (
                                <div className="flex flex-col items-center gap-2 mt-2">
                                    <div className="h-px w-8 bg-white/5"></div>
                                    <div className="flex items-center gap-1.5 opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-default">
                                        <span className="text-[10px] font-medium tracking-tight text-white/60">Made with</span>
                                        <span className="text-[10px] font-bold text-white">Vlink.id x rizddf</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section >
    );
});

export default PreviewSection;
