/* eslint-env mocha */
var Dropbox = require('../src/dropbox');
var REQUEST_CONSTANTS = require('../src/request-constants');
var chai = require('chai');
var sinon = require('sinon');

var assert = chai.assert;

describe('Dropbox', function () {
  var dbx;
  describe('api method', function () {
    it('filesListFolder calls Dropbox.request', function () {
      var requestSpy;
      dbx = new Dropbox();
      requestSpy = sinon.spy(dbx, 'request');
      dbx.filesListFolder({});
      assert(requestSpy.calledOnce);
      assert.equal('files/list_folder', dbx.request.getCall(0).args[0]);
      assert.deepEqual({}, dbx.request.getCall(0).args[1]);
      assert.equal('api', dbx.request.getCall(0).args[2]);
      assert.equal(REQUEST_CONSTANTS.RPC, dbx.request.getCall(0).args[3]);
    });
  });
});
