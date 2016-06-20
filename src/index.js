var Dropbox = require('./dropbox.js');
var DropboxTeam = require('./team/dropbox-team.js');

module.exports = {
 Standard: Dropbox,
 Team: DropboxTeam
};
