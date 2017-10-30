while true;
do

	cd /home/yevhenii/FriendTreasuryAPI/
	git remote update

	UPSTREAM=${1:-'@{u}'}
	LOCAL=$(git rev-parse @)
	BASE=$(git merge-base @ "$UPSTREAM")
	REMOTE=$(git rev-parse "$UPSTREAM")
	BRANCH="master"
	INTERVAL=$((10*1))

	if [ $LOCAL = $REMOTE ]; then
		echo "Up-to-date"
	elif [ $LOCAL = $BASE ]; then
		echo "Deploy"
		git pull origin $BRANCH 
		bash start.sh
		bash webclient/start.sh
	fi;
sleep $INTERVAL;
done
