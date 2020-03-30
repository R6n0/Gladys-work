const logger = require('../../utils/logger');
const Zigbee2mqttHandler = require('./lib');
const Zigbee2mqttController = require('./api/zigbee2mqtt.controller');
const { ServiceNotConfiguredError } = require('../../utils/coreErrors');

module.exports = function Zigbee2mqttService(gladys, serviceId) {
  const zigbee2mqttHandler = new Zigbee2mqttHandler(gladys, serviceId);

  /**
   * @public
   * @description This function starts service
   * @example
   * gladys.services.zigbee2mqtt.start();
   */
  async function start() {
    logger.log('Starting Zigbee2mqtt service');
    const zigbee2mqttDriverPath = await gladys.variable.getValue('ZIGBEE2MQTT_DRIVER_PATH', serviceId);
    if (!zigbee2mqttDriverPath) {
      throw new ServiceNotConfiguredError('ZIGBEE2MQTT_DRIVER_PATH_NOT_FOUND');
    }
    
    zigbee2mqttHandler.connect(zigbee2mqttDriverPath);
  }

  /**
   * @public
   * @description This function stops the service
   * @example
   *  gladys.services.zigbee2mqtt.stop();
   */
  function stop() {
    logger.log('Stopping Zigbee2mqtt service');
    zigbee2mqttHandler.disconnect();
  }

  return Object.freeze({
    start,
    stop,
    device: zigbee2mqttHandler,
    controllers: Zigbee2mqttController(zigbee2mqttHandler),
  });
};
