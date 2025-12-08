# Vercel Deployment Guide - Robot Stacker Server

## ⚠️ Important: Serverless Configuration

Your server has been configured to work with Vercel's serverless functions:
- ✅ `index.js` exports the Express app using `module.exports = app`
- ✅ Server only starts with `app.listen()` in development mode (`NODE_ENV !== 'production'`)
- ✅ In production (Vercel), the app is handled as a serverless function automatically
- ✅ Uses `rewrites` instead of deprecated `routes` in `vercel.json`

---

## 📋 Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
2. Vercel CLI installed (optional, but recommended)
   ```bash
   npm install -g vercel
   ```

---

## 🚀 Deployment Steps

### Method 1: Deploy via Vercel CLI (Recommended)

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy to preview:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? `robot-stacker-server` (or your preferred name)
   - In which directory is your code located? `./`
   - Want to override the settings? **N**

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

5. **Your API will be available at:**
   ```
   https://robot-stacker-server.vercel.app
   ```

---

### Method 2: Deploy via Vercel Dashboard

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "Add New Project"**

4. **Import your Git repository**

5. **Configure the project:**
   - **Framework Preset:** Other
   - **Root Directory:** `server` (if deploying from monorepo) or `./` (if server is root)
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
   - **Install Command:** `npm install`

6. **Add Environment Variables** (CRITICAL):
   Click "Environment Variables" and add:
   - `CORS_ORIGIN` = `https://your-frontend-url.netlify.app`
   - `NODE_ENV` = `production`

7. **Click "Deploy"**

---

## 🔧 Environment Variables Setup (CRITICAL!)

After deployment, you **MUST** configure environment variables in Vercel:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `CORS_ORIGIN` | `https://your-frontend.netlify.app` | Your frontend URL (REQUIRED) |
| `NODE_ENV` | `production` | Environment mode (REQUIRED) |

**⚠️ IMPORTANT:** 
- Without `CORS_ORIGIN`, your frontend will get CORS errors!
- Update `CORS_ORIGIN` with your actual Netlify frontend URL
- After adding/changing environment variables, **redeploy** for changes to take effect

---

## 📝 Post-Deployment

### 1. Get your API URL
After deployment, Vercel will provide a URL like:
```
https://robot-stacker-server.vercel.app
```

### 2. Test your endpoints
Test your deployed API:
```bash
# Test state endpoint
curl https://robot-stacker-server.vercel.app/api/state

# Should return JSON with grid, robot, and history
```

### 3. Update your client `.env` file
Update the client's `.env` file with your deployed API URL:
```env
VITE_API_URL=https://robot-stacker-server.vercel.app/api
```

### 4. Update CORS after deploying frontend
Once you deploy your frontend to Netlify:
1. Go to Vercel Dashboard → Your project → Settings → Environment Variables
2. Update `CORS_ORIGIN` to your Netlify URL: `https://your-app.netlify.app`
3. **Redeploy** your backend (Deployments → ⋯ → Redeploy)

---

## 🔍 Troubleshooting

### CORS Errors
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`
- ✅ Ensure `CORS_ORIGIN` environment variable is set in Vercel
- ✅ Value must match your frontend URL exactly (including `https://`)
- ✅ No trailing slash in the URL
- ✅ Redeploy after changing environment variables

### 500 Internal Server Error
**Possible causes:**
- Missing environment variables
- Module not found (check all dependencies are in `package.json`)
- Check Vercel function logs: Dashboard → Your project → Deployments → Click deployment → Functions

### Module Not Found
**Error:** `Cannot find module 'dotenv'` or similar
- ✅ Ensure all dependencies are in `dependencies` (not `devDependencies`)
- ✅ Run `npm install` locally to verify
- ✅ Check `package.json` has all required packages

### Routes Not Working
**Symptom:** 404 errors on API endpoints
- ✅ Verify `vercel.json` is in the server directory
- ✅ Check that routes use `/api/` prefix (e.g., `/api/state`, `/api/move`)
- ✅ Ensure `index.js` exports the app: `module.exports = app`

### Local Development Not Working
**Symptom:** Server doesn't start locally after changes
- ✅ Check your `.env` file - `NODE_ENV` should be `development` or omitted
- ✅ If `NODE_ENV=production`, the server won't start locally (by design)
- ✅ Run: `node index.js` or `npm start`

---

## 🎯 Vercel Configuration Explained

### `vercel.json`
```json
{
  "version": 2,                    // Vercel platform version
  "builds": [
    {
      "src": "index.js",           // Entry point
      "use": "@vercel/node"        // Node.js serverless runtime
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",           // Match all routes
      "destination": "/index.js"   // Send to index.js serverless function
    }
  ]
}
```

### `index.js` Export
```javascript
// Export for Vercel serverless functions
module.exports = app;

// Only start server locally (not in production)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running...`));
}
```

---

## 📚 Additional Resources

- [Vercel Node.js Documentation](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)

---

## ✅ Deployment Checklist

- [ ] `vercel.json` exists in server directory
- [ ] `index.js` exports the Express app (`module.exports = app`)
- [ ] All dependencies in `package.json`
- [ ] Deployed to Vercel (via CLI or Dashboard)
- [ ] Environment variable `CORS_ORIGIN` set in Vercel
- [ ] Environment variable `NODE_ENV` set to `production`
- [ ] API endpoints tested and working
- [ ] Frontend deployed and `CORS_ORIGIN` updated
- [ ] Backend redeployed after CORS update
- [ ] Full application tested end-to-end

---

**Happy Deploying! 🚀**
