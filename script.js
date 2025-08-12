// Importação dos módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCrUtk3xKq16KoFcuqPXwOH8fEpDjxQ5E",
  authDomain: "e-commerce01-f7980.firebaseapp.com",
  databaseURL: "https://e-commerce01-f7980-default-rtdb.firebaseio.com",
  projectId: "e-commerce01-f7980",
  storageBucket: "e-commerce01-f7980.appspot.com",
  messagingSenderId: "82359373474",
  appId: "1:82359373474:web:fe9e4b4a52fdd57e3d3706",
  measurementId: "G-JY5MY3H1RP"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para adicionar produto no Firestore
async function AddProduto() {
  const codigoProduto = codigo.value;
  
  const dados = {
    nome: produto.value,
    categoria: categoria.value,
    quantidade: parseInt(quantidade.value),
    preco: parseFloat(valor.value),
    dataCadastro: new Date().toISOString(),
    rating: 0,
    reviews: 0,
    imagemUrl: ""
  };
  
  try {
    await setDoc(doc(db, "produtos", codigoProduto), dados);
    alert("Produto cadastrado com sucesso!");
    limparCamposCadastro();
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Erro ao cadastrar produto.");
  }
}

// Função para buscar produto
async function BuscarProduto() {
  const codigoBusca = idProduto.value;
  const docRef = doc(db, "produtos", codigoBusca);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const produto = docSnap.data();
    dadoProduto.value = produto.nome;
    dadoCategoria.value = produto.categoria;
    dadoQuantidade.value = produto.quantidade;
    dadoValor.value = produto.preco;
  } else {
    alert("Produto não encontrado.");
  }
}

// Função para atualizar
async function AtualizarProduto() {
  const codigoBusca = idProduto.value;
  const docRef = doc(db, "produtos", codigoBusca);
  
  try {
    await updateDoc(docRef, {
      nome: dadoProduto.value,
      categoria: dadoCategoria.value,
      quantidade: parseInt(dadoQuantidade.value),
      preco: parseFloat(dadoValor.value)
    });
    alert("Produto atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    alert("Erro ao atualizar produto.");
  }
}

// Função para deletar
async function DeletarProduto() {
  const codigoBusca = idProduto.value;
  try {
    await deleteDoc(doc(db, "produtos", codigoBusca));
    alert("Produto deletado com sucesso!");
    limparCamposBusca();
  } catch (error) {
    console.error("Erro ao deletar:", error);
    alert("Erro ao deletar produto.");
  }
}

// Funções auxiliares
function limparCamposCadastro() {
  codigo.value = "";
  produto.value = "";
  categoria.value = "";
  quantidade.value = "";
  valor.value = "";
}

function limparCamposBusca() {
  idProduto.value = "";
  dadoProduto.value = "";
  dadoCategoria.value = "";
  dadoQuantidade.value = "";
  dadoValor.value = "";
}

// Eventos
cadastrarProduto.addEventListener("click", AddProduto);
buscarProduto.addEventListener("click", BuscarProduto);
atualizarProduto.addEventListener("click", AtualizarProduto);
deletarProduto.addEventListener("click", DeletarProduto);