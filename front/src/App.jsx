import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [legenda, setLegenda] = useState("");
  const [imagem, setImagem] = useState(null);
  const [publicacoes, setPublicacoes] = useState([])


  const API_URL = "http://localhost:3333/api/publicacoes"

  const carregarDados = async()=>{
     const resposta = await fetch(API_URL) //texto
     const dados = await resposta.json() //json
     setPublicacoes(dados)
  }

  useEffect(()=>{
    carregarDados()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("legenda", legenda);
    formData.append("imagem", imagem);

    await fetch(API_URL, {
      method: "POST",
      body: formData
    })

    setTitulo("")
    setLegenda("")
    setImagem(null)
    e.target.reset()

    carregarDados()
  };



  return (
    <div className="container">
      <h1>Galeria de Imagens</h1>

      {/**Formulario */}
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImagem(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Titulo"
          required
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Legenda"
          required
          onChange={(e) => setLegenda(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      {publicacoes.length === 0 ? ( <p>Nenhuma Imagem Cadastrada</p>) 
      : (<div className="galeria">
        {publicacoes.map((item)=>(
          <div key={item.id} className="card">
            <img src={`${API_URL}/imagem/${item.imagem}`} alt={item.titulo} />
            <h2>{item.titulo}</h2>
            <h2>{item.legenda}</h2>
          </div>
        ))}
      </div>
    )}
    </div>
  );
}

export default App;
