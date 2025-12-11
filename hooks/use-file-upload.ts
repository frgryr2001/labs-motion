import { useState, useRef } from 'react';

type UploadState = 'idle' | 'loading' | 'success' | 'error';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export function useFileUpload() {
  const [state, setState] = useState<UploadState>('idle');
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile({
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
    });

    // Simulate upload
    setState('loading');

    // Simulate completion (randomly success or error)
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo

      if (isSuccess) {
        setState('success');
        // Reset to idle after 2 seconds
        setTimeout(() => {
          handleReset();
        }, 2000);
      } else {
        setState('error');
        // Reset to idle after 2 seconds
        setTimeout(() => {
          handleReset();
        }, 2000);
      }
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleReset = () => {
    setState('idle');
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    state,
    file,
    isDragging,
    fileInputRef,
    handleChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleReset,
  };
}
