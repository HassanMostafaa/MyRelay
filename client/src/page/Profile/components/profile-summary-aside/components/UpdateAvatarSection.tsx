"use client";
import { AvatarImage } from "@/src/components/avatar-image/AvatarImage";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { UpdateAvatarModal } from "./UpdateAvatarModal";

export const UpdateAvatarSection = () => {
  //   MODAL LOGIC
  const [updateAvatarModalOpen, setUpdateAvatarModalOpen] = useState(false);

  return (
    <div className=" w-fit h-fit relative group">
      <AvatarImage />

      <button
        onClick={() => setUpdateAvatarModalOpen(true)}
        className="absolute z-3 group-hover:opacity-100 flex justify-center items-center opacity-0 bg-black/40 backdrop-blur-sm transition-all inset-0"
      >
        <EditIcon />
      </button>

      <UpdateAvatarModal
        open={updateAvatarModalOpen}
        onClose={() => setUpdateAvatarModalOpen(false)}
      />
    </div>
  );
};
