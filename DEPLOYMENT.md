# Vercel Deployment Guide

## Quick Start

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy Preview**
   ```bash
   vercel
   ```
   This creates a preview deployment for testing.

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## What Was Configured

- ✅ `vercel.json` - Routes and build configuration
- ✅ `api/index.js` - Serverless function entry point
- ✅ Upload middleware - Uses `/tmp` for Vercel
- ✅ Frontend build script - `vercel-build` added

## Environment Variables

**IMPORTANT:** You must set the frontend API URL in Vercel dashboard:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `/api` (for same-domain deployment)
   - **Environment**: Production, Preview, Development

Additional variables:
- `NODE_ENV` → `production` (already in vercel.json)

## Testing After Deployment

Test each tool on your Vercel URL:
- Merge PDFs
- Split PDF
- Rotate Pages
- Extract Pages
- Image to PDF
- PDF to Image

## Troubleshooting

**If deployment fails:**
- Check build logs in Vercel dashboard
- Verify all dependencies are in `dependencies` (not `devDependencies`)
- Ensure file sizes are under 50MB

**If functions timeout:**
- Large PDFs may exceed 10-second limit on free tier
- Consider upgrading to Pro tier or using different hosting

## Next Steps

After successful deployment:
1. Test all PDF tools
2. Set up custom domain (optional)
3. Monitor function logs in Vercel dashboard
