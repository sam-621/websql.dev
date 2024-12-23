import { zodResolver } from '@hookform/resolvers/zod';
import { FormMessages } from '@/lib/form/form-messages';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { upsertConnection } from './upsert-connection';
import { notification } from '@/lib/notification/notifications';
import { Connection } from '@/lib/types/connection.type';

export const useUpsertConnectionForm = (connection?: Connection) => {
  const form = useForm<UpsertConnectionFormInput>({
    defaultValues: {
      name: connection?.name ?? '',
      host: connection?.host ?? '',
      port: connection?.port ?? 5432,
      username: connection?.username ?? '',
      password: connection?.password ?? '',
      database: connection?.database ?? '',
      type: connection?.type ?? 'postgresql'
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = (input: UpsertConnectionFormInput) => {
    const result = upsertConnection(connection ? { ...input, id: connection.id } : input);

    if (result?.error) {
      if (result.field) {
        form.setError(result.field as keyof UpsertConnectionFormInput, {
          message: result.error
        });

        return;
      }

      notification.error(result.error);
    }

    notification.success(`Connection ${connection ? 'updated' : 'created'}`);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  host: z.string().min(1, FormMessages.required),
  port: z.number().int().min(1, FormMessages.required),
  username: z.string().min(1, FormMessages.required),
  password: z.string().min(1, FormMessages.required),
  database: z.string().optional(),
  type: z.enum(['postgresql', 'mysql'])
});

export type UpsertConnectionFormInput = z.infer<typeof schema>;
