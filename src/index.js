var routes = require('./routes');
var rpcRequest = require('./rpc-request');
var REQUEST_CONSTANTS = require('./request-constants');
var DropboxApi;

var AUTH_BASE_URL = 'https://www.dropbox.com/oauth2/authorize';

// Polyfill Object.assign() for older browsers
require('./object-assign-polyfill');

DropboxApi = function (options) {
  this.accessToken = options && options.accessToken || '';
  this.clientId = options && options.clientId || '';
  this.selectUser = options && options.selectUser || '';
};

DropboxApi.prototype.setAccessToken = function (accessToken) {
  this.accessToken = accessToken;
};

DropboxApi.prototype.getAccessToken = function () {
  return this.accessToken;
};

DropboxApi.prototype.setClientId = function (clientId) {
  this.clientId = clientId;
};

DropboxApi.prototype.getClientId = function () {
  return this.clientId;
};

DropboxApi.prototype.getAuthenticationUrl = function (redirectUri, state) {
  var clientId = this.getClientId();
  var authUrl;
  if (!clientId) {
    throw new Error('A client id is required. You can set the client id using .setClientId().');
  }
  if (!redirectUri) {
    throw new Error('A redirect uri is required.');
  }

  authUrl = AUTH_BASE_URL + '?response_type=token&client_id=' + clientId;
  if (redirectUri) {
    authUrl = authUrl + '&redirect_uri=' + redirectUri;
  }
  if (state) {
    authUrl = authUrl + '&state=' + state;
  }
  return authUrl;
};

DropboxApi.prototype.request = function (path, body, host, style) {
  if (style === REQUEST_CONSTANTS.RPC) {
    return this.rpcRequest(path, body, this.getAccessToken(), this.selectUser);
  } else if (style === REQUEST_CONSTANTS.DOWNLOAD) {
    throw new Error('Download endpoints are not yet implemented');
  } else if (style === REQUEST_CONSTANTS.UPLOAD) {
    throw new Error('Upload endpoints are not yet implemented');
  } else {
    throw new Error('Invalid request type');
  }
};

DropboxApi.prototype.rpcRequest = rpcRequest;

DropboxApi.prototype.setRpcRequest = function (newRpcRequest) {
  DropboxApi.prototype.rpcRequest = newRpcRequest;
};

DropboxApi.prototype.getRpcRequest = function () {
  return DropboxApi.prototype.rpcRequest;
};

DropboxApi.prototype = Object.assign(DropboxApi.prototype, routes);

module.exports = DropboxApi;
