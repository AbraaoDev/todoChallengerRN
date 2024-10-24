import { FlatList, Text, View, Alert, TextInput } from "react-native";
import { styles } from "./styles";
import { Header } from "../../components/Header";
import { Task } from "../../components/Task";
import { useRef, useState } from "react";
import { TaskDTO } from "../../dtos/TaskDTO";
import { Empty } from "../../components/Empty";
import { uuid } from "../../utils/uuid";

export function Home() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [newTask, setNewTask] = useState("");
  const newTaskInputRef = useRef<TextInput>(null);

  function handleTaskAdd() {
    if (newTask !== "" && newTask.length >= 5) {
      setTasks((tasks) => [
        ...tasks,
        { id: uuid(), isCompleted: false, title: newTask.trim() },
      ]);
    }
    setNewTask("");
    newTaskInputRef.current?.blur();
  }

  function handleTaskDone(id: string) {
    setTasks((taskM) =>
      taskM.map((task) => {
        task.id === id ? (task.isCompleted = !task.isCompleted) : null;
        return task;
      })
    );
  }
  function handleTaskDelete(id: string) {
    Alert.alert("Excluir tarefa", "Deseja excluir tarefa?", [
      {
        text: "Sim",
        style: "default",
        onPress: () => {
          setTasks((tasks) => tasks.filter((task) => task.id !== id));
        },
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  const totalTaskCreated = tasks.length;
  const totalTaskCompleted = tasks.filter(
    ({ isCompleted }) => isCompleted
  ).length;

  return (
    <View style={styles.container}>
      <Header
        inputRef={newTaskInputRef}
        task={newTask}
        onChangeText={setNewTask}
        onPress={handleTaskAdd}
      />
      <View style={styles.taskContainer}>
        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.taskCreated}> Criadas</Text>
            <View style={styles.count}>
              <Text style={styles.countText}>{totalTaskCreated}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.taskDone}> Concluídas</Text>
            <View style={styles.count}>
              <Text style={styles.countText}>{totalTaskCompleted}</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(tasks) => tasks.id!}
          renderItem={({ item }) => (
            <Task
              key={item.id}
              onTaskDone={() => handleTaskDone(item.id)}
              onTaskDelete={() => handleTaskDelete(item.id)}
              {...item}
            />
          )}
          ListEmptyComponent={<Empty />}
        />
      </View>
    </View>
  );
}
