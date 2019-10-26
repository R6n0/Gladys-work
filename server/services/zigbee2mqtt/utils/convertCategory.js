const { DEVICE_FEATURE_CATEGORIES } = require('../../../../server/utils/constants');

/**
 * @description Convert Gladys feature into Zigbee2mqtt category.
 * @param {Object} feature - Device feature.
 * @returns {*} Zigbee2mqtt category.
 * @example
 * convertCategory(feature);
 */
function convertCategory(feature) {
  let result;

  if (!feature.read_only) {
    result = 'state';
  } else {
    const { category } = feature;
    switch (category) {
      case DEVICE_FEATURE_CATEGORIES.LEAK_SENSOR: {
        result = 'water';
        break;
      }
      default: {
        const [split] = category.split('-');
        result = split;
      }
    }
  }

  return result;
}

module.exports = {
  convertCategory,
};