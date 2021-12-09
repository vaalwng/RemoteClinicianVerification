import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Task from "../Task";
import CustomButton from "../button/CustomButton";
import MySpinner from "../MySpinner";
const TaskScreen = (props) => {
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { navigation, route } = props;
  const [tasks, setTasks] = useState(route.params ? route.params.tasks : null);
  let count = 0;
  const onCheckBox = (value) => {
    // if (value) count++;
    // else count--;
    // if(count < 0)
    //   count = 0;
    // if (count == tasks.length) setTaskCompleted(true);
    // else setTaskCompleted(false);
    // console.log(count)
  };

  // useEffect(() => {
  //   return () => {
  //     console.log("come frome Location Screen");
  //   };
  // }, [tasks]);

  return (
    <View>
      {!tasks ? (
        <Text style={{ alignSelf: "center" }}>No Available Tasks</Text>
      ) : (
        <View>
          {tasks.map((task) => {
            return (
              <Task key={task.key} data={task} onValueChange={onCheckBox} />
            );
          })}

          <CustomButton
            title="FINISH"
            onPress={() => {
              setLoading(true);
              setTimeout(() => {
                console.log("Finished");

                setLoading(false);
                setTaskCompleted(true);
                // navigation.navigate("Location", {appointment : appointment});
                setTasks(null);
              }, 2000);
            }}
          />
        </View>
      )}
      <MySpinner visible={isLoading} textContent={"Checking out..."} />
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({});
