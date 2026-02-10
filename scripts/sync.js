const { execSync } = require('child_process');
const chokidar = require('chokidar');

let debounceTimer;
const DEBOUNCE_DELAY = 5000; // 5 seconds

console.log('🚀 Auto-sync started. Watching for changes...');

// Watch src and public directories
const watcher = chokidar.watch(['src', 'public', 'index.html', 'package.json'], {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true
});

function pushToGit() {
    try {
        console.log('\n📦 Changes detected. Syncing to GitHub...');

        // Add all changes
        execSync('git add .', { stdio: 'inherit' });

        // Commit with timestamp
        const timestamp = new Date().toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        execSync(`git commit -m "Auto-update: ${timestamp}"`, { stdio: 'inherit' });

        // Push to GitHub
        execSync('git push origin main', { stdio: 'inherit' });

        console.log('✅ Successfully synced to GitHub!\n');
    } catch (error) {
        if (error.message.includes('nothing to commit')) {
            console.log('ℹ️  No changes to commit.\n');
        } else {
            console.error('❌ Error syncing to GitHub:', error.message);
        }
    }
}

watcher.on('change', (path) => {
    console.log(`📝 File changed: ${path}`);

    // Clear existing timer
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }

    // Set new timer to push after delay
    debounceTimer = setTimeout(pushToGit, DEBOUNCE_DELAY);
});

watcher.on('ready', () => {
    console.log('👀 Watching: src/, public/, index.html, package.json');
    console.log('⏱️  Changes will be pushed after 5 seconds of inactivity\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Auto-sync stopped.');
    watcher.close();
    process.exit(0);
});
