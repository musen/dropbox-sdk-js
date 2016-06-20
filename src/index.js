var Dropbox = require('./dropbox');
var DropboxTeam = require('./dropbox/team/');

module.exports = {
 Standard: Dropbox,
 Team: DropboxTeam
};
