# Jewelry Images

This folder contains jewelry images for the Luxury Jewelry Auctions application.

## Structure

```
public/images/
└── jewelry/
    ├── rings/
    ├── necklaces/
    ├── bracelets/
    └── earrings/
```

## Image Guidelines

- Use high-quality images (minimum 400x400px)
- Optimize images for web (WebP format preferred)
- Maintain consistent aspect ratios
- Use descriptive filenames
- Include multiple angles for each piece when possible

## Current Implementation

Currently using Unsplash images with proper sizing and cropping:
- Card images: 400x400px with center crop
- Detail images: 600x600px with center crop
- All images include proper fallback handling

## Future Enhancements

- Add local image storage
- Implement image optimization pipeline
- Add image galleries for each jewelry piece
- Include 360-degree view capabilities
