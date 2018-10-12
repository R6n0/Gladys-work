var sendCommand = require('./television.sendCommand.js');

/**
 * @public
 * @name gladys.television.switchState
 * @description Turn a TV on or off. You can set the devicetype attribute OR the room attribute (if only one TV per room) OR the device attribute to determine which TV you want to use. If there is only one TV declared, you can skip params: it will be chosen by default.
 * @param {Object} params
 * @param {integer} params.devicetype The id of the deviceType
 * @param {Integer} params.room The id of the room
 * @param {Integer} params.device The id of the device
 * @example
 * var params = {
 *      devicetype : 1 // or room or device
 * }
 * 
 * gladys.television.switchState(params)
 */

module.exports = function switchState(params) {
    return sendCommand('switchState', params);
};