import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Image as ImageIcon, Upload, X } from 'lucide-react';
import { PrintifyClient } from '@/lib/printify';
import { useToast } from '@/hooks/use-toast';

interface UploadTabProps {
  files: File[];
  onFileDrop: (e: React.DragEvent) => void;
  printifyClient: PrintifyClient;
}

interface UploadProgress {
  [key: string]: number;
}

export function UploadTab({ files, onFileDrop, printifyClient }: UploadTabProps) {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async () => {
    setUploading(true);
    
    try {
      for (const file of files) {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        await printifyClient.uploadDesign(file);
        
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
      }
      
      toast({
        title: 'Upload Complete',
        description: `Successfully uploaded ${files.length} designs`,
      });
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your designs',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onFileDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors"
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold mb-2">Drop your designs here</h3>
        <p className="text-sm text-gray-500 mb-4">
          or click to select files
        </p>
        <Button className="bg-green-500 hover:bg-green-600">
          Select Files
        </Button>
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Uploaded Files</h4>
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-green-500 hover:bg-green-600"
            >
              {uploading ? 'Uploading...' : 'Upload to Printify'}
            </Button>
          </div>
          
          <div className="space-y-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white rounded-lg border"
              >
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{file.name}</span>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {uploadProgress[file.name] !== undefined && (
                    <Progress value={uploadProgress[file.name]} className="h-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}