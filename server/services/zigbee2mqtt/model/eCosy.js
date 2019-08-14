const { features } = require('../utils/features');

/**
 * eCosy managed models.
 */
const eCosy = {
  brand: 'eCosy',
  models: {
    '1TST-EU': [features.temperature, features.presence], // heating + schedule,
  },
};

module.exports = {
  eCosy,
};
