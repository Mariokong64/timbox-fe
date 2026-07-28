export type FragmentoPreguntaFrecuente =
  | string
  | {
      tipo: "enlace";
      texto: string;
      href: string;
    }
  | {
      tipo: "salto";
    };

export type BloquePreguntaFrecuente =
  | {
      tipo: "pregunta";
      texto: string;
    }
  | {
      tipo: "respuesta";
      contenido: FragmentoPreguntaFrecuente[];
    }
  | {
      tipo: "lista";
      items: string[];
    };
