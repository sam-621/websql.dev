import { zodResolver } from '@hookform/resolvers/zod';
import { FormMessages } from '@/lib/form/form-messages';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { upsertConnection } from './upsert-connection';
import { notification } from '@/lib/notification/notifications';
import { Connection } from '@/lib/types/connection.type';
import { useTransition } from 'react';

export const useUpsertConnectionForm = (connection?: Connection) => {
  const [isLoading, startTransition] = useTransition();

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
      const result = await upsertConnection(connection ? { ...input, id: connection.id } : input);

      if (result?.error) {
        notification.error(result.error);
        return;
      }

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
