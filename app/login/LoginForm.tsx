'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { auth, type AuthError } from '@/utils/auth';
import { useToast } from '@/components/ui/use-toast';
import { getAuthError } from '@/utils/auth-errors';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await auth.signIn(email, password);
      router.push('/projects');
      router.refresh();
    } catch (error) {
      console.error('Auth error:', error);
      const { message } = getAuthError(error);
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: message,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'github' | 'google') => {
    try {
      setIsLoading(true);
      await auth.signInWithOAuth(provider);
    } catch (error) {
      const { message } = getAuthError(error);
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-96">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log in</CardTitle>
          <CardDescription className="text-xs">Welcome back</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            Don&apos;t have an account?{' '}
            <Link href="/create-account" className="text-blue-500">
              Create account
            </Link>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs text-blue-500">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="grid grid-cols-2 gap-6 w-full">
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={() => handleOAuthSignIn('github')}
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={() => handleOAuthSignIn('google')}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}