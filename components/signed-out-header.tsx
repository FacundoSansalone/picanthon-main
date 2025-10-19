'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SignInModal } from './sign-in-modal';

export function SignedOutHeader() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleGetStarted = () => {
    setIsSignInModalOpen(true);
  };

  return (
    <header className="flex items-center w-full px-4 py-3 gap-4 sticky top-0 z-10 border-b text-white" style={{backgroundColor: 'hsl(var(--header-background))'}}>
      <Link href="/" className="flex items-center">
        <Image
          src="/images/pipedream.svg"
          alt="Pipedream"
          width={108}
          height={24}
          priority
          className="dark:invert"
        />
      </Link>
      
      <div className="flex items-center gap-3 ml-auto">
        <Button onClick={handleGetStarted} variant="blue">
          Get started
        </Button>
      </div>

      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />
    </header>
  );
}