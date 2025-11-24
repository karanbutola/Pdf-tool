import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

/**
 * AdSense Display Ad Component
 * Responsive banner ad that adapts to different screen sizes
 */
export const DisplayAd = ({ slot = '1234567890', format = 'auto', responsive = true, style = {} }) => {
    useEffect(() => {
        try {
            if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    return (
        <Box
            sx={{
                textAlign: 'center',
                margin: '20px 0',
                minHeight: '100px',
                ...style,
            }}
        >
            <Typography
                variant="caption"
                sx={{
                    display: 'block',
                    color: '#64748b',
                    fontSize: '0.7rem',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}
            >
                Advertisement
            </Typography>
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    textAlign: 'center',
                }}
                data-ad-client="ca-pub-6690248101881942"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive.toString()}
            />
        </Box>
    );
};

/**
 * AdSense In-Feed Native Ad Component
 * Blends naturally with content feed
 */
export const InFeedAd = ({ slot = '1234567890', style = {} }) => {
    useEffect(() => {
        try {
            if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    return (
        <Box
            sx={{
                margin: '20px 0',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
                ...style,
            }}
        >
            <Typography
                variant="caption"
                sx={{
                    display: 'block',
                    color: '#64748b',
                    fontSize: '0.7rem',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}
            >
                Advertisement
            </Typography>
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    textAlign: 'center',
                }}
                data-ad-format="fluid"
                data-ad-layout-key="-6t+ed+2i-1n-4w"
                data-ad-client="ca-pub-6690248101881942"
                data-ad-slot={slot}
            />
        </Box>
    );
};

/**
 * AdSense Sticky Sidebar Ad Component
 * Stays visible while scrolling (desktop only)
 */
export const SidebarAd = ({ slot = '1234567890' }) => {
    useEffect(() => {
        try {
            if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    return (
        <Box
            sx={{
                position: { xs: 'relative', md: 'sticky' },
                top: { md: '100px' },
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
                marginBottom: '20px',
            }}
        >
            <Typography
                variant="caption"
                sx={{
                    display: 'block',
                    color: '#64748b',
                    fontSize: '0.7rem',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                }}
            >
                Advertisement
            </Typography>
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                }}
                data-ad-client="ca-pub-6690248101881942"
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </Box>
    );
};

export default { DisplayAd, InFeedAd, SidebarAd };
