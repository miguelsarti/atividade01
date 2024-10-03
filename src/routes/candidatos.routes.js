import { Router } from "express"

const candidatosRoutes = Router();

let candidatos = [
    {
      id: Math.random() * 1000000,
      nome: "Capitã Lucimara",
      partido: "PSD",
      idade: 39,
      segundo: true, // Concorrente ao segundo turno
      propostas: [
        "Aumento do salário mínimo",
        "Redução de impostos",
        "Mais investimentos em educação",
      ],
    },

    {
      id: Math.random() * 1000000,
      nome: "Rodrigo Toloi",
      partido: "MDB",
      idade: 40,
      segundo: true,
      propostas: [
        "",
        "",
        "",
      ],
    },

    {
        id: Math.random() * 1000000,
        nome: "Alexandre Japa",
        partido: "PRD",
        idade: 39,
        segundo: true,
        propostas: [
        "",
        "",
        "",    
        ],
    },
];
// Rota para buscar todas as emoções]

candidatosRoutes.get("/", (req, res) => {
    return res.status(200).json(candidatos)
    .send( candidatos )
});

// Rota para criar uma nova emoção

candidatosRoutes.post("/", (req, res) => {
    const {nome, partido, idade, segundo, propostas} = req.body;
    const newCandidato = {
    id: candidatos.length + 1,
    nome: nome,
    partido: partido,
    idade: idade,
    segundo: segundo,
    propostas: propostas
    };

    candidatos.push(newCandidato);
    return res.status(201).send(candidatos);
});

// Rota para buscar uma emoção pelo id

candidatosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;

  //console.log(id);
  const candidato = candidatos.find((Candidato) => Candidato.id == id )

  if (!candidato) {
    return res.status(404).send({
      message: "Emoção não encontrada!",
    });
  }

  return res.status(200).send({
    message: "Emoção encontrada!",
    candidato,
  });
});

candidatosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const candidato = candidatos.find((Candidato) => Candidato.id == id );
  if(!candidato) {
    return res.status(404).send({
      message: "Emoção não encontrada!",
    });
  }
  const { nome, cor } = req.body;
  candidato.nome = nome;
  candidato.cor = cor;

return res.status(200).send({
  message: "Emoção atualizada!",
  candidato,
  });
});

candidatosRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;
  const candidato = candidatos.find((Candidato) => Candidato.id == id );
  if(!candidato) {
    return res.status(404).send({
      message: "Emoção não encontrada!",
    });
  }

  candidatos = candidatos.filter((Candidato) => Candidato.id != id);

  return res.status(200).send({
    message: "Emoção Deletada!",
    candidato,
    });
  });

export default candidatosRoutes;