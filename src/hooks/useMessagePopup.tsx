import { useCallback, useEffect, useState } from 'react';
import { useToast } from './use-toast';

type MessageType = Partial<{
  title: string;
  description: string;
  variant: 'success' | 'destructive' | 'warning';
}> | null;

export default function useMessagePopup() {
  const [message, setMessage] = useState<MessageType>(null);
  const { toast } = useToast();

  const onMessage = useCallback((data: MessageType) => {
    setMessage(data);
  }, []);

  useEffect(() => {
    if (!message) return;
    toast({
      ...message,
      duration: 3000,
    });
    return () => {
      setMessage(null);
    };
  }, [message, toast]);

  useEffect(() => {
    const t = setTimeout(() => {
      setMessage(null);
    }, 3000);
    return () => {
      clearTimeout(t);
    };
  }, [message?.title, message?.description]);

  return { onMessage };
}
