import { NativeModules } from 'react-native';
const ChannelModule = NativeModules.ChannelModule;

export class ExposedToJava {
  constructor() {}

  public static onRecordData: (data: any) => void;

  public static async init() {
    await ChannelModule.startService();
  }

  public static async startRecord() {
    await ChannelModule.startRecord();
  }

  public static async stopRecord() {
    await ChannelModule.stopRecord();
  }

  public static async startPlay() {
    await ChannelModule.startPlay();
  }

  public static async stopPlay() {
    await ChannelModule.stopPlay();
  }

  public static async sendPlayStream(data: any) {
    await ChannelModule.stream(data);
  }

  async getCommand(msg: any, data: any, size: any) {
    if (ExposedToJava.onRecordData != null) {
      ExposedToJava.onRecordData(data);
    }
  }
}
