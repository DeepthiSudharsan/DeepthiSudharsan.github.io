## Deployment on GitHub Pages
This site is designed to be hosted on GitHub Pages. To ensure `index.html` is always loaded as the main page:
1.  Ensure `index.html` is in the root directory (done).
2.  In your GitHub repository settings, go to **Pages** and ensure the source is set to the `main` branch and `/ (root)`.

## Troubleshooting & Caching
If you notice changes (like updated images or text) are not reflecting in your live site:
- **Meta Tags**: I've added `Cache-Control: no-cache` meta tags to help browsers fetch the latest version.
- **Hard Refresh**: Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac) in your browser to bypass the cache.
- **GitHub Delay**: GitHub Pages can take a few minutes to rebuild after a `git push`. Check the **Actions** tab in your repo to see the deployment status.
