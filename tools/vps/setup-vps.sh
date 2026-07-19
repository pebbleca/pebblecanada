#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════
# Pebble Canada — VPS Setup Script
# ═══════════════════════════════════════════════════════════════════════
# Run this ON your VPS via SSH:
#   ssh root@46.202.93.31
#   bash setup-vps.sh
#
# What it does:
#   1. Creates /var/www/pebblecanada directory
#   2. Installs Nginx config for pebblecanada.ca
#   3. Creates a deploy user for GitHub Actions auto-deploy
#   4. Generates an SSH key pair for deployments
#   5. Tests and reloads Nginx
#
# After running:
#   - Copy the PRIVATE key it prints → add as GitHub secret: VPS_SSH_KEY
#   - Point DNS A record for pebblecanada.ca → 46.202.93.31
#   - Set up Cloudflare (add site, enable proxy, SSL mode: Full)
# ═══════════════════════════════════════════════════════════════════════

set -euo pipefail

VPS_IP="46.202.93.31"
DOMAIN="pebblecanada.ca"
WEB_ROOT="/var/www/pebblecanada"
DEPLOY_USER="deploy-pebble"

echo ""
echo "══════════════════════════════════════════════"
echo "  Pebble Canada — VPS Setup"
echo "  Server: $VPS_IP"
echo "══════════════════════════════════════════════"
echo ""

# ── 1. Check we're root ──────────────────────────────────────────────
if [ "$(id -u)" -ne 0 ]; then
    echo "ERROR: Run this script as root (or with sudo)"
    exit 1
fi

# ── 2. Install/update Nginx if needed ────────────────────────────────
echo "[1/6] Checking Nginx..."
if ! command -v nginx &> /dev/null; then
    echo "  Installing Nginx..."
    apt-get update -qq
    apt-get install -y -qq nginx
else
    echo "  Nginx is already installed: $(nginx -v 2>&1)"
fi

# ── 3. Create web root ──────────────────────────────────────────────
echo "[2/6] Creating web root at $WEB_ROOT..."
mkdir -p "$WEB_ROOT"

# Put a temporary placeholder
if [ ! -f "$WEB_ROOT/index.html" ]; then
    cat > "$WEB_ROOT/index.html" <<'PLACEHOLDER'
<!DOCTYPE html>
<html><head><title>Pebble Canada</title></head>
<body><h1>Pebble Canada — coming soon</h1></body></html>
PLACEHOLDER
fi

# ── 4. Install Nginx config ─────────────────────────────────────────
echo "[3/6] Installing Nginx server block..."
cat > /etc/nginx/sites-available/pebblecanada.ca <<'NGINXCONF'
server {
    listen 80;
    listen [::]:80;

    server_name pebblecanada.ca www.pebblecanada.ca;

    root /var/www/pebblecanada;
    index index.html;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-XSS-Protection "1; mode=block" always;

    if ($host = www.pebblecanada.ca) {
        return 301 $scheme://pebblecanada.ca$request_uri;
    }

    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_types text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml;

    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    access_log /var/log/nginx/pebblecanada.access.log;
    error_log  /var/log/nginx/pebblecanada.error.log;
}
NGINXCONF

# Enable the site
ln -sf /etc/nginx/sites-available/pebblecanada.ca /etc/nginx/sites-enabled/pebblecanada.ca

# ── 5. Create deploy user ───────────────────────────────────────────
echo "[4/6] Creating deploy user: $DEPLOY_USER..."
if id "$DEPLOY_USER" &>/dev/null; then
    echo "  User $DEPLOY_USER already exists, skipping creation."
else
    useradd -r -m -d /home/$DEPLOY_USER -s /bin/bash $DEPLOY_USER
fi

# Give deploy user write access to web root
chown -R $DEPLOY_USER:www-data "$WEB_ROOT"
chmod -R 755 "$WEB_ROOT"

# ── 6. Generate SSH key for GitHub Actions ──────────────────────────
echo "[5/6] Setting up SSH key for automated deployments..."
DEPLOY_SSH_DIR="/home/$DEPLOY_USER/.ssh"
DEPLOY_KEY="$DEPLOY_SSH_DIR/github_deploy"

mkdir -p "$DEPLOY_SSH_DIR"
chown $DEPLOY_USER:$DEPLOY_USER "$DEPLOY_SSH_DIR"
chmod 700 "$DEPLOY_SSH_DIR"

if [ ! -f "$DEPLOY_KEY" ]; then
    ssh-keygen -t ed25519 -f "$DEPLOY_KEY" -N "" -C "pebblecanada-deploy@github"
    cat "$DEPLOY_KEY.pub" >> "$DEPLOY_SSH_DIR/authorized_keys"
    chmod 600 "$DEPLOY_SSH_DIR/authorized_keys"
    chown -R $DEPLOY_USER:$DEPLOY_USER "$DEPLOY_SSH_DIR"
    echo ""
    echo "  ┌─────────────────────────────────────────────────┐"
    echo "  │  NEW SSH KEY GENERATED                          │"
    echo "  │  Copy the PRIVATE key below and add it as a     │"
    echo "  │  GitHub secret named: VPS_SSH_KEY               │"
    echo "  │  (Repo → Settings → Secrets → Actions)          │"
    echo "  └─────────────────────────────────────────────────┘"
    echo ""
    cat "$DEPLOY_KEY"
    echo ""
    echo "  ─────────────────────────────────────────────────"
    echo ""
else
    echo "  Deploy key already exists at $DEPLOY_KEY"
    echo "  To view the private key: cat $DEPLOY_KEY"
fi

# ── 7. Test and reload Nginx ────────────────────────────────────────
echo "[6/6] Testing Nginx config..."
nginx -t

echo "  Reloading Nginx..."
systemctl reload nginx

echo ""
echo "══════════════════════════════════════════════"
echo "  SETUP COMPLETE"
echo "══════════════════════════════════════════════"
echo ""
echo "  Web root:  $WEB_ROOT"
echo "  Nginx:     /etc/nginx/sites-available/pebblecanada.ca"
echo "  Deploy as: $DEPLOY_USER"
echo ""
echo "  NEXT STEPS:"
echo "  1. Copy the private key above → GitHub secret: VPS_SSH_KEY"
echo "  2. Add these GitHub secrets too:"
echo "       VPS_HOST = $VPS_IP"
echo "       VPS_USER = $DEPLOY_USER"
echo "  3. Push to main → GitHub Action will deploy automatically"
echo "  4. Point DNS:  A record  pebblecanada.ca → $VPS_IP"
echo "  5. Cloudflare: Add site, enable proxy, SSL mode → Full"
echo ""
