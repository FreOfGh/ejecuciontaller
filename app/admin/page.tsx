"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { menu as initialMenu } from "@/lib/data";

// 1. Definimos un tipo para las categorías basado en la estructura de tu data
type CategoriaMenu = keyof typeof initialMenu;

export default function AdminPage() {
  const [menu, setMenu] = useState(initialMenu);
  
  // 2. Tipamos el useState de categoría para que solo acepte llaves válidas
  const [categoria, setCategoria] = useState<CategoriaMenu>("comidas");
  
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  const handleAdd = () => {
    if (!form.nombre || !form.precio) return alert("Por favor completa los campos obligatorios.");
    
    const nuevo = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: parseInt(form.precio),
      imagen: form.imagen || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60",
    };

    setMenu({
      ...menu,
      // Ahora TS sabe que 'categoria' es una llave válida
      [categoria]: [...menu[categoria], nuevo],
    });
    setForm({ nombre: "", descripcion: "", precio: "", imagen: "" });
  };

  // 3. Tipamos el parámetro 'cat' para que coincida con las llaves del menú
  const handleDelete = (cat: CategoriaMenu, nombre: string) => {
    const actualizado = {
      ...menu,
      [cat]: menu[cat].filter((p: any) => p.nombre !== nombre),
    };
    setMenu(actualizado);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Panel de Administración</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="space-y-4 p-6">
            <div>
              <Label>Categoría</Label>
              <select
                value={categoria}
                // 4. Aseguramos que el valor del select se trate como tipo CategoriaMenu
                onChange={(e) => setCategoria(e.target.value as CategoriaMenu)}
                className="border rounded-md p-2 w-full text-black"
              >
                {Object.keys(menu).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* ... Resto de tus inputs de formulario (se mantienen igual) ... */}
            <div>
              <Label>Nombre del producto</Label>
              <Input
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Ej: Ensalada César"
              />
            </div>
            <div>
              <Label>Descripción</Label>
              <Input
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                placeholder="Ej: Con aderezo y crutones"
              />
            </div>
            <div>
              <Label>Precio</Label>
              <Input
                type="number"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
                placeholder="Ej: 18000"
              />
            </div>
            <div>
              <Label>URL de imagen</Label>
              <Input
                value={form.imagen}
                onChange={(e) => setForm({ ...form, imagen: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <Button onClick={handleAdd} className="w-full">
              Agregar producto
            </Button>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Productos en {categoria}</h2>
          <div className="grid gap-4">
            {menu[categoria].map((p: any) => (
              <Card key={p.nombre} className="flex justify-between items-center p-4">
                <div>
                  <p className="font-semibold">{p.nombre}</p>
                  <p className="text-sm text-neutral-600">${p.precio.toLocaleString()}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(categoria, p.nombre)}>
                  Eliminar
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}