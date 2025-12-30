import { MenuCard } from "@/components/MenuCard";
import { menu } from "@/lib/data";
import QRGenerator from "@/components/QRGenerator";

export default function MesaPage({ params }: { params: { id: string } }) {
  const mesaId = params.id;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-semibold">Carta - Mesa {mesaId}</h1>
        <QRGenerator mesaId={mesaId} />
      </div>

      {Object.entries(menu).map(([categoria, productos]) => (
        <section key={categoria}>
          <h2 className="text-2xl font-semibold mb-4 capitalize">{categoria}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productos.map((p) => (
              <MenuCard key={p.nombre} {...p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
