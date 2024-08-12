'use client';
import { primaryBtnStyles } from '@/app/commonStyles';
import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';
import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { v4 as uid } from 'uuid';

interface Props {
  items: ICustomFieldData[];
}

export const Priorities = ({ items }: Props) => {
  const [priorities, setPriorities] = useState(items);

  const handleSaveData = () => {
    console.log('save data', priorities);
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <CreateCustomFieldOptionModal
          title="Create new priority"
          triggerLabel="Create new priority option"
          handleSubmit={(data) =>
            setPriorities((items) => [...items, { id: uid(), ...data }])
          }
        />
      </div>

      <CustomFieldOptions
        field="priority"
        options={priorities}
        setOptions={setPriorities}
      />

      <div className="flex justify-end py-4">
        <Button onClick={handleSaveData} className={cn(primaryBtnStyles)}>
          Save changes
        </Button>
      </div>
    </div>
  );
};