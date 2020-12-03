import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { ExposedToJava } from '../../tools/ExposedToJava';
import * as RNFS from 'react-native-fs';
import CallDetectorManager from 'react-native-call-detection';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';

interface HomeScreenState {
  data: any[];
  startRecord: boolean;
}

interface HomeProps {}

type Props = HomeProps;

export class HomeScreen extends Component<Props, HomeScreenState> {
  constructor(props: any) {
    super(props);
    this.state = { data: [], startRecord: false };
  }
  data: any[] = [];
  fileName: string = `file:///${RNFS.ExternalDirectoryPath}/record.opus`;
  callDetector: any;
  stream: any;
  async componentDidMount() {
    
    await ExposedToJava.init();
    ExposedToJava.onRecordData = async (data) => {
      console.log(data)
      // await RNFS.appendFile(this.fileName, data + '##');
    };
    this.callDetector = new CallDetectorManager(
      async (event: any, phoneNumber: any) => {
        // For iOS event will be either "Connected",
        // "Disconnected","Dialing" and "Incoming"

        // For Android event will be either "Offhook",
        // "Disconnected", "Incoming" or "Missed"
        // phoneNumber should store caller/called number
        console.log(event, phoneNumber);
        if (event === 'Disconnected') {
          // Do something call got disconnected
          if (this.state.startRecord) {
            console.log('stop recording');
            await ExposedToJava.stopRecord();
            this.setState({ startRecord: false });
          }
        } else if (event === 'Connected') {
          // Do something call got connected
          // This clause will only be executed for iOS
        } else if (event === 'Incoming') {
          // Do something call got incoming
        } else if (event === 'Dialing') {
          // Do something call got dialing
          // This clause will only be executed for iOS
        } else if (event === 'Offhook') {
          //Device call state: Off-hook.
          // At least one call exists that is dialing,
          // active, or on hold,
          // and no calls are ringing or waiting.
          // This clause will only be executed for Android
          if (!this.state.startRecord) {
            console.log('recording');
            await ExposedToJava.startRecord();
            this.setState({ startRecord: true });
          }
        } else if (event === 'Missed') {
          // Do something call got missed
          // This clause will only be executed for Android
        }
      },
      false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      () => {}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      }, // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
    );
  }
  componentWillUnmount() {
    this.callDetector && this.callDetector.dispose();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          // onPressIn={async () => {
          //   this.data = [];
          //   await RNFS.unlink(this.fileName);
          //   await ExposedToJava.startRecord();
          //   this.setState({});
          // }}
          // onPressOut={() => {
          //   ExposedToJava.stopRecord();
          //   this.setState({});
          // }}
          onPress={async () => {
            // console.log(this.stream._tracks[0]._constraints)
            // if (this.state.startRecord) {
            //   await ExposedToJava.stopRecord();
            // } else {
            //   await ExposedToJava.startRecord();
            // }
            // this.setState({ startRecord: !this.state.startRecord });
          }}
          style={{
            flexDirection: 'row',
            borderWidth: 5,
            borderColor: '#a832a6',
            backgroundColor: this.state.startRecord ? '#ff0000' : '#cccccc',
            borderRadius: 75,
            width: 150,
            height: 150,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <FontAwesome5Icon
            name="microphone"
            size={60}
            color="#ffffff"
            style={{ flex: 1, textAlign: 'center' }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          // disabled={this.data.length == 0}
          onPressIn={async () => {
            // await ExposedToJava.startPlay();
            // const deneme = await RNFS.readFile(this.fileName);
            // // await ExposedToJava.sendPlayStream(deneme);
            // this.data = deneme.split('##');
            // console.log(this.data);
            // for (let index = 0; index < this.data.length; index++) {
            //   const element = this.data[index];
            //   await ExposedToJava.sendPlayStream(element);
            // }
            // this.setState({});
          }}
          onPressOut={() => {
            // ExposedToJava.stopPlay();
            // this.setState({});
          }}
          style={{
            flexDirection: 'row',
            borderWidth: 5,
            borderColor: '#a832a6',
            backgroundColor: '#0335fc',
            borderRadius: 75,
            width: 150,
            height: 150,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <FontAwesome5Icon
            name="microphone"
            size={60}
            color="#ffffff"
            style={{ flex: 1, textAlign: 'center' }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
