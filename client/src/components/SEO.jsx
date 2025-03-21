import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  image = '/src/assets/images/back.png', 
  canonicalUrl,
  type = 'website',
  schemaData,
  twitterUsername = '@too_more343'
}) => {
  const location = useLocation();
  const baseUrl = 'https://www.toomorebeverages.in'; // Official website
  const url = canonicalUrl || `${baseUrl}${location.pathname}`;
  const defaultDescription = "Too More - Experience premium natural juices and beverages made from fresh ingredients. Our drinks bring nature's best flavors to your glass without additives or preservatives.";
  const defaultTitle = 'Too More';
  
  const fullTitle = title ? `${title} | Too More` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  // Search engine display title
  const searchTitle = 'Too More - Premium Natural Juices & Beverages';
  
  // Default schema data for company
  const defaultSchemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Too More",
    "url": baseUrl,
    "logo": `${baseUrl}/src/assets/images/back.png`,
    "sameAs": [
      "https://www.facebook.com/too.more.142",
      "https://www.instagram.com/too_more1/",
      "https://www.youtube.com/@toomorebeverages9253",
      "https://x.com/too_more343"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+918780499433",
      "contactType": "customer service",
      "availableLanguage": ["English", "Arabic", "Hindi", "Bengali", "Telugu", "Marathi"]
    }
  };

  // Use provided schema or default
  const schema = schemaData || defaultSchemaData;
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={searchTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="image" content={imageUrl} />
      <link rel="canonical" href={url} />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      
      {/* OpenGraph meta tags for Facebook & LinkedIn */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={searchTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Too More" />
      
      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={searchTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content="natural juice, premium beverages, fresh juice, healthy drinks, Too More, fruit juice, organic drinks" />
      <meta name="author" content="Too More" />
      <meta name="theme-color" content="#015c01" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Too More" />
      <meta name="application-name" content="Too More" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="contact" content="+91 87804 99433" />
    </Helmet>
  );
};

export default SEO; 