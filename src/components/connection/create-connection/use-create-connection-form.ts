import { zodResolver } from '@hookform/resolvers/zod';
import { FormMessages } from '@/lib/form/form-messages';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useCreateConnectionForm = () => {
  const form = useForm<CreateConnectionFormInput>({
    defaultValues: {
      name: '',
      host: '',
      port: 5432,
      username: '',
      password: '',
      database: ''
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = (input: CreateConnectionFormInput) => {
    console.log(input);
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
  database: z.string().min(1, FormMessages.required),
  type: z.enum(['postgres', 'mysql'])
});

export type CreateConnectionFormInput = z.infer<typeof schema>;
