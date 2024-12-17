// bugSolution.js
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const handleCameraError = (err) => {
    setError(err);
  };

  if (hasPermission === null) {
    return <View><Text>Requesting permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }
  if (error) {
    return <View><Text>Camera error: {error.message}</Text></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      {cameraReady && (
          <Camera
            style={{ flex: 1 }}
            type={type}
            onCameraReady={handleCameraReady}
            onError={handleCameraError}
          />
      )}
    </View>
  );
};
export default App;