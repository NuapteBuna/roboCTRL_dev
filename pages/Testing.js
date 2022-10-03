import {Text} from 'react-native-paper';
import {Button} from 'react-native-paper';

const Testing = () => {
  return (
    <>
      <Text>eu sunt zeu</Text>
      <Button
        mode="contained"
        onPress={() => {
          console.log('pressed');
        }}>
        testing
      </Button>
    </>
  );
};
export default Testing;
