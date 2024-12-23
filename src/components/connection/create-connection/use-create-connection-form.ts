import { zodResolver } from '@hookform/resolvers/zod';
import { FormMessages } from '@/lib/form/form-messages';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createConnection } from './create-connection';
import { notification } from '@/lib/notification/notifications';

export const useCreateConnectionForm = () => {
  const form = useForm<CreateConnectionFormInput>({
    defaultValues: {
      name: '',
      host: '',
      port: 5432,
      username: '',
      password: '',
      database: '',
      type: 'postgresql'
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = (input: CreateConnectionFormInput) => {
    const result = createConnection(input);
    console.log({
      result
    });

    if (result?.error) {
      if (result.field) {
        form.setError(result.field as keyof CreateConnectionFormInput, {
          message: result.error
        });

        return;
      }

      notification.error(result.error);
    }

    notification.success('Connection created');
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

export type CreateConnectionFormInput = z.infer<typeof schema>;
