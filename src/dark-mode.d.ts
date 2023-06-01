
  declare module 'darkmode-js' {
    interface DarkmodeOptions {
      bottom: string // default: '32px'
      right: string // default: '32px'
      left: string // default: 'unset'
      time: string, // default: '0.3s'
      mixColor: string, // default: '#fff'
      backgroundColor: string, // default: '#fff'
      buttonColorDark: string, // default: '#100f2c'
      buttonColorLight: string, // default: '#fff'
      saveInCookies: boolean, // default: true,
      label: string, // default: ''
      autoMatchOsTheme: boolean // default: true
      // 在这里定义 Darkmode.js 的配置选项类型
      // 例如：
      // toggle: boolean;
      // brightness: number;
      // ...
    }
    export default class Darkmode {
      constructor(options?: DarkmodeOptions);
      showWidget(): void;
      toggle(): void;
      isActivated(): boolean;
      destroy(): void;
    }
  }

// export = Darkmode;
