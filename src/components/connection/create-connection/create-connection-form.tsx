import { Form } from '@/lib/form/form';
import { CreateConnectionFormInput, useCreateConnectionForm } from './use-create-connection-form';
import { FormInput } from '@/lib/form/form-input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export const CreateConnectionForm = () => {
  const form = useCreateConnectionForm();

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
        <RadioGroup
          className="flex items-center gap-4"
          defaultValue="postgresql"
          onValueChange={v => form.setValue('type', v as CreateConnectionFormInput['type'])}
        >
          {/* Radio card #1 */}
          <div className="relative flex w-full items-center justify-between gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
            <RadioGroupItem
              value="postgresql"
              id="postgresql"
              aria-describedby="postgresql-description"
              className="order-1 after:absolute after:inset-0"
            />
            <div className="flex items-center gap-4">
              <Image src="/postgresql.svg" alt="PostgreSQL icon" width={48} height={48} />
              <Label>PostgreSQL</Label>
            </div>
          </div>

          {/* Radio card #1 */}
          <div className="relative flex w-full items-center justify-between gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
            <RadioGroupItem
              value="mysql"
              id="mysql"
              aria-describedby="mysql-description"
              className="order-1 after:absolute after:inset-0"
            />
            <div className="flex items-center gap-4">
              <Image src="/mysql.svg" alt="MySQL icon" width={48} height={48} />
              <Label>MySQL</Label>
            </div>
          </div>
        </RadioGroup>

        <FormInput control={form.control} name="name" label="Name" />
        <div className="grid grid-cols-2 gap-4">
          <FormInput control={form.control} name="host" label="Host" />
          <FormInput control={form.control} name="port" label="Port" type="number" />
          <FormInput control={form.control} name="username" label="Username" />
          <FormInput control={form.control} name="password" label="Password" type="password" />
        </div>
        <FormInput control={form.control} name="database" label="Database" />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};
