import { Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import actions from './actions';
import { Text } from 'preact-i18n';

@connect('user,session,zigbee2mqttStatusMqttConnected,zigbee2mqttStatusUsbConfigured', actions)
class CheckStatus extends Component {
  componentWillMount() {
    this.props.checkStatus();
  }

  render(props, {}) {
    let messageKey;
    let linkURL;
    let linkText;
    if (!props.zigbee2mqttStatusUsbConfigured) {
      messageKey = 'integration.zigbee2mqtt.status.notAttached';
      linkUrl = '/dashboard/integration/device/zigbee2mqtt/settings';
      linkText = 'integration.zigbee2mqtt.status.settingsPageLink';
    } 
    //else if (!props.zigbee2mqttStatusMqttConnected) {
    //  messageKey = 'integration.zigbee2mqtt.status.notConnected';
//      linkUrl = '/dashboard/integration/device/zigbee2mqtt/settings';
    //  linkText = 'integration.zigbee2mqtt.status.setupPageLink';
    } else {
      return null;
    }

    return (
      <div class="alert alert-warning">
        <Text id={messageKey} />
        <Link href={linkURL}>
          <Text id={linkText} />
        </Link>
      </div>
    );
  }
}

export default CheckStatus;
