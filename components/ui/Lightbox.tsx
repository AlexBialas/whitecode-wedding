"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: {
    src: string;
    alt: string;
  }[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: Props) {
  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-lg"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-8 top-8 text-white"
          >
            <X size={36} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-8 text-white"
          >
            <ChevronLeft size={48} />
          </button>

          <motion.div
            layoutId={images[index].src}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.92 }}
            transition={{ duration: 0.25 }}
            className="relative h-[85vh] w-[90vw] max-w-6xl"
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              className="object-contain"
            />
          </motion.div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-8 text-white"
          >
            <ChevronRight size={48} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
