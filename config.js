/* @flow */
module.exports = {
    url:
        "https://api.overwatchleague.com/live-match?expand=team.content&locale=en-us",
    timePerRequest: 5000,
    maximumInactiveTime: 1000 * 60 * 10 // 10 minutes,
};
