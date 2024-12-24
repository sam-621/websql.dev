import { zodResolver } from '@hookform/resolvers/zod';
import { FormMessages } from '@/lib/form/form-messages';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { notification } from '@/lib/notification/notifications';
import { Connection } from '@/lib/types/connection.type';
import { useTransition } from 'react';
import { testConnection } from './test-connection';
import { useConnectionStore } from '../connection.store';
import { useDialogContext } from '@/components/ui/dialog';

export const useUpsertConnectionForm = (connection?: Connection) => {
  const [isLoading, startTransition] = useTransition();

  const { setIsOpen } = useDialogContext();
  const createConnectionInStore = useConnectionStore(state => state.create);
  const updateConnectionInStore = useConnectionStore(state => state.update);

  const form = useForm<UpsertConnectionFormInput>({
    defaultValues: {
      name: connection?.name ?? '',
      type: connection?.type ?? 'postgresql',
      url: connection?.url ?? ''
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = (input: UpsertConnectionFormInput) => {
    startTransition(async () => {
      const isValid = await testConnection(input);

      if (!isValid) {
        notification.error('Connection failed');
        return;
      }

      if (connection) {
        updateConnectionInStore({ ...input, id: connection.id });
      } else {
        createConnectionInStore({ ...input });
      }

      setIsOpen(false);
      notification.success(`Connection ${connection ? 'updated' : 'created'}`);
    });
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading
  };
};

const schema = z.object({
  type: z.enum(['postgresql', 'mysql']),
  name: z.string().min(1, FormMessages.required),
  url: z.string().min(1, FormMessages.required)
});

export type UpsertConnectionFormInput = z.infer<typeof schema>;
