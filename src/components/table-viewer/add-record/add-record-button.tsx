import { Button } from '@/components/ui/button';
import { useAddRecord } from './use-add-record';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

export const AddRecordButton = () => {
  const { columns, isFetchingColumns, isLoading, isOpen, setIsOpen, addRecord, setForm } =
    useAddRecord();

  return (
    <Sheet open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button size="sm">Add record</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4 flex flex-col space-y-1">
          <SheetTitle className="text-left">Create record</SheetTitle>
          <SheetDescription className="text-left">Add a new record to the table</SheetDescription>
        </SheetHeader>
        {isFetchingColumns ? (
          <div>
            <p className="text-muted-foreground">Loading columns...</p>
          </div>
        ) : (
          <form onSubmit={addRecord} className="flex flex-col gap-3">
            {columns.map(col => (
              <div key={col.name} className="w-full flex flex-col gap-2">
                <Label htmlFor={col.name}>
                  {col.name} {col.required && <span className="text-destructive">*</span>}
                </Label>
                <Input
                  id={col.name}
                  type="text"
                  placeholder={col.default}
                  onChange={e => setForm(form => ({ ...form, [col.name]: e.target.value }))}
                />
              </div>
            ))}
            <Button isLoading={isLoading} type="submit">
              Save
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
};
