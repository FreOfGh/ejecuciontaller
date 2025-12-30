import { create } from "zustand";

export type Mesa = {
  id: number;
  nombre: string;
  descripcion?: string;
};

type MesaStore = {
  mesas: Mesa[];
  addMesa: (mesa: Omit<Mesa, "id">) => void;
  updateMesa: (id: number, data: Partial<Mesa>) => void;
  deleteMesa: (id: number) => void;
};

export const useMesasStore = create<MesaStore>((set) => ({
  mesas: [
    { id: 1, nombre: "Mesa 1", descripcion: "Cerca de la ventana" },
    { id: 2, nombre: "Mesa 2", descripcion: "Zona interior" },
  ],
  addMesa: (mesa) =>
    set((state) => ({
      mesas: [...state.mesas, { id: Date.now(), ...mesa }],
    })),
  updateMesa: (id, data) =>
    set((state) => ({
      mesas: state.mesas.map((m) =>
        m.id === id ? { ...m, ...data } : m
      ),
    })),
  deleteMesa: (id) =>
    set((state) => ({
      mesas: state.mesas.filter((m) => m.id !== id),
    })),
}));
