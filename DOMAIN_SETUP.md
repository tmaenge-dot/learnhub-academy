# Custom Domain Setup Guide

## Option 1: Using Vercel (Recommended)

### Add Domain in Vercel Dashboard

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Enter your domain (e.g., `learnhub.com` or `www.learnhub.com`)
4. Click "Add"

### Configure DNS Records

Add these records at your domain registrar (GoDaddy, Namecheap, etc.):

**For root domain (learnhub.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Verification

- DNS propagation takes 24-48 hours (usually faster)
- Vercel will automatically provision SSL certificate
- Your site will be live at your custom domain

## Option 2: Using Cloudflare (Advanced)

1. Add your domain to Cloudflare
2. Point nameservers to Cloudflare
3. In Cloudflare DNS:
   - Add CNAME: `@` → `cname.vercel-dns.com` (Proxied)
   - Add CNAME: `www` → `cname.vercel-dns.com` (Proxied)
4. In Vercel, add both domains (with and without www)

## Free Domain Options

- **Freenom**: Free .tk, .ml, .ga domains (basic)
- **Free Subdomains**: Use services like afraid.org for free subdomains
- **GitHub Pages**: Use username.github.io as alternative

## Vercel Default Domain

Your site is already live at: `learnhub-academy-[random].vercel.app`

This works perfectly and includes:
- Free SSL certificate
- Global CDN
- Automatic deployments
- No configuration needed
