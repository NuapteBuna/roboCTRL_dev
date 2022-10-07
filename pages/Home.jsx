import {Component} from 'react';
import * as React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Button, Switch} from 'react-native-paper';
var _ = require('lodash');
import BluetoothSerial from 'react-native-bluetooth-serial-speedy';

import {Avatar, Card, Title, Paragraph, Text} from 'react-native-paper';
import {CardTitle} from 'react-native-paper/lib/typescript/components/Card/CardTitle';

import {FAB} from 'react-native-paper';

import Header from '../components/Header/Header';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {withTheme} from 'react-native-paper';
import {Badge} from 'react-native-paper';
import {Icon} from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import {SegmentedButtons} from 'react-native-paper';

const Home = props => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [discovering, setDiscovering] = React.useState(false);
  const [devices, setDevices] = React.useState([]);
  const [unpairedDevices, setUnpairedDevices] = React.useState([]);
  const [connected, setConnected] = React.useState(false);
  const [connecting, setConnecting] = React.useState(false);

  const [name, setName] = React.useState('Device');
  const [address, setAddress] = React.useState('Address');
  const [id, setId] = React.useState('ID');
  const [devclass, setDevClass] = React.useState('Class');

  const [received, setReceived] = React.useState('');

  const [value, setValue] = React.useState('info');

  const {colors} = props.theme;

  React.useEffect(() => {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        const [isEnabled, devices] = values;
        setIsEnabled(isEnabled);
        setDevices(devices);
        console.log(devices);
      },
    );

    BluetoothSerial.withDelimiter('\n').then(() => {
      Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
        values => {
          const [isEnabled, devices] = values;
          setDevices(devices);
        },
      );
      BluetoothSerial.on('read', data => {
        setReceived(data.data);
      });
    });

    BluetoothSerial.on('bluetoothEnabled', () => {
      Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
        values => {
          const [isEnabled, devices] = values;
          setDevices(devices);
          console.log(devices);
        },
      );
      BluetoothSerial.on('bluetoothDisabled', () => {
        setDevices([]);
      });
      BluetoothSerial.on('error', err => console.log(`Error: ${err.message}`));
    });
    Enable();
  }, []);

  function Connect(device) {
    setConnecting(true);
    BluetoothSerial.connect(device.id)
      .then(res => {
        console.log(`Connected to device ${device.name}`);
        setConnected(true);
        setName(device.name);
        setAddress(device.address);
        setId(device.id);
        setDevClass(device.class);
        ToastAndroid.show(
          `Connected to device ${device.name}`,
          ToastAndroid.SHORT,
        );
      })
      .catch(err => console.log(err.message));
  }

  const renderItem = item => {
    return (
      <TouchableOpacity onPress={() => Connect(item.item)}>
        <View style={styles.deviceNameWrap}>
          <Text style={styles.deviceName}>
            {item.item.name ? item.item.name : item.item.id}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const Enable = () => {
    BluetoothSerial.enable()
      .then(() => setIsEnabled(true))
      .catch(err => Toast.showShortBottom(err.message));
  };

  const Disable = () => {
    BluetoothSerial.disable()
      .then(() => setIsEnabled(false))
      .catch(res => Toast.showShortBottom(err.message));
  };

  const ToggleBluetooth = () => {
    if (!isEnabled) {
      Enable();
    } else {
      Disable();
    }
  };

  const DiscoverAvailableDevices = () => {
    Disable();
    setConnected(false);
    Enable();
    setDiscovering(true);
    /*BluetoothSerial.discoverUnpairedDevices()
      .then(unpairedDevices => {
        const uniqueDevices = _.uniqBy(unpairedDevices, 'id');
        console.log(uniqueDevices);
        setUnpairedDevices(uniqueDevices);
        setDiscovering(false);
      })
      .catch(err => console.log(err.message)); */
  };

  const toggleSwitch = () => {
    console.log('pressed');
    BluetoothSerial.write('120,100p')
      .then(res => {
        console.log(res);
        console.log('Successfully wrote to device');
        setConnected(true);
      })
      .catch(err => console.log(err.message));
  };

  return (
    <>
      <Header title="Bluetooth" />
      <View style={styles.container}>
        <View style={styles.toolbar}>
          {/*<Text style={styles.toolbarTitle}>Placeholder</Text>*/}
          <View style={styles.toolbarButton}>
            {/*<Switch value={isEnabled} onValueChange={ToggleBluetooth} />*/}
          </View>
        </View>
        {/*<Button
          mode="contained"
          onPress={() => DiscoverAvailableDevices.bind(this)}>
          Scan for Devices
  </Button>*/}
        {connected ? (
          <>
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: 'bold',
                marginLeft: 20,
              }}>
              Connected to
            </Text>
            <Card style={styles.connectedcard} mode="contained">
              <Card.Content>
                <Title
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {name}
                </Title>
                <Text style={{fontSize: 16}}>
                  Address: <Text style={{fontWeight: '500'}}>{address}</Text>
                </Text>
                <Text style={{fontSize: 16}}>
                  ID: <Text style={{fontWeight: '500'}}>{id}</Text>
                </Text>
                <Text style={{fontSize: 16}}>
                  Class: <Text style={{fontWeight: '500'}}>{devclass}</Text>
                </Text>
              </Card.Content>
              <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                  {
                    value: 'info',
                    label: 'Information',
                    icon: 'information-outline',
                  },
                  {
                    value: 'disconnect',
                    label: 'Forget',
                    icon: 'trash-can',
                    onPress: () => {
                      Disable();
                      setConnected(false);
                      Enable();
                    },
                  },
                ]}
                style={styles.group}
              />
            </Card>
          </>
        ) : null}
        <View style={{}}>
          <Text
            variant="bodyMedium"
            style={{
              fontWeight: 'bold',
              marginLeft: 20,
              //color: colors.primary,
            }}>
            Available devices
          </Text>
          <ActivityIndicator
            animating={true}
            color={colors.primary}
            style={{
              flex: 1,
              alignContent: 'flex-end',
              alignSelf: 'flex-end',
              marginRight: 25,
              marginBottom: 20,
              marginTop: -12,
            }}
            size={12}
          />
        </View>
        {devices.map(item => {
          return (
            <View style={styles.deviceNameWrap} key={item.id}>
              <Card
                key={item.id}
                mode="contained"
                style={styles.card}
                onPress={() => Connect(item)}>
                <Card.Content>
                  <Title>{item.name ? item.name : item.id}</Title>
                  <FAB icon="bluetooth" style={styles.fab2} mode="flat"></FAB>
                  <Paragraph>
                    {item.address ? item.address : 'Unknown Address'}
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
          );
        })}
        <Text>{received}</Text>
        <Button
          mode="contained"
          onPress={() => toggleSwitch()}
          style={{
            width: 150,
            alignSelf: 'center',
            bottom: 16,
            position: 'absolute',
          }}>
          Send
        </Button>
        <FAB
          icon="refresh"
          style={styles.fab}
          onPress={() => DiscoverAvailableDevices()}
        />
      </View>
    </>
  );
};

export default withTheme(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  card: {
    borderRadius: 20,
  },
  connectedcard: {
    margin: 20,
    borderRadius: 20,
  },

  group: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    margin: 10,
  },
  toolbar: {
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'row',
  },
  toolbarButton: {
    width: 50,
    marginTop: 8,
  },
  toolbarTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 6,
    flex: 1,
  },
  deviceName: {
    fontSize: 17,
    color: 'black',
  },
  deviceNameWrap: {
    margin: 20,
    marginTop: 0,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab2: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
//lasa comentarii ca n am nicio idee ce scrii tu aici pls pls pls<3
//ez switch fixbtw
