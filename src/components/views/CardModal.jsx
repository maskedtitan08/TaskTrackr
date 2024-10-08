'use client';
import { useUpdateMyPresence } from "@/app/liveblocks.config";
import CardModalBody from "@/components/CardModalBody";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CardModal() {

  const router = useRouter();
  const params = useParams();
  const updateMyPresence = useUpdateMyPresence();

  function handleBackdropClick() {
    router.back();
  }

  useEffect(() => {
    if (params.cardId) {
      updateMyPresence({ cardId: params.cardId.toString() });
    }
  }, [params]);

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-10">
      </div>
      <div className="absolute inset-0 z-20 flex items-center justify-center w-full" onClick={handleBackdropClick}>
        <div className="bg-white w-1/3 h-3/5 my-8 p-6 mx-auto rounded-md" onClick={ev => ev.stopPropagation()}>
          <CardModalBody />
        </div>
      </div>
    </>
  );
}
