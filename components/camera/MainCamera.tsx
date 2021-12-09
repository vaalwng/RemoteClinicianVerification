import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import CameraPreview from "./CameraPreview";
import * as FaceDetector from "expo-face-detector";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImageManipulator from "expo-image-manipulator";
import Spinner from "react-native-loading-spinner-overlay";
import MySpinner from "../MySpinner";

let camera: Camera;
export default function MainCamera({ navigation, appointment }) {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [isSingleFace, setSingleFace] = useState(false);
  const [faces, setFaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const green_checkmark_circle = {
    name: "checkmark-circle-sharp",
    color: "#16c60c",
  };

  const red_close_circle = {
    name: "close-circle-sharp",
    color: "red",
  };
  const [icon, setIcon] = useState({});

  const faceDetected = ({ faces }) => {
    setFaces(faces);
    //check if multiple faces
    if (faces.length > 1 || faces.length == 0) {
      setSingleFace(false);
      setIcon(red_close_circle);
      console.log("Multiple or no faces!");
    } else {
      setSingleFace(true);
      setIcon(green_checkmark_circle);
      console.log({ faces });
    }
  };
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    //setStartCamera(false)
    //compress phto

    if (Platform.OS === "ios") {
      const iosResult = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 720 } }],
        {
          compress: 0.9,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );
      setCapturedImage(iosResult);
    } else {
      //android
      const androidResult = await ImageManipulator.manipulateAsync(
        photo.uri,
        [
          { resize: { width: 720 } },
          {
            flip: ImageManipulator.FlipType.Horizontal,
          },
        ],
        {
          compress: 0.9,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );
      setCapturedImage(androidResult);
    }
  };

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append("photo", {
      name: "photo.jpg",
      type: "image/jpeg",
      uri: photo.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };
  const SERVER_URL = "http://192.168.1.29:8080";

  const __verifyPhoto = () => {
    //send image to server
    // fetch(`${SERVER_URL}/image/upload/verify`, {
    //   method: "POST",
    //   body: createFormData(capturedImage, { userId: "123" }),
    // })
    //   .then((response) => {
    //     //If the response status code is between 200-299, if so
    //     if (response.ok) return response.json();

    //     //if not, throw a error
    //     throw new Error("Network response was not ok");
    //   })
    //   .then((response) => {
    //     console.log("upload succes", response);
    //     alert(response);
    //     navigation.navigate("Location");
    //   })
    //   .catch((error) => {
    //     console.log("upload error", error);
    //     alert("Upload failed!");
    //   });

    //mock call server
    setIsLoading(true);
    setTimeout(() => {
      console.log("Verified - Go to Task");
       navigation.navigate("Task", {tasks : appointment.tasks});
      setIsLoading(false);
    }, 3000);
  };

  const __trainPhoto = () => {
    //send image to server
    fetch(`${SERVER_URL}/image/upload/train`, {
      method: "POST",
      body: createFormData(capturedImage, { user: "Khiem" }),
    })
      .then((response) => {
        //If the response status code is between 200-299, if so
        if (response.ok) return response.json();

        //if not, throw a error
        throw new Error("Network response was not ok");
      })
      .then((response) => {
        console.log("upload succes", response);
        alert("Upload success!");
      })
      .catch((error) => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        {previewVisible && capturedImage ? (
          <CameraPreview
            photo={capturedImage}
            verifyPhoto={__verifyPhoto}
            trainPhoto={__trainPhoto}
            retakePicture={__retakePicture}
          />
        ) : (
          <Camera
            type="front"
            onFacesDetected={faceDetected}
            FaceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.accurate,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.none,
              minDetectionInterval: 5000,
              tracking: false,
            }}
            style={{ flex: 1 }}
            ref={(r) => {
              camera = r;
            }}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: "transparent",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: "5%",
                  top: "10%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              ></View>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  flexDirection: "row",
                  flex: 1,
                  width: "100%",
                  padding: 20,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    alignSelf: "center",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    disabled={!isSingleFace}
                    onPress={__takePicture}
                    style={{
                      width: 70,
                      height: 70,

                      borderRadius: 60,
                      backgroundColor: "transparent",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                    }}
                  >
                    <Icon
                      name={icon.name}
                      size={75}
                      color={icon.color}
                      style={{
                        position: "absolute",
                        right: 3,
                      }}
                    ></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Camera>
        )}
      </View>
      <MySpinner visible={isLoading} textContent={"Verifing..."} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingSpinner: {
    position: "absolute",
    alignSelf: "center",
  },
});
