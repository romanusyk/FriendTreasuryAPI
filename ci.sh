cd /home/yevhenii/FriendTreasuryAPI/
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BRANCH="master"
INTERVAL=$((60 * 5))
while true;
do
	if [ $LOCAL = $REMOTE ]; then
		echo "Up-to-date"
	elif [ $LOCAL = $BASE ]; then
		git pull origin $BRANCH 
		bash start.sh
		bash webclient/start.sh
	fi;
sleep $INTERVAL;
done
