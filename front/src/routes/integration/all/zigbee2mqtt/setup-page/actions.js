import createActionsIntegration from '../../../../../actions/integration';
import { RequestStatus } from '../../../../../utils/consts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import get from 'get-value';

dayjs.extend(relativeTime);

const createActions = store => {
  const integrationActions = createActionsIntegration(store);
  const actions = {
    async getContainers(state) {
      store.setState({
        DockerGetContainersStatus: RequestStatus.Getting
      });
      let mqtt4z2mContainerExists = false;
      let z2mContainerExists = false;
      let mqtt4z2mContainerRunning = false;
      let z2mContainerRunning = false;
      let z2mEnabled = state.z2mEnabled;

      try {
        const dockerContainers = await state.httpClient.get('/api/v1/docker/container/list');
        dockerContainers.forEach(container => {
          container.created_at_formatted = dayjs(container.created_at * 1000)
            .locale(state.user.language)
            .fromNow();
          if (container.name === '/zigbee2mqtt') {
            z2mContainerExists = true;
            if (container.state === 'running') {
              z2mContainerRunning = true;
            }
          }
          if (container.name === '/mqtt4z2m') {
            mqtt4z2mContainerExists = true;
            if (container.state === 'running') {
              mqtt4z2mContainerRunning = true;
            }
          }
        });
        if ( mqtt4z2mContainerRunning && z2mContainerRunning ) {
          z2mEnabled = true;
        }
        store.setState({
          dockerContainers,
          z2mEnabled,
          z2mContainerExists,
          mqtt4z2mContainerExists,
          z2mContainerRunning,
          mqtt4z2mContainerRunning,
          DockerGetContainersStatus: RequestStatus.Success
        });
      } catch (e) {
        store.setState({
          z2mEnabled,
          z2mContainerExists,
          mqtt4z2mContainerExists,
          z2mContainerRunning,
          mqtt4z2mContainerRunning,
          DockerGetContainersStatus: RequestStatus.Error
        });
      }
    },
    async startContainer(state) {
      let dockerContainers = state.dockerContainers;
      const z2mContainerExists = state.z2mContainerExists;
      let z2mEnabled = state.z2mEnabled;
      const mqtt4z2mContainerExists = state.mqtt4z2mContainerExists;
      dockerContainers.forEach(container => {
        if (container.name === '/zigbee2mqtt' || container.name === '/mqtt4z2m') {
          container.state = 'Starting';
        }
      });
      store.setState({
        z2mEnabled,
        dockerContainers,
        zigbee2mqttContainerStatus: RequestStatus.Getting
      });

      // if MQTT container exists, we just need to start it
      if (mqtt4z2mContainerExists) {
        try {
          await state.httpClient.post('/api/v1/docker/container/mqtt4z2m/start');
          dockerContainers = this.props.getContainers();
          store.setState({
            dockerContainers,
            zigbee2mqttContainerStatus: RequestStatus.Success
          });
        } catch (e) {
          const status = get(e, 'response.status');
          if (status) {
            dockerContainers = this.props.getContainers();
            store.setState({
              dockerContainers,
              zigbee2mqttContainerStatus: RequestStatus.Error
            });
          }
        }
      }

      // if Zigbee2mqtt container exists, we just need to start it
      if (z2mContainerExists) {
        try {
          await state.httpClient.post('/api/v1/docker/container/zigbee2mqtt/start');
          dockerContainers = this.props.getContainers();
          store.setState({
            dockerContainers,
            zigbee2mqttContainerStatus: RequestStatus.Success
          });
        } catch (e) {
          const status = get(e, 'response.status');
          if (status) {
            dockerContainers = this.props.getContainers();
            store.setState({
              dockerContainers,
              zigbee2mqttContainerStatus: RequestStatus.Error
            });
          }
        }
      }

    },
    async stopContainer(state) {
      let dockerContainers = state.dockerContainers;
      this.props.dockerContainers.forEach(container => {
        if (container.name === '/zigbee2mqtt' || container.name === '/mqtt4z2m') {
          container.state = 'Stopping';
        }
      });
      store.setState({
        dockerContainers,
        zigbee2mqttContainerStatus: RequestStatus.Getting
      });
      try {
        await state.httpClient.post('/api/v1/docker/zigbee2mqtt/stop');
        dockerContainers = this.props.getContainers();
        store.setState({
          dockerContainers,
          zigbee2mqttContainerStatus: RequestStatus.Success
        });
      } catch (e) {
        const status = get(e, 'response.status');
        if (status) {
          dockerContainers = this.props.getContainers();
          store.setState({
            dockerContainers,
            zigbee2mqttContainerStatus: RequestStatus.Error
          });
        }
      }
      try {
        await state.httpClient.post('/api/v1/docker/mqtt4z2m/stop');
        dockerContainers = this.props.getContainers();
        store.setState({
          dockerContainers,
          zigbee2mqttContainerStatus: RequestStatus.Success
        });
      } catch (e) {
        const status = get(e, 'response.status');
        if (status) {
          dockerContainers = this.props.getContainers();
          store.setState({
            dockerContainers,
            zigbee2mqttContainerStatus: RequestStatus.Error
          });
        }
      }
    },

    async loadProps(state) {
      let z2mEnabled = false;

      try {
        z2mEnabled = await state.httpClient.get('/api/v1/service/zigbee2mqtt/variable/ENABLED');
        store.setState({
          z2mEnabled,
          connectMqttStatus: RequestStatus.Success
        });
      } catch (e) {
        store.setState({
          z2mEnabled,
          connectMqttStatus: RequestStatus.Error,
        });
      };
    },
    updateConfiguration(state, e) {
      const data = {};
      data[e.target.name] = e.target.value;
      if (e.target.name === 'mqttPassword') {
        data.passwordChanges = true;
      }
      store.setState(data);
    },
    async saveConfiguration(state) {
      event.preventDefault();
      store.setState({
        connectMqttStatus: RequestStatus.Getting,
        mqttConnected: false
      });
      try {
        await state.httpClient.post('/api/v1/service/zigbee2mqtt/variable/ENABLED', {
          value: state.z2mEnabled
        });
      
      await state.httpClient.post(`/api/v1/service/mqtt/connect`);

        store.setState({
          connectMqttStatus: RequestStatus.Success
        });
      } catch (e) {
        store.setState({
          connectMqttStatus: RequestStatus.Error,
        });
      }
    },
    displayConnectedMessage(state) {
      // display 3 seconds a message "MQTT connected"
      store.setState({
        mqttConnected: true
      });
      setTimeout(
        () =>
          store.setState({
            mqttConnected: false,
            connectMqttStatus: undefined
          }),
        3000
      );
    },
    displayMqttError(state, error) {
      store.setState({
        mqttConnected: false,
        mqttConnectionError: error
      });
    }
  };
  return Object.assign({}, actions, integrationActions);
};

export default createActions;
