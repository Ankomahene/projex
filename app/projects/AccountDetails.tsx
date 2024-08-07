import { ProfilePhotoUploader } from '@/components/ProfilePhotoUploader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { secondaryBtnStyles } from '../commonStyles';

export const AccountDetails = () => {
  return (
    <div>
      <ProfilePhotoUploader />
      <h1 className="text-2xl mt-4">Johnson Doe</h1>
      <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        johnsondoe@gmail.com
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. itaque
        reiciendis est reprehenderit.
      </p>

      <div>
        <h2 className="text-lg mt-4 mb-2">URLs</h2>
        <div className="flex items-center">
          <LinkIcon className="w-4 h-4 mr-2" />
          <a href="https://twitter.com/johnson12" className="text-sm">
            https://twitter.com/johnson12
          </a>
        </div>
      </div>

      <Link href="/profile">
        <Button className={cn(secondaryBtnStyles, 'w-full my-6')}>
          Edit Profile
        </Button>
      </Link>
    </div>
  );
};
