export up=$(git remote -v | grep "upstream")
if [ -z "$up" ]
then
    git remote add upstream git@github.com:rakutenanalytics/rakuten-analytics-documentation.git
fi
git fetch origin
git fetch upstream
git checkout main
git reset --hard origin/main
git reset --hard upstream/main
git push origin main --force-with-lease
echo "main branch sync complete"
git fetch --tags upstream
git push --tags origin --force-with-lease
echo "tags sync complete"
git switch -C gh-pages origin/gh-pages
git reset --hard origin/gh-pages
git reset --hard upstream/gh-pages
git push origin gh-pages --force-with-lease
echo "gh-pages branch sync complete"
