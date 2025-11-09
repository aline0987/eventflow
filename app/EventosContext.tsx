// app/EventosContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  local: string;
  imagem?: string;
  latitude?: number;
  longitude?: number;
}

interface EventosContextType {
  eventos: Evento[];
  adicionarEvento: (evento: Evento) => void;
  removerEvento: (id: string) => void;
}

const EventosContext = createContext<EventosContextType | undefined>(undefined);

export const EventosProvider = ({ children }: { children: ReactNode }) => {
  const [eventos, setEventos] = useState<Evento[]>([]);

  const adicionarEvento = (evento: Evento) => setEventos((prev) => [...prev, evento]);

  const removerEvento = (id: string) => setEventos((prev) => prev.filter((e) => e.id !== id));

  return (
    <EventosContext.Provider value={{ eventos, adicionarEvento, removerEvento }}>
      {children}
    </EventosContext.Provider>
  );
};

export const useEventos = () => {
  const context = useContext(EventosContext);
  if (!context) throw new Error("useEventos deve ser usado dentro de EventosProvider");
  return context;
};
