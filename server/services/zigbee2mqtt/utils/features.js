const {
  DEVICE_FEATURE_CATEGORIES,
  DEVICE_FEATURE_TYPES,
  DEVICE_FEATURE_UNITS,
} = require('../../../../server/utils/constants');

const features = {
  presence: {
    category: DEVICE_FEATURE_CATEGORIES.PRESENCE_SENSOR,
    type: DEVICE_FEATURE_TYPES.SENSOR.BINARY,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1,
  },
  motion: {
    category: DEVICE_FEATURE_CATEGORIES.MOTION_SENSOR,
    type: DEVICE_FEATURE_TYPES.SENSOR.BINARY,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1,
  },
  siren: {
    category: DEVICE_FEATURE_CATEGORIES.SIREN,
    type: DEVICE_FEATURE_TYPES.SIREN.BINARY,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1,
  },
  door: {
    category: DEVICE_FEATURE_CATEGORIES.OPENING_SENSOR,
    type: DEVICE_FEATURE_TYPES.SENSOR.BINARY,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1,
  },
  water: {
    category: DEVICE_FEATURE_CATEGORIES.LEAK_SENSOR,
    type: DEVICE_FEATURE_TYPES.SENSOR.BINARY,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1,
  },
  smoke: {
    category: DEVICE_FEATURE_CATEGORIES.SMOKE_SENSOR,
    type: DEVICE_FEATURE_TYPES.SENSOR.BINARY,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1,
  },
  battery: {
    category: DEVICE_FEATURE_CATEGORIES.BATTERY,
    type: DEVICE_FEATURE_TYPES.SENSOR.INTEGER,
    unit: DEVICE_FEATURE_UNITS.PERCENT,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 100,
  },
  illuminance: {
    category: DEVICE_FEATURE_CATEGORIES.LIGHT_SENSOR,
    type: DEVICE_FEATURE_TYPES.SENSOR.DECIMAL,
    unit: DEVICE_FEATURE_UNITS.LUX,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1000,
  },
  humidity: {
    category: DEVICE_FEATURE_CATEGORIES.HUMIDITY_SENSOR,
    type: DEVICE_FEATURE_TYPES.SENSOR.DECIMAL,
    unit: DEVICE_FEATURE_UNITS.PERCENT,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 100,
  },
  temperature: {
    category: DEVICE_FEATURE_CATEGORIES.TEMPERATURE_SENSOR,
    type: DEVICE_FEATURE_TYPES.SENSOR.DECIMAL,
    unit: DEVICE_FEATURE_UNITS.CELSIUS,
    read_only: true,
    has_feedback: false,
    min: -50,
    max: 125,
  },
  pressure: {
    category: DEVICE_FEATURE_CATEGORIES.PRESSURE_SENSOR,
    type: DEVICE_FEATURE_TYPES.SENSOR.DECIMAL,
    unit: DEVICE_FEATURE_UNITS.PRESSURE_HPA,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 10000,
  },
  button: {
    category: DEVICE_FEATURE_CATEGORIES.BUTTON,
    type: DEVICE_FEATURE_TYPES.BUTTON.CLICK,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1,
  },
  switch: {
    category: DEVICE_FEATURE_CATEGORIES.SWITCH,
    type: DEVICE_FEATURE_TYPES.SENSOR.BINARY,
    read_only: false,
    has_feedback: true,
    min: 0,
    max: 1,
  },
  switch_sensor: {
    category: DEVICE_FEATURE_CATEGORIES.SWITCH,
    type: DEVICE_FEATURE_TYPES.SENSOR.BINARY,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1,
  },
  power: {
    category: DEVICE_FEATURE_CATEGORIES.SWITCH,
    type: DEVICE_FEATURE_TYPES.SWITCH.POWER,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1,
  },
  current: {
    category: DEVICE_FEATURE_CATEGORIES.SWITCH,
    type: DEVICE_FEATURE_TYPES.SWITCH.CURRENT,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1000,
  },
  voltage: {
    category: DEVICE_FEATURE_CATEGORIES.SWITCH,
    type: DEVICE_FEATURE_TYPES.SWITCH.VOLTAGE,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1000,
  },
  brightness: {
    category: DEVICE_FEATURE_CATEGORIES.LIGHT,
    type: DEVICE_FEATURE_TYPES.LIGHT.BRIGHTNESS,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 100,
  },
  color_temperature: {
    category: DEVICE_FEATURE_CATEGORIES.LIGHT,
    type: DEVICE_FEATURE_TYPES.LIGHT.SATURATION,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 100,
  },
  gas_density: {
    category: DEVICE_FEATURE_CATEGORIES.SMOKE_SENSOR,
    type: DEVICE_FEATURE_TYPES.SENSOR.DECIMAL,
    read_only: true,
    has_feedback: false,
    min: 0,
    max: 1000,
  },
};

module.exports = {
  features,
};
