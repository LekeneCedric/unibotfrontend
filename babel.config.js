module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel',
        [
          "@react-native-voice/voice",
          {
            "microphonePermission": "CUSTOM: Allow $(PRODUCT_NAME) to access the microphone",
            "speechRecognitionPermission": "CUSTOM: Allow $(PRODUCT_NAME) to securely recognize user speech"
          }
        ]],
    },
  },
};
