import { type ComponentProps, type HTMLInputTypeAttribute } from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';

import { cn } from '../utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  PrimitiveFormInput
} from './form';
import { Label } from '@/components/ui/label';

export const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  placeholder,
  type,
  className,
  ...rest
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      {...rest}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full space-y-2', className)}>
          {label && <Label>{label}</Label>}
          <FormControl>
            <PrimitiveFormInput type={type} placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<
  ComponentProps<typeof FormField<TFieldValues, TName>>,
  'control' | 'defaultValue' | 'disabled' | 'name'
> & {
  label?: string;
  description?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
};
