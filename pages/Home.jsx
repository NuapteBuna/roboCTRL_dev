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

const Home = () => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [discovering, setDiscovering] = React.useState(false);
  const [devices, setDevices] = React.useState([]);
  const [unpairedDevices, setUnpairedDevices] = React.useState([]);
  const [connected, setConnected] = React.useState(false);
  const [connecting, setConnecting] = React.useState(false);

  React.useEffect(() => {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        const [isEnabled, devices] = values;
        setIsEnabled(isEnabled);
        setDevices(devices);
      },
    );

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
    if (discovering) {
      return false;
    } else {
      setDiscovering(true);
      BluetoothSerial.discoverUnpairedDevices()
        .then(unpairedDevices => {
          const uniqueDevices = _.uniqBy(unpairedDevices, 'id');
          console.log(uniqueDevices);
          setUnpairedDevices(uniqueDevices);
          setDiscovering(false);
        })
        .catch(err => console.log(err.message));
    }
  };

  const toggleSwitch = () => {
    BluetoothSerial.write('T')
      .then(res => {
        console.log(res);
        console.log('Successfully wrote to device');
        setConnected(true);
      })
      .catch(err => console.log(err.message));
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>Placeholder</Text>
          <View style={styles.toolbarButton}>
            {/*<Switch value={isEnabled} onValueChange={ToggleBluetooth} />*/}
          </View>
        </View>
        {/*<Button
          mode="contained"
          onPress={() => DiscoverAvailableDevices.bind(this)}>
          Scan for Devices
  </Button>*/}
        <Text
          variant="bodyLarge"
          style={{fontWeight: 'bold', marginLeft: 20, marginBottom: 5}}>
          Devices
        </Text>
        {devices.map(item => {
          return (
            <View style={styles.deviceNameWrap} key={item.id}>
              <Card key={item.id} mode="elevated" onPress={() => Connect(item)}>
                <Card.Content>
                  <Title>{item.name ? item.name : item.id}</Title>
                  <Paragraph>
                    {item.address ? item.address : 'Unknown Address'}
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
          );
        })}
        <Button
          mode="contained"
          onPress={() => toggleSwitch.bind(this)}
          style={{
            width: 80,
            alignSelf: 'center',
            bottom: 16,
            position: 'absolute',
          }}>
          Send
        </Button>
        <FAB
          icon="refresh"
          style={styles.fab}
          onPress={() => DiscoverAvailableDevices}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
//lasa comentarii ca n am nicio idee ce scrii tu aici pls pls pls<3
//ez switch fixbtw
