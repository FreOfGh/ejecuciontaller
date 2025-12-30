"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MenuCard({
  nombre,
  descripcion,
  precio,
  imagen,
}: {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Image src={imagen} alt={nombre} width={400} height={250} className="object-cover w-full h-48" />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{nombre}</h3>
        <p className="text-sm text-neutral-600">{descripcion}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-lg">${precio.toLocaleString()}</span>
          <Button>Agregar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
