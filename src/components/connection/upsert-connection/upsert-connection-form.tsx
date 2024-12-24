import { Form } from '@/lib/form/form';
import { useUpsertConnectionForm, UpsertConnectionFormInput } from './use-upsert-connection-form';
import { FormInput } from '@/lib/form/form-input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { FC } from 'react';
import { Connection } from '@/lib/types/connection.type';

export const UpsertConnectionForm: FC<Props> = ({ connection }) => {
  const form = useUpsertConnectionForm(connection);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
        <RadioGroup
          className="flex items-center gap-4"
          defaultValue={form.getValues('type')}
          onValueChange={v => form.setValue('type', v as UpsertConnectionFormInput['type'])}
        >
          {/* Postgresql */}
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

          {/* mysql */}
          <div className="relative flex w-full items-center justify-between gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
            <RadioGroupItem
              disabled
              value="mysql"
              id="mysql"
              aria-describedby="mysql-description"
              className="order-1 after:absolute after:inset-0"
            />
            <div className="flex items-center gap-4">
              <Image src="/mysql.svg" alt="MySQL icon" width={48} height={48} />
              <div>
                <Label className="text-muted-foreground">MySQL</Label>
                <p className="text-muted-foreground text-xs">Coming soon</p>
              </div>
            </div>
          </div>
        </RadioGroup>

        <FormInput control={form.control} name="name" label="Name" />
        <FormInput control={form.control} name="url" label="Url" />
        <Button isLoading={form.isLoading} type="submit">
          {connection ? 'Update' : 'Save'}
        </Button>
      </form>
    </Form>
  );
};

type Props = {
  connection?: Connection;
};
