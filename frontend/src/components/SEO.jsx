import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for dynamic meta tags and structured data
 */
const SEO = ({
    title = "Free PDF Tools Online - Merge, Split, Rotate, Convert PDFs",
    description = "Free online PDF tools to merge, split, rotate, extract pages, and convert PDFs. No registration required. Fast, secure, and easy to use.",
    keywords = "pdf merger, split pdf, rotate pdf, extract pdf pages, image to pdf, pdf to image, free pdf tools",
    canonical = "https://pdftool-one.vercel.app/",
    ogImage = "https://pdftool-one.vercel.app/og-image.png",
    structuredData = null
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonical} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
