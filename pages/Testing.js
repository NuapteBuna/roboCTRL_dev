import {Text} from 'react-native-paper';
import {Button} from 'react-native-paper';

const Testing = () => {
  return (
    <>
      <Text>sdafklhsdlkfhaklsdjhfaslkjdfhalkdhflkasdjhf</Text>
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
