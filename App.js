// MinhasTarefasApp/App.js
import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList, // <<< Importar FlatList
  Keyboard,// <<< Importar Keyboard para fechar o teclado
  Alert
} from 'react-native';
import styles from './styles';
import TaskItem from './TaskItem'; // <<< Importar o componente de item

function Header(props) {
  return (
    // Usa os estilos importados
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
}

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]); // Inicializa com array vazio


  const handleToggleTaskCompletion = (taskId) => {
    setTasks(prevTasks => // Usar a forma funcional do setTasks garante o estado mais recente
      prevTasks.map(task => {
        // Se o ID da tarefa atual no map for igual ao ID recebido...
        if (task.id === taskId) {
          // ...retorna um NOVO objeto task com a propriedade 'completed' invertida
          return { ...task, completed: !task.completed };
        }
        // Caso contrário, retorna a tarefa original sem modificação
        return task;
      })
    );
    // console.log("Toggled completion for task:", taskId); // Log opcional
  };
  const handleAddTask = () => {
    if (taskText.trim() === '') {
      return; // Sai da função sem fazer nada
    }

    const newTask = {
      id: Date.now().toString(), // Converte para string, exigido pelo keyExtractor
      text: taskText.trim(),
      completed: false, // Inicialmente, a tarefa não está completa
    };

    // 1. Atualiza o estado com a nova tarefa
    // 2. Adiciona a nova tarefa ao array 
    setTasks([newTask, ...tasks]); //Adiciona no início da lista (mais comum para tarefas)

    // 3. Limpa o campo de texto após adicionar a tarefa
    setTaskText('');

    // 4. Fecha o teclado
    Keyboard.dismiss(); // <<< Fecha o teclado apos adicionar a tarefa
  };

  const handleRemoveTask = (taskId) => {
    // Usar Alert para confirmar a remoção
    Alert.alert(
      "Confirmar Remoção", // Título
      "Tem certeza que deseja remover esta tarefa?", // Mensagem
      [
        {
          text: "Cancelar",
          style: "cancel" // Não faz nada se cancelar
        },
        {
          text: "Remover",
          onPress: () => {
            // Lógica de remoção só executa se confirmar
            setTasks(prevTasks =>
              prevTasks.filter(task => task.id !== taskId)
            );
            // console.log("Tarefa removida:", taskId); // Log opcional
          },
          style: "destructive" // Texto vermelho no iOS para indicar ação destrutiva
        }
      ],
      { cancelable: true } // Permite cancelar tocando fora (Android)
    );
  };

  // Função que será passada para renderItem na FlatList
  const renderTaskItem = ({ item }) => {
    return (
      <TaskItem
        task={item}
        onToggleCompletion={handleToggleTaskCompletion}
        onRemoveTask={handleRemoveTask} // <<< Passa a nova função de remoção
      />
    );
  };

  // Função para extrair o ID de cada item
  const getKey = (item) => item.id; // Usa o ID único que geramos

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="Minhas Tarefas Diárias" />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma nova tarefa..."
            placeholderTextColor="#888"
            value={taskText} // <<< Liga o valor do input ao estado
            onChangeText={setTaskText} // <<< Atualiza o estado a cada mudança no texto
            onSubmitEditing={handleAddTask} // Opcional: Adiciona a tarefa ao pressionar Enter
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTask} // <<< Chama a função ao ser pressionado
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Atualização simples no placeholder para dar feedback */}
        <View style={styles.listContainer}>
          {tasks.length === 0 ? ( // Mostra placeholder se não houver tarefas
            <Text style={styles.listPlaceholder}>Nenhuma tarefa ainda. Adicione uma!</Text>
          ) : (
            <FlatList
              data={tasks}
              renderItem={renderTaskItem} // Função não muda aqui
              keyExtractor={getKey}      // Função não muda aqui
              style={styles.taskList}
              contentContainerStyle={styles.taskListContent}
              // Adiciona ListEmptyComponent para um placeholder mais robusto
              ListEmptyComponent={() => (
                <Text style={styles.listPlaceholder}>Nenhuma tarefa ainda. Adicione uma!</Text>
              )}
            />
          )}
        </View>


        <StatusBar style="light-content" backgroundColor="#1A1A1A" />
      </View>
    </SafeAreaView>
  );
}

