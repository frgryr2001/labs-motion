'use client';

import { Button } from '@/components/ui/button';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useFileUpload } from '@/hooks/use-file-upload';

export default function FileUpload() {
  const {
    state,
    isDragging,
    fileInputRef,
    handleChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleReset,
  } = useFileUpload();

  return (
    <div className="flex justify-center items-center min-h-screen w-full font-sans">
      <div className="w-full  mx-auto p-6 flex justify-center">
        <Button
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          disabled={state === 'loading'}
          variant={'outline'}
          className={isDragging ? 'opacity-70' : 'rounded-full!'}
          size={"icon"}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleChange}
            disabled={state === 'loading'}
            className="hidden"
            accept="*"
          />

          {state === 'idle' && (
            <>
              <Upload className="size-5" />
              {/* <span>{isDragging ? 'Drop file' : 'Upload or drag file'}</span> */}
            </>
          )}

          {state === 'loading' && (
            <>
              <Loader2 className="size-5 mr-2 animate-spin" />
              Uploading...
            </>
          )}

          {state === 'success' && (
            <>
              <CheckCircle className="size-5 mr-2" />
              Success
            </>
          )}

          {state === 'error' && (
            <>
              <AlertCircle className="size-5 mr-2" />
              Failed, click to retry
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
