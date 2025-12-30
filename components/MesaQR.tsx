"use client";

import QRCode from "react-qr-code";
import { Mesa } from "@/store/mesasStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MesaQR({ mesa }: { mesa: Mesa }) {
  const [showQR, setShowQR] = useState(false);
  const url = `${typeof window !== "undefined" ? window.location.origin : ""}/mesa/${mesa.id}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => setShowQR(!showQR)}>
        {showQR ? "Ocultar QR" : "Mostrar QR"}
      </Button>
      {showQR && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <QRCode value={url} size={128} />
          <p className="text-xs mt-2 text-center">{url}</p>
        </div>
      )}
    </div>
  );
}