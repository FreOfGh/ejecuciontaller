"use client";

import { useMesasStore } from "@/store/mesasStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import MesaQR from "@/components/MesaQR";

export default function AdminMesasPage() {
  const { mesas, addMesa, updateMesa, deleteMesa } = useMesasStore();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleSave = () => {
    if (editId) {
      updateMesa(editId, { nombre, descripcion });
      setEditId(null);
    } else {
      addMesa({ nombre, descripcion });
    }
    setNombre("");
    setDescripcion("");
  };

  const handleEdit = (id: number) => {
    const mesa = mesas.find((m) => m.id === id);
    if (mesa) {
      setEditId(mesa.id);
      setNombre(mesa.nombre);
      setDescripcion(mesa.descripcion || "");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">🪑 Administración de Mesas</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button>➕ Nueva Mesa</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editId ? "Editar Mesa" : "Agregar Nueva Mesa"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nombre o número"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <Input
              placeholder="Descripción (opcional)"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <Button onClick={handleSave}>
              {editId ? "Guardar cambios" : "Agregar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
  {mesas.map((m) => (
    <div
      key={m.id}
      className="p-4 border rounded-lg bg-white shadow-md flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-semibold">{m.nombre}</h3>
        {m.descripcion && <p className="text-gray-600">{m.descripcion}</p>}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleEdit(m.id)}>
            Editar
          </Button>
          <Button variant="destructive" onClick={() => deleteMesa(m.id)}>
            Eliminar
          </Button>
        </div>
        {/* Componente QR */}
        <MesaQR mesa={m} />
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
